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
    // <svg
    //   className={svgClassName}
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 -960 960 960"
    //   height={size}
    //   width={size}
    //   stroke={stroke}
    //   fill={fill}
    // >
    //   {variant === 'plus' ? (
    //     <path
    //       className={pathClassName}
    //       d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
    //     />
    //   ) : variant === 'check' ? (
    //     <path
    //       className={pathClassName}
    //       d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
    //     />
    //   ) : (
    //     <path className={pathClassName} d="M200-440v-80h560v80H200Z" />
    //   )}
    // </svg>
  );
}
