type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

export default function Icon({ name, size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className}>
      <use href={`/icons/sprite.svg#icon-${name}`} />
    </svg>
  );
}
