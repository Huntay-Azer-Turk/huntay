"use client";

import { getAssessment, type AssessmentSlug } from "@/data/assessments";
import { Link } from "@/i18n/navigation";
import {
  decodeAnswers,
  encodeAnswers,
  scoreAssessment,
  visibleQuestions,
  type ProfileAnswers,
  type ScoreAnswers,
} from "@/lib/assessment-score";
import { track } from "@/lib/track";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";
import { AlertTriangle, ArrowLeft, ArrowRight, CalendarClock, Check, Link2, Printer, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

type Lang = "en" | "tr";
export type PackageInfo = { name: string; price: string };

/**
 * Olgunluk testi: önce kısa profil soruları, sonra puanlı sorular (profile göre gösterilen), en sonda sonuç.
 * Cevaplar yalnızca tarayıcıda tutulur; sonuç linki (?r=…) cevapları içerir, sunucuda hiçbir şey saklanmaz.
 */
export function AssessmentRunner({
  slug,
  locale,
  packages,
}: {
  slug: AssessmentSlug;
  locale: Lang;
  packages: Record<string, PackageInfo>;
}) {
  const assessment = getAssessment(slug)!;
  const t = useTranslations("Assessment");
  const [profile, setProfile] = useState<ProfileAnswers>({});
  const [answers, setAnswers] = useState<ScoreAnswers>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  // Paylaşılan sonuç linki: ?r=… varsa doğrudan sonuç gösterilir.
  useEffect(() => {
    const encoded = new URLSearchParams(window.location.search).get("r");
    if (!encoded) return;
    const decoded = decodeAnswers(assessment, encoded);
    if (decoded) {
      // Adres çubuğu yalnızca tarayıcıda okunabilir; sonuç ilk çizimden sonra gösterilir.
      /* eslint-disable react-hooks/set-state-in-effect */
      setProfile(decoded.profile);
      setAnswers(decoded.answers);
      setDone(true);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [assessment]);

  const questions = useMemo(() => visibleQuestions(assessment, profile), [assessment, profile]);
  const total = assessment.profile.length + questions.length;
  const result = useMemo(
    () => (done ? scoreAssessment(assessment, profile, answers) : null),
    [done, assessment, profile, answers],
  );

  const finish = (finalAnswers: ScoreAnswers) => {
    const r = scoreAssessment(assessment, profile, finalAnswers);
    const url = new URL(window.location.href);
    url.searchParams.set("r", encodeAnswers(profile, finalAnswers));
    window.history.replaceState(null, "", url.toString());
    track({ name: "assessment_complete", params: { assessment: slug, score: r.score, level: r.level } });
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setProfile({});
    setAnswers({});
    setStep(0);
    setDone(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("r");
    window.history.replaceState(null, "", url.toString());
  };

  /* ------------------------------ Sonuç ------------------------------ */
  if (done && result) {
    const levelName = assessment.levels[result.level][locale];
    const bookNote = `${assessment.shortTitle[locale]} ${t("noteTest")}: ${result.score}/100 (${levelName})`.slice(0, 80);
    const ctaPackage = result.ctaPackageId ? packages[result.ctaPackageId] : undefined;
    const cappedQuestion = result.cappedBy[0]
      ? assessment.questions.find((q) => q.id === result.cappedBy[0])
      : undefined;
    return (
      <div className="space-y-10">
        <div className="glow-ring rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t("resultTitle")}</p>
          <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-2">
            <p className="text-6xl font-semibold tracking-tight text-foreground">
              {result.score}
              <span className="text-2xl text-muted-foreground">/100</span>
            </p>
            <p className="pb-2 text-2xl font-semibold text-accent">{levelName}</p>
          </div>
          <p className="mt-4 max-w-3xl text-muted-foreground">{assessment.levelText[result.level][locale]}</p>
          {cappedQuestion ? (
            <p className="mt-4 flex max-w-3xl gap-2 rounded-xl border border-border bg-background p-3 text-sm text-foreground">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span>
                {t("capped", { level: levelName })} <strong>{cappedQuestion.text[locale]}</strong>
              </span>
            </p>
          ) : null}
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t("breakdown")}</h2>
          <ul className="mt-6 space-y-4">
            {result.dimensions.map((dimension) => {
              const label = assessment.dimensions.find((d) => d.id === dimension.id)?.label[locale];
              return (
                <li key={dimension.id}>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">
                      {label}
                      {dimension.group ? <span className="text-muted-foreground"> · {t("separate")}</span> : null}
                    </span>
                    <span className="font-mono text-muted-foreground">{dimension.score}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-border" aria-hidden>
                    <div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(dimension.score, 3)}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
          {result.groups.map((group) => (
            <p key={group.id} className="mt-4 text-sm text-muted-foreground">
              {assessment.groups?.find((g) => g.id === group.id)?.label[locale]}: <strong className="text-foreground">{group.score}/100</strong>{" "}
              ({assessment.levels[group.level][locale]})
            </p>
          ))}
        </div>

        {result.recommendations.length ? (
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t("nextSteps")}</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {result.recommendations.map((rec, index) => {
                const pkg = rec.packageId ? packages[rec.packageId] : undefined;
                return (
                  <li key={rec.dimension} className="flex flex-col rounded-2xl border border-border bg-card p-5">
                    <span className="font-mono text-xs text-accent">0{index + 1}</span>
                    <h3 className="mt-2 font-semibold text-foreground">{rec.title[locale]}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{rec.body[locale]}</p>
                    <div className="mt-4 flex flex-col gap-1 text-sm">
                      {pkg ? (
                        <Link href={`/packages#${rec.packageId}`} className="text-accent hover:underline">
                          {pkg.name} · {pkg.price}
                        </Link>
                      ) : null}
                      <Link href={rec.href} className="text-accent hover:underline">
                        {t("learnMore")} →
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">{t("diy")}</p>
          </div>
        ) : null}

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-foreground">{t("ctaTitle")}</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {ctaPackage ? t("ctaPackageText", { name: ctaPackage.name }) : t("ctaCallText")}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap print:hidden">
            {ctaPackage ? (
              <Link href={`/packages#${result.ctaPackageId}`} className={buttonPrimary}>
                {ctaPackage.name} · {ctaPackage.price}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ) : null}
            <Link
              href={`/book?package=${encodeURIComponent(bookNote)}`}
              className={ctaPackage ? buttonSecondary : buttonPrimary}
            >
              <CalendarClock className="h-4 w-4" aria-hidden />
              {t("book")}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap print:hidden">
          <button
            type="button"
            className={buttonSecondary}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2500);
              } catch {
                /* pano erişimi yoksa sessizce geç */
              }
            }}
          >
            <Link2 className="h-4 w-4" aria-hidden />
            {copied ? t("copied") : t("copyLink")}
          </button>
          <button type="button" className={buttonSecondary} onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden />
            {t("print")}
          </button>
          <button type="button" className={buttonSecondary} onClick={restart}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            {t("restart")}
          </button>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {t("disclaimer", { frameworks: assessment.frameworks })}
        </p>
      </div>
    );
  }

  /* ------------------------------ Sorular ------------------------------ */
  const isProfile = step < assessment.profile.length;
  const profileQuestion = isProfile ? assessment.profile[step] : undefined;
  const question = !isProfile ? questions[step - assessment.profile.length] : undefined;
  const progress = Math.round((step / total) * 100);

  const next = () => setStep((s) => s + 1);

  return (
    <div className="glow-ring rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{t("progress", { current: step + 1, total })}</span>
        <span>{isProfile ? t("aboutYou") : assessment.dimensions.find((d) => d.id === question?.dimension)?.label[locale]}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border" aria-hidden>
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
      </div>

      {profileQuestion ? (
        <fieldset className="mt-8">
          <legend className="text-xl font-semibold text-foreground sm:text-2xl">{profileQuestion.text[locale]}</legend>
          {profileQuestion.hint ? <p className="mt-2 text-sm text-muted-foreground">{profileQuestion.hint[locale]}</p> : null}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {profileQuestion.options.map((option) => {
              const selected = (profile[profileQuestion.id] ?? []).includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                    selected ? "border-accent bg-accent/10 text-foreground" : "border-border bg-background text-foreground hover:border-accent"
                  }`}
                  onClick={() => {
                    if (profileQuestion.multi) {
                      const current = profile[profileQuestion.id] ?? [];
                      setProfile({
                        ...profile,
                        [profileQuestion.id]: selected ? current.filter((v) => v !== option.id) : [...current, option.id],
                      });
                    } else {
                      setProfile({ ...profile, [profileQuestion.id]: [option.id] });
                      next();
                    }
                  }}
                >
                  {profileQuestion.multi ? (
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${selected ? "border-accent bg-accent text-[var(--color-on-accent)]" : "border-border"}`}>
                      {selected ? <Check className="h-3 w-3" aria-hidden /> : null}
                    </span>
                  ) : null}
                  {option.label[locale]}
                </button>
              );
            })}
          </div>
          {profileQuestion.multi ? (
            <button type="button" className={`mt-6 ${buttonPrimary}`} onClick={next}>
              {(profile[profileQuestion.id] ?? []).length ? t("continue") : t("noneApply")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </fieldset>
      ) : question ? (
        <fieldset className="mt-8">
          <legend className="text-xl font-semibold text-foreground sm:text-2xl">{question.text[locale]}</legend>
          {question.hint ? <p className="mt-2 text-sm text-muted-foreground">{question.hint[locale]}</p> : null}
          <div className="mt-6 grid gap-3">
            {question.options.map((option, value) => {
              const selected = answers[question.id] === value;
              return (
                <button
                  key={option.en}
                  type="button"
                  aria-pressed={selected}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                    selected ? "border-accent bg-accent/10 text-foreground" : "border-border bg-background text-foreground hover:border-accent"
                  }`}
                  onClick={() => {
                    const updated = { ...answers, [question.id]: value };
                    setAnswers(updated);
                    if (step + 1 >= total) finish(updated);
                    else next();
                  }}
                >
                  {option[locale]}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {step > 0 ? (
        <button
          type="button"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t("back")}
        </button>
      ) : null}
    </div>
  );
}
