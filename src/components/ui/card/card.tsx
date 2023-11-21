import { ReactNode } from 'react'

import s from './card.module.scss'

export type CardProps = {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={`${s.card} ${className}`}>{children}</div>
}
