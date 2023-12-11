import s from './loader.module.scss'

export const Loader = () => {
  return (
    <div className={s.root}>
      <span className={s.loader}></span>
    </div>
  )
}
