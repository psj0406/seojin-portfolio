export type Project = {
  id: string;
  no: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  type: string;
  scope: string[];
  tech: string[];
  overview: string;
  note?: string;
};

export const projects: Project[] = [
  {
    id: "jb-capital",
    no: "01",
    title: "JB우리캐피탈",
    subtitle: "Homepage Renewal",
    year: "2025",
    role: "Frontend Publishing",
    type: "Finance / Corporate",
    scope: ["UI publishing", "Responsive layout", "Interaction", "Maintenance-ready structure"],
    tech: ["HTML", "SCSS", "JavaScript", "jQuery"],
    overview:
      "프리랜서 프로젝트로 참여한 금융사 홈페이지 구축 및 통합 리뉴얼 작업입니다. 화면 단위 구현보다 실제 운영 환경에서 유지보수 가능한 구조를 우선했습니다.",
    note: "대표 프로젝트"
  },
  {
    id: "mohw-operation",
    no: "02",
    title: "보건복지부",
    subtitle: "Public Websites Operation",
    year: "2021 — 2023",
    role: "Main Publisher",
    type: "Public / Accessibility",
    scope: ["Main publishing", "Web accessibility", "Site renewal", "Monthly operation"],
    tech: ["HTML", "CSS", "jQuery", "Accessibility"],
    overview:
      "보건복지부 및 산하기관 사이트 제작·개편·운영을 담당했습니다. 공공기관 특성상 웹접근성, 안정성, 반복 운영을 고려한 퍼블리싱이 핵심이었습니다."
  },
  {
    id: "kdi-school",
    no: "03",
    title: "KDI School",
    subtitle: "Admission Platform",
    year: "2022",
    role: "Main Publisher",
    type: "Education / Multilingual",
    scope: ["Admission pages", "Multilingual UI", "Responsive", "Accessibility"],
    tech: ["HTML", "CSS", "JavaScript", "jQuery"],
    overview:
      "입학 홈페이지와 뉴스센터, 원스톱 사이트 등 다국어 기반 화면을 제작했습니다. 정보량이 많은 교육 플랫폼의 구조화와 화면 일관성에 집중했습니다."
  },
  {
    id: "consumer-webzine",
    no: "04",
    title: "소비자시대 웹진",
    subtitle: "Monthly Web Magazine",
    year: "2019 — 2023",
    role: "Main Publisher",
    type: "Magazine / Operation",
    scope: ["Main renewal", "Monthly publishing", "Content templates", "Operation"],
    tech: ["HTML", "CSS", "jQuery", "Template UI"],
    overview:
      "한국소비자원 웹 매거진의 메인 퍼블리싱과 매달 발행되는 콘텐츠 퍼블리싱을 장기간 담당했습니다. 반복 작업의 효율과 콘텐츠 가독성을 함께 고려했습니다."
  },
  {
    id: "kohes",
    no: "05",
    title: "KOHES",
    subtitle: "Global Healthcare Portal",
    year: "2021",
    role: "Main Publisher",
    type: "Public / Portal",
    scope: ["Portal renewal", "UI publishing", "Related site", "Responsive"],
    tech: ["HTML", "CSS", "jQuery", "Accessibility"],
    overview:
      "의료해외진출 종합정보포털 기능 개선 및 연관 사이트 제작을 담당했습니다. 포털형 정보 구조에서 사용자가 필요한 정보를 빠르게 찾을 수 있도록 UI를 정리했습니다."
  },
  {
    id: "civil-chatbot",
    no: "06",
    title: "민원상담 365",
    subtitle: "Chatbot Common Platform",
    year: "2021",
    role: "Main Publisher",
    type: "Government / System UI",
    scope: ["System UI", "Chatbot UI", "Publishing", "Interaction"],
    tech: ["HTML", "CSS", "jQuery", "JavaScript"],
    overview:
      "범정부 민원상담 365 사이트 및 챗봇 시스템의 UI/UX 개발을 담당했습니다. 일반 웹페이지와 시스템 UI가 함께 쓰이는 환경을 고려했습니다."
  },
  {
    id: "peter-market",
    no: "07",
    title: "피터씨마켓",
    subtitle: "Cafe24 Commerce",
    year: "2023",
    role: "Main Publisher",
    type: "Commerce / Cafe24",
    scope: ["Cafe24 build", "Theme publishing", "Product UI", "Operation"],
    tech: ["Cafe24", "HTML", "SCSS", "jQuery"],
    overview:
      "카페24 기반 신규 홈페이지 구축 프로젝트입니다. 커머스 운영 환경에서 필요한 상품, 메인, 공통 UI 구성을 담당했습니다."
  },
  {
    id: "sunroom-dress",
    no: "08",
    title: "썬룸 드레스",
    subtitle: "Cafe24 Commerce",
    year: "2023",
    role: "Main Publisher",
    type: "Commerce / Cafe24",
    scope: ["Cafe24 build", "Responsive UI", "Common components", "Publishing"],
    tech: ["Cafe24", "HTML", "SCSS", "jQuery"],
    overview:
      "카페24 기반 신규 홈페이지 구축을 진행했습니다. 브랜드 톤을 해치지 않으면서 운영자가 관리하기 쉬운 UI 구조를 중심으로 작업했습니다."
  },
  {
    id: "gukseonsaeng",
    no: "09",
    title: "국선생",
    subtitle: "Franchise Landing Page",
    year: "2023",
    role: "Main Publisher",
    type: "Landing / Franchise",
    scope: ["Landing page", "Main site fixes", "Responsive", "Interaction"],
    tech: ["HTML", "SCSS", "JavaScript", "jQuery"],
    overview:
      "프랜차이즈 랜딩페이지 제작과 메인 사이트 오류 수정을 담당했습니다. 짧은 페이지 안에서 정보 전달과 전환 흐름이 자연스럽게 이어지도록 구성했습니다."
  },
  {
    id: "coolschool",
    no: "10",
    title: "쿨스쿨",
    subtitle: "Current Work",
    year: "2025 — Now",
    role: "Publisher",
    type: "EdTech / Service",
    scope: ["Service UI", "Publishing", "Component styling", "Operation"],
    tech: ["HTML", "SCSS", "JavaScript", "Vite"],
    overview:
      "현재 재직 중인 개발팀 퍼블리셔 업무입니다. 교육 서비스 환경에서 필요한 화면 구현과 운영 대응을 진행하고 있습니다."
  }
];
