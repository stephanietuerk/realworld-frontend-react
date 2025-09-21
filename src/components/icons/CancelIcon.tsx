type CloseIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  stroke?: string;
  fill?: string;
  svgClassName?: string;
  circleClassName?: string;
  lineClassName?: string;
};

export default function CancelIcon({
  size = 24,
  stroke = 'currentColor',
  fill = 'none',
  svgClassName,
  circleClassName,
  lineClassName,
  ...props
}: CloseIconProps) {
  return (
    <svg
      className={svgClassName}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      stroke={stroke}
      fill={fill}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <circle cx='12' cy='12' r='10' className={circleClassName} />
      <line x1='15' y1='9' x2='9' y2='15' className={lineClassName} />
      <line x1='9' y1='9' x2='15' y2='15' className={lineClassName} />
    </svg>
  );
}
