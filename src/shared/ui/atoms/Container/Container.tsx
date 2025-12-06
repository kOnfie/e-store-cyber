import { ReactNode } from 'react';

import styles from './Container.module.scss';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'large';
}

export const Container = ({ children, className, size = 'default' }: ContainerProps) => {
  const containerClass = size === 'large' ? styles.containerLarge : styles.container;
  return <div className={`${containerClass} ${className || ''}`}>{children}</div>;
};
