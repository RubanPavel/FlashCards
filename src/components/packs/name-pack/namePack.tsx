import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './namePack.module.scss'

export const NamePack = () => {
  const onClickHandler = () => {
    alert('Назад в Packs List')
  }

  return (
    <div className={s.container}>
      <div className={s.fieldBack} onClick={onClickHandler}>
        <IconLeftArrow transform={'translate(0, 2)'} />
        <Typography variant={'body-2'}>Back to Packs List</Typography>
      </div>
      <div className={s.namePack}>
        <Typography as={'h1'} variant={'large'}>
          Name Pack
        </Typography>
      </div>
      <div className={s.content}>
        <Typography className={s.text} variant={'body-1'}>
          This pack is empty. Click add new card to fill this pack
        </Typography>
        <Button onClick={() => {}}>
          <Typography variant={'subtitle-2'}>Add New Card</Typography>
        </Button>
      </div>
    </div>
  )
}
