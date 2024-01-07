import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'18'}
    ref={ref}
    viewBox={'0 0 18 18'}
    width={'18'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <circle cx={'9'} cy={'9'} r={'8.5'} stroke={'white'} />
    <g clipPath={'url(#clip0_37397_1168)'}>
      <path
        d={
          'M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10Z'
        }
        fill={'white'}
      />
      <path
        d={
          'M9 6.5C9.55228 6.5 10 6.05228 10 5.5C10 4.94772 9.55228 4.5 9 4.5C8.44772 4.5 8 4.94772 8 5.5C8 6.05228 8.44772 6.5 9 6.5Z'
        }
        fill={'white'}
      />
      <path
        d={
          'M9 13.5C9.55228 13.5 10 13.0523 10 12.5C10 11.9477 9.55228 11.5 9 11.5C8.44772 11.5 8 11.9477 8 12.5C8 13.0523 8.44772 13.5 9 13.5Z'
        }
        fill={'white'}
      />
    </g>
    <defs>
      <clipPath id={'clip0_37397_1168'}>
        <rect fill={'white'} height={'12'} transform={'translate(3 3)'} width={'12'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const IconBurgerMenu = memo(ForwardRef)
