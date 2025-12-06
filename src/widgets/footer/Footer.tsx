import Link from 'next/link';

import { Container } from '@/shared/ui/atoms/Container';
import { Icon } from '@/shared/ui/atoms/Icon';

import { FOOTER_DATA } from './constants';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.info}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <Icon name="footer-logo" />
            </div>
            <p className={styles.description}>{FOOTER_DATA.description}</p>
          </div>

          <div className={styles.navigation}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{FOOTER_DATA.services.title}</h3>
              {FOOTER_DATA.services.links.map((link) => (
                <Link key={link.name} href={link.href} className={styles.footerLink}>
                  {link.name}
                </Link>
              ))}
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{FOOTER_DATA.assistance.title}</h3>
              {FOOTER_DATA.assistance.links.map((link) => (
                <Link key={link.name} href={link.href} className={styles.footerLink}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.socialIcons}>
          {FOOTER_DATA.socialMedia.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className={styles.socialIcon}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={social.icon} />
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
};
