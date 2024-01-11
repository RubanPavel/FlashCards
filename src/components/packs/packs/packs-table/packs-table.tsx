import { Link } from 'react-router-dom'
import { IconVectorDown } from '@/assets/icons/IconVectorDown'
import { dateOptions, packsPageData } from '@/assets/variable'
import { Button } from '@/components/ui/button'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconEdit } from '@/components/ui/dropdown-menu/assets/IconEdit'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
import { Table } from '@/components/ui/tables/newTablles'
import { Typography } from '@/components/ui/typography'
import { AuthResponse } from '@/services/auth'
import { Deck, DecksResponse, Sort } from '@/services/decks'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import clsx from 'clsx'

import 'react-loading-skeleton/dist/skeleton.css'

import s from './packs-table.module.scss'

type Props = {
  decks: DecksResponse
  user: AuthResponse
  handleDelete: (deck: Deck) => void
  handleEdit: (deck: Deck) => void
}

export const PacksTable = ({ decks, user, handleDelete, handleEdit }: Props) => {
  const { columnsData } = packsPageData.packsTable
  const dispatch = useAppDispatch()
  const params = useAppSelector(state => state.decksParams)

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
    <Table.Root className={s.TableRoot}>
      <Table.Head>
        <Table.Row>
          {columnsData.map(el => (
            <Table.HeadCell key={el.id}>
              <Button
                className={s.TableHeadCellButton}
                onClick={() => handleSort(el.sort)}
                variant={'icon'}
              >
                <Typography variant={'subtitle-2'}>{el.title}</Typography>
                {el.sort === params.orderBy.split('-')[0] && (
                  <IconVectorDown
                    className={`${s.TableHeadCellButtonIcon} ${
                      params.orderBy.split('-')[1] === 'asc' && s.TableHeadCellButtonIcon_Is_Flipped
                    }`}
                  />
                )}
              </Button>
            </Table.HeadCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {decks?.items.map(d => {
          const packPath = d.author.id !== user?.id ? `/friend-pack/${d.id}` : `/my-pack/${d.id}`

          return (
            <Table.Row key={d.id}>
              <Table.BodyCell>
                <Link className={s.BodyCellLink} to={packPath}>
                  {d.cover && (
                    <img alt={'img'} className={s.BodyCellCover} src={d.cover?.toString()} />
                  )}
                  <Typography as={'span'} className={s.BodyCellText} variant={'subtitle-1'}>
                    {d.name}
                  </Typography>
                  <div className={s.ModalCell}>
                    {d.cover && (
                      <img alt={'img'} className={s.ModalCellCover} src={d.cover?.toString()} />
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
              </Table.BodyCell>
              <Table.BodyCell>
                <Typography as={'p'} variant={'body-2'}>
                  {d.cardsCount}
                </Typography>
              </Table.BodyCell>
              <Table.BodyCell>
                <Typography as={'p'} variant={'body-2'}>
                  {new Date(d.updated).toLocaleDateString('ru-RU', dateOptions)}
                </Typography>
              </Table.BodyCell>
              <Table.BodyCell>
                <Typography as={'p'} variant={'body-2'}>
                  {d.author.name}
                </Typography>
              </Table.BodyCell>
              <Table.BodyCell>
                <div className={s.LastBodyCell}>
                  <Button as={Link} to={`/learn/${d.id}`} variant={'icon'}>
                    <IconLearn />
                  </Button>
                  {d.author.id === user?.id && (
                    <>
                      <Button onClick={() => handleEdit(d)} variant={'icon'}>
                        <IconEdit />
                      </Button>
                      <Button onClick={() => handleDelete(d)} variant={'icon'}>
                        <IconDelete />
                      </Button>
                    </>
                  )}
                </div>
              </Table.BodyCell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
