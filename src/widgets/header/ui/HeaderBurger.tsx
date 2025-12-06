import styles from '../Header.module.scss';

export const HeaderBurger = ({ onClick }: { onClick: () => void }) => (
  <button className={styles.burger} aria-label="Open menu" onClick={onClick} type="button">
    <span className={styles.burgerLines}>
      <span />
      <span />
      <span />
    </span>
  </button>
);
