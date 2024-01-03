import { useState } from 'react'
import { Link } from 'react-router-dom'

import { IconClose } from '@/assets/icons/IconClose'
import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { AddNewCard } from '@/components/packs/modals/addNewCard'
import { Button } from '@/components/ui/button'
import { ModalsNew } from '@/components/ui/modals/modalsNew'
import { Typography } from '@/components/ui/typography'

import s from './emptyPack.module.scss'

type EmptyDeckProps = {
  id?: string
  isMyPack: boolean
  packName: string | undefined
}

export const EmptyPack = ({ id, isMyPack, packName }: EmptyDeckProps) => {
  const [open, onClose] = useState(false)

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
          <ModalsNew
            className={{ title: s.modalTitle }}
            icon={<IconClose className={s.IconButton} />}
            onClose={onClose}
            open={open}
            title={
              <Typography as={'p'} variant={'H2'}>
                Add New Card
              </Typography>
            }
            trigger={
              <Button onClick={() => {}}>
                <Typography variant={'subtitle-2'}>Add New Card</Typography>
              </Button>
            }
          >
            <AddNewCard id={id} onClose={val => onClose(val)} />
          </ModalsNew>
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
