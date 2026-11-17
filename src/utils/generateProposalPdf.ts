import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PROPOSAL_DATA, type Language } from '../data/proposalData';

type RGB = [number, number, number];

const C_TEAL: RGB = [15, 81, 73];
const C_DARK: RGB = [20, 32, 30];
const C_INK: RGB = [28, 25, 23];
const C_BODY: RGB = [68, 64, 60];
const C_MUTED: RGB = [87, 83, 78];
const C_PAPER: RGB = [251, 249, 245];
const C_LIMESTONE: RGB = [244, 239, 230];
const C_BORDER: RGB = [214, 206, 190];
const C_BRONZE: RGB = [154, 107, 47];
const C_WHITE: RGB = [255, 255, 255];
const C_AMBER_LIGHT: RGB = [253, 230, 138];

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN_X = 16;
const CONTENT_W = PAGE_W - MARGIN_X * 2; // 178mm
const TOP_Y = 22;
const BOTTOM_LIMIT = PAGE_H - 18; // 279mm

/** Convert local image URL to JPEG data URL for clean jsPDF embedding */
async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.88);
  } catch {
    return null;
  }
}

export async function downloadProposalPdf(lang: Language): Promise<void> {
  const t = PROPOSAL_DATA[lang];
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Preload all 4 bespoke visual assets in parallel
  const [heroImg, transImg, coachImg, scaleImg] = await Promise.all([
    loadImageAsDataUrl('/src/assets/images/hero_biz_trust_1794893543122.jpg'),
    loadImageAsDataUrl('/src/assets/images/entrepreneur_transformation_1794893544461.jpg'),
    loadImageAsDataUrl('/src/assets/images/coaching_mentorship_1794893544774.jpg'),
    loadImageAsDataUrl('/src/assets/images/digital_automation_scale_1794893543601.jpg'),
  ]);

  let y = TOP_Y;
  let currentSectionHeader = t.brand;

  const paintPageBackground = () => {
    doc.setFillColor(...C_PAPER);
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
  };

  const drawRunningHeader = (sectionTitle: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_TEAL);
    doc.text(t.brand.toUpperCase(), MARGIN_X, 11.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_MUTED);
    doc.text(sectionTitle, PAGE_W - MARGIN_X, 11.5, { align: 'right' });

    doc.setDrawColor(...C_BORDER);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_X, 14.5, PAGE_W - MARGIN_X, 14.5);
  };

  const addContentPage = (sectionTitle?: string) => {
    if (sectionTitle) currentSectionHeader = sectionTitle;
    doc.addPage();
    paintPageBackground();
    drawRunningHeader(currentSectionHeader);
    y = TOP_Y;
  };

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > BOTTOM_LIMIT) {
      addContentPage();
    }
  };

  const drawChapterBanner = (num: string, title: string, label: string, startNewPage = true) => {
    if (startNewPage) {
      addContentPage(`${num}. ${title}`);
    } else {
      currentSectionHeader = `${num}. ${title}`;
      ensureSpace(22);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C_BRONZE);
    doc.text(`${lang === 'ms' ? 'BAB' : 'CHAPTER'} ${num}  ·  ${label.toUpperCase()}`, MARGIN_X, y);
    y += 5.5;

    doc.setFont('times', 'bold');
    doc.setFontSize(17);
    doc.setTextColor(...C_INK);
    const titleLines = doc.splitTextToSize(title, CONTENT_W);
    doc.text(titleLines, MARGIN_X, y);
    y += titleLines.length * 6.5 + 1.5;

    doc.setDrawColor(...C_TEAL);
    doc.setLineWidth(0.7);
    doc.line(MARGIN_X, y, MARGIN_X + 26, y);
    doc.setDrawColor(...C_BORDER);
    doc.setLineWidth(0.25);
    doc.line(MARGIN_X + 26, y, PAGE_W - MARGIN_X, y);
    y += 6.5;
  };

  const drawSubheading = (title: string, spaceAfter = 3) => {
    ensureSpace(16);
    doc.setFont('times', 'bold');
    doc.setFontSize(12.5);
    doc.setTextColor(...C_INK);
    const lines = doc.splitTextToSize(title, CONTENT_W);
    doc.text(lines, MARGIN_X, y);
    y += lines.length * 5.2 + spaceAfter;
  };

  const drawParagraph = (text: string, fontSize = 9.5, maxWidth = CONTENT_W, x = MARGIN_X, lineH = 4.6) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(...C_BODY);
    const lines = doc.splitTextToSize(text, maxWidth);
    ensureSpace(lines.length * lineH + 3);
    doc.text(lines, x, y);
    y += lines.length * lineH + 2.5;
  };

  const drawCard = (
    x: number,
    cardY: number,
    w: number,
    h: number,
    fill: RGB = C_LIMESTONE,
    border: RGB = C_BORDER
  ) => {
    doc.setFillColor(...fill);
    doc.setDrawColor(...border);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, cardY, w, h, 2, 2, 'FD');
  };

  /* ══════════════════════════════════════════════════════════════════════════
     SHEET 1: EXECUTIVE COVER PAGE (NO HEADER/FOOTER NUMBER)
     ══════════════════════════════════════════════════════════════════════════ */
  doc.setFillColor(...C_DARK);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

  // Subtle architectural outer frame
  doc.setDrawColor(60, 88, 82);
  doc.setLineWidth(0.4);
  doc.rect(10, 10, PAGE_W - 20, PAGE_H - 20);

  // Kicker
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...C_AMBER_LIGHT);
  doc.text(t.hero.kicker.toUpperCase(), 18, 24);

  // Hero Visual Frame (16:9 ratio = 174 x 92mm)
  if (heroImg) {
    doc.setDrawColor(...C_BRONZE);
    doc.setLineWidth(0.6);
    doc.rect(18, 30, 174, 92);
    doc.addImage(heroImg, 'JPEG', 18, 30, 174, 92, undefined, 'FAST');
  }

  // Cover Title
  let cy = 138;
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...C_WHITE);
  const heroTitleLines = doc.splitTextToSize(t.hero.title, 174);
  doc.text(heroTitleLines, 18, cy);
  cy += heroTitleLines.length * 10 + 4;

  // Accent bar
  doc.setFillColor(...C_BRONZE);
  doc.rect(18, cy, 32, 1.2, 'F');
  cy += 8;

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(225, 228, 226);
  const subLines = doc.splitTextToSize(t.hero.subtitle, 174);
  doc.text(subLines, 18, cy);
  cy += subLines.length * 5.2 + 6;

  // Executive Quote
  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(...C_AMBER_LIGHT);
  const quoteLines = doc.splitTextToSize(`"${t.hero.leadQuote}"`, 170);
  doc.text(quoteLines, 18, cy);

  // 4-Column Executive Parameter Strip at lower section of Cover
  const metricY = 216;
  const metricW = (174 - 9) / 4;
  t.hero.metrics.forEach((m, idx) => {
    const mx = 18 + idx * (metricW + 3);
    doc.setFillColor(28, 46, 43);
    doc.setDrawColor(55, 84, 79);
    doc.setLineWidth(0.35);
    doc.roundedRect(mx, metricY, metricW, 25, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(190, 205, 200);
    doc.text(m.label, mx + 3.5, metricY + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...C_WHITE);
    doc.text(m.value, mx + 3.5, metricY + 13.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...C_AMBER_LIGHT);
    const subM = doc.splitTextToSize(m.sub, metricW - 7);
    doc.text(subM, mx + 3.5, metricY + 18.5);
  });

  // Mini Table of Contents on Cover Bottom
  doc.setDrawColor(55, 84, 79);
  doc.line(18, 249, PAGE_W - 18, 249);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(190, 205, 200);
  doc.text(t.actions.chapterIndex.toUpperCase(), 18, 255);

  t.chapters.forEach((ch, idx) => {
    const col = idx < 3 ? 0 : 1;
    const row = idx < 3 ? idx : idx - 3;
    const tx = 18 + col * 90;
    const ty = 261 + row * 5.2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_AMBER_LIGHT);
    doc.text(`${ch.num}.`, tx, ty);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(230, 232, 230);
    doc.text(ch.label, tx + 7, ty);
  });

  /* ══════════════════════════════════════════════════════════════════════════
     CHAPTER 01: INTRODUCTION, CHALLENGES, GOALS, OBJECTIVES, PURPOSE, TARGET
     ══════════════════════════════════════════════════════════════════════════ */
  drawChapterBanner(t.intro.chapterNum, t.intro.chapterTitle, t.intro.pageLabel, true);

  // Split Narrative + Photo (Fig 1.1)
  const introStartY = y;
  const leftW = 104;
  const rightX = MARGIN_X + leftW + 6;
  const rightW = CONTENT_W - leftW - 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...C_BODY);
  const p1Lines = doc.splitTextToSize(t.intro.p1, leftW);
  const p2Lines = doc.splitTextToSize(t.intro.p2, leftW);
  doc.text(p1Lines, MARGIN_X, introStartY);
  const afterP1 = introStartY + p1Lines.length * 4.6 + 3.5;
  doc.text(p2Lines, MARGIN_X, afterP1);
  const leftEndY = afterP1 + p2Lines.length * 4.6;

  let rightEndY = introStartY;
  if (transImg) {
    const imgH = rightW * 0.72;
    doc.setDrawColor(...C_BORDER);
    doc.rect(rightX, introStartY, rightW, imgH);
    doc.addImage(transImg, 'JPEG', rightX, introStartY, rightW, imgH, undefined, 'FAST');
    doc.setFont('times', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_MUTED);
    const capLines = doc.splitTextToSize(t.intro.figCaption, rightW);
    doc.text(capLines, rightX, introStartY + imgH + 4);
    rightEndY = introStartY + imgH + 4 + capLines.length * 3.5;
  }
  y = Math.max(leftEndY, rightEndY) + 7;

  // 2.0 MSME Challenges (2x2 Grid)
  drawSubheading(t.intro.challengesTitle);
  const chCardW = (CONTENT_W - 5) / 2;
  for (let i = 0; i < t.intro.challenges.length; i += 2) {
    const pair = t.intro.challenges.slice(i, i + 2);
    const heights = pair.map((c) => {
      doc.setFontSize(8);
      const dLines = doc.splitTextToSize(c.detail, chCardW - 8);
      const iLines = doc.splitTextToSize(`${t.modal.interventionLabel}: ${c.intervention}`, chCardW - 8);
      return 15 + dLines.length * 3.8 + iLines.length * 3.8 + 6;
    });
    const rowH = Math.max(...heights);
    ensureSpace(rowH + 4);

    pair.forEach((c, colIdx) => {
      const cx = MARGIN_X + colIdx * (chCardW + 5);
      drawCard(cx, y, chCardW, rowH, C_LIMESTONE, C_BORDER);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...C_BRONZE);
      doc.text(c.code, cx + 4, y + 6);

      doc.setFont('times', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...C_INK);
      doc.text(doc.splitTextToSize(c.title, chCardW - 14), cx + 11, y + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...C_BODY);
      const dLines = doc.splitTextToSize(c.detail, chCardW - 8);
      doc.text(dLines, cx + 4, y + 12.5);

      const intY = y + 12.5 + dLines.length * 3.8 + 2;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...C_TEAL);
      const iLines = doc.splitTextToSize(`${t.modal.interventionLabel}: ${c.intervention}`, chCardW - 8);
      doc.text(iLines, cx + 4, intY);
    });
    y += rowH + 4;
  }
  y += 3;

  // 3.0 Program Goals
  doc.setFontSize(9);
  const g1 = doc.splitTextToSize(t.intro.goalsP1, CONTENT_W - 10);
  const g2 = doc.splitTextToSize(t.intro.goalsP2, CONTENT_W - 10);
  const goalBoxH = 14 + (g1.length + g2.length) * 4.3 + 5;
  ensureSpace(goalBoxH + 4);
  drawCard(MARGIN_X, y, CONTENT_W, goalBoxH, C_LIMESTONE, C_BORDER);
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...C_INK);
  doc.text(t.intro.goalsTitle, MARGIN_X + 5, y + 7.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C_BODY);
  doc.text(g1, MARGIN_X + 5, y + 13.5);
  doc.text(g2, MARGIN_X + 5, y + 13.5 + g1.length * 4.3 + 2.5);
  y += goalBoxH + 6;

  // 4.0 Program Objectives (3x2 grid -> 2 rows of 3)
  drawSubheading(t.intro.objectivesTitle);
  const objW = (CONTENT_W - 8) / 3;
  for (let i = 0; i < t.intro.objectives.length; i += 3) {
    const rowItems = t.intro.objectives.slice(i, i + 3);
    const rowH = Math.max(
      ...rowItems.map((o) => {
        doc.setFontSize(8);
        return 14 + doc.splitTextToSize(o.desc, objW - 7).length * 3.8 + 4;
      })
    );
    ensureSpace(rowH + 4);
    rowItems.forEach((o, idx) => {
      const ox = MARGIN_X + idx * (objW + 4);
      drawCard(ox, y, objW, rowH, C_PAPER, C_BORDER);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...C_TEAL);
      doc.text(o.code, ox + 3.5, y + 5.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...C_INK);
      const tLines = doc.splitTextToSize(o.title, objW - 7);
      doc.text(tLines, ox + 3.5, y + 10);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(...C_BODY);
      doc.text(doc.splitTextToSize(o.desc, objW - 7), ox + 3.5, y + 10 + tLines.length * 3.8 + 1);
    });
    y += rowH + 4;
  }
  y += 2;

  // 5.0 Strategic Purpose
  drawSubheading(t.intro.purposeTitle);
  drawParagraph(t.intro.purposeLead, 9);
  for (let i = 0; i < t.intro.purposes.length; i += 3) {
    const rowItems = t.intro.purposes.slice(i, i + 3);
    const rowH = Math.max(
      ...rowItems.map((p) => {
        doc.setFontSize(7.8);
        return 13 + doc.splitTextToSize(p.desc, objW - 6).length * 3.7 + 3;
      })
    );
    ensureSpace(rowH + 4);
    rowItems.forEach((p, idx) => {
      const px = MARGIN_X + idx * (objW + 4);
      doc.setDrawColor(...C_BORDER);
      doc.setLineWidth(0.35);
      doc.line(px, y, px + objW, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...C_BRONZE);
      doc.text(p.code, px, y + 4.5);
      doc.setTextColor(...C_INK);
      doc.text(p.title, px + 6, y + 4.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(...C_BODY);
      doc.text(doc.splitTextToSize(p.desc, objW - 2), px, y + 9.5);
    });
    y += rowH + 3;
  }

  // 6.0 Target Cohort & 7 Criteria
  doc.setFontSize(9);
  const targetLeadLines = doc.splitTextToSize(t.intro.targetLead, CONTENT_W - 10);
  const prioLines = doc.splitTextToSize(`${t.intro.priorityNoteLabel}: ${t.intro.priorityNote}`, CONTENT_W - 10);
  const critBlockH = 18 + targetLeadLines.length * 4.3 + t.intro.criteria.length * 5.6 + prioLines.length * 4 + 8;
  ensureSpace(critBlockH);
  drawCard(MARGIN_X, y, CONTENT_W, critBlockH, C_LIMESTONE, C_BORDER);
  let cy6 = y + 7.5;
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...C_INK);
  doc.text(t.intro.targetTitle, MARGIN_X + 5, cy6);
  cy6 += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C_BODY);
  doc.text(targetLeadLines, MARGIN_X + 5, cy6);
  cy6 += targetLeadLines.length * 4.3 + 3;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...C_TEAL);
  doc.text(t.intro.criteriaHeading.toUpperCase(), MARGIN_X + 5, cy6);
  cy6 += 4.5;

  t.intro.criteria.forEach((crit, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C_TEAL);
    doc.text(`0${idx + 1}.`, MARGIN_X + 5, cy6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...C_INK);
    doc.text(crit, MARGIN_X + 12, cy6);
    cy6 += 5.4;
  });

  cy6 += 2;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...C_MUTED);
  doc.text(prioLines, MARGIN_X + 5, cy6);
  y += critBlockH + 4;

  /* ══════════════════════════════════════════════════════════════════════════
     CHAPTER 02: M.O.F.A.S.S DIAGNOSTIC FRAMEWORK + VECTOR HUB INFOGRAPHIC
     ══════════════════════════════════════════════════════════════════════════ */
  drawChapterBanner(t.mofass.chapterNum, t.mofass.chapterTitle, t.mofass.pageLabel, true);
  drawParagraph(t.mofass.lead, 9.5);

  // Vector Hub-and-Spoke Infographic Box (78mm height)
  const hubBoxH = 74;
  ensureSpace(hubBoxH + 6);
  drawCard(MARGIN_X, y, CONTENT_W, hubBoxH, C_LIMESTONE, C_BORDER);

  const hubCx = MARGIN_X + 44;
  const hubCy = y + 37;
  const hubR = 24;

  // Outer dashed circle representation
  doc.setDrawColor(...C_BORDER);
  doc.setLineWidth(0.35);
  doc.circle(hubCx, hubCy, hubR, 'S');

  // Spokes and nodes
  t.mofass.items.forEach((item, idx) => {
    const angle = ((idx * 60 - 90) * Math.PI) / 180;
    const nx = hubCx + hubR * Math.cos(angle);
    const ny = hubCy + hubR * Math.sin(angle);
    doc.setDrawColor(...C_TEAL);
    doc.setLineWidth(0.45);
    doc.line(hubCx, hubCy, nx, ny);

    doc.setFillColor(...C_WHITE);
    doc.setDrawColor(...C_TEAL);
    doc.setLineWidth(0.5);
    doc.circle(nx, ny, 5.5, 'FD');

    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C_TEAL);
    doc.text(item.letter, nx, ny + 1.2, { align: 'center' });
  });

  // Hub center
  doc.setFillColor(...C_DARK);
  doc.circle(hubCx, hubCy, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(...C_WHITE);
  doc.text('BIZ TRUST', hubCx, hubCy - 0.5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(...C_AMBER_LIGHT);
  doc.text('M.O.F.A.S.S', hubCx, hubCy + 3, { align: 'center' });

  // Legend beside vector diagram
  const legX = MARGIN_X + 86;
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...C_INK);
  doc.text(t.mofass.diagramTitle, legX, y + 10);

  t.mofass.items.forEach((item, idx) => {
    const ly = y + 18 + idx * 8.5;
    doc.setFillColor(...C_TEAL);
    doc.roundedRect(legX, ly - 3.5, 5.5, 5.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_WHITE);
    doc.text(item.letter, legX + 2.75, ly + 0.4, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...C_INK);
    doc.text(item.title, legX + 8, ly);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_MUTED);
    doc.text(item.subtitle, legX + 8, ly + 3.5);
  });

  y += hubBoxH + 6;

  // 6 Detailed M.O.F.A.S.S Cards (2 per row)
  const mofW = (CONTENT_W - 5) / 2;
  for (let i = 0; i < t.mofass.items.length; i += 2) {
    const pair = t.mofass.items.slice(i, i + 2);
    const heights = pair.map((m) => {
      doc.setFontSize(8);
      const dL = doc.splitTextToSize(m.description, mofW - 8).length;
      const oL = m.outcomes.reduce((acc, o) => acc + doc.splitTextToSize(`• ${o}`, mofW - 8).length, 0);
      return 16 + dL * 3.8 + 5 + oL * 3.7 + 5;
    });
    const rowH = Math.max(...heights);
    ensureSpace(rowH + 4);

    pair.forEach((m, idx) => {
      const mx = MARGIN_X + idx * (mofW + 5);
      drawCard(mx, y, mofW, rowH, C_PAPER, C_BORDER);

      doc.setFillColor(...C_TEAL);
      doc.roundedRect(mx + 4, y + 4, 7, 7, 1.2, 1.2, 'F');
      doc.setFont('times', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...C_WHITE);
      doc.text(m.letter, mx + 7.5, y + 8.8, { align: 'center' });

      doc.setFont('times', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(...C_INK);
      doc.text(m.title, mx + 13.5, y + 8.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...C_BODY);
      const dLines = doc.splitTextToSize(m.description, mofW - 8);
      doc.text(dLines, mx + 4, y + 15.5);

      let oy = y + 15.5 + dLines.length * 3.8 + 2.5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.2);
      doc.setTextColor(...C_TEAL);
      doc.text(t.mofass.outcomesLabel.toUpperCase(), mx + 4, oy);
      oy += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.6);
      doc.setTextColor(...C_INK);
      m.outcomes.forEach((out) => {
        const oLines = doc.splitTextToSize(`• ${out}`, mofW - 8);
        doc.text(oLines, mx + 4, oy);
        oy += oLines.length * 3.7;
      });
    });
    y += rowH + 4;
  }

  /* ══════════════════════════════════════════════════════════════════════════
     CHAPTER 03: ROADMAP, 10 MODULES & COACHING ARCHITECTURE
     ══════════════════════════════════════════════════════════════════════════ */
  drawChapterBanner(t.curriculum.chapterNum, t.curriculum.chapterTitle, t.curriculum.pageLabel, true);

  // Vector 5-Phase Strategic Timeline Strip
  const phW = (CONTENT_W - 12) / 5;
  const phH = Math.max(
    ...t.curriculum.phases.map((ph) => {
      doc.setFontSize(7.2);
      const aLines = ph.activities.reduce((s, a) => s + doc.splitTextToSize(`· ${a}`, phW - 5).length, 0);
      const dLines = doc.splitTextToSize(ph.deliverable, phW - 5).length;
      return 22 + aLines * 3.5 + dLines * 3.5 + 8;
    })
  );
  const timelineWrapH = phH + 22;
  ensureSpace(timelineWrapH + 4);
  drawCard(MARGIN_X, y, CONTENT_W, timelineWrapH, C_DARK, C_DARK);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...C_AMBER_LIGHT);
  doc.text(t.curriculum.roadmapKicker.toUpperCase(), MARGIN_X + 5, y + 7);
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...C_WHITE);
  doc.text(t.curriculum.roadmapTitle, MARGIN_X + 5, y + 13);

  const phY = y + 17.5;
  t.curriculum.phases.forEach((ph, idx) => {
    const px = MARGIN_X + 3 + idx * (phW + 2.5);
    doc.setFillColor(28, 46, 43);
    doc.setDrawColor(62, 95, 89);
    doc.roundedRect(px, phY, phW, phH, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(110, 231, 183);
    doc.text(`${ph.phase} · ${ph.month}`, px + 2.5, phY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C_WHITE);
    const ptLines = doc.splitTextToSize(ph.title, phW - 5);
    doc.text(ptLines, px + 2.5, phY + 9.5);

    let ay = phY + 9.5 + ptLines.length * 3.6 + 1.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(225, 228, 226);
    ph.activities.forEach((act) => {
      const al = doc.splitTextToSize(`· ${act}`, phW - 5);
      doc.text(al, px + 2.5, ay);
      ay += al.length * 3.3;
    });

    const delY = phY + phH - 11;
    doc.setDrawColor(62, 95, 89);
    doc.line(px + 2.5, delY - 2.5, px + phW - 2.5, delY - 2.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...C_AMBER_LIGHT);
    doc.text(doc.splitTextToSize(ph.deliverable, phW - 5), px + 2.5, delY + 0.5);
  });
  y += timelineWrapH + 6;

  // Schedule Table via autoTable
  drawSubheading(t.curriculum.scheduleTitle, 2);
  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN_X, right: MARGIN_X, top: TOP_Y, bottom: 20 },
    head: [[lang === 'ms' ? 'Fasa' : 'Phase', lang === 'ms' ? 'Tempoh' : 'Period', lang === 'ms' ? 'Ringkasan Aktiviti Utama' : 'Master Activity Summary']],
    body: t.curriculum.scheduleSummary.map((r) => [r.step, r.period, r.desc]),
    styles: {
      font: 'helvetica',
      fontSize: 8.2,
      cellPadding: 2.8,
      textColor: C_INK,
      lineColor: C_BORDER,
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: C_TEAL,
      textColor: C_WHITE,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: C_LIMESTONE,
    },
    columnStyles: {
      0: { cellWidth: 16, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 28, fontStyle: 'bold', textColor: C_TEAL },
    },
    didDrawPage: () => {
      drawRunningHeader(currentSectionHeader);
    },
  });
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 7;

  // 8.0 Detailed 10 Modules (2-column matched pairs)
  drawSubheading(t.curriculum.modulesDetailTitle);
  drawParagraph(t.curriculum.modulesDetailLead, 9);

  const modW = (CONTENT_W - 5) / 2;
  for (let i = 0; i < t.curriculum.modules.length; i += 2) {
    const pair = t.curriculum.modules.slice(i, i + 2);
    const heights = pair.map((m) => {
      doc.setFontSize(7.8);
      const objLines = doc.splitTextToSize(`${t.curriculum.objectiveLabel}: ${m.objective}`, modW - 8).length;
      const topLines = m.topics.reduce((s, tp) => s + doc.splitTextToSize(`· ${tp}`, modW - 8).length, 0);
      return 14 + objLines * 3.7 + 4 + topLines * 3.6 + 5;
    });
    const rowH = Math.max(...heights);
    ensureSpace(rowH + 4);

    pair.forEach((m, idx) => {
      const mx = MARGIN_X + idx * (modW + 5);
      drawCard(mx, y, modW, rowH, C_PAPER, C_BORDER);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...C_TEAL);
      doc.text(m.code, mx + 4, y + 5.5);

      doc.setFont('times', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...C_INK);
      doc.text(doc.splitTextToSize(m.title, modW - 8), mx + 4, y + 10.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.7);
      doc.setTextColor(...C_BODY);
      const oLines = doc.splitTextToSize(`${t.curriculum.objectiveLabel}: ${m.objective}`, modW - 8);
      doc.text(oLines, mx + 4, y + 15.5);

      let ty = y + 15.5 + oLines.length * 3.6 + 2.5;
      doc.setDrawColor(...C_BORDER);
      doc.line(mx + 4, ty - 1.5, mx + modW - 4, ty - 1.5);
      ty += 2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...C_INK);
      m.topics.forEach((topic) => {
        const tl = doc.splitTextToSize(`· ${topic}`, modW - 8);
        doc.text(tl, mx + 4, ty);
        ty += tl.length * 3.5;
      });
    });
    y += rowH + 4;
  }

  // 9.0 Coaching Architecture + Fig 3.1
  ensureSpace(64);
  drawSubheading(t.curriculum.coachingTitle);
  const cStartY = y;
  const cLeftW = 104;
  const cRightX = MARGIN_X + cLeftW + 6;
  const cRightW = CONTENT_W - cLeftW - 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C_BODY);
  const cLeadLines = doc.splitTextToSize(t.curriculum.coachingLead, cLeftW);
  doc.text(cLeadLines, MARGIN_X, cStartY);
  const cAfterLead = cStartY + cLeadLines.length * 4.4 + 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...C_TEAL);
  doc.text(doc.splitTextToSize(t.curriculum.coachingSubLead, cLeftW), MARGIN_X, cAfterLead);
  const cLeftEnd = cAfterLead + 10;

  let cRightEnd = cStartY;
  if (coachImg) {
    const imgH = cRightW * 0.72;
    doc.setDrawColor(...C_BORDER);
    doc.rect(cRightX, cStartY, cRightW, imgH);
    doc.addImage(coachImg, 'JPEG', cRightX, cStartY, cRightW, imgH, undefined, 'FAST');
    doc.setFont('times', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_MUTED);
    const cap = doc.splitTextToSize(t.curriculum.coachingFigCaption, cRightW);
    doc.text(cap, cRightX, cStartY + imgH + 4);
    cRightEnd = cStartY + imgH + 4 + cap.length * 3.5;
  }
  y = Math.max(cLeftEnd, cRightEnd) + 6;

  // 9.1 & 9.2 Coaching Pair
  const coachCardW = (CONTENT_W - 5) / 2;
  const c1Desc = doc.splitTextToSize(t.curriculum.individual.desc, coachCardW - 8);
  const c2P1 = doc.splitTextToSize(t.curriculum.group.p1, coachCardW - 8);
  const c2P2 = doc.splitTextToSize(t.curriculum.group.p2, coachCardW - 8);
  const cRow1H = Math.max(
    14 + c1Desc.length * 3.8 + t.curriculum.individual.items.length * 4.2 + 8,
    14 + (c2P1.length + c2P2.length) * 4 + 8
  );
  ensureSpace(cRow1H + 4);

  drawCard(MARGIN_X, y, coachCardW, cRow1H, C_LIMESTONE, C_BORDER);
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...C_INK);
  doc.text(t.curriculum.individual.title, MARGIN_X + 4, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...C_BODY);
  doc.text(c1Desc, MARGIN_X + 4, y + 13);
  let ciY = y + 13 + c1Desc.length * 3.8 + 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...C_TEAL);
  doc.text(t.curriculum.individual.listTitle.toUpperCase(), MARGIN_X + 4, ciY);
  ciY += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(...C_INK);
  t.curriculum.individual.items.forEach((it, idx) => {
    doc.text(`0${idx + 1}. ${it}`, MARGIN_X + 4, ciY);
    ciY += 4;
  });

  const c2X = MARGIN_X + coachCardW + 5;
  drawCard(c2X, y, coachCardW, cRow1H, C_LIMESTONE, C_BORDER);
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...C_INK);
  doc.text(t.curriculum.group.title, c2X + 4, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...C_BODY);
  doc.text(c2P1, c2X + 4, y + 13);
  doc.text(c2P2, c2X + 4, y + 13 + c2P1.length * 3.9 + 3);
  y += cRow1H + 4;

  // 9.3 & 9.4 Coaching Pair
  const s3H =
    16 +
    t.curriculum.support.roles.reduce(
      (acc, r) => acc + 4 + doc.splitTextToSize(r.desc, coachCardW - 8).length * 3.6 + 2,
      0
    );
  const s4H = 22 + t.curriculum.interactive.topics.length * 4.3;
  const cRow2H = Math.max(s3H, s4H);
  ensureSpace(cRow2H + 4);

  drawCard(MARGIN_X, y, coachCardW, cRow2H, C_PAPER, C_BORDER);
  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...C_INK);
  doc.text(doc.splitTextToSize(t.curriculum.support.title, coachCardW - 8), MARGIN_X + 4, y + 7);
  let rY = y + 16;
  t.curriculum.support.roles.forEach((r) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(...C_TEAL);
    doc.text(r.role, MARGIN_X + 4, rY);
    rY += 3.6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_BODY);
    const rl = doc.splitTextToSize(r.desc, coachCardW - 8);
    doc.text(rl, MARGIN_X + 4, rY);
    rY += rl.length * 3.5 + 2;
  });

  drawCard(c2X, y, coachCardW, cRow2H, C_PAPER, C_BORDER);
  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...C_INK);
  doc.text(doc.splitTextToSize(t.curriculum.interactive.title, coachCardW - 8), c2X + 4, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(...C_BODY);
  const il = doc.splitTextToSize(t.curriculum.interactive.lead, coachCardW - 8);
  doc.text(il, c2X + 4, y + 14.5);
  let tY = y + 14.5 + il.length * 3.7 + 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...C_BRONZE);
  doc.text(t.curriculum.interactive.topicsTitle.toUpperCase(), c2X + 4, tY);
  tY += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(...C_INK);
  t.curriculum.interactive.topics.forEach((tp) => {
    doc.text(`• ${tp}`, c2X + 4, tY);
    tY += 4.2;
  });
  y += cRow2H + 4;

  /* ══════════════════════════════════════════════════════════════════════════
     CHAPTER 04: KRA & KPI ASSESSMENT, MONITORING & FINAL REPORTING
     ══════════════════════════════════════════════════════════════════════════ */
  drawChapterBanner(t.evaluation.chapterNum, t.evaluation.chapterTitle, t.evaluation.pageLabel, true);

  drawSubheading(t.evaluation.kraTitle);
  drawParagraph(t.evaluation.kraLead, 9.2);
  drawParagraph(`${t.evaluation.kraDetailP1} ${t.evaluation.kraDetailP2}`, 8.8);

  // Mandatory Note Banner
  ensureSpace(14);
  drawCard(MARGIN_X, y, CONTENT_W, 10, C_LIMESTONE, C_BRONZE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(120, 53, 15);
  doc.text(t.evaluation.mandatoryNote, MARGIN_X + 4, y + 6.3);
  y += 14;

  drawSubheading(t.evaluation.kraSubTitle);
  const kraW = (CONTENT_W - 5) / 2;
  for (let i = 0; i < t.evaluation.kraDomains.length; i += 2) {
    const pair = t.evaluation.kraDomains.slice(i, i + 2);
    const rowH = Math.max(
      ...pair.map((d) => {
        doc.setFontSize(7.6);
        const kLines = d.kpis.reduce((s, k) => s + doc.splitTextToSize(`· ${k}`, kraW - 8).length, 0);
        return 13 + kLines * 3.7 + 4;
      })
    );
    ensureSpace(rowH + 4);

    pair.forEach((d, idx) => {
      const kx = MARGIN_X + idx * (kraW + 5);
      drawCard(kx, y, kraW, rowH, C_PAPER, C_BORDER);
      doc.setFont('times', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...C_INK);
      doc.text(`${d.code}. ${d.title}`, kx + 4, y + 6.5);

      if (d.mandatoryNote) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...C_BRONZE);
        doc.text(`* ${lang === 'ms' ? 'KPI Wajib' : 'Mandatory'}`, kx + kraW - 4, y + 6.5, { align: 'right' });
      }

      let ky = y + 11.5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.6);
      doc.setTextColor(...C_BODY);
      d.kpis.forEach((kpi) => {
        const kl = doc.splitTextToSize(`· ${kpi}`, kraW - 8);
        doc.text(kl, kx + 4, ky);
        ky += kl.length * 3.6;
      });
    });
    y += rowH + 4;
  }

  // 11.0 Monitoring Mechanisms (3 columns)
  y += 2;
  drawSubheading(t.evaluation.monitoringSubTitle);
  drawParagraph(t.evaluation.monitoringLead, 9);

  const mechW = (CONTENT_W - 8) / 3;
  const mechH = Math.max(
    ...t.evaluation.mechanisms.map(
      (m) => 14 + doc.splitTextToSize(m.desc, mechW - 7).length * 3.8 + 4
    )
  );
  ensureSpace(mechH + 5);
  t.evaluation.mechanisms.forEach((m, idx) => {
    const mx = MARGIN_X + idx * (mechW + 4);
    drawCard(mx, y, mechW, mechH, C_LIMESTONE, C_BORDER);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C_TEAL);
    doc.text(`${m.code}.`, mx + 3.5, y + 6);
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...C_INK);
    const mt = doc.splitTextToSize(m.title, mechW - 11);
    doc.text(mt, mx + 8.5, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(...C_BODY);
    doc.text(doc.splitTextToSize(m.desc, mechW - 7), mx + 3.5, y + 6 + mt.length * 4 + 1.5);
  });
  y += mechH + 6;

  // 12.0 Final Reporting + Vector 8-Axis Radar Infographic
  drawSubheading(t.evaluation.reportTitle);
  drawParagraph(t.evaluation.reportLead, 9);

  const repBlockH = 74;
  ensureSpace(repBlockH + 4);
  const repLeftW = 104;
  const repRightX = MARGIN_X + repLeftW + 6;
  const repRightW = CONTENT_W - repLeftW - 6;

  // Written Report + 8 Aspects Summary
  drawCard(MARGIN_X, y, repLeftW, repBlockH, C_LIMESTONE, C_BORDER);
  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...C_INK);
  doc.text(t.evaluation.writtenReport.title, MARGIN_X + 4, y + 6.5);
  let wy = y + 11.5;
  t.evaluation.writtenReport.items.forEach((it) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_TEAL);
    doc.text(`• ${it.label}:`, MARGIN_X + 4, wy);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...C_BODY);
    const il = doc.splitTextToSize(it.desc, repLeftW - 8);
    doc.text(il, MARGIN_X + 4, wy + 3.4);
    wy += 3.4 + il.length * 3.4 + 1.5;
  });

  // Vector 8-Axis Radar Graphic on Right
  drawCard(repRightX, y, repRightW, repBlockH, C_PAPER, C_BORDER);
  const rCx = repRightX + repRightW / 2;
  const rCy = y + 36;
  const rMax = 22;

  [0.33, 0.66, 1].forEach((sc) => {
    const pts: [number, number][] = Array.from({ length: 8 }, (_, idx) => {
      const ang = ((idx * 45 - 90) * Math.PI) / 180;
      return [rCx + rMax * sc * Math.cos(ang), rCy + rMax * sc * Math.sin(ang)];
    });
    doc.setDrawColor(...C_BORDER);
    doc.setLineWidth(0.25);
    for (let j = 0; j < 8; j++) {
      const next = pts[(j + 1) % 8];
      doc.line(pts[j][0], pts[j][1], next[0], next[1]);
    }
  });

  const baseVals = [0.38, 0.42, 0.45, 0.35, 0.28, 0.44, 0.4, 0.3];
  const targVals = [0.85, 0.82, 0.88, 0.84, 0.78, 0.8, 0.86, 0.82];

  const drawPolygon = (vals: number[], stroke: RGB, lw: number) => {
    const pts: [number, number][] = vals.map((v, idx) => {
      const ang = ((idx * 45 - 90) * Math.PI) / 180;
      return [rCx + rMax * v * Math.cos(ang), rCy + rMax * v * Math.sin(ang)];
    });
    doc.setDrawColor(...stroke);
    doc.setLineWidth(lw);
    for (let j = 0; j < 8; j++) {
      const next = pts[(j + 1) % 8];
      doc.line(pts[j][0], pts[j][1], next[0], next[1]);
    }
  };

  for (let idx = 0; idx < 8; idx++) {
    const ang = ((idx * 45 - 90) * Math.PI) / 180;
    doc.setDrawColor(...C_BORDER);
    doc.setLineWidth(0.2);
    doc.line(rCx, rCy, rCx + rMax * Math.cos(ang), rCy + rMax * Math.sin(ang));
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...C_INK);
    doc.text(
      `${idx + 1}`,
      rCx + (rMax + 4) * Math.cos(ang),
      rCy + (rMax + 4) * Math.sin(ang) + 1,
      { align: 'center' }
    );
  }
  drawPolygon(baseVals, C_BRONZE, 0.5);
  drawPolygon(targVals, C_TEAL, 0.7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...C_INK);
  doc.text('12.2 Dashboard Radar (8 Dimensi)', rCx, y + 6.5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(...C_BRONZE);
  doc.text('— Pra (M1)', rCx - 16, y + 68);
  doc.setTextColor(...C_TEAL);
  doc.text('— Pasca (M6)', rCx + 2, y + 68);
  y += repBlockH + 4;

  // 8 Dimensions List compact strip
  const aspW = (CONTENT_W - 5) / 2;
  const aspBoxH = 26;
  ensureSpace(aspBoxH + 4);
  drawCard(MARGIN_X, y, CONTENT_W, aspBoxH, C_PAPER, C_BORDER);
  t.evaluation.dashboardReport.aspects.forEach((asp, idx) => {
    const col = idx < 4 ? 0 : 1;
    const row = idx < 4 ? idx : idx - 4;
    const ax = MARGIN_X + 4 + col * (aspW + 3);
    const ay = y + 6 + row * 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.4);
    doc.setTextColor(...C_TEAL);
    doc.text(`0${idx + 1}.`, ax, ay);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...C_INK);
    doc.text(asp, ax + 6.5, ay);
  });
  y += aspBoxH + 4;

  /* ══════════════════════════════════════════════════════════════════════════
     CHAPTER 05: G.E.T.S IMPACT, ADDED VALUE, BUDGET & CONCLUSION
     ══════════════════════════════════════════════════════════════════════════ */
  drawChapterBanner(t.impactBudget.chapterNum, t.impactBudget.chapterTitle, t.impactBudget.pageLabel, true);

  // 13.0 G.E.T.S Intro + Scaling Illustration
  ensureSpace(58);
  const gStartY = y;
  const gLeftW = 90;
  const gRightX = MARGIN_X + gLeftW + 6;
  const gRightW = CONTENT_W - gLeftW - 6;

  doc.setFont('times', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(...C_INK);
  doc.text(doc.splitTextToSize(t.impactBudget.getsTitle, gLeftW), MARGIN_X, gStartY + 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C_BODY);
  const glLines = doc.splitTextToSize(t.impactBudget.getsLead, gLeftW);
  doc.text(glLines, MARGIN_X, gStartY + 14);
  const gLeftEnd = gStartY + 14 + glLines.length * 4.5;

  let gRightEnd = gStartY;
  if (scaleImg) {
    const imgH = gRightW * 0.72;
    doc.setDrawColor(...C_BORDER);
    doc.rect(gRightX, gStartY, gRightW, imgH);
    doc.addImage(scaleImg, 'JPEG', gRightX, gStartY, gRightW, imgH, undefined, 'FAST');
    doc.setFont('times', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_MUTED);
    const cap = doc.splitTextToSize(t.impactBudget.getsFigCaption, gRightW);
    doc.text(cap, gRightX, gStartY + imgH + 4);
    gRightEnd = gStartY + imgH + 4 + cap.length * 3.5;
  }
  y = Math.max(gLeftEnd, gRightEnd) + 6;

  // 2x2 G.E.T.S Dark Cards
  const getsW = (CONTENT_W - 5) / 2;
  for (let i = 0; i < t.impactBudget.getsItems.length; i += 2) {
    const pair = t.impactBudget.getsItems.slice(i, i + 2);
    const rowH = Math.max(
      ...pair.map((g) => {
        doc.setFontSize(7.8);
        const dl = doc.splitTextToSize(g.desc, getsW - 8).length;
        const il = g.indicators.reduce((s, ind) => s + doc.splitTextToSize(`• ${ind}`, getsW - 8).length, 0);
        return 17 + dl * 3.8 + 5 + il * 3.6 + 4;
      })
    );
    ensureSpace(rowH + 4);

    pair.forEach((g, idx) => {
      const gx = MARGIN_X + idx * (getsW + 5);
      drawCard(gx, y, getsW, rowH, C_DARK, C_DARK);

      doc.setFillColor(...C_TEAL);
      doc.roundedRect(gx + 4, y + 4, 8, 8, 1.2, 1.2, 'F');
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...C_WHITE);
      doc.text(g.letter, gx + 8, y + 9.5, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(110, 231, 183);
      doc.text(g.code, gx + 14.5, y + 6.5);

      doc.setFont('times', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...C_WHITE);
      doc.text(g.title, gx + 14.5, y + 11);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(225, 228, 226);
      const dl = doc.splitTextToSize(g.desc, getsW - 8);
      doc.text(dl, gx + 4, y + 17);

      let iy = y + 17 + dl.length * 3.8 + 2.5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.setTextColor(...C_AMBER_LIGHT);
      doc.text(t.impactBudget.impactIndicatorsLabel.toUpperCase(), gx + 4, iy);
      iy += 3.8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(235, 235, 235);
      g.indicators.forEach((ind) => {
        const il = doc.splitTextToSize(`• ${ind}`, getsW - 8);
        doc.text(il, gx + 4, iy);
        iy += il.length * 3.5;
      });
    });
    y += rowH + 4;
  }

  // 14.0 Added Value (3x2 grid)
  y += 2;
  drawSubheading(t.impactBudget.addedValueTitle);
  drawParagraph(t.impactBudget.addedValueLead, 9);
  const avW = (CONTENT_W - 8) / 3;
  for (let i = 0; i < t.impactBudget.addedValues.length; i += 3) {
    const row = t.impactBudget.addedValues.slice(i, i + 3);
    const rowH = Math.max(
      ...row.map((av) => {
        doc.setFontSize(7.5);
        let lines = 0;
        if (av.lead) lines += doc.splitTextToSize(av.lead, avW - 7).length;
        if (av.desc) lines += doc.splitTextToSize(av.desc, avW - 7).length;
        if (av.bullets) {
          lines += av.bullets.reduce((s, b) => s + doc.splitTextToSize(`· ${b}`, avW - 7).length, 0);
        }
        if (av.footnote) lines += doc.splitTextToSize(av.footnote, avW - 7).length + 0.5;
        return 15 + lines * 3.6 + 5;
      })
    );
    ensureSpace(rowH + 4);

    row.forEach((av, idx) => {
      const ax = MARGIN_X + idx * (avW + 4);
      drawCard(ax, y, avW, rowH, C_LIMESTONE, C_BORDER);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...C_TEAL);
      doc.text(av.code, ax + 3.5, y + 5.5);

      doc.setFont('times', 'bold');
      doc.setFontSize(9.2);
      doc.setTextColor(...C_INK);
      const tl = doc.splitTextToSize(av.title, avW - 7);
      doc.text(tl, ax + 3.5, y + 10);

      let ay = y + 10 + tl.length * 3.8 + 1.5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...C_BODY);
      if (av.lead) {
        const ll = doc.splitTextToSize(av.lead, avW - 7);
        doc.text(ll, ax + 3.5, ay);
        ay += ll.length * 3.6 + 1;
      }
      if (av.desc) {
        const dl = doc.splitTextToSize(av.desc, avW - 7);
        doc.text(dl, ax + 3.5, ay);
        ay += dl.length * 3.6 + 1;
      }
      if (av.bullets) {
        av.bullets.forEach((b) => {
          const bl = doc.splitTextToSize(`· ${b}`, avW - 7);
          doc.text(bl, ax + 3.5, ay);
          ay += bl.length * 3.5;
        });
      }
      if (av.footnote) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7);
        doc.setTextColor(...C_MUTED);
        doc.text(doc.splitTextToSize(av.footnote, avW - 7), ax + 3.5, ay + 1);
      }
    });
    y += rowH + 4;
  }

  /* ── 16.0 BUDGET SHEET (KEPT INTACT ON DEDICATED OR CLEAN PAGE) ───────────── */
  ensureSpace(135);
  drawSubheading(t.impactBudget.budgetTitle);
  drawParagraph(t.impactBudget.budgetLead, 9);

  // Vector Proportional Cost Bar Infographic
  const barBoxH = 44;
  drawCard(MARGIN_X, y, CONTENT_W, barBoxH, C_LIMESTONE, C_BORDER);
  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...C_INK);
  doc.text(t.impactBudget.chartTitle, MARGIN_X + 4, y + 6.5);

  t.impactBudget.budgetRows.forEach((row, idx) => {
    const col = idx < 3 ? 0 : 1;
    const rIdx = idx < 3 ? idx : idx - 3;
    const bx = MARGIN_X + 4 + col * 87;
    const by = y + 12 + rIdx * 10.5;
    const maxBarW = 80;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(...C_INK);
    const shortItem = row.item.length > 34 ? `${row.item.slice(0, 32)}…` : row.item;
    doc.text(`${row.no}. ${shortItem}`, bx, by);
    doc.setFont('helvetica', 'bold');
    doc.text(`${row.percent}%`, bx + maxBarW, by, { align: 'right' });

    doc.setFillColor(...C_BORDER);
    doc.roundedRect(bx, by + 1.5, maxBarW, 2.2, 0.8, 0.8, 'F');
    doc.setFillColor(...C_TEAL);
    doc.roundedRect(bx, by + 1.5, (maxBarW * row.percent) / 100, 2.2, 0.8, 0.8, 'F');
  });
  y += barBoxH + 5;

  // Budget Table via autoTable
  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN_X, right: MARGIN_X, top: TOP_Y, bottom: 20 },
    head: [
      [
        t.impactBudget.tableHeaders.no,
        t.impactBudget.tableHeaders.item,
        t.impactBudget.tableHeaders.share,
        t.impactBudget.tableHeaders.amount,
      ],
    ],
    body: [
      ...t.impactBudget.budgetRows.map((r) => [
        String(r.no),
        r.item,
        `${r.percent.toFixed(1)}%`,
        r.amount.toLocaleString('en-MY'),
      ]),
      [
        { content: t.impactBudget.subtotalLabel, colSpan: 3, styles: { halign: 'right', fontStyle: 'bold', fillColor: C_LIMESTONE } },
        { content: t.impactBudget.subtotalAmount, styles: { halign: 'right', fontStyle: 'bold', fillColor: C_LIMESTONE } },
      ],
      [
        { content: t.impactBudget.sstLabel, colSpan: 3, styles: { halign: 'right', textColor: C_MUTED } },
        { content: t.impactBudget.sstAmount, styles: { halign: 'right', textColor: C_MUTED } },
      ],
      [
        {
          content: t.impactBudget.grandTotalLabel,
          colSpan: 3,
          styles: { halign: 'right', fontStyle: 'bold', fillColor: C_TEAL, textColor: C_WHITE },
        },
        {
          content: t.impactBudget.grandTotalAmount,
          styles: { halign: 'right', fontStyle: 'bold', fillColor: C_TEAL, textColor: C_AMBER_LIGHT },
        },
      ],
    ],
    styles: {
      font: 'helvetica',
      fontSize: 8.5,
      cellPadding: 3,
      textColor: C_INK,
      lineColor: C_BORDER,
      lineWidth: 0.25,
    },
    headStyles: {
      fillColor: C_DARK,
      textColor: C_WHITE,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 14, halign: 'center' },
      2: { cellWidth: 24, halign: 'right' },
      3: { cellWidth: 36, halign: 'right', fontStyle: 'bold' },
    },
    didDrawPage: () => {
      drawRunningHeader(currentSectionHeader);
    },
  });
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 4;

  // Per-participant summary bar
  ensureSpace(16);
  drawCard(MARGIN_X, y, CONTENT_W, 10, C_LIMESTONE, C_BORDER);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...C_INK);
  doc.text(t.impactBudget.perParticipantLabel, MARGIN_X + 4, y + 6.4);
  doc.setTextColor(...C_TEAL);
  doc.text(t.impactBudget.perParticipantAmount, PAGE_W - MARGIN_X - 4, y + 6.4, { align: 'right' });
  y += 13;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(...C_MUTED);
  doc.text(t.impactBudget.budgetNote, MARGIN_X, y);
  y += 9;

  /* ── 17.0 CONCLUSION SHEET BLOCK ─────────────────────────────────────────── */
  doc.setFontSize(9);
  const cParas = t.impactBudget.closingParagraphs.map((p) => doc.splitTextToSize(p, CONTENT_W - 10));
  const cHigh = doc.splitTextToSize(t.impactBudget.closingHighlight, CONTENT_W - 10);
  const closeBoxH =
    18 +
    cParas.reduce((s, lines) => s + lines.length * 4.3 + 2.5, 0) +
    cHigh.length * 4.3 +
    8;

  ensureSpace(closeBoxH + 10);
  drawSubheading(t.impactBudget.closingTitle);
  drawCard(MARGIN_X, y, CONTENT_W, closeBoxH, C_LIMESTONE, C_BORDER);
  let clY = y + 7.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C_INK);
  cParas.forEach((lines) => {
    doc.text(lines, MARGIN_X + 5, clY);
    clY += lines.length * 4.3 + 2.5;
  });

  doc.setDrawColor(...C_BORDER);
  doc.line(MARGIN_X + 5, clY, PAGE_W - MARGIN_X - 5, clY);
  clY += 4.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...C_TEAL);
  doc.text(cHigh, MARGIN_X + 5, clY);

  /* ══════════════════════════════════════════════════════════════════════════
     PASS 2: STAMP EXACT RUNNING FOOTERS ("Halaman X daripada Y") ON PAGES 2..N
     ══════════════════════════════════════════════════════════════════════════ */
  const totalPages = doc.getNumberOfPages();
  for (let p = 2; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(...C_BORDER);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_X, PAGE_H - 13, PAGE_W - MARGIN_X, PAGE_H - 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_MUTED);
    doc.text(t.impactBudget.footerText, MARGIN_X, PAGE_H - 8.5);

    const pageStr =
      lang === 'ms'
        ? `Halaman ${p - 1} daripada ${totalPages - 1}`
        : `Page ${p - 1} of ${totalPages - 1}`;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...C_TEAL);
    doc.text(pageStr, PAGE_W - MARGIN_X, PAGE_H - 8.5, { align: 'right' });
  }

  const fileName =
    lang === 'ms'
      ? 'Program-BIZ-TRUST-Proposal-BM.pdf'
      : 'Program-BIZ-TRUST-Proposal-EN.pdf';
  doc.save(fileName);
}
