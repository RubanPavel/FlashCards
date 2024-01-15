import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { optionsToast } from '@/assets/variable'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useDeleteCardMutation } from '@/services/cards'
import { useDeleteDeskMutation } from '@/services/decks'

import s from './deleteModal.module.scss'

type Props = {
  card?: any
  deck?: any
  isNavigate?: boolean
  onClose: (val: boolean) => void
  title: string
}

export const DeleteModalOld = ({ card, deck, isNavigate, onClose, title }: Props) => {
  console.log('card', card)
  console.log('deck', deck)
  const [deleteDeck] = useDeleteDeskMutation()
  const [deleteCard] = useDeleteCardMutation()
  const navigate = useNavigate()
  const isDeletePack = title === 'Delete Pack'
  const handleOpenModalDeleteDecks = async () => {
    try {
      if (isDeletePack) {
        await deleteDeck(deck.id)
        console.log(deck.id)
      } else {
        await deleteCard(card.id)
        console.log(card.id)
      }
      toast.success(
        isDeletePack ? 'Pack deleted successfully' : 'Card deleted successfully',
        optionsToast
      )
      onClose(false)
      isNavigate && navigate(-1)
    } catch (error: any) {
      toast.error('An error occurred while deleting.', optionsToast)
    }
  }

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
          <Button onClick={handleOpenModalDeleteDecks} type={'button'} variant={'secondary'}>
            <Typography as={'p'} variant={'subtitle-2'}>
              Delete {isDeletePack ? 'Pack' : 'Card'}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}
