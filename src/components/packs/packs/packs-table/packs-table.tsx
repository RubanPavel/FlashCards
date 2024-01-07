import { useState } from 'react'
import { Link } from 'react-router-dom'

import { IconClose } from '@/assets/icons/IconClose'
import { IconVectorDown } from '@/assets/icons/IconVectorDown'
import { dateOptions, packsPageData } from '@/assets/variable'
import { EditPack } from '@/components/packs/modals/editPack'
import { Button } from '@/components/ui/button'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconEdit } from '@/components/ui/dropdown-menu/assets/IconEdit'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
import { ModalsNew } from '@/components/ui/modals/modalsNew'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { DeleteModal } from '@/pages/common/delete-modal/deleteModal'
import { AuthResponse } from '@/services/auth'
import { DecksResponse, Sort } from '@/services/decks'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import clsx from 'clsx'

import 'react-loading-skeleton/dist/skeleton.css'

import s from './packs-table.module.scss'

type Props = {
  decks: DecksResponse
  user: AuthResponse
}

export const PacksTable = ({ decks, user }: Props) => {
  const { columnsData } = packsPageData.packsTable
  const dispatch = useAppDispatch()
  const params = useAppSelector(state => state.decksParams)
  const [openModalDelete, onCloseModalDelete] = useState<boolean>(false)
  const [openModalEditPack, onCloseModalEditPack] = useState<boolean>(false)

  const handleSort = (sort: '' | Sort) => {
    const currentSort = params.orderBy.split('-')[0]
    const direction = params.orderBy.split('-')[1]

    if (sort !== currentSort && sort !== '') {
      dispatch(decksActions.setOrderBy({ orderBy: `${sort}-asc` }))
    } else if (sort !== '') {
      const newDirection = direction === 'desc' ? 'asc' : 'desc'

      dispatch(decksActions.setOrderBy({ orderBy: `${sort}-${newDirection}` }))
    }
  }

  return (
    <Table className={s.wrapperTable}>
      <TableHead>
        <TableRow>
          {columnsData.map(el => (
            <TableHeadCell key={el.id}>
              <Button
                className={s.HeadCellButton}
                onClick={() => handleSort(el.sort)}
                variant={'icon'}
              >
                <Typography variant={'subtitle-2'}>{el.title}</Typography>
                {el.sort === params.orderBy.split('-')[0] && (
                  <IconVectorDown
                    className={`${s.HeadCellButtonIcon} ${
                      params.orderBy.split('-')[1] === 'asc' && s.HeadCellButtonIcon_Is_Flipped
                    }`}
                  />
                )}
              </Button>
            </TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {decks?.items.map(d => {
          const packPath = d.author.id !== user?.id ? `/friend-pack/${d.id}` : `/my-pack/${d.id}`

          return (
            <TableRow key={d.id}>
              <TableCell>
                <Link className={s.CellLink} to={packPath}>
                  {d.cover && (
                    <img alt={'img'} className={s.coverStyle} src={d.cover?.toString()} />
                  )}
                  <Typography as={'span'} className={s.CellText} variant={'subtitle-1'}>
                    {d.name}
                  </Typography>
                  <div className={s.ModalCell}>
                    {d.cover && (
                      <img alt={'img'} className={s.coverStyle} src={d.cover?.toString()} />
                    )}
                    <Typography
                      as={'span'}
                      className={clsx(s.test, s.ModalCellText)}
                      variant={'subtitle-1'}
                    >
                      {d.name}
                    </Typography>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <Typography as={'p'} variant={'body-2'}>
                  {d.cardsCount}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography as={'p'} variant={'body-2'}>
                  {new Date(d.updated).toLocaleDateString('ru-RU', dateOptions)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography as={'p'} variant={'body-2'}>
                  {d.author.name}
                </Typography>
              </TableCell>
              <TableCell>
                <div className={s.lastCell}>
                  <Button as={Link} to={`/learn/${d.id}`} variant={'icon'}>
                    <IconLearn />
                  </Button>
                  {d.author.id === user?.id && (
                    <>
                      <ModalsNew
                        className={{ title: s.modalTitle }}
                        icon={<IconClose className={s.IconButton} />}
                        onClose={onCloseModalEditPack}
                        open={openModalEditPack}
                        title={
                          <Typography as={'p'} variant={'H2'}>
                            Edit Pack
                          </Typography>
                        }
                        trigger={
                          <Button variant={'icon'}>
                            <IconEdit />
                          </Button>
                        }
                      >
                        <EditPack deck={d} onClose={val => onCloseModalEditPack(val)} />
                      </ModalsNew>

                      <ModalsNew
                        className={{ title: s.modalTitle }}
                        icon={<IconClose className={s.IconButton} />}
                        onClose={onCloseModalDelete}
                        open={openModalDelete}
                        title={
                          <Typography as={'p'} variant={'H2'}>
                            Delete Pack
                          </Typography>
                        }
                        trigger={
                          <Button variant={'icon'}>
                            <IconDelete />
                          </Button>
                        }
                      >
                        <DeleteModal
                          id={d.id}
                          name={d.name}
                          onClose={val => onCloseModalDelete(val)}
                          title={'Delete Pack'}
                        />
                      </ModalsNew>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
