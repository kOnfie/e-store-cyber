import styles from './Icon.module.scss';

interface IconProps {
  name?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon = ({ name, width, height, className }: IconProps) => {
  if (!name) return null;

  return (
    <span className={`${styles.icon} ${className || ''}`}>
      <img
        src={`/icons/${name}.svg`}
        alt={name}
        width={width}
        height={height}
        style={{ width: width || 'auto', height: height || 'auto' }}
      />
    </span>
  );
};
