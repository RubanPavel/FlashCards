import { modalCommon, packsPageData } from '@/assets/variable'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './deleteModal.module.scss'
// TODO проверить что тут с типизацией по возможности сделать более универсальной
type Props = {
  card?: any
  deck?: any
  handleDelete: () => void
  onClose: (val: boolean) => void
  title: string
}

export const DeleteModal = ({ card, deck, handleDelete, onClose }: Props) => {
  const { info, question, submitButton } = packsPageData.modals.deletePack
  const { cancelButton } = modalCommon
  const handleOpenModalDeleteDecks = () => {
    handleDelete()
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div>
          <Typography variant={'body-1'}>
            {`${question.main} `}
            <Typography as={'span'} variant={'subtitle-1'}>
              {`${question.span} - ${deck?.name || card?.question}?`}
            </Typography>
          </Typography>
        </div>
        <Typography variant={'body-1'}>{info}</Typography>
        <div className={s.button}>
          <Button onClick={() => onClose(false)} type={'button'}>
            <Typography as={'p'} variant={'subtitle-2'}>
              {cancelButton}
            </Typography>
          </Button>
          <Button onClick={handleOpenModalDeleteDecks} type={'button'} variant={'secondary'}>
            <Typography as={'p'} variant={'subtitle-2'}>
              {submitButton}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}
