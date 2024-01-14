import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import s from './DeleteModal.module.scss'

type Props = {
  card?: any
  deck?: any
  handleDelete: () => void
  onClose: (val: boolean) => void
  title: string
}

export const DeleteModal = ({ deck, card, onClose, handleDelete }: Props) => {
  const isDeletePack = deck
  const handleOpenModalDeleteDecks = () => {
    handleDelete()
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
