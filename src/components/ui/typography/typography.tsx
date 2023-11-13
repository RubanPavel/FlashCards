import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'span'> = {
  as?: T
  variant:
    | 'H1'
    | 'H2'
    | 'H3'
    | 'body-1'
    | 'body-2'
    | 'caption'
    | 'large'
    | 'link-1'
    | 'link-2'
    | 'overline'
    | 'subtitle-1'
    | 'subtitle-2'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'span'>(props: TypographyProps<T>) => {
  const { as: Component = 'span', className, variant, ...rest } = props

  return <Component className={`${s['base-font']} ${s[variant]} ${className}`} {...rest} />
}
