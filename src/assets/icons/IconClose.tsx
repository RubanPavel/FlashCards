import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgClose = (
  {
    className,
    color = `var(--color-light-100)`,
    fill = 'none',
    height = '24',
    width = '24',
    ...rest
  }: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    className={className}
    fill={fill}
    height={height}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={width}
    xmlns={'http://www.w3.org/2000/svg'}
    {...rest}
  >
    <path
      d={
        'm13.4 12 4.3-4.3a1 1 0 1 0-1.4-1.4L12 10.6 7.7 6.3a1 1 0 0 0-1.4 1.4l4.3 4.3-4.3 4.3A1 1 0 0 0 7 18a1 1 0 0 0 .7-.3l4.3-4.3 4.3 4.3a1 1 0 1 0 1.4-1.4L13.4 12Z'
      }
      fill={color}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgClose)

export const IconClose = memo(ForwardRef)
