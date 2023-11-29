import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgPerson = (
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
        'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 8a7 7 0 0 0-7 7 1 1 0 1 0 2 0 5 5 0 1 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7Z'
      }
      fill={color}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgPerson)
const IconPerson = memo(ForwardRef)

export default IconPerson
