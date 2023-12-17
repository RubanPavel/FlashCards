import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { StarRating } from '@/components/packs/common/StarRating'
import { useSort } from '@/components/packs/hook/useSort'
import { dateOptions } from '@/components/packs/packs-list'
import { Button } from '@/components/ui/button'
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
import { EmptyPack } from '@/pages/empty-pack-page'
import { LearnPage } from '@/pages/learn-page/learn-page'
import { cardsActions } from '@/services/cards/cards.slice'
import { useGetDeckByIdQuery, useGetDecksCardsQuery, useGetRandomCardQuery } from '@/services/decks'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './friendPack.module.scss'

export const FriendPackPage = () => {
  const params = useAppSelector(state => state.cardsParams)
  const dispatch = useAppDispatch()
  const { iconVector, onVectorChange } = useSort()

  const { id } = useParams()
  const { data: cardsData } = useGetDecksCardsQuery({
    id: id,
    ...params,
  })
  const { data: packData } = useGetDeckByIdQuery({ id })
  const { data: randomCard } = useGetRandomCardQuery({ id })

  const columnsData = [
    { id: '1', title: 'Question' },
    { id: '2', title: 'Answer' },
    { id: '3', title: 'Last Updated' },
    { id: '4', title: 'Grade' },
  ]

  useEffect(() => {
    dispatch(cardsActions.setItemsPerPage({ itemsPerPage: 10 }))
    dispatch(cardsActions.setCurrentPage({ currentPage: 1 }))
    dispatch(cardsActions.setQuestion({ question: '' }))
  }, [dispatch])

  const handleSearch = (searchValue: string) => {
    dispatch(cardsActions.setQuestion({ question: searchValue }))
  }

  if (packData?.cardsCount === 0) {
    return <EmptyPack isMyPack={false} packName={packData?.name} />
  }
  const pageValue = (currentPage: number, itemsPerPage: number) => {
    dispatch(cardsActions.setCurrentPage({ currentPage }))
    dispatch(cardsActions.setItemsPerPage({ itemsPerPage }))
  }
  const setCurrentPage = (currentPage: number) => {
    dispatch(cardsActions.setCurrentPage({ currentPage }))
  }

  const setItemsPerPage = (itemsPerPage: number) => {
    dispatch(cardsActions.setItemsPerPage({ itemsPerPage }))
  }

  return (
    <div className={s.container}>
      <Link className={s.fieldBack} to={'/packs'}>
        <IconLeftArrow transform={'translate(0, 2)'} />
        <Typography variant={'body-2'}>Back to Packs List</Typography>
      </Link>
      <div className={s.packsList}>
        <Typography variant={'large'}>Friend&apos;s Pack/{packData?.name}</Typography>
        <Link state={{ _: '', randomCard }} to={`/learn/${id}`}>
          <Button>
            <Typography variant={'subtitle-2'}>Learn to Pack</Typography>
          </Button>
          <LearnPage />
        </Link>
      </div>
      <DebouncedInput
        callback={handleSearch}
        className={s.searchInput}
        id={'inputFriends'}
        name={'search'}
        type={'search'}
      />
      <Table>
        <TableHead>
          <TableRow>
            {columnsData.map(el => (
              <TableHeadCell key={el.id}>
                {el.title === 'Last Updated' ? (
                  <>
                    <Typography
                      className={s.onChangeVector}
                      onClick={onVectorChange}
                      variant={'subtitle-2'}
                    >
                      {el.title}
                    </Typography>
                    <span className={s.iconVector}>{iconVector}</span>
                  </>
                ) : (
                  <Typography variant={'subtitle-2'}>{el.title}</Typography>
                )}
              </TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cardsData?.items.map(d => (
            <TableRow key={d.id}>
              <TableCell>
                <Typography as={'p'} variant={'body-2'}>
                  {d.question}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography as={'p'} variant={'body-2'}>
                  {d.answer}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography as={'p'} variant={'body-2'}>
                  {new Date(d.updated).toLocaleDateString('ru-RU', dateOptions)}
                </Typography>
              </TableCell>
              <TableCell>
                <StarRating filledStars={d.grade} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        getPage={pageValue}
        limit={cardsData ? cardsData.pagination.itemsPerPage : 10}
        page={cardsData ? cardsData.pagination.currentPage : 1}
        setLimit={setItemsPerPage}
        setPage={setCurrentPage}
        totalPages={cardsData ? cardsData.pagination.totalPages : 1}
      />
    </div>
  )
}
