import { RefObject } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useDeleteCardMutation } from '@/services/cards'
import { useDeleteDeskMutation } from '@/services/decks'

import s from './deleteModal.module.scss'

type Props = {
  closeRef: RefObject<HTMLButtonElement>
  id: string
  name: string
  title: string
}

export const DeleteModal = ({ closeRef, id, name, title }: Props) => {
  /*const inputRef = React.useRef<HTMLInputElement | null>(null)*/
  const [deleteDeck] = useDeleteDeskMutation()
  const [deleteCard] = useDeleteCardMutation()
  const onCloseClick = () => {
    if (closeRef.current) {
      closeRef.current.click()
    }
  }

  const isDeletePack = title === 'Delete Pack'

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Typography as={'p'} variant={'H2'}>
          {isDeletePack ? 'Delete Pack' : 'Delete Card'}
        </Typography>
      </div>
      <div className={s.content}>
        <div>
          <Typography variant={'body-1'}>
            Do you really want to remove{' '}
            <Typography as={'span'} variant={'subtitle-1'}>
              {isDeletePack ? `pack - ${name}?` : `card - ${name}?`}
            </Typography>
          </Typography>
        </div>
        <Typography variant={'body-1'}>
          {isDeletePack ? 'All cards will be deleted.' : 'Your card will be deleted.'}
        </Typography>
        <div className={s.button}>
          <Button onClick={onCloseClick} type={'button'}>
            <Typography as={'p'} variant={'subtitle-2'}>
              Cancel
            </Typography>
          </Button>
          <Button
            onClick={() => {
              isDeletePack ? deleteDeck(id) : deleteCard(id)
            }}
            type={'button'}
            variant={'secondary'}
          >
            <Typography as={'p'} variant={'subtitle-2'}>
              Delete {isDeletePack ? 'Pack' : 'Card'}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}
