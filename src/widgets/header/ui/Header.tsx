'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Container } from '@/shared/ui/atoms/Container';

import { useHeaderCounters } from '../model/useHeaderCounters';

import styles from './Header.module.scss';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlistCount, cartCount } = useHeaderCounters();
  const pathname = usePathname();

  const handleSearchClick = () => {
    // TODO: Open search overlay
    console.log('Open search overlay');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchClick();
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <Image
                src="/images/logo.svg"
                alt="E-Store Logo"
                width={65.4}
                height={22.87}
                priority
              />
            </Link>
            {/* Search Field */}
            <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search products..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={handleSearchClick}
              />
              <svg
                className={styles.searchIcon}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </form>
          </div>
          <div className={styles.headerCenter}>
            {/* Navigation */}
            <nav className={styles.navigation}>
              <Link
                href="/"
                className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}
              >
                Contact Us
              </Link>
            </nav>
          </div>
          <div className={styles.headerRight}>
            {/* Icons */}
            <div className={styles.icons}>
              {/* User Icon */}
              <Link href="#" className={styles.iconButton} aria-label="User profile">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="11" r="5" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
              {/* Wishlist Icon */}
              <Link href="/wishlist" className={styles.iconButton} aria-label="Wishlist">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 27.5l-1.45-1.32C9.4 21.36 6 18.28 6 14.5 6 11.42 8.42 9 11.5 9c1.74 0 3.41.81 4.5 2.09C17.09 9.81 18.76 9 20.5 9 23.58 9 26 11.42 26 14.5c0 3.78-3.4 6.86-8.55 11.68L16 27.5z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
              </Link>
              {/* Cart Icon */}
              <Link href="/cart" className={styles.iconButton} aria-label="Shopping cart">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6h3l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L28 10H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="26" r="2" fill="currentColor" />
                  <circle cx="23" cy="26" r="2" fill="currentColor" />
                </svg>
                {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};
