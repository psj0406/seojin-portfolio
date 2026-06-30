import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <a href="#top" className={styles.logo} aria-label="Park Seojin portfolio home">PS.</a>
      <nav className={styles.nav} aria-label="Main navigation">
        <a href="#works">Works</a>
        <a href="#career">Career</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
