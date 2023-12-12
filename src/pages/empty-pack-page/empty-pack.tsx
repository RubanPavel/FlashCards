import { Link } from 'react-router-dom'

import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useCreateCardMutation } from '@/services/decks'

import s from './emptyPack.module.scss'

type EmptyDeckProps = {
  id?: string
  isMyPack: boolean
  packName: string | undefined
}

export const EmptyPack = ({ id, isMyPack, packName }: EmptyDeckProps) => {
  const [createCard] = useCreateCardMutation()
  const createCardHandler = () => {
    if (id) {
      createCard({ answer: 'Hello world', id, question: 'Hello friend' })
    }
  }

  return (
    <div className={s.container}>
      <Link className={s.fieldBack} to={'/packs'}>
        <IconLeftArrow transform={'translate(0, 2)'} />
        <Typography variant={'body-2'}>Back to Packs List</Typography>
      </Link>
      <div className={s.namePack}>
        <Typography as={'h1'} variant={'large'}>
          {packName}
        </Typography>
      </div>
      {isMyPack ? (
        <div className={s.content}>
          <Typography className={s.text} variant={'body-1'}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button onClick={() => createCardHandler()}>
            <Typography variant={'subtitle-2'}>Add New Card</Typography>
          </Button>
        </div>
      ) : (
        <div className={s.content}>
          <Typography className={s.text} variant={'body-1'}>
            This pack is empty.
          </Typography>
        </div>
      )}
    </div>
  )
}
