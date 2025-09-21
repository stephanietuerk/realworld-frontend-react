type CloseIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  fill?: string;
  svgClassName?: string;
};

export default function CancelIcon({
  size = 24,
  fill = 'currentColor',
  svgClassName,
  ...props
}: CloseIconProps) {
  return (
    <svg
      className={svgClassName}
      width={size}
      height={size}
      viewBox='0 -960 960 960'
      fill={fill}
      {...props}
    >
      <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
    </svg>
  );
}
