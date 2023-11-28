import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={12}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={12}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M19.542 14.514a1.001 1.001 0 0 1-1.64.77l-5.36-4.48-5.37 4.32a1 1 0 0 1-1.41-.15 1 1 0 0 1 .15-1.46l6-4.83a1 1 0 0 1 1.27 0l6 5a1 1 0 0 1 .36.83Z'
      }
      fill={'var(--color-light-100)'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const IconVectorUp = memo(ForwardRef)
