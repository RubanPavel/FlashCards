import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgSearch = (
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
        'm20.7 19.3-3.4-3.4a8 8 0 0 0 .4-9.3 8 8 0 1 0-1.8 10.7l3.4 3.4a1 1 0 1 0 1.4-1.4ZM5 11a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z'
      }
      fill={color}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgSearch)
const IconSearch = memo(ForwardRef)

export default IconSearch
