import { Heart } from 'lucide-react';

type FavoriteIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  stroke?: string;
  fill?: string;
  isOutline?: boolean;
  className?: string;
};

export default function FavoriteIcon({
  size = 24,
  stroke = 'currentColor',
  fill = 'none',
  isOutline = false,
  className,
}: FavoriteIconProps) {
  return (
    <Heart
      className={className}
      height={size}
      width={size}
      stroke={stroke}
      fill={isOutline ? 'none' : fill}
    ></Heart>
  );
}
