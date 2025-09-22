type ChevronIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  fill?: string;
  svgClassName?: string;
};

export default function ChevronIcon({
  size = 24,
  fill = 'currentColor',
  svgClassName,
  ...props
}: ChevronIconProps) {
  return (
    <svg
      className={svgClassName}
      width={size}
      height={size}
      viewBox='0 -960 960 960'
      fill={fill}
      {...props}
    >
      <path d='M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z' />
    </svg>
  );
}
