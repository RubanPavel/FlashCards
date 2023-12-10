import { RefObject } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useDeleteDeskMutation } from '@/services/decks'

import s from './deletePack.module.scss'

type Props = {
  closeRef: RefObject<HTMLButtonElement>
  id: string
  name: string
}

export const DeletePack = ({ closeRef, id, name }: Props) => {
  /*const inputRef = React.useRef<HTMLInputElement | null>(null)*/
  const [deleteDeck, {}] = useDeleteDeskMutation()

  const onCloseClick = () => {
    if (closeRef.current) {
      closeRef.current.click()
    }
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Typography as={'p'} variant={'H2'}>
          Delete Pack
        </Typography>
      </div>
      <div className={s.content}>
        <div>
          <Typography variant={'body-1'}>
            {'Do you really want to remove'}
            <Typography as={'span'} variant={'subtitle-1'}>
              {' ' + name}?
            </Typography>
          </Typography>
        </div>
        <Typography variant={'body-1'}>{'All cards will be deleted.'}</Typography>
        <div className={s.button}>
          <Button onClick={onCloseClick} type={'button'}>
            <Typography as={'p'} variant={'subtitle-2'}>
              Cancel
            </Typography>
          </Button>
          <Button
            onClick={() => {
              deleteDeck(id)
            }}
            type={'button'}
            variant={'secondary'}
          >
            <Typography as={'p'} variant={'subtitle-2'}>
              Delete Pack
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}
