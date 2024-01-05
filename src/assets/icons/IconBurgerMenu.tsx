import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <>
    <svg
      fill={'none'}
      height={'18'}
      viewBox={'0 0 18 18'}
      width={'18'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <circle cx={'9'} cy={'9'} r={'8.5'} stroke={'white'} />
    </svg>
    <svg
      fill={'none'}
      height={12}
      ref={ref}
      style={{ marginLeft: -30, marginTop: 2 }}
      width={12}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 3.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
        }
        fill={'white'}
      />
    </svg>
  </>
)
const ForwardRef = forwardRef(SvgComponent)

export const IconBurgerMenu = memo(ForwardRef)
