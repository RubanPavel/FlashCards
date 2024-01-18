import { useNavigate } from 'react-router-dom'

import { cardsPageData, modalCommon, packsPageData } from '@/assets/variable'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './deleteModal.module.scss'
// TODO проверить что тут с типизацией по возможности сделать более универсальной
type Props = {
  card?: any
  deck?: any
  handleDelete: () => void
  isNavigate?: boolean
  onClose: (val: boolean) => void
  title: string
}

export const DeleteModal = ({ card, deck, handleDelete, isNavigate, onClose, title }: Props) => {
  const navigate = useNavigate()
  const { deletePack } = packsPageData.modals
  const { deleteCard } = cardsPageData.modals
  const { cancelButton } = modalCommon

  const isDeletePack = title === 'Delete Pack'
  const handleOpenModalDelete = () => {
    handleDelete()
    onClose(false)
    isNavigate && navigate(-1)
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div>
          <Typography variant={'body-1'}>
            {`${deletePack.question.main} `}
            <Typography as={'span'} variant={'subtitle-1'}>
              {isDeletePack
                ? `${deletePack.question.span} - ${deck?.name}?`
                : `${deleteCard.question.span} - ${card?.question}?`}
            </Typography>
          </Typography>
        </div>
        <Typography variant={'body-1'}>
          {isDeletePack ? deletePack.info : deleteCard.info}
        </Typography>
        <div className={s.button}>
          <Button onClick={() => onClose(false)} type={'button'}>
            <Typography as={'p'} variant={'subtitle-2'}>
              {cancelButton}
            </Typography>
          </Button>
          <Button onClick={handleOpenModalDelete} type={'button'} variant={'secondary'}>
            <Typography as={'p'} variant={'subtitle-2'}>
              {isDeletePack ? deletePack.submitButton : deleteCard.submitButton}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}
