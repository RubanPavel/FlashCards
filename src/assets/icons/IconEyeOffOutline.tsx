import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgEyeOffOutline = (
  {
    className,
    color = `var(--color-light-100)`,
    fill = 'none',
    height = 24,
    strokeWidth = 2,
    width = 24,
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
        'M4.7 3.3a1 1 0 1 0-1.4 1.4l5.6 5.6a3.5 3.5 0 0 0 4.8 4.8l5.6 5.6a1 1 0 1 0 1.4-1.4l-16-16ZM12 13.5a1.5 1.5 0 0 1-1.5-1.5l1.6 1.5H12Z'
      }
      fill={color}
    />
    <path
      d={
        'M12.2 17c-4.3.1-7.1-3.6-8-5 .6-1 1.4-2 2.3-2.7L5 7.9c-1.1 1-2.1 2.3-2.9 3.6a1 1 0 0 0 0 1c.7 1 4 6.5 10 6.5h.2c1 0 2.2-.3 3.2-.7l-1.6-1.6c-.5.2-1.1.3-1.7.3Zm9.7-5.5c-.7-1.1-4.2-6.7-10.2-6.5-1 0-2.2.3-3.2.7l1.6 1.5 1.7-.2c4.3-.1 7 3.6 8 5-.7 1-1.4 2-2.3 2.7l1.5 1.4c1.1-1 2.1-2.3 3-3.6a1 1 0 0 0-.1-1Z'
      }
      fill={color}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgEyeOffOutline)

export const IconEyeOffOutline = memo(ForwardRef)
