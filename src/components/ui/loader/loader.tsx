import { clsx } from 'clsx'

import s from './loader.module.scss'

type Props = {
  className?: string
}
export const Loader = ({ className }: Props) => {
  return (
    <div className={clsx(s.root, className)}>
      <span className={s.loader}></span>
    </div>
  )
}
