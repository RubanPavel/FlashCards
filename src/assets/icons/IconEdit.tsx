import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgEdit = (
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
        'M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2ZM5 18l4.3-.4a2 2 0 0 0 1.2-.6l9-9a2 2 0 0 0-.1-2.7l-2.7-2.7a2 2 0 0 0-2.7 0l-9 9a2 2 0 0 0-.6 1.1L4 17a1 1 0 0 0 1 1ZM15.3 4 18 6.7l-2 2L13.3 6l2-2Zm-9 9L12 7.2l2.7 2.7-5.6 5.6-3 .3.3-3Z'
      }
      fill={color}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgEdit)

export const IconEdit = memo(ForwardRef)
