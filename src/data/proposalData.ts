export type Language = 'ms' | 'en';

export interface ChallengeItem {
  code: string;
  title: string;
  summary: string;
  detail: string;
  intervention: string;
}

export interface MofassItem {
  key: string;
  letter: string;
  title: string;
  subtitle: string;
  description: string;
  outcomes: string[];
  color: string;
}

export interface PhaseItem {
  phase: string;
  month: string;
  title: string;
  activities: string[];
  deliverable: string;
}

export interface ModuleItem {
  number: number;
  code: string;
  title: string;
  objective: string;
  topics: string[];
}

export interface KraDomain {
  id: string;
  code: string;
  title: string;
  mandatoryNote?: string;
  kpis: string[];
}

export interface BudgetRow {
  no: number;
  item: string;
  amount: number;
  percent: number;
  color: string;
}

export interface ProposalContent {
  brand: string;
  nav: {
    overview: string;
    mofass: string;
    curriculum: string;
    evaluation: string;
    impactBudget: string;
  };
  actions: {
    print: string;
    downloadPdf: string;
    generatingPdf: string;
    explore: string;
    close: string;
    viewDetail: string;
    expandAll: string;
    collapseAll: string;
    chapterIndex: string;
    languageLabel: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    leadQuote: string;
    metrics: { label: string; value: string; sub: string }[];
  };
  chapters: {
    id: string;
    num: string;
    label: string;
  }[];
  intro: {
    chapterNum: string;
    chapterTitle: string;
    pageLabel: string;
    p1: string;
    p2: string;
    figCaption: string;
    figTitle: string;
    challengesTitle: string;
    challengesHint: string;
    challenges: ChallengeItem[];
    goalsTitle: string;
    goalsP1: string;
    goalsP2: string;
    objectivesTitle: string;
    objectives: { code: string; title: string; desc: string }[];
    purposeTitle: string;
    purposeLead: string;
    purposes: { code: string; title: string; desc: string }[];
    targetTitle: string;
    targetLead: string;
    criteriaHeading: string;
    criteria: string[];
    priorityNoteLabel: string;
    priorityNote: string;
  };
  mofass: {
    chapterNum: string;
    chapterTitle: string;
    pageLabel: string;
    lead: string;
    diagramTitle: string;
    diagramHint: string;
    outcomesLabel: string;
    items: MofassItem[];
  };
  curriculum: {
    chapterNum: string;
    chapterTitle: string;
    pageLabel: string;
    roadmapKicker: string;
    roadmapTitle: string;
    roadmapSub: string;
    deliverableLabel: string;
    phases: PhaseItem[];
    scheduleTitle: string;
    scheduleSummary: { step: string; period: string; desc: string }[];
    modulesOverviewTitle: string;
    modulesDetailTitle: string;
    modulesDetailLead: string;
    objectiveLabel: string;
    syllabusLabel: string;
    modules: ModuleItem[];
    practicalNote: string;
    coachingTitle: string;
    coachingLead: string;
    coachingSubLead: string;
    coachingFigCaption: string;
    individual: {
      title: string;
      desc: string;
      listTitle: string;
      items: string[];
    };
    group: {
      title: string;
      p1: string;
      p2: string;
    };
    support: {
      title: string;
      lead: string;
      roles: { role: string; desc: string }[];
    };
    interactive: {
      title: string;
      lead: string;
      topicsTitle: string;
      topics: string[];
    };
  };
  evaluation: {
    chapterNum: string;
    chapterTitle: string;
    pageLabel: string;
    kraTitle: string;
    kraLead: string;
    kraDetailP1: string;
    kraDetailP2: string;
    mandatoryNote: string;
    kraSubTitle: string;
    allFilter: string;
    kraDomains: KraDomain[];
    monitoringTitle: string;
    monitoringSubTitle: string;
    monitoringLead: string;
    mechanismsTitle: string;
    mechanisms: { code: string; title: string; desc: string }[];
    reportTitle: string;
    reportLead: string;
    writtenReport: {
      title: string;
      items: { label: string; desc: string }[];
    };
    dashboardReport: {
      title: string;
      lead: string;
      aspects: string[];
      footnote: string;
    };
  };
  impactBudget: {
    chapterNum: string;
    chapterTitle: string;
    pageLabel: string;
    getsTitle: string;
    getsLead: string;
    getsFigCaption: string;
    impactIndicatorsLabel: string;
    getsItems: {
      code: string;
      letter: string;
      title: string;
      desc: string;
      indicators: string[];
    }[];
    addedValueTitle: string;
    addedValueLead: string;
    addedValues: {
      code: string;
      title: string;
      lead?: string;
      bullets?: string[];
      desc?: string;
      footnote?: string;
    }[];
    budgetKicker: string;
    budgetTitle: string;
    budgetLead: string;
    chartTitle: string;
    tableHeaders: { no: string; item: string; amount: string; share: string };
    budgetRows: BudgetRow[];
    subtotalLabel: string;
    subtotalAmount: string;
    sstLabel: string;
    sstAmount: string;
    grandTotalLabel: string;
    grandTotalAmount: string;
    perParticipantLabel: string;
    perParticipantAmount: string;
    budgetNote: string;
    closingTitle: string;
    closingSubtitle: string;
    closingParagraphs: string[];
    closingHighlight: string;
    footerText: string;
  };
  modal: {
    interventionLabel: string;
    rootCauseLabel: string;
  };
}

export const PROPOSAL_DATA: Record<Language, ProposalContent> = {
  ms: {
    brand: 'Program BIZ TRUST',
    nav: {
      overview: 'Pengenalan',
      mofass: 'M.O.F.A.S.S',
      curriculum: 'Kurikulum',
      evaluation: 'KPI & Pemantauan',
      impactBudget: 'Impak & Bajet',
    },
    actions: {
      print: 'Cetak Proposal',
      downloadPdf: 'Muat Turun PDF',
      generatingPdf: 'Menjana PDF...',
      explore: 'Terokai Kandungan',
      close: 'Tutup',
      viewDetail: 'Lihat Perincian',
      expandAll: 'Buka Semua Modul',
      collapseAll: 'Ringkaskan Modul',
      chapterIndex: 'Indeks Kandungan',
      languageLabel: 'Bahasa',
    },
    hero: {
      kicker: 'Kertas Kerja Rasmi 2026 · Cadangan Penskalaan PMKS · Edisi Dwibahasa',
      title: 'Program BIZ TRUST: Strategi Berimpak Tinggi untuk Penskalaan Bisnes',
      subtitle:
        'Pelan transformasi perniagaan enam bulan yang menggabungkan diagnostik M.O.F.A.S.S, sepuluh modul latihan keusahawanan, bimbingan eksekutif serta pemantauan KPI berstruktur.',
      leadQuote:
        'Membina perusahaan mikro, kecil dan sederhana yang berstruktur, berdaya tahan kewangan serta bersedia menembusi pasaran yang lebih luas.',
      metrics: [
        { label: 'Tempoh Pelaksanaan', value: '6 Bulan', sub: '+ 3 bulan mentoring susulan' },
        { label: 'Kohort Sasaran', value: '30 PMKS', sub: '6 kumpulan bimbingan fokus' },
        { label: 'Kurikulum Teras', value: '10 Modul', sub: 'Latihan intensif & bengkel' },
        { label: 'Kos Per Peserta', value: 'RM 13,194', sub: 'Termasuk 8% SST (RM 395,820)' },
      ],
    },
    chapters: [
      { id: 'section-intro', num: '01', label: 'Pengenalan & Latar Belakang' },
      { id: 'section-mofass', num: '02', label: 'Kerangka M.O.F.A.S.S' },
      { id: 'section-curriculum', num: '03', label: 'Rangka, 10 Modul & Coaching' },
      { id: 'section-evaluation', num: '04', label: 'KRA, KPI & Pemantauan' },
      { id: 'section-impact', num: '05', label: 'Impak G.E.T.S & Belanjawan' },
    ],
    intro: {
      chapterNum: '01',
      chapterTitle: 'Pengenalan & Latar Belakang Program',
      pageLabel: 'Bahagian 1.0 – 6.0',
      p1: 'Dalam era perniagaan moden yang semakin kompleks dan mencabar, kejayaan sesebuah perusahaan tidak lagi diukur semata-mata berdasarkan keuntungan jangka pendek. Sebaliknya, kejayaan perniagaan turut dinilai berdasarkan tahap kemampanan, kecekapan pengurusan, kekuatan sistem operasi serta keupayaan untuk menghasilkan impak yang berterusan.',
      p2: 'Sehubungan itu, Program BIZ TRUST diperkenalkan sebagai satu inisiatif strategik yang bertujuan membimbing usahawan dan pemilik perniagaan untuk membina asas perniagaan yang kukuh, meningkatkan keupayaan pengurusan serta mengembangkan operasi secara sistematik dan mampan.',
      figCaption: 'Rajah 1.1 — Sesi diagnostik awal dan penjajaran pelan transformasi antara pengasas PMKS dan penasihat strategik.',
      figTitle: 'Transformasi dari Perusahaan Individu kepada Organisasi Bersistem',
      challengesTitle: '2.0 Cabaran Utama Yang Dihadapi PMKS',
      challengesHint: 'Klik mana-mana kad cabaran untuk melihat analisis punca dan intervensi Program BIZ TRUST.',
      challenges: [
        {
          code: '01',
          title: 'Kelemahan Perancangan Strategik',
          summary: 'Ketiadaan hala tuju pertumbuhan dan pelan tindakan jangka panjang yang jelas.',
          detail: 'Banyak PMKS beroperasi secara reaktif mengikut keperluan harian tanpa visi pertumbuhan berfasa, penetapan sasaran tahunan atau peta hala tuju pasaran yang terdokumentasi.',
          intervention: 'Diselesaikan melalui Modul 1 & 2 (Analisis SWOT, TOWS Matrix, BMC dan penyediaan Business Roadmap 12–36 bulan).',
        },
        {
          code: '02',
          title: 'Pengurusan Kewangan Tidak Sistematik',
          summary: 'Rekod aliran tunai, kawalan kos dan penyata kewangan tidak konsisten.',
          detail: 'Percampuran kewangan peribadi dan syarikat, ketiadaan penyata untung rugi bulanan yang tepat serta kelemahan pengiraan margin menyukarkan keputusan pelaburan.',
          intervention: 'Diselesaikan melalui Modul 3 & KPI Kewangan M.O.F.A.S.S dengan templat aliran tunai dan semakan akaun bulanan bersama coach.',
        },
        {
          code: '03',
          title: 'Kecekapan Operasi Rendah & Ketiadaan SOP',
          summary: 'Kebergantungan penuh operasi harian kepada pemilik perniagaan.',
          detail: 'Apabila prosedur kerja tidak didokumentasikan sebagai SOP, kesilapan operasi berulang, kualiti tidak seragam dan pemilik terperangkap dalam tugasan mikro.',
          intervention: 'Diselesaikan melalui Modul 5 & Lawatan Tapak Premis bagi membangunkan SOP HR, Kewangan, Operasi serta Deskripsi Tugas (JD).',
        },
        {
          code: '04',
          title: 'Kesukaran Akses Pembiayaan (Bankability)',
          summary: 'Dokumentasi kewangan dan tadbir urus kurang teratur menjejaskan kelayakan dana.',
          detail: 'Syarikat berpotensi tinggi sering gagal meyakinkan institusi kewangan atau pelabur kerana rekod korporat, pematuhan undang-undang dan unjuran tunai tidak lengkap.',
          intervention: 'Diselesaikan melalui Modul 8 & Nilai Tambah 14.5 yang menyediakan pakej dokumentasi bankable dan pemadanan geran serta pembiayaan.',
        },
      ],
      goalsTitle: '3.0 Matlamat Program',
      goalsP1: 'Matlamat utama program adalah untuk membangunkan usahawan dan perusahaan yang mempunyai keupayaan pengurusan profesional, berdaya saing, berstruktur dan mampan melalui pendekatan transformasi perniagaan secara menyeluruh.',
      goalsP2: 'Program ini turut bertujuan melahirkan perusahaan yang mampu meningkatkan jualan, mengoptimumkan penggunaan sumber, memperkukuh kedudukan kewangan, meningkatkan produktiviti serta mempunyai keupayaan untuk berkembang ke pasaran yang lebih luas.',
      objectivesTitle: '4.0 Objektif Program',
      objectives: [
        { code: '4.1', title: 'Diagnostik Menyeluruh', desc: 'Menilai tahap prestasi semasa dan potensi pertumbuhan syarikat melalui sesi diagnostik perniagaan.' },
        { code: '4.2', title: 'Analisis SWOT & TOWS', desc: 'Mengenal pasti kekuatan, kelemahan, peluang dan ancaman serta aspek penambahbaikan strategik.' },
        { code: '4.3', title: 'Pelan Tindakan Komprehensif', desc: 'Menyediakan pelan transformasi perniagaan yang bersesuaian dengan matlamat strategik syarikat.' },
        { code: '4.4', title: 'Sokongan Kepakaran', desc: 'Membimbing pelaksanaan pelan melalui kepakaran teknikal, pengurusan dan pembangunan organisasi.' },
        { code: '4.5', title: 'Peningkatan Daya Saing', desc: 'Meningkatkan kecekapan operasi, produktiviti dan kelestarian dalam menghadapi cabaran pasaran.' },
        { code: '4.6', title: 'Kesediaan Pembiayaan (Bankable)', desc: 'Membantu usahawan mengurus komitmen pembiayaan serta meningkatkan kelayakan mendapatkan dana pengembangan.' },
      ],
      purposeTitle: '5.0 Tujuan Pelaksanaan Program',
      purposeLead: 'Program ini bertujuan mewujudkan satu platform pembangunan strategik yang memfokuskan kepada pembinaan perniagaan mampan (sustainable business) dalam kalangan usahawan dan pemilik PMKS. Secara khusus, tumpuan merangkumi:',
      purposes: [
        { code: '01', title: 'Asas Mampan', desc: 'Memperkukuh pengurusan strategi, operasi, sumber manusia dan kewangan.' },
        { code: '02', title: 'Budaya Bertanggungjawab', desc: 'Membentuk usahawan yang mengambil kira nilai komuniti, alam sekitar dan pihak berkepentingan.' },
        { code: '03', title: 'Peningkatan Daya Saing', desc: 'Menggalakkan amalan penskalaan berstruktur untuk kedudukan pasaran yang lebih tinggi.' },
        { code: '04', title: 'Pengukuhan Tadbir Urus', desc: 'Meningkatkan pematuhan terhadap prosedur, standard operasi dan tadbir urus korporat yang baik.' },
        { code: '05', title: 'Jaringan Strategik', desc: 'Membuka peluang kolaborasi, perkongsian kepakaran dan kerjasama di peringkat tempatan serta global.' },
        { code: '06', title: 'Akses Pembiayaan', desc: 'Membina struktur pengurusan dan dokumentasi teratur bagi menyokong pertumbuhan dan dana.' },
      ],
      targetTitle: '6.0 Kumpulan Sasaran & Skop Penyertaan',
      targetLead: 'Program ini menyasarkan seramai tiga puluh (30) orang usahawan atau pemilik syarikat yang terdiri daripada perusahaan mikro, kecil dan sederhana (PMKS).',
      criteriaHeading: 'Kriteria Umum Penyertaan',
      criteria: [
        'Pemilik atau pengurusan utama perniagaan yang aktif beroperasi.',
        'Mempunyai produk atau perkhidmatan yang telah dipasarkan.',
        'Mempunyai komitmen untuk mengembangkan dan meningkatkan prestasi perniagaan.',
        'Bersedia mengikuti keseluruhan program selama enam (6) bulan.',
        'Bersedia menyediakan maklumat dan dokumen perniagaan bagi tujuan penilaian prestasi.',
        'Bersedia menetapkan sasaran pertumbuhan dan melaksanakan pelan tindakan penambahbaikan.',
        'Mempunyai kesediaan untuk mengikuti sesi latihan, coaching dan pemantauan.',
      ],
      priorityNoteLabel: 'Keutamaan Pemilihan',
      priorityNote: 'Keutamaan penyertaan diberikan kepada syarikat yang mempunyai potensi pertumbuhan tinggi, komitmen pengembangan perniagaan yang jelas serta kesediaan melaksanakan transformasi pengurusan.',
    },
    mofass: {
      chapterNum: '02',
      chapterTitle: 'Kerangka Diagnostik M.O.F.A.S.S',
      pageLabel: '6 Teras Perniagaan',
      lead: 'Program BIZ TRUST menggunakan kerangka M.O.F.A.S.S sebagai asas diagnostik, bimbingan dan pengukuran prestasi merangkumi enam komponen utama perniagaan yang saling bergantung.',
      diagramTitle: 'Rajah 2.1 — Seni Bina Bersepadu M.O.F.A.S.S',
      diagramHint: 'Pilih mana-mana nod pada rajah untuk meneliti fokus diagnostik dan hasil transformasi setiap teras.',
      outcomesLabel: 'Hasil Transformasi Teras',
      items: [
        {
          key: 'M',
          letter: 'M',
          title: 'Pemasaran (Marketing)',
          subtitle: 'Penjenamaan, CSR & Penembusan Pasaran',
          description: 'Menilai keberkesanan pengiklanan, liputan publisiti, pelaksanaan inisiatif CSR serta strategi penembusan saluran dalam talian dan luar talian.',
          outcomes: ['Pelan pemasaran omnichannel berdata', 'Identiti jenama & pembungkusan lebih kukuh', 'Keberkesanan kos pemerolehan pelanggan (ROAS)'],
          color: '#0F5149',
        },
        {
          key: 'O',
          letter: 'O',
          title: 'Operasi (Operation)',
          subtitle: 'Kecekapan Proses & Pematuhan SOP',
          description: 'Mengaudit aliran kerja harian, kapasiti pengeluaran, kawalan kualiti serta pembangunan Prosedur Operasi Standard (SOP) yang mengurangkan kebergantungan kepada pemilik.',
          outcomes: ['Dokumen SOP Operasi yang lengkap & dipatuhi', 'Pengurangan pembaziran masa dan ralat pengeluaran', 'Kapasiti pengeluaran sedia untuk penskalaan'],
          color: '#1E3A8A',
        },
        {
          key: 'F',
          letter: 'F',
          title: 'Kewangan & Akaun (Finance)',
          subtitle: 'Aliran Tunai, Kos & Penyata Bankable',
          description: 'Memperkukuh rekod perakaunan bulanan, pengiraan kos sebenar produk, pengurusan aliran tunai dan penyediaan laporan kewangan untuk pembiayaan.',
          outcomes: ['Penyata untung rugi & aliran tunai bulanan terkini', 'Kawalan margin keuntungan kasar dan bersih', 'Kesiapsiagaan dokumen kewangan bertaraf bankable'],
          color: '#9A6B2F',
        },
        {
          key: 'A',
          letter: 'A',
          title: 'Pentadbiran & HR (Administration)',
          subtitle: 'Struktur Bakat, JD & Tadbir Urus',
          description: 'Menyusun struktur organisasi, deskripsi kerja (JD), pelan latihan kakitangan serta amalan tadbir urus korporat bagi membentuk pasukan berprestasi tinggi.',
          outcomes: ['Deskripsi kerja (JD) & carta organisasi jelas', 'Program latihan dan bimbingan dalaman kakitangan', 'Budaya kerja berprestasi serta pelan penggantian'],
          color: '#7C2D12',
        },
        {
          key: 'S1',
          letter: 'S',
          title: 'Jualan (Sales)',
          subtitle: 'Hasil Bulanan, B2B/B2C & Basket Size',
          description: 'Memacu pertumbuhan jualan secara langsung melalui peluasan pelanggan baharu B2C dan B2B, peningkatan purata nilai pembelian serta pengurusan SKU strategik.',
          outcomes: ['Peningkatan konsisten hasil jualan bulanan (KPI Wajib)', 'Penambahan saluran pelanggan B2B dan B2C baharu', 'Pengoptimuman saiz bakul pembelian & ulangan beli'],
          color: '#065F46',
        },
        {
          key: 'S2',
          letter: 'S',
          title: 'Sistem & Automasi (System)',
          subtitle: 'Pendigitalan, CRM & Automasi Aliran Kerja',
          description: 'Mengintegrasikan aplikasi digital moden seperti sistem POS, CRM, perakaunan awan, e-Invois dan automasi aliran kerja untuk menggandakan produktiviti.',
          outcomes: ['Peralihan daripada rekod manual kepada sistem digital', 'Integrasi CRM dan pemantauan data jualan masa nyata', 'Kesediaan infrastruktur sistem bagi pembukaan cawangan'],
          color: '#334155',
        },
      ],
    },
    curriculum: {
      chapterNum: '03',
      chapterTitle: 'Rangka Pelaksanaan, 10 Modul & Sesi Bimbingan',
      pageLabel: 'Bahagian 7.0 – 9.4',
      roadmapKicker: 'Peta Jalan Strategik 6 Bulan',
      roadmapTitle: 'Aliran Masa, Aktiviti & Hasil Jangkaan Program',
      roadmapSub: 'Panduan visual berfasa bagi pelaksanaan menyeluruh terhadap 30 syarikat PMKS terpilih sepanjang enam bulan.',
      deliverableLabel: 'Hasil Fasa',
      phases: [
        {
          phase: 'Fasa 1',
          month: 'Bulan 1',
          title: 'Persediaan & Saringan',
          activities: ['Hebahan & pendaftaran', 'Saringan 30 peserta PMKS', 'Diagnostik awal BMC & SWOT', 'Lawatan pemantauan #1'],
          deliverable: 'Profil syarikat & garis dasar prestasi (baseline) siap.',
        },
        {
          phase: 'Fasa 2',
          month: 'Bulan 2',
          title: 'Latihan Keusahawanan',
          activities: ['Pelaksanaan 10 modul teras', 'Kajian kes & bengkel praktikal', 'Penyediaan pelan tindakan', 'Permulaan sesi coaching'],
          deliverable: 'Penguasaan modul & draf pelan transformasi perniagaan.',
        },
        {
          phase: 'Fasa 3',
          month: 'Bulan 2 – 4',
          title: 'Coaching Berterusan',
          activities: ['Bimbingan individu (min. 3 sesi)', 'Coaching berkumpulan (min. 4 sesi)', 'Fokus teras M.O.F.A.S.S', 'Sesi sembang santai AI & e-Invois'],
          deliverable: 'Pelaksanaan SOP dan penyelesaian isu operasi kritikal.',
        },
        {
          phase: 'Fasa 4',
          month: 'Bulan 5',
          title: 'Pemantauan Premis',
          activities: ['Lawatan tapak premis #2', 'Penilaian kemajuan 12 KPI', 'Intervensi pakar bidang (SME)', 'Semakan laporan kemajuan bulanan'],
          deliverable: 'Penambahbaikan langsung proses kerja dan kualiti produk.',
        },
        {
          phase: 'Fasa 5',
          month: 'Bulan 6',
          title: 'Penilaian & Laporan',
          activities: ['Penilaian akhir pra & pasca', 'Analisis perbandingan KPI', 'Penyediaan laporan & dashboard', 'Peralihan ke 3 bulan mentoring'],
          deliverable: 'Laporan akhir rasmi & kesediaan penskalaan G.E.T.S.',
        },
      ],
      scheduleTitle: 'Ringkasan Jadual Aktiviti Utama',
      scheduleSummary: [
        { step: '01', period: 'Bulan 1', desc: 'Persediaan, penyaringan 30 peserta, ujian psikometrik & diagnostik awal perniagaan.' },
        { step: '02', period: 'Bulan 2', desc: 'Latihan keusahawanan intensif (4H3M) merangkumi 10 modul teras komprehensif.' },
        { step: '03', period: 'Bulan 2 – 6', desc: 'Sesi coaching individu dan berkumpulan secara berterusan bersama coach tetap & pakar.' },
        { step: '04', period: 'Bulan 1 & 5', desc: 'Lawatan pemantauan tapak ke premis perniagaan setiap peserta bagi semakan langsung.' },
        { step: '05', period: 'Bulan 6', desc: 'Penilaian akhir prestasi, analisis perbandingan KPI dan pembentangan dashboard impak.' },
      ],
      modulesOverviewTitle: 'Ringkasan 10 Modul Komprehensif',
      modulesDetailTitle: '8.0 Perincian 10 Modul Latihan Keusahawanan',
      modulesDetailLead: 'Latihan keusahawanan merangkumi sepuluh modul komprehensif yang disusun secara sistematik bagi meningkatkan keupayaan pengurusan, kepimpinan dan pertumbuhan perniagaan.',
      objectiveLabel: 'Objektif Modul',
      syllabusLabel: 'Kandungan Latihan',
      modules: [
        {
          number: 1,
          code: 'MODUL 01',
          title: 'Diagnostik Perniagaan & Prestasi',
          objective: 'Membimbing peserta mengenal pasti kedudukan semasa syarikat, kekuatan dan kelemahan serta menetapkan hala tuju pertumbuhan yang jelas.',
          topics: [
            'Analisis SWOT dan TOWS Matrix.',
            'Analisis Model Perniagaan (Business Model Canvas – BMC).',
            'Penilaian prestasi dan keupayaan perniagaan.',
            'Pembangunan Prosedur Operasi Standard (SOP).',
            'Penyediaan templat SOP HR, Kewangan & Operasi.',
            'Penyediaan peta hala tuju perniagaan (Business Roadmap).',
          ],
        },
        {
          number: 2,
          code: 'MODUL 02',
          title: 'Perancangan Strategik',
          objective: 'Membimbing peserta merangka pelan tindakan strategik yang bersesuaian dengan matlamat dan hala tuju syarikat.',
          topics: [
            'Perancangan strategik perniagaan.',
            'Penetapan visi, misi dan sasaran pertumbuhan.',
            'Transformasi digital korporat.',
            'Pembangunan jenama dan pasaran.',
            'Strategi pengembangan dan peluasan pasaran.',
            'Penyediaan pelan transformasi perniagaan.',
          ],
        },
        {
          number: 3,
          code: 'MODUL 03',
          title: 'Pengurusan Kewangan',
          objective: 'Meningkatkan keupayaan peserta mengurus kewangan, mengawal kos dan merancang aliran tunai bagi memastikan kestabilan perniagaan.',
          topics: [
            'Pengurusan aliran tunai (Cash Flow).',
            'Kawalan kos dan perbelanjaan efektif.',
            'Analisis keuntungan dan margin.',
            'Penyediaan bajet perniagaan menyeluruh.',
            'Perancangan kewangan jangka pendek & panjang.',
            'Analisis prestasi kewangan korporat.',
          ],
        },
        {
          number: 4,
          code: 'MODUL 04',
          title: 'Kepimpinan & Pengurusan Perubahan',
          objective: 'Meningkatkan keupayaan kepimpinan usahawan dalam memacu perubahan serta membina budaya kerja organisasi yang progresif.',
          topics: [
            'Kepimpinan transformasional.',
            'Pengurusan perubahan organisasi (Change Management).',
            'Pembangunan budaya kerja positif.',
            'Pengurusan pasukan berprestasi tinggi.',
            'Komunikasi dan penyelesaian konflik.',
            'Pembangunan bakat & perancangan penggantian.',
          ],
        },
        {
          number: 5,
          code: 'MODUL 05',
          title: 'Kecekapan Operasi & SOP',
          objective: 'Membekalkan peserta dengan kaedah pengurusan operasi sistematik bagi meningkatkan produktiviti dan kualiti.',
          topics: [
            'Penetapan petunjuk prestasi utama (KPI).',
            'Penyediaan aliran kerja (Workflow).',
            'Pembangunan dan pelaksanaan SOP.',
            'Pemantauan produktiviti harian.',
            'Pengoptimuman sumber dan kos operasi.',
            'Integrasi teknologi dalam operasi.',
          ],
        },
        {
          number: 6,
          code: 'MODUL 06',
          title: 'Pendigitalan & Automasi',
          objective: 'Memperkenalkan penggunaan teknologi digital dan sistem automasi untuk meningkatkan kecekapan pengurusan syarikat.',
          topics: [
            'Penggunaan teknologi dalam operasi.',
            'Sistem pengurusan pelanggan (CRM).',
            'Automasi proses kerja (Workflow Automation).',
            'Penggunaan aplikasi digital moden.',
            'Integrasi sistem pengurusan perniagaan.',
            'Teknologi untuk pemantauan prestasi.',
          ],
        },
        {
          number: 7,
          code: 'MODUL 07',
          title: 'Penjenamaan & Harta Intelek',
          objective: 'Membantu peserta membangunkan identiti jenama yang kukuh, profesional dan berdaya saing di pasaran.',
          topics: [
            'Teknik membina identiti jenama (Branding).',
            'Strategi pemasaran jenama strategik.',
            'Pembangunan kredibiliti & kesedaran jenama.',
            'Pelan hala tuju penjenamaan jangka panjang.',
            'Pendaftaran & perlindungan harta intelek (IP).',
            'Strategi penjenamaan semula & pembungkusan produk.',
          ],
        },
        {
          number: 8,
          code: 'MODUL 08',
          title: 'Akses Pembiayaan & Tadbir Urus',
          objective: 'Memberikan panduan mengenai peluang pembiayaan, penyediaan dokumen bankable dan amalan tadbir urus korporat yang baik.',
          topics: [
            'Pengenalpastian sumber pembiayaan & dana.',
            'Persediaan syarikat mendapatkan pembiayaan.',
            'Penyediaan dokumen kewangan bankable.',
            'Pengurusan rekod & dokumentasi korporat.',
            'Amalan tadbir urus korporat (Corporate Governance).',
            'Kesediaan menarik pelabur & rakan strategik.',
          ],
        },
        {
          number: 9,
          code: 'MODUL 09',
          title: 'Strategi Pemasaran & Pasaran',
          objective: 'Meningkatkan keupayaan peserta merancang strategi pemasaran berkesan untuk menembusi pasaran baharu.',
          topics: [
            'Strategi pemasaran digital lanjutan.',
            'Pembangunan jenama produk & perkhidmatan.',
            'Analisis pasaran & pelanggan sasaran (Target Market).',
            'Strategi pemasaran pelbagai saluran (Omnichannel).',
            'Pengukuhan perhubungan pelanggan (Loyalty).',
            'Penggunaan data analitik pemasaran.',
          ],
        },
        {
          number: 10,
          code: 'MODUL 10',
          title: 'Skalabiliti & Perkembangan',
          objective: 'Membimbing peserta merancang strategi pengembangan perniagaan secara sistematik, berskala dan mampan.',
          topics: [
            'Strategi penembusan sektor dan pasaran baharu.',
            'Pelan pertumbuhan jangka panjang (Scaling).',
            'Pengembangan operasi & pembukaan cawangan.',
            'Model francais dan pelesenan perniagaan.',
            'Strategi kerjasama & perkongsian strategik.',
            'Persediaan memasuki pasaran eksport & global.',
          ],
        },
      ],
      practicalNote: 'Latihan ini bukan sahaja memberikan pengetahuan teori, malah menekankan aplikasi praktikal melalui kajian kes, latihan interaktif, perbincangan kumpulan dan sesi bimbingan berterusan.',
      coachingTitle: '9.0 Sesi Bimbingan (Coaching)',
      coachingLead: 'Sesi coaching merupakan komponen teras program bagi memastikan ilmu dan kemahiran yang diperoleh semasa latihan diterjemahkan kepada perubahan sebenar dalam pengurusan perniagaan peserta.',
      coachingSubLead: 'Pelaksanaan bimbingan berstruktur terbahagi kepada empat dimensi sokongan utama:',
      coachingFigCaption: 'Rajah 3.1 — Sesi bimbingan berkumpulan lima peserta bersama mentor industri bagi membedah isu operasi dan strategi pertumbuhan.',
      individual: {
        title: '9.1 Bimbingan Individu',
        desc: 'Setiap peserta mengikuti sekurang-kurangnya tiga (3) sesi bimbingan individu, dengan minimum dua (2) sesi secara bersemuka. Bimbingan merangkumi aspek pembangunan kendiri (life coaching) dan pembangunan perniagaan (business coaching).',
        listTitle: '6 Komponen Fokus M.O.F.A.S.S',
        items: [
          'Pemasaran (Marketing)',
          'Operasi (Operation)',
          'Kewangan dan Perakaunan (Finance & Account)',
          'Pentadbiran dan Sumber Manusia (Administration & HR)',
          'Jualan (Sales)',
          'Sistem dan Automasi (System)',
        ],
      },
      group: {
        title: '9.2 Bimbingan Berkumpulan',
        p1: 'Setiap peserta diwajibkan mengikuti sekurang-kurangnya empat (4) sesi bimbingan berkumpulan, dengan minimum dua (2) sesi dilaksanakan secara bersemuka.',
        p2: 'Sesi ini menggunakan pendekatan berfasa dan progresif bagi membolehkan peserta berkongsi pengalaman, membincangkan cabaran industri serta mendapatkan penyelesaian secara bersama.',
      },
      support: {
        title: '9.3 Sistem Sokongan Bimbingan (5 Peserta / Kumpulan)',
        lead: 'Setiap kumpulan lima (5) orang peserta disokong secara menyeluruh oleh empat peranan pakar:',
        roles: [
          { role: 'Coach Tetap', desc: 'Membimbing peserta merangka dan melaksanakan strategi perniagaan jangka pendek serta jangka panjang.' },
          { role: 'Pakar Bidang (SME)', desc: 'Memberikan pandangan teknikal, penyelesaian khusus dan amalan terbaik mengikut bidang.' },
          { role: 'Usahawan Berpengalaman', desc: 'Berkongsi pengalaman sebenar, cabaran dan strategi kejayaan dalam sektor berkaitan.' },
          { role: 'Life Coach', desc: 'Memberikan sokongan pembangunan sahsiah, kesejahteraan emosi, motivasi dan keseimbangan kehidupan.' },
        ],
      },
      interactive: {
        title: '9.4 Sesi Interaktif & Perkongsian Ilmu',
        lead: 'Peserta turut berpeluang mengikuti sesi perkongsian ilmu secara santai secara bersemuka atau dalam talian merangkumi isu semasa:',
        topicsTitle: 'Topik Fokus Semasa',
        topics: [
          'Pelaksanaan e-Invois berfasa',
          'Strategi pemasaran TikTok & kandungan pendek',
          'Teknik pemasaran & penutupan jualan WhatsApp',
          'Penggunaan teknologi dan kecerdasan buatan (AI)',
          'Pendigitalan pengurusan perniagaan',
          'Strategi meningkatkan jualan dan kesetiaan pelanggan',
          'Isu semasa dasar dan pengurusan PMKS',
        ],
      },
    },
    evaluation: {
      chapterNum: '04',
      chapterTitle: 'Penilaian KRA & KPI, Pemantauan dan Laporan Akhir',
      pageLabel: 'Bahagian 10.0 – 12.2',
      kraTitle: '10.0 Penilaian Prestasi Usahawan',
      kraLead: 'Penilaian prestasi dilaksanakan bagi mengukur tahap perkembangan dan keberkesanan pelaksanaan strategi transformasi perniagaan sepanjang tempoh enam bulan.',
      kraDetailP1: 'Setiap peserta dikehendaki memilih enam (6) bidang keberhasilan utama (Key Result Areas – KRA) dan dua belas (12) petunjuk prestasi utama (Key Performance Indicators – KPI) yang bersesuaian dengan keperluan perniagaan masing-masing.',
      kraDetailP2: 'Setiap KPI diukur berdasarkan garis dasar (baseline) Bulan 1 berbanding pencapaian Bulan 6 melalui bukti dokumen dan pengesahan coach.',
      mandatoryNote: 'Nota Wajib: Petunjuk Prestasi Utama (KPI) Peningkatan Jualan adalah wajib bagi kesemua 30 peserta program.',
      kraSubTitle: '10.1 Bidang Penilaian KRA dan KPI',
      allFilter: 'Semua 6 Bidang',
      kraDomains: [
        {
          id: 'A',
          code: 'A',
          title: 'Pemasaran (Marketing)',
          kpis: [
            'Jumlah aktiviti tanggungjawab sosial korporat (CSR).',
            'Jumlah perbelanjaan dan keberkesanan pengiklanan serta promosi.',
            'Tahap publisiti dan liputan media.',
            'Jumlah serta keberkesanan saluran jualan dan pengedaran.',
            'Prestasi platform jualan dalam talian dan luar talian.',
          ],
        },
        {
          id: 'B',
          code: 'B',
          title: 'Operasi (Operation)',
          kpis: [
            'Pembangunan dan pematuhan Prosedur Operasi Standard (SOP).',
            'Penambahbaikan produk untuk meningkatkan kualiti & daya saing.',
            'Penambahbaikan proses kerja dan kecekapan masa.',
            'Pelaksanaan tanda aras produk berbanding pesaing.',
            'Penambahan peralatan bagi meningkatkan kapasiti operasi.',
          ],
        },
        {
          id: 'C',
          code: 'C',
          title: 'Kewangan & Perakaunan',
          kpis: [
            'Purata keuntungan kasar bulanan dan tahunan.',
            'Purata keuntungan bersih selepas perbelanjaan.',
            'Rekod aliran tunai yang teratur dan dikemas kini.',
            'Penyediaan penyata untung rugi yang tepat dan terkini.',
            'Pengiraan kos operasi, pemasaran dan pengeluaran.',
          ],
        },
        {
          id: 'D',
          code: 'D',
          title: 'Pentadbiran & Sumber Manusia',
          kpis: [
            'Penambahan tenaga kerja mengikut keperluan organisasi.',
            'Jumlah hari latihan yang dihadiri pekerja.',
            'Bilangan sesi bimbingan dalaman untuk pekerja.',
            'Penglibatan berstruktur dalam mesyuarat organisasi.',
            'Penyediaan dan pematuhan deskripsi kerja (Job Description – JD).',
          ],
        },
        {
          id: 'E',
          code: 'E',
          title: 'Jualan (Sales)',
          mandatoryNote: 'Mengandungi KPI Wajib Peningkatan Jualan',
          kpis: [
            'Jumlah hasil jualan bulanan (KPI Wajib).',
            'Bilangan pelanggan baharu kategori B2C.',
            'Bilangan pelanggan baharu kategori B2B.',
            'Purata nilai pembelian pelanggan (Basket Size).',
            'Jumlah unit penyimpanan stok (SKU) atau perkhidmatan aktif.',
          ],
        },
        {
          id: 'F',
          code: 'F',
          title: 'Sistem & Automasi (System)',
          kpis: [
            'Pelaksanaan sistem pengurusan perniagaan bersepadu.',
            'Sistem pengurusan jualan (POS / CRM).',
            'Sistem kewangan dan perakaunan digital.',
            'Sistem pengurusan operasi dan logistik.',
            'Sistem sumber manusia, automasi & kesediaan penskalaan.',
          ],
        },
      ],
      monitoringTitle: '11.0 Lawatan Pemantauan & 12.0 Laporan Akhir',
      monitoringSubTitle: '11.0 Lawatan Pemantauan Premis',
      monitoringLead: 'Sekurang-kurangnya dua (2) sesi lawatan pemantauan dilaksanakan ke premis setiap peserta bagi memberikan bimbingan langsung, menilai perkembangan sebenar serta mengenal pasti cabaran yang memerlukan intervensi tambahan.',
      mechanismsTitle: '11.1 Mekanisme Pemantauan Berterusan',
      mechanisms: [
        {
          code: 'A',
          title: 'Laporan Kemajuan Bulanan',
          desc: 'Peserta mengemukakan laporan bulanan merangkumi jualan, operasi, pemasaran, pencapaian KPI, kemajuan pelan transformasi dan cabaran yang dihadapi.',
        },
        {
          code: 'B',
          title: 'Lawatan Coach & Pakar Bidang',
          desc: 'Penilaian langsung di premis merangkumi kesemua enam komponen M.O.F.A.S.S oleh coach tetap dan pakar industri.',
        },
        {
          code: 'C',
          title: 'Kaji Selidik Pra & Pasca Program',
          desc: 'Mengukur perubahan keupayaan pengurusan dan impak program terhadap prestasi perniagaan serta peningkatan jualan.',
        },
      ],
      reportTitle: '12.0 Penyediaan Laporan Akhir',
      reportLead: 'Laporan akhir program disediakan dalam dua bentuk utama iaitu Laporan Bertulis komprehensif dan Laporan Grafik / Dashboard interaktif.',
      writtenReport: {
        title: '12.1 Laporan Bertulis Rasmi',
        items: [
          { label: 'Analisis Demografi Peserta', desc: 'Pecahan profil mengikut umur, jantina, latar belakang, lokasi dan sektor industri.' },
          { label: 'Penilaian Maklum Balas', desc: 'Tahap kepuasan terhadap modul latihan, kualiti coaching dan cadangan penambahbaikan.' },
          { label: 'Penilaian Pra & Pasca', desc: 'Perbandingan objektif tahap kemahiran, kewangan, pengurusan dan operasi.' },
          { label: 'Pencapaian & Kisah Kejayaan', desc: 'Senarai syarikat cemerlang, peratusan peningkatan jualan, keuntungan dan kajian kes.' },
        ],
      },
      dashboardReport: {
        title: '12.2 Laporan Grafik & Dashboard 8 Dimensi',
        lead: 'Dashboard eksekutif memaparkan skor dan analisis kemajuan peserta berdasarkan lapan (8) dimensi teras:',
        aspects: [
          'Pengurusan Operasi — Pematuhan SOP & kecekapan',
          'Strategi Pemasaran — Digital & konvensional',
          'Jualan & Pendapatan — Perubahan hasil & untung',
          'Pengurusan Kewangan — Aliran tunai, kos & margin',
          'Teknologi & Automasi — Tahap pendigitalan operasi',
          'Pembangunan Produk & Inovasi — Penambahbaikan nilai',
          'Kepimpinan & Sumber Manusia — Kecekapan pasukan',
          'Kesediaan Skalabiliti — Potensi pertumbuhan tahap tinggi',
        ],
        footnote: 'Dashboard turut merangkumi laporan status isu dan permasalahan bagi mengenal pasti cabaran utama peserta serta tindakan penyelesaian yang diambil.',
      },
    },
    impactBudget: {
      chapterNum: '05',
      chapterTitle: 'Impak G.E.T.S, Nilai Tambah & Anggaran Perbelanjaan',
      pageLabel: 'Bahagian 13.0 – 17.0',
      getsTitle: '13.0 Hasil dan Impak Program (Kerangka G.E.T.S)',
      getsLead: 'Pelaksanaan Program BIZ TRUST dijangka menghasilkan empat (4) impak makro dan mikro utama yang diringkaskan melalui kerangka G.E.T.S.',
      getsFigCaption: 'Rajah 5.1 — Ilustrasi ekosistem penskalaan PMKS: integrasi aliran kerja automatik, analitik kewangan dan jaringan pasaran.',
      impactIndicatorsLabel: 'Petunjuk Impak Utama',
      getsItems: [
        {
          code: '13.1',
          letter: 'G',
          title: 'Growth (Pertumbuhan Perniagaan)',
          desc: 'Mempercepatkan pertumbuhan syarikat melalui pelaksanaan pelan transformasi, peningkatan kapasiti pengeluaran, penembusan pasaran baharu serta penggunaan teknologi digital.',
          indicators: [
            'Peningkatan saiz dan kapasiti operasi.',
            'Penambahan produk atau perkhidmatan baharu.',
            'Pembukaan cawangan atau titik jualan baharu.',
            'Kemasukan ke segmen pasaran baharu.',
          ],
        },
        {
          code: '13.2',
          letter: 'E',
          title: 'Employment (Peluang Pekerjaan)',
          desc: 'Pengembangan operasi perniagaan dijangka mewujudkan peluang pekerjaan baharu serta meningkatkan keperluan terhadap tenaga kerja tempatan yang berkemahiran.',
          indicators: [
            'Pertambahan pekerja tetap atau kontrak.',
            'Pengambilan tenaga kerja tempatan.',
            'Peningkatan peluang latihan & pembangunan kakitangan.',
          ],
        },
        {
          code: '13.3',
          letter: 'T',
          title: 'Turnover (Pendapatan & Kewangan)',
          desc: 'Melalui peningkatan kecekapan operasi dan strategi pemasaran yang lebih efektif, syarikat dijangka mencatat pertumbuhan hasil jualan dan margin keuntungan.',
          indicators: [
            'Peningkatan peratusan hasil jualan tahunan.',
            'Kepelbagaian saluran pendapatan syarikat.',
            'Peningkatan margin keuntungan bersih.',
            'Penambahbaikan pengurusan aliran tunai.',
          ],
        },
        {
          code: '13.4',
          letter: 'S',
          title: 'Sustainability (Kelestarian Perniagaan)',
          desc: 'Menekankan pembinaan perniagaan yang mampu bertahan dalam jangka panjang bukan sahaja dari sudut kewangan dan operasi, malah daripada aspek kepimpinan dan kesinambungan organisasi.',
          indicators: [
            'Pelaksanaan amalan tadbir urus yang baik.',
            'Pengukuhan sistem dan prosedur operasi (SOP).',
            'Penyediaan pelan penggantian kepimpinan (succession plan).',
            'Pembangunan bakat generasi penerus.',
            'Keupayaan menyesuaikan diri dengan teknologi & pasaran.',
            'Ketahanan menghadapi krisis dan cabaran ekonomi.',
          ],
        },
      ],
      addedValueTitle: '14.0 Nilai Tambah Program',
      addedValueLead: 'Bagi menggandakan keberkesanan pelaksanaan program, enam (6) komponen nilai tambah strategik disediakan kepada kesemua peserta.',
      addedValues: [
        {
          code: '14.1',
          title: 'Sistem Bimbingan Berstruktur',
          lead: 'Setiap kumpulan peserta menerima sokongan bersepadu daripada:',
          bullets: ['Coach tetap program.', 'Pakar bidang (Subject Matter Expert).', 'Usahawan berpengalaman sektor berkaitan.', 'Life Coach sokongan pembangunan kendiri.'],
        },
        {
          code: '14.2',
          title: 'Sesi Sembang Santai & Perkongsian Ilmu',
          lead: 'Sesi perkongsian praktikal secara bersemuka atau dalam talian:',
          bullets: ['E-Invois & pendigitalan perniagaan.', 'Pemasaran TikTok & media sosial.', 'Teknik pemasaran WhatsApp.', 'Penggunaan AI dalam pengurusan & produktiviti.'],
        },
        {
          code: '14.3',
          title: 'Analisis Psikometrik',
          desc: 'Peserta mengikuti penilaian psikometrik bagi mengenal pasti kecenderungan personaliti, gaya komunikasi, kekuatan kepimpinan dan potensi pembangunan diri.',
          footnote: 'Setiap penilaian disertakan laporan terperinci dan sijil pengesahan.',
        },
        {
          code: '14.4',
          title: 'Fasilitasi & Mentoring Tambahan',
          desc: 'Menyediakan sesi fasilitasi dan mentoring lanjutan selama tiga (3) bulan selepas tamat tempoh utama program tanpa sebarang bayaran tambahan.',
          footnote: 'Memastikan kesinambungan pelaksanaan pelan transformasi peserta.',
        },
        {
          code: '14.5',
          title: 'Fasilitasi Geran, Pembiayaan & IP',
          desc: 'Peserta dibantu mengenal pasti peluang geran, insentif dan kemudahan pembiayaan bersesuaian, merangkumi panduan dokumen sokongan serta perlindungan harta intelek (cap dagangan, paten & hak cipta).',
        },
        {
          code: '14.6',
          title: 'Akses Jaringan Perniagaan',
          lead: 'Pendedahan menyertai jaringan perniagaan tempatan dan antarabangsa:',
          bullets: ['Peluang kerjasama & pemadanan perniagaan (business matching).', 'Akses pasaran dan saluran pengedaran baharu.', 'Hubungan bersama bakal pelabur & rakan strategik.'],
        },
      ],
      budgetKicker: 'Bahagian 16.0 · Struktur Kewangan',
      budgetTitle: '16.0 Anggaran Perbelanjaan Program',
      budgetLead: 'Anggaran kos pelaksanaan adalah berdasarkan penyertaan seramai tiga puluh (30) orang peserta PMKS untuk tempoh enam (6) bulan penuh.',
      chartTitle: 'Infografik Agihan Kos Asas (RM 366,500)',
      tableHeaders: { no: 'Bil.', item: 'Perkara Perbelanjaan', amount: 'Jumlah (RM)', share: 'Agihan' },
      budgetRows: [
        { no: 1, item: 'Pendaftaran dan penyaringan peserta', amount: 20000, percent: 5.5, color: '#64748B' },
        { no: 2, item: 'Pengurusan dan pentadbiran program', amount: 96000, percent: 26.2, color: '#1E3A8A' },
        { no: 3, item: 'Ujian personaliti dan penilaian kesediaan perniagaan', amount: 15000, percent: 4.1, color: '#9A6B2F' },
        { no: 4, item: 'Latihan keusahawanan intensif (4H3M)', amount: 48000, percent: 13.1, color: '#0D9488' },
        { no: 5, item: 'Sesi coaching individu dan berkumpulan', amount: 157500, percent: 43.0, color: '#0F5149' },
        { no: 6, item: 'Lawatan pemantauan ke premis peserta', amount: 30000, percent: 8.2, color: '#78350F' },
      ],
      subtotalLabel: 'Jumlah Kos Operasi Asas',
      subtotalAmount: 'RM 366,500',
      sstLabel: 'Cukai Perkhidmatan SST (8%)',
      sstAmount: 'RM 29,320',
      grandTotalLabel: 'JUMLAH KOS KESELURUHAN',
      grandTotalAmount: 'RM 395,820',
      perParticipantLabel: 'Kos Keseluruhan Seorang Peserta (30 Peserta)',
      perParticipantAmount: 'RM 13,194.00',
      budgetNote: 'Nota: Anggaran kos tertakluk kepada skop akhir, pengesahan perkhidmatan dan keperluan pelaksanaan program.',
      closingTitle: '17.0 Penutup',
      closingSubtitle: 'Kesimpulan dan rumusan pelaksanaan Program BIZ TRUST',
      closingParagraphs: [
        'Program BIZ TRUST dirangka sebagai satu inisiatif pembangunan keusahawanan yang menyeluruh dan berorientasikan hasil, dengan matlamat membangunkan perusahaan yang lebih berdaya saing, mampan dan berimpak tinggi.',
        'Melalui gabungan latihan berstruktur, diagnostik perniagaan, bimbingan profesional, pemantauan prestasi serta sokongan jaringan strategik, program ini dijangka mampu membantu peserta melaksanakan transformasi sebenar dalam pengurusan dan operasi syarikat.',
        'Pendekatan yang digunakan bukan sekadar memberikan pendedahan ilmu keusahawanan, sebaliknya menekankan pelaksanaan tindakan yang boleh diukur melalui peningkatan jualan, produktiviti, kecekapan operasi, pengurusan kewangan dan keupayaan pengembangan perniagaan.',
        'Dalam jangka panjang, program ini diharapkan dapat melahirkan lebih ramai usahawan yang mempunyai struktur pengurusan profesional, sistem perniagaan yang kukuh serta keupayaan untuk bersaing dalam pasaran domestik dan antarabangsa.',
      ],
      closingHighlight: 'Sehubungan itu, pelaksanaan Program BIZ TRUST diharapkan mendapat pertimbangan dan sokongan sewajarnya bagi merealisasikan agenda pembangunan perusahaan yang progresif, mampan dan berimpak tinggi kepada ekonomi negara.',
      footerText: '© 2026 Program BIZ TRUST · Kertas Kerja Cadangan Digital',
    },
    modal: {
      rootCauseLabel: 'Analisis Punca Masalah',
      interventionLabel: 'Intervensi Program BIZ TRUST',
    },
  },
  en: {
    brand: 'Program BIZ TRUST',
    nav: {
      overview: 'Overview',
      mofass: 'M.O.F.A.S.S',
      curriculum: 'Curriculum',
      evaluation: 'KPI & Monitoring',
      impactBudget: 'Impact & Budget',
    },
    actions: {
      print: 'Print Proposal',
      downloadPdf: 'Download PDF',
      generatingPdf: 'Generating PDF...',
      explore: 'Explore Chapters',
      close: 'Close',
      viewDetail: 'Inspect Detail',
      expandAll: 'Expand All Modules',
      collapseAll: 'Compact View',
      chapterIndex: 'Chapter Index',
      languageLabel: 'Language',
    },
    hero: {
      kicker: 'Official Proposal 2026 · MSME Scale-Up Blueprint · Bilingual Edition',
      title: 'Program BIZ TRUST: High-Impact Strategy for Business Scale-Up',
      subtitle:
        'A structured six-month enterprise transformation program integrating M.O.F.A.S.S diagnostics, ten executive entrepreneurship modules, dedicated coaching, and measurable KPI governance.',
      leadQuote:
        'Building micro, small, and medium enterprises with institutional governance, financial resilience, and readiness for regional market expansion.',
      metrics: [
        { label: 'Program Duration', value: '6 Months', sub: '+ 3 months post-program mentoring' },
        { label: 'Target Cohort', value: '30 MSMEs', sub: '6 structured coaching pods' },
        { label: 'Core Curriculum', value: '10 Modules', sub: '4D3N intensive & applied labs' },
        { label: 'Cost Per Participant', value: 'RM 13,194', sub: 'Inclusive of 8% SST (RM 395,820)' },
      ],
    },
    chapters: [
      { id: 'section-intro', num: '01', label: 'Introduction & Background' },
      { id: 'section-mofass', num: '02', label: 'M.O.F.A.S.S Framework' },
      { id: 'section-curriculum', num: '03', label: 'Roadmap, Modules & Coaching' },
      { id: 'section-evaluation', num: '04', label: 'KRA, KPI & Monitoring' },
      { id: 'section-impact', num: '05', label: 'G.E.T.S Impact & Budget' },
    ],
    intro: {
      chapterNum: '01',
      chapterTitle: 'Introduction & Program Background',
      pageLabel: 'Sections 1.0 – 6.0',
      p1: 'In an increasingly complex and competitive commercial landscape, enterprise success is no longer measured solely by short-term profit. Instead, long-term viability is defined by organizational sustainability, management discipline, operational system strength, and the capacity to generate lasting economic value.',
      p2: 'Program BIZ TRUST is introduced as a strategic capability-building initiative designed to guide founders and business owners in establishing robust institutional foundations, elevating management competency, and scaling operations systematically.',
      figCaption: 'Fig. 1.1 — Initial diagnostic review and transformation roadmap alignment between MSME founders and strategic advisors.',
      figTitle: 'Transitioning from Founder-Dependent Operations to System-Driven Enterprises',
      challengesTitle: '2.0 Core Challenges Faced by MSMEs',
      challengesHint: 'Select any challenge card to examine root causes and the BIZ TRUST program intervention.',
      challenges: [
        {
          code: '01',
          title: 'Weak Strategic Planning',
          summary: 'Absence of clear growth direction and documented long-term action plans.',
          detail: 'Many MSMEs operate reactively day to day without phased growth targets, annual strategic milestones, or a structured market expansion roadmap.',
          intervention: 'Addressed in Modules 1 & 2 through SWOT/TOWS analysis, Business Model Canvas (BMC), and a 12–36 month Business Roadmap.',
        },
        {
          code: '02',
          title: 'Unsystematic Financial Management',
          summary: 'Inconsistent cash flow tracking, cost controls, and financial statements.',
          detail: 'Commingled personal and corporate accounts, irregular profit-and-loss reporting, and weak unit-margin tracking hinder sound capital allocation.',
          intervention: 'Addressed in Module 3 and Finance KPIs with standardized cash-flow templates and monthly coach-reviewed accounts.',
        },
        {
          code: '03',
          title: 'Low Operational Efficiency & No SOPs',
          summary: 'Heavy day-to-day operational dependency on the business owner.',
          detail: 'Without documented Standard Operating Procedures (SOPs), operational errors repeat, quality fluctuates, and founders remain trapped in micromanagement.',
          intervention: 'Addressed in Module 5 and on-site premise visits to establish HR, Finance, and Operations SOPs alongside clear Job Descriptions (JDs).',
        },
        {
          code: '04',
          title: 'Limited Access to Financing (Bankability)',
          summary: 'Incomplete financial records and governance weaken funding eligibility.',
          detail: 'High-potential firms frequently struggle to secure institutional loans or investor capital due to fragmented corporate records and missing projections.',
          intervention: 'Addressed in Module 8 and Value-Add 14.5 through bankable documentation preparation, grant advisory, and IP protection.',
        },
      ],
      goalsTitle: '3.0 Program Goals',
      goalsP1: 'The overarching goal of Program BIZ TRUST is to cultivate entrepreneurs and enterprises equipped with professional management capabilities, competitive agility, structured governance, and long-term sustainability through holistic business transformation.',
      goalsP2: 'The program further aims to produce enterprises capable of accelerating revenue, optimizing resource utilization, strengthening financial health, raising productivity, and expanding into wider domestic and international markets.',
      objectivesTitle: '4.0 Program Objectives',
      objectives: [
        { code: '4.1', title: 'Comprehensive Diagnostics', desc: 'Assess baseline business health and growth potential through structured enterprise diagnostics.' },
        { code: '4.2', title: 'SWOT & TOWS Analysis', desc: 'Identify internal strengths, weaknesses, external opportunities, threats, and priority improvements.' },
        { code: '4.3', title: 'Actionable Transformation Plan', desc: 'Formulate a tailored business transformation roadmap aligned with company strategic targets.' },
        { code: '4.4', title: 'Specialist Advisory Support', desc: 'Guide execution through technical domain experts, management coaches, and capability builders.' },
        { code: '4.5', title: 'Enhanced Competitiveness', desc: 'Elevate operational efficiency, productivity, and resilience amid evolving market pressures.' },
        { code: '4.6', title: 'Financing Readiness (Bankable)', desc: 'Strengthen financial governance to manage obligations and unlock expansion capital.' },
      ],
      purposeTitle: '5.0 Strategic Purpose of Execution',
      purposeLead: 'This program establishes a strategic capability platform dedicated to building sustainable businesses among MSME founders. Specifically, execution focuses on six pillars:',
      purposes: [
        { code: '01', title: 'Sustainable Foundations', desc: 'Strengthening strategic planning, operations, human capital, and financial management.' },
        { code: '02', title: 'Responsible Culture', desc: 'Nurturing founders attentive to community impact, environmental stewardship, and stakeholders.' },
        { code: '03', title: 'Competitive Scaling', desc: 'Embedding structured scaling practices to command stronger market positioning.' },
        { code: '04', title: 'Governance Discipline', desc: 'Raising compliance with documented procedures, operating standards, and corporate governance.' },
        { code: '05', title: 'Strategic Networks', desc: 'Unlocking collaborations, knowledge exchange, and partnerships locally and internationally.' },
        { code: '06', title: 'Capital Accessibility', desc: 'Establishing audit-ready records and management structure to support financing.' },
      ],
      targetTitle: '6.0 Target Cohort & Participation Scope',
      targetLead: 'The program targets a curated cohort of thirty (30) entrepreneurs or company owners representing micro, small, and medium enterprises (MSMEs).',
      criteriaHeading: 'General Eligibility Criteria',
      criteria: [
        'Active business owner or principal executive currently in operation.',
        'Established product or service already commercialized in the market.',
        'Demonstrated commitment to scaling and improving business performance.',
        'Full availability to complete the six (6) month structured program.',
        'Willingness to furnish operational and financial records for performance evaluation.',
        'Commitment to set measurable growth targets and execute improvement action plans.',
        'Readiness to actively participate in workshops, coaching sessions, and site monitoring.',
      ],
      priorityNoteLabel: 'Selection Priority',
      priorityNote: 'Priority is accorded to enterprises exhibiting strong growth potential, clear expansion commitment, and readiness to implement management transformation.',
    },
    mofass: {
      chapterNum: '02',
      chapterTitle: 'M.O.F.A.S.S Diagnostic Framework',
      pageLabel: '6 Core Pillars',
      lead: 'Program BIZ TRUST deploys the M.O.F.A.S.S architecture as its diagnostic, coaching, and performance benchmarking engine across six interdependent pillars of an enterprise.',
      diagramTitle: 'Fig. 2.1 — Integrated M.O.F.A.S.S Architecture',
      diagramHint: 'Select any pillar node on the diagram to inspect its diagnostic scope and transformation deliverables.',
      outcomesLabel: 'Core Transformation Outcomes',
      items: [
        {
          key: 'M',
          letter: 'M',
          title: 'Marketing',
          subtitle: 'Brand Equity, CSR & Market Penetration',
          description: 'Evaluates advertising effectiveness, media visibility, CSR initiatives, and channel penetration across digital and physical touchpoints.',
          outcomes: ['Data-driven omnichannel marketing roadmap', 'Stronger brand identity & packaging standards', 'Improved customer acquisition efficiency'],
          color: '#0F5149',
        },
        {
          key: 'O',
          letter: 'O',
          title: 'Operation',
          subtitle: 'Workflow Efficiency & SOP Compliance',
          description: 'Audits daily workflows, production capacity, quality benchmarks, and Standard Operating Procedures (SOPs) to reduce founder bottlenecks.',
          outcomes: ['Documented and enforced Operational SOPs', 'Reduced turnaround waste and process defects', 'Scalable production and fulfillment capacity'],
          color: '#1E3A8A',
        },
        {
          key: 'F',
          letter: 'F',
          title: 'Finance & Account',
          subtitle: 'Cash Flow, Costing & Bankability',
          description: 'Strengthens monthly bookkeeping, true unit-cost accounting, cash-flow forecasting, and audit-ready financial statements for credit access.',
          outcomes: ['Up-to-date monthly P&L and cash flow ledgers', 'Disciplined gross and net margin management', 'Bankable financial documentation package'],
          color: '#9A6B2F',
        },
        {
          key: 'A',
          letter: 'A',
          title: 'Administration & HR',
          subtitle: 'Talent Structure, JDs & Governance',
          description: 'Structures organizational roles, formal Job Descriptions (JDs), staff training schedules, and governance routines for high-performing teams.',
          outcomes: ['Clear org chart and enforced Job Descriptions', 'Structured staff training & internal coaching cadence', 'High-accountability culture & succession readiness'],
          color: '#7C2D12',
        },
        {
          key: 'S1',
          letter: 'S',
          title: 'Sales',
          subtitle: 'Monthly Revenue, B2B/B2C & Basket Size',
          description: 'Drives top-line revenue expansion through structured B2C and B2B client acquisition, higher average order value, and strategic SKU mix.',
          outcomes: ['Consistent monthly sales growth (Mandatory KPI)', 'Diversified B2B and B2C client pipelines', 'Higher average basket size and repeat purchase rate'],
          color: '#065F46',
        },
        {
          key: 'S2',
          letter: 'S',
          title: 'System & Automation',
          subtitle: 'Digitization, CRM & Workflow Automation',
          description: 'Integrates modern business tools including POS, CRM, cloud accounting, e-Invoicing, and workflow automation to multiply team output.',
          outcomes: ['Transition from manual logs to integrated digital tools', 'Real-time CRM and sales analytics visibility', 'System readiness for multi-branch expansion'],
          color: '#334155',
        },
      ],
    },
    curriculum: {
      chapterNum: '03',
      chapterTitle: 'Implementation Roadmap, 10 Modules & Coaching',
      pageLabel: 'Sections 7.0 – 9.4',
      roadmapKicker: '6-Month Strategic Trajectory',
      roadmapTitle: 'Timeline, Core Activities & Phase Deliverables',
      roadmapSub: 'A five-phase visual blueprint guiding the 30 selected MSMEs from baseline diagnostics to measurable scale-up.',
      deliverableLabel: 'Phase Output',
      phases: [
        {
          phase: 'Phase 1',
          month: 'Month 1',
          title: 'Preparation & Screening',
          activities: ['Outreach & registration', 'Screening of 30 MSMEs', 'Initial BMC & SWOT diagnostics', 'Site monitoring visit #1'],
          deliverable: 'Company profile & baseline performance benchmarks locked.',
        },
        {
          phase: 'Phase 2',
          month: 'Month 2',
          title: 'Entrepreneurship Training',
          activities: ['Delivery of 10 core modules', 'Case studies & applied labs', 'Action plan formulation', 'Kickoff of coaching pods'],
          deliverable: 'Module mastery & initial business transformation blueprint.',
        },
        {
          phase: 'Phase 3',
          month: 'Months 2 – 4',
          title: 'Continuous Coaching',
          activities: ['1-on-1 coaching (min. 3 sessions)', 'Group coaching (min. 4 sessions)', 'M.O.F.A.S.S execution sprints', 'Fireside chats on AI & e-Invoice'],
          deliverable: 'SOP deployment and resolution of operational bottlenecks.',
        },
        {
          phase: 'Phase 4',
          month: 'Month 5',
          title: 'Premise Monitoring',
          activities: ['On-site premise visit #2', '12-KPI progress audit', 'Subject Matter Expert intervention', 'Monthly progress review'],
          deliverable: 'Direct workflow optimization and product quality uplift.',
        },
        {
          phase: 'Phase 5',
          month: 'Month 6',
          title: 'Evaluation & Reporting',
          activities: ['Final pre/post assessment', 'KPI delta benchmarking', 'Executive report & dashboard', 'Transition to 3-mo mentoring'],
          deliverable: 'Official final report & G.E.T.S scale-up readiness.',
        },
      ],
      scheduleTitle: 'Master Activity Schedule Summary',
      scheduleSummary: [
        { step: '01', period: 'Month 1', desc: 'Preparation, cohort screening of 30 participants, psychometric testing & baseline diagnostics.' },
        { step: '02', period: 'Month 2', desc: 'Intensive 4D3N entrepreneurship residency covering all 10 comprehensive modules.' },
        { step: '03', period: 'Months 2 – 6', desc: 'Continuous individual and group coaching backed by permanent coaches and domain experts.' },
        { step: '04', period: 'Months 1 & 5', desc: 'Two mandatory on-site premise visits per participant for hands-on operational verification.' },
        { step: '05', period: 'Month 6', desc: 'Final performance audit, KPI comparative analysis, and executive dashboard presentation.' },
      ],
      modulesOverviewTitle: '10-Module Executive Curriculum Overview',
      modulesDetailTitle: '8.0 Detailed 10-Module Entrepreneurship Curriculum',
      modulesDetailLead: 'The training curriculum comprises ten systematically sequenced modules designed to strengthen management discipline, executive leadership, and scalable growth.',
      objectiveLabel: 'Module Objective',
      syllabusLabel: 'Core Syllabus',
      modules: [
        {
          number: 1,
          code: 'MODULE 01',
          title: 'Business Diagnostics & Performance',
          objective: 'Guides participants to diagnose current company standing, identify strengths and gaps, and establish clear growth direction.',
          topics: [
            'SWOT and TOWS Matrix strategic analysis.',
            'Business Model Canvas (BMC) architecture.',
            'Enterprise performance and capability scoring.',
            'Standard Operating Procedure (SOP) engineering.',
            'HR, Finance & Operations SOP template kit.',
            'Formulating a structured Business Roadmap.',
          ],
        },
        {
          number: 2,
          code: 'MODULE 02',
          title: 'Strategic Planning',
          objective: 'Equips founders to craft actionable strategic plans aligned with long-term company vision and market expansion goals.',
          topics: [
            'Corporate strategic planning methodology.',
            'Defining vision, mission, and growth milestones.',
            'Corporate digital transformation strategy.',
            'Brand positioning and market development.',
            'Market penetration and expansion playbooks.',
            'Drafting the Enterprise Transformation Plan.',
          ],
        },
        {
          number: 3,
          code: 'MODULE 03',
          title: 'Financial Management',
          objective: 'Builds financial literacy to manage cash flow, control operating costs, and protect profit margins for sustained stability.',
          topics: [
            'Cash flow forecasting and liquidity control.',
            'Cost containment and expenditure discipline.',
            'Gross and net margin profitability analysis.',
            'Comprehensive annual business budgeting.',
            'Short- and long-term capital planning.',
            'Corporate financial ratio & health diagnostics.',
          ],
        },
        {
          number: 4,
          code: 'MODULE 04',
          title: 'Leadership & Change Management',
          objective: 'Strengthens entrepreneurial leadership to drive organizational change and cultivate a high-performance workplace culture.',
          topics: [
            'Transformational leadership practices.',
            'Organizational change management.',
            'Building a constructive performance culture.',
            'Managing and motivating high-output teams.',
            'Executive communication and conflict resolution.',
            'Talent development & leadership succession planning.',
          ],
        },
        {
          number: 5,
          code: 'MODULE 05',
          title: 'Operational Excellence & SOPs',
          objective: 'Provides systematic operations management frameworks to elevate productivity, consistency, and output quality.',
          topics: [
            'Setting operational Key Performance Indicators (KPIs).',
            'Mapping and streamlining core workflows.',
            'Developing and enforcing practical SOPs.',
            'Daily productivity tracking mechanisms.',
            'Resource allocation and operating cost optimization.',
            'Integrating technology into daily operations.',
          ],
        },
        {
          number: 6,
          code: 'MODULE 06',
          title: 'Digitization & Automation',
          objective: 'Introduces digital platforms and workflow automation tools to eliminate manual bottlenecks and boost management speed.',
          topics: [
            'Applying digital tools across core operations.',
            'Customer Relationship Management (CRM) systems.',
            'End-to-end workflow automation.',
            'Modern cloud productivity applications.',
            'Integrating cross-department business software.',
            'Digital dashboards for real-time KPI tracking.',
          ],
        },
        {
          number: 7,
          code: 'MODULE 07',
          title: 'Branding & Intellectual Property',
          objective: 'Helps participants build a credible, differentiated brand identity backed by formal intellectual property protection.',
          topics: [
            'Brand identity and positioning architecture.',
            'Strategic brand marketing execution.',
            'Building market trust and brand recall.',
            'Long-term brand equity roadmap.',
            'Intellectual Property (IP) filing and protection.',
            'Rebranding and commercial packaging upgrades.',
          ],
        },
        {
          number: 8,
          code: 'MODULE 08',
          title: 'Financing Access & Governance',
          objective: 'Prepares enterprises to access grants and institutional financing through bankable records and sound corporate governance.',
          topics: [
            'Mapping grants, incentives, and credit facilities.',
            'Preparing company eligibility for financing.',
            'Compiling bankable financial documentation.',
            'Corporate recordkeeping and statutory compliance.',
            'Corporate governance best practices.',
            'Investor readiness and strategic partnership pitching.',
          ],
        },
        {
          number: 9,
          code: 'MODULE 09',
          title: 'Marketing & Market Expansion',
          objective: 'Sharpens marketing execution to capture new customer segments across digital and offline channels.',
          topics: [
            'Advanced performance & digital marketing.',
            'Product and service value-proposition messaging.',
            'Target market segmentation & buyer personas.',
            'Omnichannel customer acquisition strategies.',
            'Customer retention and loyalty engineering.',
            'Leveraging marketing analytics for ROI.',
          ],
        },
        {
          number: 10,
          code: 'MODULE 10',
          title: 'Scalability & Business Growth',
          objective: 'Guides participants in designing systematic, repeatable scaling models for multi-branch, franchise, or export growth.',
          topics: [
            'Entering new industry verticals and territories.',
            'Multi-year scaling architecture.',
            'Operational replication & branch expansion.',
            'Franchising and business licensing models.',
            'Strategic alliances and joint ventures.',
            'Export readiness and regional market entry.',
          ],
        },
      ],
      practicalNote: 'Training combines conceptual rigor with hands-on application via real-world case studies, interactive simulations, peer roundtables, and live coaching.',
      coachingTitle: '9.0 Executive Coaching & Mentorship Architecture',
      coachingLead: 'Coaching serves as the primary translation engine ensuring classroom insights turn into measurable operational and financial improvements inside every participating business.',
      coachingSubLead: 'The coaching methodology is anchored on four structured support pillars:',
      coachingFigCaption: 'Fig. 3.1 — Five-founder group coaching roundtable led by a senior mentor reviewing operational metrics and execution hurdles.',
      individual: {
        title: '9.1 Individual Coaching',
        desc: 'Each participant completes at least three (3) 1-on-1 coaching sessions, with a minimum of two (2) conducted face-to-face. Sessions integrate personal executive effectiveness (life coaching) and enterprise execution (business coaching).',
        listTitle: '6 M.O.F.A.S.S Coaching Dimensions',
        items: [
          'Marketing',
          'Operation',
          'Finance & Account',
          'Administration & HR',
          'Sales',
          'System & Automation',
        ],
      },
      group: {
        title: '9.2 Group Coaching',
        p1: 'Each participant is required to attend at least four (4) group coaching sessions, with a minimum of two (2) held in person.',
        p2: 'Using a phased peer-learning format, founders share operational breakthroughs, troubleshoot common bottlenecks, and co-create practical solutions.',
      },
      support: {
        title: '9.3 Multi-Tier Support Pod (5 Founders / Group)',
        lead: 'Every cohort pod of five (5) participants receives dedicated mentorship from four specialist roles:',
        roles: [
          { role: 'Permanent Coach', desc: 'Guides founders in executing short- and long-term transformation milestones.' },
          { role: 'Subject Matter Expert (SME)', desc: 'Provides technical problem-solving and industry best practices.' },
          { role: 'Veteran Entrepreneur', desc: 'Shares real-world lessons, pitfalls, and scaling playbooks from adjacent sectors.' },
          { role: 'Life Coach', desc: 'Supports leadership resilience, emotional wellbeing, motivation, and work-life alignment.' },
        ],
      },
      interactive: {
        title: '9.4 Interactive Fireside & Knowledge Sessions',
        lead: 'Participants gain access to informal in-person and virtual knowledge clinics covering timely operational topics:',
        topicsTitle: 'Featured Clinic Topics',
        topics: [
          'Phased e-Invoice compliance & setup',
          'TikTok commerce & short-form video growth',
          'WhatsApp conversational sales funnels',
          'Practical Artificial Intelligence (AI) workflows',
          'Digitizing back-office business operations',
          'Sales conversion & customer retention tactics',
          'Current policy & MSME regulatory updates',
        ],
      },
    },
    evaluation: {
      chapterNum: '04',
      chapterTitle: 'KRA & KPI Assessment, Monitoring & Final Reporting',
      pageLabel: 'Sections 10.0 – 12.2',
      kraTitle: '10.0 Entrepreneur Performance Evaluation',
      kraLead: 'Performance evaluation tracks measurable enterprise progression and validates the impact of transformation initiatives throughout the six-month cycle.',
      kraDetailP1: 'Each participant selects six (6) Key Result Areas (KRAs) and twelve (12) Key Performance Indicators (KPIs) tailored to their company growth stage and industry dynamics.',
      kraDetailP2: 'Every KPI is benchmarked against Month 1 baseline figures and verified at Month 6 using documentary evidence and coach sign-off.',
      mandatoryNote: 'Mandatory Rule: Revenue / Sales Growth KPI is compulsory for all 30 participating enterprises.',
      kraSubTitle: '10.1 KRA & KPI Assessment Matrix',
      allFilter: 'All 6 Domains',
      kraDomains: [
        {
          id: 'A',
          code: 'A',
          title: 'Marketing',
          kpis: [
            'Number of Corporate Social Responsibility (CSR) initiatives.',
            'Advertising & promotion spend efficiency and ROI.',
            'Media publicity and brand reach metrics.',
            'Number and effectiveness of distribution & sales channels.',
            'Online and offline platform conversion performance.',
          ],
        },
        {
          id: 'B',
          code: 'B',
          title: 'Operation',
          kpis: [
            'Development and adherence to Standard Operating Procedures (SOPs).',
            'Product quality and competitiveness enhancements.',
            'Workflow streamlining and cycle-time reduction.',
            'Competitive product benchmarking execution.',
            'Equipment upgrades expanding operational capacity.',
          ],
        },
        {
          id: 'C',
          code: 'C',
          title: 'Finance & Accounting',
          kpis: [
            'Average monthly and annual gross profit.',
            'Average net profit after operating expenses.',
            'Structured and consistently updated cash flow ledger.',
            'Accurate and timely Profit & Loss (P&L) statements.',
            'Unit costing across operations, marketing, and production.',
          ],
        },
        {
          id: 'D',
          code: 'D',
          title: 'Administration & HR',
          kpis: [
            'Strategic headcount expansion aligned with org needs.',
            'Total employee training days completed.',
            'Number of internal coaching sessions attended by staff.',
            'Structured participation in operational meetings.',
            'Preparation and adherence to formal Job Descriptions (JDs).',
          ],
        },
        {
          id: 'E',
          code: 'E',
          title: 'Sales',
          mandatoryNote: 'Includes Compulsory Sales Growth KPI',
          kpis: [
            'Monthly gross sales revenue (Mandatory KPI).',
            'Number of new B2C customers acquired.',
            'Number of new B2B client accounts secured.',
            'Average customer transaction value (Basket Size).',
            'Active Stock Keeping Units (SKUs) or service lines.',
          ],
        },
        {
          id: 'F',
          code: 'F',
          title: 'System & Automation',
          kpis: [
            'Deployment of integrated business management software.',
            'Digital sales & POS / CRM system adoption.',
            'Cloud financial and accounting system implementation.',
            'Operations and logistics tracking software.',
            'HR automation & scalability system readiness.',
          ],
        },
      ],
      monitoringTitle: '11.0 Site Monitoring & 12.0 Final Reporting',
      monitoringSubTitle: '11.0 On-Site Premise Monitoring Visits',
      monitoringLead: 'At least two (2) on-site monitoring visits are conducted at each participant’s premises to deliver hands-on advisory, verify operational progress, and trigger targeted expert intervention where needed.',
      mechanismsTitle: '11.1 Three-Pronged Monitoring Mechanism',
      mechanisms: [
        {
          code: 'A',
          title: 'Monthly Progress Reports',
          desc: 'Participants submit monthly filings tracking sales, operations, marketing, KPI attainment, transformation milestones, and operational blockers.',
        },
        {
          code: 'B',
          title: 'Coach & Expert Site Audits',
          desc: 'Direct on-premise evaluation across all six M.O.F.A.S.S pillars led by assigned coaches and industry specialists.',
        },
        {
          code: 'C',
          title: 'Pre & Post Program Surveys',
          desc: 'Quantitative measurement of management capability uplift, business health progression, and revenue expansion.',
        },
      ],
      reportTitle: '12.0 Final Program Reporting Deliverables',
      reportLead: 'Upon program completion, comprehensive outcomes are delivered in two authoritative formats: a formal Written Report and a Visual Executive Dashboard.',
      writtenReport: {
        title: '12.1 Formal Written Report',
        items: [
          { label: 'Cohort Demographic Analysis', desc: 'Breakdown by founder age, gender, educational background, geography, and industry vertical.' },
          { label: 'Participant Feedback Audit', desc: 'Satisfaction scores across training modules, coaching quality, and continuous improvement notes.' },
          { label: 'Pre & Post Benchmarking', desc: 'Objective comparison of management competency, financial discipline, and operational maturity.' },
          { label: 'Achievements & Case Studies', desc: 'Directory of high-growth firms, revenue/profit growth figures, and documented success stories.' },
        ],
      },
      dashboardReport: {
        title: '12.2 Visual Analytics & 8-Dimension Dashboard',
        lead: 'The executive dashboard tracks cohort performance across eight (8) core maturity dimensions:',
        aspects: [
          'Operations Management — SOP compliance & efficiency',
          'Marketing Strategy — Digital & traditional reach',
          'Sales & Revenue — Top-line & profit growth',
          'Financial Management — Cash flow, cost & margins',
          'Technology & Automation — Digitization depth',
          'Product & Innovation — Quality & value upgrades',
          'Leadership & HR — Workforce productivity & culture',
          'Scalability Readiness — Capacity for next-tier growth',
        ],
        footnote: 'The dashboard also incorporates an Issue & Resolution Tracker highlighting systemic participant bottlenecks and corrective actions deployed.',
      },
    },
    impactBudget: {
      chapterNum: '05',
      chapterTitle: 'G.E.T.S Impact, Added Value & Program Budget',
      pageLabel: 'Sections 13.0 – 17.0',
      getsTitle: '13.0 Program Outcomes & Impact (G.E.T.S Framework)',
      getsLead: 'Program BIZ TRUST is engineered to deliver four measurable macro and micro economic outcomes summarized under the G.E.T.S framework.',
      getsFigCaption: 'Fig. 5.1 — Editorial illustration of the MSME scaling ecosystem connecting automated workflows, financial ledgers, and market networks.',
      impactIndicatorsLabel: 'Key Impact Indicators',
      getsItems: [
        {
          code: '13.1',
          letter: 'G',
          title: 'Growth (Enterprise Expansion)',
          desc: 'Accelerates company expansion through disciplined transformation execution, higher production throughput, new market entry, and digital adoption.',
          indicators: [
            'Expansion of physical and operational scale.',
            'Launch of new product or service lines.',
            'Opening of new branches or retail footprints.',
            'Entry into new domestic or regional markets.',
          ],
        },
        {
          code: '13.2',
          letter: 'E',
          title: 'Employment (Job Creation)',
          desc: 'Business expansion directly generates new employment opportunities while elevating demand for skilled local talent.',
          indicators: [
            'Creation of new full-time and contract roles.',
            'Hiring of local skilled and semi-skilled talent.',
            'Expanded staff upskilling and training opportunities.',
          ],
        },
        {
          code: '13.3',
          letter: 'T',
          title: 'Turnover (Revenue & Profitability)',
          desc: 'Improved operational efficiency and sharper marketing execution drive sustainable increases in top-line revenue and net profit margins.',
          indicators: [
            'Higher annual gross sales turnover percentage.',
            'Diversification across multiple revenue streams.',
            'Improved net profit margins via cost discipline.',
            'Healthier and more predictable cash-flow cycles.',
          ],
        },
        {
          code: '13.4',
          letter: 'S',
          title: 'Sustainability (Long-Term Resilience)',
          desc: 'Builds durable enterprises engineered to thrive across economic cycles through sound governance, succession planning, and institutional systems.',
          indicators: [
            'Adoption of transparent corporate governance.',
            'Reinforced operating systems and SOP compliance.',
            'Documented leadership succession plans.',
            'Development of next-generation management talent.',
            'Agility in adapting to market and tech shifts.',
            'Structural resilience against economic downturns.',
          ],
        },
      ],
      addedValueTitle: '14.0 Program Value-Added Components',
      addedValueLead: 'To maximize transformation ROI, six (6) high-value support components are embedded at no additional charge to participants.',
      addedValues: [
        {
          code: '14.1',
          title: 'Structured Multi-Mentor System',
          lead: 'Every participant pod is backed by four complementary experts:',
          bullets: ['Dedicated permanent coach.', 'Subject Matter Experts (SMEs).', 'Seasoned industry entrepreneurs.', 'Executive Life Coach for founder resilience.'],
        },
        {
          code: '14.2',
          title: 'Interactive Knowledge Clinics',
          lead: 'Practical hybrid clinics addressing fast-moving tools:',
          bullets: ['e-Invoicing & digital compliance.', 'TikTok & short-form video commerce.', 'WhatsApp sales automation.', 'Applied AI for SME productivity.'],
        },
        {
          code: '14.3',
          title: 'Psychometric Profiling',
          desc: 'Participants undergo validated psychometric assessments to uncover leadership tendencies, communication styles, cognitive strengths, and growth areas.',
          footnote: 'Includes an individualized analytical report and official certificate.',
        },
        {
          code: '14.4',
          title: '3-Month Post-Program Mentoring',
          desc: 'Includes three (3) additional months of follow-up facilitation and mentoring after the core six-month curriculum concludes, at zero extra cost.',
          footnote: 'Safeguards long-term execution momentum.',
        },
        {
          code: '14.5',
          title: 'Grants, Financing & IP Advisory',
          desc: 'Hands-on guidance to identify suitable government grants, incentives, and financing lines, alongside supporting documentation and Intellectual Property (trademark, patent & copyright) filing.',
        },
        {
          code: '14.6',
          title: 'Business & Investor Networking',
          lead: 'Curated exposure to domestic and international business ecosystems:',
          bullets: ['Structured B2B collaboration & business matching.', 'New distribution and market channel access.', 'Introductions to prospective investors & strategic partners.'],
        },
      ],
      budgetKicker: 'Section 16.0 · Financial Schedule',
      budgetTitle: '16.0 Program Budget Estimate',
      budgetLead: 'The cost structure is calibrated for a full cohort of thirty (30) MSME participants across the six (6) month execution period.',
      chartTitle: 'Base Cost Allocation Breakdown (RM 366,500)',
      tableHeaders: { no: 'No.', item: 'Budget Line Item', amount: 'Amount (RM)', share: 'Share' },
      budgetRows: [
        { no: 1, item: 'Participant registration and cohort screening', amount: 20000, percent: 5.5, color: '#64748B' },
        { no: 2, item: 'Program management and administration', amount: 96000, percent: 26.2, color: '#1E3A8A' },
        { no: 3, item: 'Psychometric profiling and business readiness audit', amount: 15000, percent: 4.1, color: '#9A6B2F' },
        { no: 4, item: 'Intensive entrepreneurship training (4D3N)', amount: 48000, percent: 13.1, color: '#0D9488' },
        { no: 5, item: 'Individual and group executive coaching sessions', amount: 157500, percent: 43.0, color: '#0F5149' },
        { no: 6, item: 'On-site premise monitoring visits', amount: 30000, percent: 8.2, color: '#78350F' },
      ],
      subtotalLabel: 'Subtotal Base Operating Cost',
      subtotalAmount: 'RM 366,500',
      sstLabel: 'Service Tax SST (8%)',
      sstAmount: 'RM 29,320',
      grandTotalLabel: 'TOTAL PROGRAM INVESTMENT',
      grandTotalAmount: 'RM 395,820',
      perParticipantLabel: 'All-Inclusive Cost Per Participant (30 MSMEs)',
      perParticipantAmount: 'RM 13,194.00',
      budgetNote: 'Note: Final budget figures are subject to finalized scope confirmation, service specifications, and execution requirements.',
      closingTitle: '17.0 Conclusion',
      closingSubtitle: 'Synthesis and institutional endorsement summary for Program BIZ TRUST',
      closingParagraphs: [
        'Program BIZ TRUST is architected as a comprehensive, outcome-driven entrepreneurship development initiative aimed at building more competitive, resilient, and high-impact MSMEs.',
        'Through the integration of structured training, diagnostic auditing, professional coaching, rigorous KPI monitoring, and strategic network access, the program empowers founders to execute tangible operational and management transformation.',
        'Rather than stopping at theoretical instruction, the methodology emphasizes measurable execution evidenced by higher sales revenue, improved productivity, streamlined operations, disciplined financial governance, and expansion readiness.',
        'Over the long horizon, Program BIZ TRUST aims to cultivate a new tier of professionally managed enterprises with durable internal systems capable of competing both domestically and internationally.',
      ],
      closingHighlight: 'Accordingly, Program BIZ TRUST is submitted for favorable consideration and strategic backing to advance a progressive, sustainable, and high-impact MSME ecosystem for the national economy.',
      footerText: '© 2026 Program BIZ TRUST · Official Digital Proposal',
    },
    modal: {
      rootCauseLabel: 'Root-Cause Diagnostic',
      interventionLabel: 'BIZ TRUST Program Intervention',
    },
  },
};
