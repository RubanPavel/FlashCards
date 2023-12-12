import { createRef } from 'react'
import { Link } from 'react-router-dom'

import { IconClose } from '@/assets/icons/IconClose'
import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { AddNewCard } from '@/components/packs/modals/addNewCard'
import { Button } from '@/components/ui/button'
import { Modals } from '@/components/ui/modals'
import { Typography } from '@/components/ui/typography'

import s from './emptyPack.module.scss'

type EmptyDeckProps = {
  id?: string
  isMyPack: boolean
  packName: string | undefined
}

export const EmptyPack = ({ id, isMyPack, packName }: EmptyDeckProps) => {
  const closeRef = createRef<HTMLButtonElement>()

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
          <Modals
            icon={<IconClose className={s.IconButton} />}
            ref={closeRef}
            trigger={
              <Button onClick={() => {}}>
                <Typography variant={'subtitle-2'}>Add New Card</Typography>
              </Button>
            }
          >
            <AddNewCard closeRef={closeRef} id={id} />
          </Modals>
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
