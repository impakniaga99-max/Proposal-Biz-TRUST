import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  Coins,
  Compass,
  Download,
  FileText,
  Globe,
  Layers,
  Loader2,
  Menu,
  Printer,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { BudgetChartSvg, DashboardRadarSvg, MofassDiagram } from './components/Infographics';
import { ProposalModal } from './components/ProposalModal';
import { PROPOSAL_DATA, type ChallengeItem, type Language } from './data/proposalData';
import { downloadProposalPdf } from './utils/generateProposalPdf';

const HERO_IMG = '/src/assets/images/hero_biz_trust_1794893543122.jpg';
const TRANSFORMATION_IMG = '/src/assets/images/entrepreneur_transformation_1794893544461.jpg';
const COACHING_IMG = '/src/assets/images/coaching_mentorship_1794893544774.jpg';
const SCALING_ILLUST = '/src/assets/images/digital_automation_scale_1794893543601.jpg';

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectClass?: string;
}

function EditorialImage({ src, alt, caption, aspectClass = 'aspect-[4/3]' }: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="space-y-2.5">
      <div className={`relative w-full ${aspectClass} overflow-hidden rounded-xl border border-[#E2D9C5] bg-[#F4EFE6]`}>
        {!failed ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F4EFE6] to-[#E8E0D0]">
            <BookOpen className="w-8 h-8 text-[#0F5149] mb-2" />
            <p className="text-xs font-medium text-[#44403C] max-w-xs">{alt}</p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="text-xs text-[#57534E] leading-relaxed italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('ms');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeItem | null>(null);
  const [expandAllModules, setExpandAllModules] = useState(true);
  const [activeKraFilter, setActiveKraFilter] = useState<string>('ALL');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const t = PROPOSAL_DATA[lang];

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      await downloadProposalPdf(lang);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredKras =
    activeKraFilter === 'ALL'
      ? t.evaluation.kraDomains
      : t.evaluation.kraDomains.filter((d) => d.id === activeKraFilter);

  const challengeIcons = [Compass, Coins, Layers, ShieldCheck];
  const getsIcons = [TrendingUp, Users, Coins, ShieldCheck];

  return (
    <div className="min-h-screen archival-grid text-[#1C1917]">
      {/* ── TOP NAVIGATION BAR (Strict 3-Zone Contract) ────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#E2D9C5] no-print">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0"
          >
            {t.brand}
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#57534E]">
            <a
              href="#section-intro"
              className="hover:text-[#0F5149] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.overview}
            </a>
            <a
              href="#section-mofass"
              className="hover:text-[#0F5149] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.mofass}
            </a>
            <a
              href="#section-curriculum"
              className="hover:text-[#0F5149] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.curriculum}
            </a>
            <a
              href="#section-evaluation"
              className="hover:text-[#0F5149] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.evaluation}
            </a>
            <a
              href="#section-impact"
              className="hover:text-[#0F5149] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.impactBudget}
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Drawer Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t.actions.chapterIndex}
              className="lg:hidden px-3 py-2 text-xs font-medium text-[#1C1917] border border-[#D6CEBE] rounded-lg hover:bg-[#F4EFE6] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Menu className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.actions.chapterIndex}</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0F5149] rounded-lg hover:bg-[#0B3D37] disabled:opacity-70 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5149]"
            >
              {isGeneratingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isGeneratingPdf ? t.actions.generatingPdf : t.actions.downloadPdf}</span>
            </button>
          </div>
        </div>
        {/* Hairline Reading Depth Progress Indicator */}
        <div className="w-full h-[2px] bg-[#E2D9C5]/60">
          <div
            className="h-full bg-[#0F5149] transition-[width] duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* ── MOBILE CHAPTER INDEX DRAWER ────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1917]/60 backdrop-blur-xs lg:hidden no-print flex justify-start"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 bg-[#FBF9F5] border-r border-[#E2D9C5] h-full p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2D9C5] pb-4">
                <span className="font-display font-bold text-base text-[#1C1917]">
                  {t.actions.chapterIndex}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={t.actions.close}
                  className="p-2 text-[#57534E] hover:text-[#1C1917]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 1-Click Language Switch inside mobile drawer */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
                  {t.actions.languageLabel}
                </p>
                <div className="grid grid-cols-2 gap-1 p-1 bg-[#F4EFE6] border border-[#E2D9C5] rounded-lg">
                  <button
                    type="button"
                    onClick={() => setLang('ms')}
                    className={`py-2 text-xs font-semibold rounded-md transition-colors ${
                      lang === 'ms' ? 'bg-[#0F5149] text-white' : 'text-[#44403C]'
                    }`}
                  >
                    Bahasa Melayu
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`py-2 text-xs font-semibold rounded-md transition-colors ${
                      lang === 'en' ? 'bg-[#0F5149] text-white' : 'text-[#44403C]'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              <nav className="space-y-1">
                {t.chapters.map((ch) => (
                  <a
                    key={ch.id}
                    href={`#${ch.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-[#292524] hover:bg-[#F4EFE6] transition-colors"
                  >
                    <span className="font-mono-num text-[#0F5149] font-semibold">{ch.num}</span>
                    <span>{ch.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            <p className="text-[11px] text-[#57534E] pt-4 border-t border-[#E2D9C5]">
              {t.impactBudget.footerText}
            </p>
          </div>
        </div>
      )}

      {/* ── HERO SECTION & OPERATIONAL LANGUAGE UTILITY RIBBON ─────────────── */}
      <section id="top" className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-6 sm:pt-8">
        {/* Institutional Utility Strip with 1-Click Language Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#E2D9C5] no-print">
          <p className="text-xs font-medium tracking-wide text-[#57534E]">
            {t.hero.kicker}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#57534E] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#0F5149]" />
              <span>{t.actions.languageLabel}:</span>
            </span>
            <div
              className="inline-flex items-center p-1 bg-[#F4EFE6] border border-[#D6CEBE] rounded-lg"
              role="group"
              aria-label="Language switcher"
            >
              <button
                type="button"
                onClick={() => setLang('ms')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  lang === 'ms'
                    ? 'bg-[#0F5149] text-white shadow-xs'
                    : 'text-[#44403C] hover:text-[#1C1917]'
                }`}
              >
                Bahasa Melayu
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#0F5149] text-white shadow-xs'
                    : 'text-[#44403C] hover:text-[#1C1917]'
                }`}
              >
                English
              </button>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1C1917] bg-[#F4EFE6] border border-[#D6CEBE] rounded-lg hover:bg-[#EFE9DC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#0F5149]" />
              <span>{t.actions.print}</span>
            </button>
          </div>
        </div>

        {/* Cover Marquee Hero */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D6CEBE] bg-[#14201E] text-white">
          <img
            src={HERO_IMG}
            alt={t.hero.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1B19]/95 via-[#0F1B19]/82 to-[#0F1B19]/35" />

          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-3xl space-y-6">
            <p className="font-mono-num text-xs uppercase tracking-[0.18em] text-[#D6CEBE]">
              2026 · {t.brand}
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.15] text-white [text-wrap:balance]">
              {t.hero.title}
            </h1>
            <p className="text-sm sm:text-base text-[#E7E5E4] leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#section-intro"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F5149] hover:bg-[#13665C] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>{t.actions.explore}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-xs text-[#D6CEBE] italic max-w-md">
                {t.hero.leadQuote}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Column Executive Parameter Strip Below Hero */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {t.hero.metrics.map((m) => (
            <div
              key={m.label}
              className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-xl p-4 sm:p-5 space-y-1"
            >
              <p className="text-xs font-medium text-[#57534E]">{m.label}</p>
              <p className="font-mono-num text-xl sm:text-2xl font-bold text-[#1C1917]">
                {m.value}
              </p>
              <p className="text-[11px] text-[#57534E]">{m.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN EDITORIAL WORKSPACE (Sticky Chapter Rail + Proposal Body) ──── */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Desktop Sticky Chapter Index Rail */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-5 no-print">
          <div className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-2xl p-5 space-y-5">
            <div className="border-b border-[#E2D9C5] pb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                {t.actions.chapterIndex}
              </span>
              <span className="font-mono-num text-[11px] text-[#0F5149] font-semibold">
                {Math.round(scrollProgress)}%
              </span>
            </div>

            <nav className="space-y-1">
              {t.chapters.map((ch) => (
                <a
                  key={ch.id}
                  href={`#${ch.id}`}
                  className="flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#44403C] hover:text-[#0F5149] hover:bg-[#FBF9F5] transition-colors"
                >
                  <span className="font-mono-num text-[#0F5149] font-semibold shrink-0">
                    {ch.num}.
                  </span>
                  <span className="leading-snug">{ch.label}</span>
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#E2D9C5] space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
                {t.actions.languageLabel}
              </p>
              <div className="grid grid-cols-2 gap-1 p-1 bg-[#FBF9F5] border border-[#D6CEBE] rounded-lg">
                <button
                  type="button"
                  onClick={() => setLang('ms')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    lang === 'ms' ? 'bg-[#0F5149] text-white' : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  BM
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    lang === 'en' ? 'bg-[#0F5149] text-white' : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Editorial Document Canvas */}
        <main className="lg:col-span-9 space-y-16">
          {/* ════════════════════════════════════════════════════════════════
              CHAPTER 01: INTRODUCTION, CHALLENGES, GOALS, OBJECTIVES, TARGET
             ════════════════════════════════════════════════════════════════ */}
          <section id="section-intro" className="scroll-mt-20 space-y-10">
            <div className="border-b border-[#D6CEBE] pb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                <span className="font-mono-num text-[#0F5149] mr-3 text-xl">{t.intro.chapterNum}.</span>
                {t.intro.chapterTitle}
              </h2>
              <span className="text-xs font-medium uppercase tracking-widest text-[#57534E]">
                {t.intro.pageLabel}
              </span>
            </div>

            {/* Asymmetric Editorial Narrative + Fig 1.1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-7 space-y-5 text-[15px] text-[#292524] leading-[1.75] max-w-prose">
                <p className="first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:text-[#0F5149] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  {t.intro.p1}
                </p>
                <p>{t.intro.p2}</p>
              </div>
              <div className="md:col-span-5">
                <EditorialImage
                  src={TRANSFORMATION_IMG}
                  alt={t.intro.figTitle}
                  caption={t.intro.figCaption}
                />
              </div>
            </div>

            {/* 2.0 MSME Challenges Interactive Grid */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                  {t.intro.challengesTitle}
                </h3>
                <p className="text-xs text-[#57534E]">{t.intro.challengesHint}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {t.intro.challenges.map((item, idx) => {
                  const Icon = challengeIcons[idx % challengeIcons.length];
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => setSelectedChallenge(item)}
                      className="text-left bg-[#F4EFE6] hover:bg-[#EFE9DC] border border-[#E2D9C5] hover:border-[#0F5149] rounded-xl p-5 space-y-3 transition-colors cursor-pointer flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-[#0F5149]"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono-num text-xs font-semibold text-[#9A6B2F]">
                            {item.code}
                          </span>
                          <Icon className="w-4 h-4 text-[#0F5149]" />
                        </div>
                        <h4 className="font-display text-base font-semibold text-[#1C1917] leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#44403C] leading-relaxed">{item.summary}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-[#0F5149] inline-flex items-center gap-1 pt-2">
                        {t.actions.viewDetail} <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3.0 Program Goals */}
            <div className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                {t.intro.goalsTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#292524] leading-relaxed">
                <p>{t.intro.goalsP1}</p>
                <p>{t.intro.goalsP2}</p>
              </div>
            </div>

            {/* 4.0 Program Objectives */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                {t.intro.objectivesTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.intro.objectives.map((obj) => (
                  <div
                    key={obj.code}
                    className="bg-[#FBF9F5] border border-[#E2D9C5] rounded-xl p-5 space-y-2"
                  >
                    <span className="font-mono-num text-xs font-semibold text-[#0F5149]">
                      {obj.code}
                    </span>
                    <h4 className="font-semibold text-sm text-[#1C1917]">{obj.title}</h4>
                    <p className="text-xs text-[#44403C] leading-relaxed">{obj.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5.0 Strategic Purpose */}
            <div className="space-y-4 pt-2 border-t border-[#E2D9C5]">
              <h3 className="font-display text-xl font-semibold text-[#1C1917] pt-4">
                {t.intro.purposeTitle}
              </h3>
              <p className="text-sm text-[#44403C] leading-relaxed max-w-3xl">
                {t.intro.purposeLead}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.intro.purposes.map((p) => (
                  <div
                    key={p.code}
                    className="border-t border-[#D6CEBE] pt-3 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono-num text-xs font-semibold text-[#9A6B2F]">
                        {p.code}
                      </span>
                      <h4 className="text-sm font-semibold text-[#1C1917]">{p.title}</h4>
                    </div>
                    <p className="text-xs text-[#44403C] leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6.0 Target Cohort & Criteria */}
            <div className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                  {t.intro.targetTitle}
                </h3>
                <p className="text-sm text-[#292524] leading-relaxed">{t.intro.targetLead}</p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0F5149]">
                  {t.intro.criteriaHeading}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {t.intro.criteria.map((c, idx) => (
                    <div
                      key={c}
                      className="flex items-start gap-3 text-xs text-[#292524] py-2 border-b border-[#E2D9C5]"
                    >
                      <span className="font-mono-num font-bold text-[#0F5149] shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#44403C] pt-1">
                <strong className="text-[#1C1917]">{t.intro.priorityNoteLabel}:</strong>{' '}
                {t.intro.priorityNote}
              </p>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              CHAPTER 02: M.O.F.A.S.S DIAGNOSTIC FRAMEWORK
             ════════════════════════════════════════════════════════════════ */}
          <section id="section-mofass" className="scroll-mt-20 space-y-8 pt-6 border-t border-[#D6CEBE]">
            <div className="border-b border-[#D6CEBE] pb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                <span className="font-mono-num text-[#0F5149] mr-3 text-xl">{t.mofass.chapterNum}.</span>
                {t.mofass.chapterTitle}
              </h2>
              <span className="text-xs font-medium uppercase tracking-widest text-[#57534E]">
                {t.mofass.pageLabel}
              </span>
            </div>

            <p className="text-[15px] text-[#292524] leading-relaxed max-w-3xl">
              {t.mofass.lead}
            </p>

            {/* Interactive SVG Hexagonal Hub Diagram */}
            <MofassDiagram
              items={t.mofass.items}
              title={t.mofass.diagramTitle}
              hint={t.mofass.diagramHint}
              outcomesLabel={t.mofass.outcomesLabel}
              centerLabel={lang === 'ms' ? '6 TERAS PMKS' : '6 MSME PILLARS'}
            />

            {/* Complete 6-Card Overview Grid for Print & Rapid Scan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.mofass.items.map((item) => (
                <div
                  key={item.key}
                  className="bg-[#FBF9F5] border border-[#E2D9C5] rounded-xl p-5 space-y-2.5 print-break-inside-avoid"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.letter}
                    </span>
                    <span className="text-[11px] font-medium text-[#57534E]">{item.subtitle}</span>
                  </div>
                  <h4 className="font-display text-base font-semibold text-[#1C1917]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#44403C] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              CHAPTER 03: ROADMAP, 10 MODULES & COACHING ARCHITECTURE
             ════════════════════════════════════════════════════════════════ */}
          <section id="section-curriculum" className="scroll-mt-20 space-y-10 pt-6 border-t border-[#D6CEBE]">
            <div className="border-b border-[#D6CEBE] pb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                <span className="font-mono-num text-[#0F5149] mr-3 text-xl">{t.curriculum.chapterNum}.</span>
                {t.curriculum.chapterTitle}
              </h2>
              <span className="text-xs font-medium uppercase tracking-widest text-[#57534E]">
                {t.curriculum.pageLabel}
              </span>
            </div>

            {/* 5-Phase Strategic Timeline Infographic */}
            <div className="bg-[#14201E] text-white rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1.5 border-b border-white/15 pb-4">
                <p className="font-mono-num text-xs uppercase tracking-widest text-[#D6CEBE]">
                  {t.curriculum.roadmapKicker}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
                  {t.curriculum.roadmapTitle}
                </h3>
                <p className="text-xs text-[#D6CEBE] max-w-2xl">{t.curriculum.roadmapSub}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {t.curriculum.phases.map((phase, idx) => (
                  <div
                    key={phase.phase}
                    className="bg-white/6 border border-white/15 rounded-xl p-4 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                        <span className="font-mono-num font-bold text-[#6EE7B7]">
                          0{idx + 1} · {phase.phase}
                        </span>
                        <span className="text-[11px] text-[#D6CEBE]">{phase.month}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-white leading-snug">
                        {phase.title}
                      </h4>
                      <ul className="space-y-1.5 text-[11px] text-[#E7E5E4]">
                        {phase.activities.map((act) => (
                          <li key={act} className="flex items-start gap-1.5">
                            <span className="text-[#6EE7B7] mt-0.5">·</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-white/10 text-[11px] text-[#FDE68A] leading-snug">
                      <span className="uppercase tracking-wider text-[10px] text-[#D6CEBE] block mb-0.5">
                        {t.curriculum.deliverableLabel}
                      </span>
                      {phase.deliverable}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Activity Schedule + Module Index Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-xl p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold text-[#1C1917] border-b border-[#E2D9C5] pb-2">
                  {t.curriculum.scheduleTitle}
                </h3>
                <div className="divide-y divide-[#E2D9C5]">
                  {t.curriculum.scheduleSummary.map((row) => (
                    <div key={row.step} className="py-3 flex items-start gap-3 text-xs">
                      <span className="font-mono-num font-bold text-[#0F5149] shrink-0 w-16">
                        {row.period}
                      </span>
                      <span className="text-[#292524] leading-relaxed">{row.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-xl p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold text-[#1C1917] border-b border-[#E2D9C5] pb-2">
                  {t.curriculum.modulesOverviewTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {t.curriculum.modules.map((mod) => (
                    <div
                      key={mod.number}
                      className="flex items-center gap-2.5 py-2 px-3 bg-[#FBF9F5] border border-[#E2D9C5] rounded-lg"
                    >
                      <span className="font-mono-num font-bold text-[#0F5149] shrink-0">
                        {String(mod.number).padStart(2, '0')}
                      </span>
                      <span className="font-medium text-[#1C1917] truncate">{mod.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 8.0 Detailed 10 Modules */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2D9C5] pb-4">
                <div className="space-y-1 max-w-2xl">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]">
                    {t.curriculum.modulesDetailTitle}
                  </h3>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {t.curriculum.modulesDetailLead}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandAllModules((prev) => !prev)}
                  className="no-print inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0F5149] bg-[#F4EFE6] border border-[#D6CEBE] rounded-lg hover:bg-[#EFE9DC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {expandAllModules ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" />
                      <span>{t.actions.collapseAll}</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" />
                      <span>{t.actions.expandAll}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {t.curriculum.modules.map((mod) => (
                  <div
                    key={mod.number}
                    className="bg-[#FBF9F5] border border-[#E2D9C5] rounded-xl p-5 space-y-3 print-break-inside-avoid"
                  >
                    <div className="flex items-center justify-between border-b border-[#E2D9C5] pb-2.5">
                      <span className="font-mono-num text-xs font-semibold text-[#0F5149]">
                        {mod.code}
                      </span>
                      <span className="font-mono-num text-[11px] text-[#57534E]">
                        {mod.topics.length} {lang === 'ms' ? 'Topik' : 'Topics'}
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-semibold text-[#1C1917]">
                      {mod.title}
                    </h4>
                    <p className="text-xs text-[#44403C] leading-relaxed">
                      <strong className="text-[#1C1917]">{t.curriculum.objectiveLabel}:</strong>{' '}
                      {mod.objective}
                    </p>
                    {expandAllModules && (
                      <div className="pt-2 border-t border-[#E2D9C5]/70 space-y-1.5">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9A6B2F]">
                          {t.curriculum.syllabusLabel}
                        </p>
                        <ul className="space-y-1 text-xs text-[#292524]">
                          {mod.topics.map((topic) => (
                            <li key={topic} className="flex items-start gap-2">
                              <span className="text-[#0F5149] font-bold">·</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#44403C] bg-[#F4EFE6] border border-[#E2D9C5] rounded-xl p-4 text-center">
                {t.curriculum.practicalNote}
              </p>
            </div>

            {/* 9.0 Coaching Architecture + Fig 3.1 */}
            <div className="space-y-6 pt-4 border-t border-[#E2D9C5]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-3">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]">
                    {t.curriculum.coachingTitle}
                  </h3>
                  <p className="text-sm text-[#292524] leading-relaxed">
                    {t.curriculum.coachingLead}
                  </p>
                  <p className="text-xs text-[#57534E]">{t.curriculum.coachingSubLead}</p>
                </div>
                <div className="md:col-span-5">
                  <EditorialImage
                    src={COACHING_IMG}
                    alt={t.curriculum.coachingTitle}
                    caption={t.curriculum.coachingFigCaption}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 9.1 Individual */}
                <div className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-xl p-6 space-y-4">
                  <h4 className="font-display text-lg font-semibold text-[#1C1917] border-b border-[#E2D9C5] pb-2">
                    {t.curriculum.individual.title}
                  </h4>
                  <p className="text-xs text-[#292524] leading-relaxed">
                    {t.curriculum.individual.desc}
                  </p>
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0F5149]">
                      {t.curriculum.individual.listTitle}
                    </p>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#292524]">
                      {t.curriculum.individual.items.map((item, idx) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="font-mono-num text-[#0F5149] font-semibold">
                            0{idx + 1}.
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* 9.2 Group */}
                <div className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-xl p-6 space-y-4">
                  <h4 className="font-display text-lg font-semibold text-[#1C1917] border-b border-[#E2D9C5] pb-2">
                    {t.curriculum.group.title}
                  </h4>
                  <p className="text-xs text-[#292524] leading-relaxed">
                    {t.curriculum.group.p1}
                  </p>
                  <p className="text-xs text-[#44403C] leading-relaxed">
                    {t.curriculum.group.p2}
                  </p>
                </div>

                {/* 9.3 Support Pod */}
                <div className="bg-[#FBF9F5] border border-[#E2D9C5] rounded-xl p-6 space-y-4">
                  <h4 className="font-display text-lg font-semibold text-[#1C1917] border-b border-[#E2D9C5] pb-2">
                    {t.curriculum.support.title}
                  </h4>
                  <p className="text-xs text-[#44403C]">{t.curriculum.support.lead}</p>
                  <div className="space-y-2.5 text-xs">
                    {t.curriculum.support.roles.map((r) => (
                      <div key={r.role} className="border-b border-[#E2D9C5] pb-2 last:border-b-0 last:pb-0">
                        <strong className="text-[#0F5149] block">{r.role}</strong>
                        <span className="text-[#44403C] leading-relaxed">{r.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 9.4 Interactive Clinics */}
                <div className="bg-[#FBF9F5] border border-[#E2D9C5] rounded-xl p-6 space-y-4">
                  <h4 className="font-display text-lg font-semibold text-[#1C1917] border-b border-[#E2D9C5] pb-2">
                    {t.curriculum.interactive.title}
                  </h4>
                  <p className="text-xs text-[#44403C] leading-relaxed">
                    {t.curriculum.interactive.lead}
                  </p>
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9A6B2F]">
                      {t.curriculum.interactive.topicsTitle}
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#292524]">
                      {t.curriculum.interactive.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#0F5149] shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              CHAPTER 04: KRA & KPI EVALUATION, MONITORING & FINAL REPORT
             ════════════════════════════════════════════════════════════════ */}
          <section id="section-evaluation" className="scroll-mt-20 space-y-10 pt-6 border-t border-[#D6CEBE]">
            <div className="border-b border-[#D6CEBE] pb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                <span className="font-mono-num text-[#0F5149] mr-3 text-xl">{t.evaluation.chapterNum}.</span>
                {t.evaluation.chapterTitle}
              </h2>
              <span className="text-xs font-medium uppercase tracking-widest text-[#57534E]">
                {t.evaluation.pageLabel}
              </span>
            </div>

            {/* 10.0 KRA & KPI Framework */}
            <div className="space-y-5">
              <div className="space-y-3">
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                  {t.evaluation.kraTitle}
                </h3>
                <p className="text-sm text-[#292524] leading-relaxed max-w-3xl">
                  {t.evaluation.kraLead}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#44403C] leading-relaxed">
                  <p>{t.evaluation.kraDetailP1}</p>
                  <p>{t.evaluation.kraDetailP2}</p>
                </div>
              </div>

              <div className="bg-[#F4EFE6] border border-[#9A6B2F]/40 rounded-xl p-4 text-xs font-medium text-[#78350F]">
                {t.evaluation.mandatoryNote}
              </div>

              {/* Interactive KRA Domain Filter */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h4 className="font-display text-lg font-semibold text-[#1C1917]">
                    {t.evaluation.kraSubTitle}
                  </h4>
                  <div className="flex flex-wrap gap-1 p-1 bg-[#F4EFE6] border border-[#E2D9C5] rounded-lg no-print">
                    <button
                      type="button"
                      onClick={() => setActiveKraFilter('ALL')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        activeKraFilter === 'ALL'
                          ? 'bg-[#0F5149] text-white'
                          : 'text-[#44403C] hover:text-[#1C1917]'
                      }`}
                    >
                      {t.evaluation.allFilter}
                    </button>
                    {t.evaluation.kraDomains.map((dom) => (
                      <button
                        key={dom.id}
                        type="button"
                        onClick={() => setActiveKraFilter(dom.id)}
                        className={`px-2.5 py-1.5 text-xs font-mono-num font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          activeKraFilter === dom.id
                            ? 'bg-[#0F5149] text-white'
                            : 'text-[#44403C] hover:text-[#1C1917]'
                        }`}
                      >
                        {dom.code}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredKras.map((dom) => (
                    <div
                      key={dom.id}
                      className="bg-[#FBF9F5] border border-[#E2D9C5] rounded-xl p-5 space-y-3 print-break-inside-avoid"
                    >
                      <div className="flex items-center justify-between border-b border-[#E2D9C5] pb-2.5">
                        <h5 className="font-display text-base font-semibold text-[#1C1917]">
                          <span className="font-mono-num text-[#0F5149] mr-2">{dom.code}.</span>
                          {dom.title}
                        </h5>
                        {dom.mandatoryNote && (
                          <span className="text-[11px] font-semibold text-[#9A6B2F]">
                            * {lang === 'ms' ? 'KPI Wajib' : 'Mandatory'}
                          </span>
                        )}
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#292524]">
                        {dom.kpis.map((kpi) => (
                          <li key={kpi} className="flex items-start gap-2">
                            <span className="font-mono-num text-[#0F5149]">·</span>
                            <span>{kpi}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 11.0 Monitoring Mechanisms */}
            <div className="space-y-4 pt-4 border-t border-[#E2D9C5]">
              <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                {t.evaluation.monitoringSubTitle}
              </h3>
              <p className="text-sm text-[#292524] leading-relaxed max-w-3xl">
                {t.evaluation.monitoringLead}
              </p>

              <p className="text-xs font-semibold uppercase tracking-wider text-[#0F5149] pt-2">
                {t.evaluation.mechanismsTitle}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {t.evaluation.mechanisms.map((mech) => (
                  <div
                    key={mech.code}
                    className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-xl p-5 space-y-2"
                  >
                    <span className="font-mono-num text-xs font-bold text-[#0F5149]">
                      {mech.code}.
                    </span>
                    <h4 className="font-display text-base font-semibold text-[#1C1917]">
                      {mech.title}
                    </h4>
                    <p className="text-xs text-[#44403C] leading-relaxed">{mech.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 12.0 Final Reporting & 8-Dimension Dashboard Radar */}
            <div className="space-y-6 pt-4 border-t border-[#E2D9C5]">
              <div className="space-y-2">
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                  {t.evaluation.reportTitle}
                </h3>
                <p className="text-sm text-[#292524] leading-relaxed max-w-3xl">
                  {t.evaluation.reportLead}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* 12.1 Written Report + 12.2 8-Aspect List */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-xl p-6 space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#E2D9C5] pb-2">
                      <FileText className="w-4 h-4 text-[#0F5149]" />
                      <h4 className="font-display text-base font-semibold text-[#1C1917]">
                        {t.evaluation.writtenReport.title}
                      </h4>
                    </div>
                    <div className="space-y-2.5 text-xs">
                      {t.evaluation.writtenReport.items.map((item) => (
                        <div key={item.label} className="leading-relaxed">
                          <strong className="text-[#1C1917]">{item.label}:</strong>{' '}
                          <span className="text-[#44403C]">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#FBF9F5] border border-[#E2D9C5] rounded-xl p-6 space-y-3">
                    <h4 className="font-display text-base font-semibold text-[#1C1917] border-b border-[#E2D9C5] pb-2">
                      {t.evaluation.dashboardReport.title}
                    </h4>
                    <p className="text-xs text-[#44403C]">{t.evaluation.dashboardReport.lead}</p>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#292524]">
                      {t.evaluation.dashboardReport.aspects.map((asp, idx) => (
                        <li key={asp} className="flex items-start gap-2">
                          <span className="font-mono-num font-bold text-[#0F5149] shrink-0">
                            0{idx + 1}.
                          </span>
                          <span>{asp}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="text-[11px] text-[#57534E] italic pt-2 border-t border-[#E2D9C5]">
                      {t.evaluation.dashboardReport.footnote}
                    </p>
                  </div>
                </div>

                {/* 12.2 Visual Radar Chart */}
                <div className="lg:col-span-5 space-y-2">
                  <DashboardRadarSvg
                    aspects={t.evaluation.dashboardReport.aspects}
                    title={t.evaluation.dashboardReport.title}
                  />
                  <p className="text-xs text-[#57534E] italic text-center">
                    {lang === 'ms'
                      ? 'Rajah 4.1 — Ilustrasi perbandingan kematangan 8 dimensi Bulan 1 berbanding Bulan 6.'
                      : 'Fig. 4.1 — Illustrative 8-dimension maturity progression from Month 1 baseline to Month 6 target.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              CHAPTER 05: G.E.T.S IMPACT, ADDED VALUE, BUDGET & CONCLUSION
             ════════════════════════════════════════════════════════════════ */}
          <section id="section-impact" className="scroll-mt-20 space-y-10 pt-6 border-t border-[#D6CEBE]">
            <div className="border-b border-[#D6CEBE] pb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                <span className="font-mono-num text-[#0F5149] mr-3 text-xl">{t.impactBudget.chapterNum}.</span>
                {t.impactBudget.chapterTitle}
              </h2>
              <span className="text-xs font-medium uppercase tracking-widest text-[#57534E]">
                {t.impactBudget.pageLabel}
              </span>
            </div>

            {/* 13.0 G.E.T.S + Bespoke Isometric Scaling Illustration */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-3">
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]">
                  {t.impactBudget.getsTitle}
                </h3>
                <p className="text-sm text-[#292524] leading-relaxed">
                  {t.impactBudget.getsLead}
                </p>
              </div>
              <div className="md:col-span-6">
                <EditorialImage
                  src={SCALING_ILLUST}
                  alt={t.impactBudget.getsTitle}
                  caption={t.impactBudget.getsFigCaption}
                />
              </div>
            </div>

            {/* 4-Quadrant G.E.T.S Impact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {t.impactBudget.getsItems.map((item, idx) => {
                const Icon = getsIcons[idx % getsIcons.length];
                return (
                  <div
                    key={item.code}
                    className="bg-[#14201E] text-white rounded-2xl p-6 space-y-4 print-break-inside-avoid"
                  >
                    <div className="flex items-center justify-between border-b border-white/15 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-lg bg-[#0F5149] flex items-center justify-center font-display font-bold text-lg text-white">
                          {item.letter}
                        </span>
                        <div>
                          <span className="font-mono-num text-[11px] text-[#6EE7B7] block">
                            {item.code}
                          </span>
                          <h4 className="font-display text-lg font-semibold text-white">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                      <Icon className="w-5 h-5 text-[#6EE7B7]" />
                    </div>

                    <p className="text-xs text-[#E7E5E4] leading-relaxed">{item.desc}</p>

                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#D6CEBE]">
                        {t.impactBudget.impactIndicatorsLabel}
                      </p>
                      <ul className="space-y-1 text-xs text-[#E7E5E4]">
                        {item.indicators.map((ind) => (
                          <li key={ind} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#6EE7B7] shrink-0 mt-0.5" />
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 14.0 Added Value Components */}
            <div className="space-y-4 pt-4 border-t border-[#E2D9C5]">
              <div className="space-y-1.5">
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                  {t.impactBudget.addedValueTitle}
                </h3>
                <p className="text-sm text-[#44403C]">{t.impactBudget.addedValueLead}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.impactBudget.addedValues.map((av) => (
                  <div
                    key={av.code}
                    className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-xl p-5 space-y-2.5"
                  >
                    <span className="font-mono-num text-xs font-semibold text-[#0F5149]">
                      {av.code}
                    </span>
                    <h4 className="font-display text-base font-semibold text-[#1C1917]">
                      {av.title}
                    </h4>
                    {av.lead && <p className="text-xs text-[#44403C]">{av.lead}</p>}
                    {av.desc && <p className="text-xs text-[#292524] leading-relaxed">{av.desc}</p>}
                    {av.bullets && (
                      <ul className="space-y-1 text-xs text-[#292524]">
                        {av.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-1.5">
                            <span className="text-[#0F5149] font-bold">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {av.footnote && (
                      <p className="text-[11px] text-[#57534E] italic pt-1">{av.footnote}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 16.0 Program Budget Estimate + Interactive Infographic Chart */}
            <div className="space-y-6 pt-4 border-t border-[#E2D9C5]">
              <div className="space-y-1.5">
                <p className="text-xs font-medium uppercase tracking-wider text-[#0F5149]">
                  {t.impactBudget.budgetKicker}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]">
                  {t.impactBudget.budgetTitle}
                </h3>
                <p className="text-sm text-[#44403C] max-w-2xl">{t.impactBudget.budgetLead}</p>
              </div>

              {/* Budget Allocation Donut & Proportional Bar Chart */}
              <BudgetChartSvg
                rows={t.impactBudget.budgetRows}
                title={t.impactBudget.chartTitle}
                subtotal={t.impactBudget.subtotalAmount}
              />

              {/* Formal Itemized Financial Table */}
              <div className="bg-[#FBF9F5] border border-[#D6CEBE] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#F4EFE6] border-b border-[#D6CEBE] text-[#1C1917]">
                        <th className="p-3.5 font-semibold w-14 text-center">
                          {t.impactBudget.tableHeaders.no}
                        </th>
                        <th className="p-3.5 font-semibold">
                          {t.impactBudget.tableHeaders.item}
                        </th>
                        <th className="p-3.5 font-semibold text-right w-24">
                          {t.impactBudget.tableHeaders.share}
                        </th>
                        <th className="p-3.5 font-semibold text-right w-36">
                          {t.impactBudget.tableHeaders.amount}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2D9C5] text-[#292524]">
                      {t.impactBudget.budgetRows.map((row) => (
                        <tr key={row.no} className="hover:bg-[#F4EFE6]/60 transition-colors">
                          <td className="p-3.5 text-center font-mono-num text-[#57534E]">
                            {row.no}
                          </td>
                          <td className="p-3.5 font-medium">{row.item}</td>
                          <td className="p-3.5 text-right font-mono-num text-[#57534E]">
                            {row.percent.toFixed(1)}%
                          </td>
                          <td className="p-3.5 text-right font-mono-num font-medium">
                            {row.amount.toLocaleString('en-MY')}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-[#F4EFE6] font-semibold text-[#1C1917] border-t border-[#D6CEBE]">
                        <td colSpan={3} className="p-3.5 text-right">
                          {t.impactBudget.subtotalLabel}
                        </td>
                        <td className="p-3.5 text-right font-mono-num">
                          {t.impactBudget.subtotalAmount}
                        </td>
                      </tr>
                      <tr className="bg-[#FBF9F5] text-[#44403C]">
                        <td colSpan={3} className="p-3.5 text-right">
                          {t.impactBudget.sstLabel}
                        </td>
                        <td className="p-3.5 text-right font-mono-num">
                          {t.impactBudget.sstAmount}
                        </td>
                      </tr>
                      <tr className="bg-[#0F5149] text-white font-bold text-sm">
                        <td colSpan={3} className="p-4 text-right">
                          {t.impactBudget.grandTotalLabel}
                        </td>
                        <td className="p-4 text-right font-mono-num text-[#FDE68A]">
                          {t.impactBudget.grandTotalAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F4EFE6] border border-[#E2D9C5] rounded-xl p-4">
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#1C1917]">
                  <Building2 className="w-4 h-4 text-[#0F5149]" />
                  <span>{t.impactBudget.perParticipantLabel}</span>
                </div>
                <span className="font-mono-num text-base font-bold text-[#0F5149]">
                  {t.impactBudget.perParticipantAmount}
                </span>
              </div>

              <p className="text-xs text-[#57534E] italic">{t.impactBudget.budgetNote}</p>
            </div>

            {/* 17.0 Closing & Endorsement */}
            <div className="space-y-5 pt-6 border-t border-[#D6CEBE]">
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-semibold text-[#1C1917]">
                  {t.impactBudget.closingTitle}
                </h3>
                <p className="text-xs text-[#57534E]">{t.impactBudget.closingSubtitle}</p>
              </div>

              <div className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-2xl p-6 sm:p-8 space-y-4 text-sm text-[#292524] leading-[1.75]">
                {t.impactBudget.closingParagraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
                <div className="pt-4 border-t border-[#D6CEBE] flex items-start gap-3 text-xs font-semibold text-[#0F5149]">
                  <Briefcase className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{t.impactBudget.closingHighlight}</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ── CLEAN EDITORIAL FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-[#E2D9C5] bg-[#F4EFE6] py-8 px-4 sm:px-8">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#57534E]">
          <p>{t.impactBudget.footerText}</p>
          <div className="flex items-center gap-4 no-print">
            <button
              type="button"
              onClick={() => setLang(lang === 'ms' ? 'en' : 'ms')}
              className="text-[#0F5149] font-semibold hover:underline cursor-pointer"
            >
              {lang === 'ms' ? 'Switch to English' : 'Tukar ke Bahasa Melayu'}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="text-[#0F5149] font-semibold hover:underline cursor-pointer disabled:opacity-60"
            >
              {isGeneratingPdf ? t.actions.generatingPdf : t.actions.downloadPdf}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => window.print()}
              className="text-[#1C1917] font-semibold hover:underline cursor-pointer"
            >
              {t.actions.print}
            </button>
          </div>
        </div>
      </footer>

      {/* ── ACCESSIBLE CHALLENGE DIAGNOSTIC MODAL ──────────────────────────── */}
      <ProposalModal
        isOpen={Boolean(selectedChallenge)}
        onClose={() => setSelectedChallenge(null)}
        code={selectedChallenge ? `${selectedChallenge.code} · M.O.F.A.S.S` : ''}
        title={selectedChallenge?.title ?? ''}
        rootCauseLabel={t.modal.rootCauseLabel}
        detail={selectedChallenge?.detail ?? ''}
        interventionLabel={t.modal.interventionLabel}
        intervention={selectedChallenge?.intervention ?? ''}
        closeLabel={t.actions.close}
      />
    </div>
  );
}
