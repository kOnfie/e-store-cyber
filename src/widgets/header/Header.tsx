'use client';

import { useState } from 'react';

import { HeaderBurger } from './ui/HeaderBurger';
import { HeaderDrawer } from './ui/HeaderDrawer';
import { HeaderIcons } from './ui/HeaderIcons';
import { HeaderLogo } from './ui/HeaderLogo';
import { HeaderNav } from './ui/HeaderNav';
import { HeaderSearch } from './ui/HeaderSearch';

import styles from './Header.module.scss';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <HeaderLogo />
          <HeaderSearch />
        </div>
        <div className={styles.headerCenter}>
          <HeaderNav />
        </div>
        <div className={styles.headerRight}>
          <HeaderIcons />
          <HeaderBurger onClick={() => setMenuOpen(true)} />
        </div>
      </div>
      <HeaderDrawer
        open={menuOpen}
        closing={drawerClosing}
        onClose={() => {
          setDrawerClosing(true);
          setTimeout(() => {
            setMenuOpen(false);
            setDrawerClosing(false);
          }, 250);
        }}
      />
    </header>
  );
};
