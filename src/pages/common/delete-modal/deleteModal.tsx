import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useDeleteCardMutation } from '@/services/cards'
import { useDeleteDeskMutation } from '@/services/decks'

import s from './deleteModal.module.scss'

type Props = {
  card?: any
  deck?: any
  onClose: (val: boolean) => void
  title: string
}

export const DeleteModal = ({ card, deck, onClose, title }: Props) => {
  const [deleteDeck] = useDeleteDeskMutation()
  const [deleteCard] = useDeleteCardMutation()

  const isDeletePack = title === 'Delete Pack'

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div>
          <Typography variant={'body-1'}>
            Do you really want to remove{' '}
            <Typography as={'span'} variant={'subtitle-1'}>
              {isDeletePack ? `pack - ${deck.name}?` : `card - ${card.question}?`}
            </Typography>
          </Typography>
        </div>
        <Typography variant={'body-1'}>
          {isDeletePack ? 'All cards will be deleted.' : 'Your card will be deleted.'}
        </Typography>
        <div className={s.button}>
          <Button onClick={() => onClose(false)} type={'button'}>
            <Typography as={'p'} variant={'subtitle-2'}>
              Cancel
            </Typography>
          </Button>
          <Button
            onClick={() => {
              isDeletePack ? deleteDeck(deck.id) : deleteCard(card.id)
              onClose(false)
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
