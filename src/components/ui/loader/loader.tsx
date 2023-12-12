import s from './loader.module.scss'
import { clsx } from 'clsx'

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
