import styles from "./Career.module.scss";

const careers = [
  { period: "2025 — Now", title: "Coolschool", desc: "개발팀 · 퍼블리셔" },
  { period: "2024 — 2025", title: "Freelance Project", desc: "JB우리캐피탈 홈페이지 구축 및 통합 리뉴얼" },
  { period: "2023 — 2024", title: "Brand Curator", desc: "개발팀 · 팀장 · Cafe24 / 랜딩 / 커머스 구축" },
  { period: "2017 — 2023", title: "Plan I", desc: "퍼블리싱팀 · 공공기관 / 교육 / 포털 / 웹진 메인 퍼블리셔" }
];

export function Career() {
  return (
    <section id="career" className={styles.career}>
      <div className={styles.head}>
        <p>History</p>
        <h2>Career is kept short. Projects do the talking.</h2>
      </div>
      <div className={styles.timeline}>
        {careers.map((career) => (
          <article key={career.period} className={styles.item}>
            <span>{career.period}</span>
            <strong>{career.title}</strong>
            <p>{career.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
