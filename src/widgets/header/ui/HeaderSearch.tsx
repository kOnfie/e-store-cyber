import { useState } from 'react';

import { Icon } from '@/shared/ui/atoms/Icon';

import styles from '../Header.module.scss';

export const HeaderSearch = ({ onSearchClick }: { onSearchClick?: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchClick) onSearchClick();
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search products..."
        className={styles.searchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClick={onSearchClick}
      />
      <div className={styles.searchIcon}>
        <Icon name="search" width={24} height={24} />
      </div>
    </form>
  );
};
