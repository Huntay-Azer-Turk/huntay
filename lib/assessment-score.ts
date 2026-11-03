import type { Assessment, Condition, Question, Recommendation } from "@/data/assessments";

/** Profil cevapları: soru id → seçilen seçenek id'leri */
export type ProfileAnswers = Record<string, string[]>;
/** Puanlı cevaplar: soru id → 0..3 */
export type ScoreAnswers = Record<string, number>;

export type DimensionScore = { id: string; score: number; group?: string; lowestQuestion?: string };

export type AssessmentResult = {
  score: number;
  level: number;
  /** Seviye kritik bir cevap nedeniyle sınırlandıysa, sebep olan sorular */
  cappedBy: string[];
  dimensions: DimensionScore[];
  /** Ayrı alt puan grupları (ör. IoT) */
  groups: { id: string; score: number; level: number; cappedBy: string[] }[];
  recommendations: (Recommendation & { dimension: string })[];
  ctaPackageId?: string;
};

export function matches(condition: Condition | undefined, profile: ProfileAnswers): boolean {
  if (!condition) return true;
  const chosen = profile[condition.q] ?? [];
  return chosen.some((value) => condition.any.includes(value));
}

export function isVisible(question: Question, profile: ProfileAnswers): boolean {
  if (question.showIf && !matches(question.showIf, profile)) return false;
  if (question.hideIf && matches(question.hideIf, profile)) return false;
  return true;
}

export function visibleQuestions(assessment: Assessment, profile: ProfileAnswers): Question[] {
  return assessment.questions.filter((question) => isVisible(question, profile));
}

const weight = (question: Question) => (question.critical ? 2 : 1);

export function levelFor(score: number): number {
  if (score >= 80) return 3;
  if (score >= 60) return 2;
  if (score >= 40) return 1;
  return 0;
}

function percent(questions: Question[], answers: ScoreAnswers): number {
  const max = questions.reduce((sum, q) => sum + weight(q) * 3, 0);
  if (!max) return 0;
  const got = questions.reduce((sum, q) => sum + weight(q) * (answers[q.id] ?? 0), 0);
  return Math.round((got / max) * 100);
}

/** Kritik sorulara göre üst sınır */
function applyCaps(assessment: Assessment, questions: Question[], answers: ScoreAnswers, score: number) {
  const caps = assessment.caps;
  const critical = questions.filter((q) => q.critical);
  const zeros = critical.filter((q) => (answers[q.id] ?? 0) === 0).map((q) => q.id);
  const lows = critical.filter((q) => (answers[q.id] ?? 0) === 1).map((q) => q.id);
  let capped = score;
  let cappedBy: string[] = [];
  const cap = (limit: number | undefined, ids: string[]) => {
    if (limit !== undefined && ids.length && capped > limit) {
      capped = limit;
      cappedBy = ids;
    }
  };
  if (caps) {
    if (zeros.length >= 2) cap(caps.twoZeros ?? caps.oneZero, zeros);
    if (zeros.length >= 1) cap(caps.oneZero, zeros);
    if (lows.length >= 1) cap(caps.oneLow, lows);
  }
  return { score: capped, cappedBy };
}

export function scoreAssessment(
  assessment: Assessment,
  profile: ProfileAnswers,
  answers: ScoreAnswers,
): AssessmentResult {
  const shown = visibleQuestions(assessment, profile);
  const core = shown.filter((q) => !q.group);
  const raw = percent(core, answers);
  const { score, cappedBy } = applyCaps(assessment, core, answers, raw);

  const dimensions: DimensionScore[] = assessment.dimensions
    .map((dimension): DimensionScore | null => {
      const qs = shown.filter((q) => q.dimension === dimension.id);
      if (!qs.length) return null;
      const lowest = [...qs].sort((a, b) => (answers[a.id] ?? 0) - (answers[b.id] ?? 0))[0];
      const item: DimensionScore = { id: dimension.id, score: percent(qs, answers), group: dimension.group, lowestQuestion: lowest?.id };
      return item;
    })
    .filter((item): item is DimensionScore => item !== null);

  const groups = (assessment.groups ?? [])
    .map((group) => {
      const qs = shown.filter((q) => q.group === group.id);
      if (!qs.length) return null;
      const groupRaw = percent(qs, answers);
      const capped = applyCaps(assessment, qs, answers, groupRaw);
      return { id: group.id, score: capped.score, level: levelFor(capped.score), cappedBy: capped.cappedBy };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Öneriler: önce sıfır alan kritik soruların boyutları, sonra en düşük boyutlar; boyut başına bir öneri.
  const criticalZeroDims = shown
    .filter((q) => q.critical && (answers[q.id] ?? 0) === 0)
    .map((q) => q.dimension);
  const byScore = [...dimensions].filter((d) => d.score < 100).sort((a, b) => a.score - b.score).map((d) => d.id);
  // Ziyaretçinin hedefine uyan boyut (100 değilse) en zayıf boyuttan hemen sonra gelir.
  const goalDim = assessment.goal
    ? assessment.goal.dimensions[(profile[assessment.goal.q] ?? [])[0] ?? ""]
    : undefined;
  const goalFirst = goalDim && byScore.includes(goalDim) ? [byScore[0], goalDim] : [];
  const order = [...new Set([...criticalZeroDims, ...goalFirst, ...byScore])];
  const recommendations: AssessmentResult["recommendations"] = [];
  for (const dimensionId of order) {
    if (recommendations.length >= 3) break;
    const options = assessment.recommendations[dimensionId] ?? [];
    const lowest = dimensions.find((d) => d.id === dimensionId)?.lowestQuestion;
    const pick = options.find(
      (rec) => matches(rec.when, profile) && (!rec.lowest || rec.lowest === lowest),
    );
    if (pick) recommendations.push({ ...pick, dimension: dimensionId });
  }

  const level = levelFor(score);
  const ctaPackageId = assessment.cta[level].find((rule) => matches(rule.when, profile))?.packageId;

  return { score, level, cappedBy, dimensions, groups, recommendations, ctaPackageId };
}

/* ------------------------------------------------------------------ */
/* Paylaşılabilir sonuç linki: cevaplar URL'de, sunucuda saklanmaz      */
/* ------------------------------------------------------------------ */

/** "size=10-49;has=app.cloud|a1=2;a2=0" biçimi — kısa ve okunabilir */
export function encodeAnswers(profile: ProfileAnswers, answers: ScoreAnswers): string {
  const p = Object.entries(profile)
    .filter(([, values]) => values.length)
    .map(([key, values]) => `${key}=${values.join(".")}`)
    .join(";");
  const a = Object.entries(answers)
    .map(([key, value]) => `${key}=${value}`)
    .join(";");
  return `${p}|${a}`;
}

export function decodeAnswers(
  assessment: Assessment,
  encoded: string,
): { profile: ProfileAnswers; answers: ScoreAnswers } | null {
  const [p = "", a = ""] = encoded.split("|");
  const profile: ProfileAnswers = {};
  const answers: ScoreAnswers = {};
  for (const part of p.split(";").filter(Boolean)) {
    const [key, values = ""] = part.split("=");
    const question = assessment.profile.find((q) => q.id === key);
    if (!question) continue;
    profile[key] = values.split(".").filter((v) => question.options.some((o) => o.id === v));
  }
  for (const part of a.split(";").filter(Boolean)) {
    const [key, value] = part.split("=");
    const n = Number(value);
    if (assessment.questions.some((q) => q.id === key) && Number.isInteger(n) && n >= 0 && n <= 3) answers[key] = n;
  }
  const complete = visibleQuestions(assessment, profile).every((q) => q.id in answers);
  return complete && Object.keys(answers).length ? { profile, answers } : null;
}
