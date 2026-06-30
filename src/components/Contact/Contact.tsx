import styles from "./Contact.module.scss";

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <p>Contact</p>
      <h2>Let&apos;s work together.</h2>
      <div className={styles.links}>
        <a href="mailto:opi@example.com">Mail</a>
        <a href="https://github.com" target="_blank" rel="noreferrer">Github</a>
      </div>
    </section>
  );
}
