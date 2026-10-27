import type { FeaturedItem } from "./types";

/**
 * Medium yazıları — doğrudan kanonik Medium URL’leri (lnkd.in kısa linkleri yerine):
 * link değeri yazının kendisine gider ve AI tarayıcıları yönlendirme takip etmek zorunda kalmaz.
 */
export const featured: FeaturedItem[] = [
  {
    id: "agi",
    title: {
      en: "Is AGI Really Possible?",
      tr: "AGI Gerçekten Mümkün mü?",
    },
    href: "https://medium.com/@Huntay.AzerTurk/is-agi-really-possible-29eabff0c1fb",
    source: "Medium",
  },
  {
    id: "rag-chunking",
    title: {
      en: "The Weakest Link in RAG: Advanced Document Chunking",
      tr: "RAG’de En Zayıf Halka: Advanced Document Chunking",
    },
    href: "https://medium.com/@Huntay.AzerTurk/the-weakest-link-in-rag-how-advanced-document-chunking-boosts-your-ai-systems-4103f5ee0b95",
    source: "Medium",
  },
  {
    id: "slm",
    title: {
      en: "The Software World and AI: Revolution or Evolution?",
      tr: "Yazılım Dünyası ve Yapay Zeka: Devrim mi Evrim mi?",
    },
    href: "https://medium.com/@Huntay.AzerTurk/the-software-world-and-artificial-intelligence-revolution-or-evolution-ed3819130f1c",
    source: "Medium",
  },
  {
    id: "nature-nn",
    title: {
      en: "Nature-Inspired Neural Networks (graph-based connectivity, mini memory)",
      tr: "Nature-Inspired Neural Networks (graph-based connectivity, mini memory)",
    },
    href: "https://medium.com/@Huntay.AzerTurk/title-a-proposal-on-graph-based-connectivity-mini-memory-and-selective-adaptation-mechanisms-in-77f4d5817fc7",
    source: "Medium",
  },
];
