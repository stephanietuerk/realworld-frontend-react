import { Check, Minus, Plus } from 'lucide-react';

type FollowIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  stroke?: string;
  fill?: string;
  variant?: 'plus' | 'check' | 'minus';
  className?: string;
  pathClassName?: string;
};

export default function AddAddedIcon({
  size = 20,
  variant = 'plus',
  className,
}: FollowIconProps) {
  return (
    <>
      {variant === 'plus' ? (
        <Plus className={className} size={size} />
      ) : variant === 'check' ? (
        <Check className={className} size={size} />
      ) : (
        <Minus className={className} size={size} />
      )}
    </>
  );
}
