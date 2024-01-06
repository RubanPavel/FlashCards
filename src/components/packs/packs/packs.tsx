import { useState } from 'react'
import { Link } from 'react-router-dom'

import { IconClose } from '@/assets/icons/IconClose'
import { IconVectorDown } from '@/assets/icons/IconVectorDown'
import { EditPack } from '@/components/packs/modals/editPack'
import { Button } from '@/components/ui/button'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconEdit } from '@/components/ui/dropdown-menu/assets/IconEdit'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
import { ModalsNew } from '@/components/ui/modals/modalsNew'
import { Pagination } from '@/components/ui/pagination'
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
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import clsx from 'clsx'

import s from './packs.module.scss'
import { dateOptions, packsPageData } from '@/assets/variable'
import 'react-loading-skeleton/dist/skeleton.css'
import { DecksResponse } from '@/services/decks'
import { PacksControls } from '@/components/packs/packs/packs-controls/packs-controls'

type Sort = '' | 'cardsCount' | 'created' | 'name' | 'updated'
type Direction = 'asc' | 'desc'

type Props = {
  user: AuthResponse
  decks: DecksResponse
}

export const Packs = ({ user, decks }: Props) => {
  const { columnsData } = packsPageData
  const dispatch = useAppDispatch()
  const params = useAppSelector(state => state.decksParams)
  const [openModalDelete, onCloseModalDelete] = useState<boolean>(false)
  const [openModalEditPack, onCloseModalEditPack] = useState<boolean>(false)

  const onSortByName = (sort: Sort, currentSort: Sort, direction: Direction) => {
    if (sort !== currentSort) {
      dispatch(decksActions.setOrderBy({ orderBy: `${sort}-asc` }))
    } else {
      const newDirection = direction === 'desc' ? 'asc' : 'desc'

      dispatch(decksActions.setOrderBy({ orderBy: `${sort}-${newDirection}` }))
    }
  }

  const pageValue = (currentPage: number, itemsPerPage: number) => {
    dispatch(decksActions.setCurrentPage({ currentPage }))
    dispatch(decksActions.setItemsPerPage({ itemsPerPage }))
  }

  const setCurrentPage = (currentPage: number) => {
    dispatch(decksActions.setCurrentPage({ currentPage }))
  }

  const setItemsPerPage = (itemsPerPage: number) => {
    dispatch(decksActions.setItemsPerPage({ itemsPerPage }))
  }

  // console.log('DELETE', openModalDelete)

  return (
    <div className={s.container}>
      <PacksControls user={user} decks={decks} />
      <div className={s.wrapperTable}>
        <Table>
          <TableHead>
            <TableRow>
              {columnsData.map(el => (
                <TableHeadCell key={el.id}>
                  <Button
                    className={s.HeadCellButton}
                    onClick={() =>
                      onSortByName(
                        el.sort,
                        params.orderBy.split('-')[0],
                        params.orderBy.split('-')[1]
                      )
                    }
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
              const packPath =
                d.author.id !== user?.id ? `/friend-pack/${d.id}` : `/my-pack/${d.id}`

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
        {decks?.items.length === 0 && (
          <Typography as={'p'} className={s.notFound} variant={'H2'}>
            По вашему запросу ничего не найдено
          </Typography>
        )}
        {decks?.items.length !== 0 && (
          <Pagination
            getPage={pageValue}
            limit={decks ? decks.pagination.itemsPerPage : 10}
            page={decks ? decks.pagination.currentPage : 1}
            setLimit={setItemsPerPage}
            setPage={setCurrentPage}
            totalPages={decks ? decks.pagination.totalPages : 1}
          />
        )}
      </div>
    </div>
  )
}
