import { createRef, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { IconBurgerMenu } from '@/assets/icons/IconBurgerMenu'
import { IconClose } from '@/assets/icons/IconClose'
import { IconEdit } from '@/assets/icons/IconEdit'
import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { StarRating } from '@/components/packs/common/StarRating'
import { useSort } from '@/components/packs/hook/useSort'
import { AddNewCard } from '@/components/packs/modals/addNewCard'
import { dateOptions } from '@/components/packs/packs-list'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdown-menu/dropdownSeparator'
import { Modals } from '@/components/ui/modals'
import { Pagination } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { DeleteModal } from '@/pages/common/delete-modal/deleteModal'
import { EmptyPack } from '@/pages/empty-pack-page/empty-pack'
import { cardsActions } from '@/services/cards/cards.slice'
import { useGetDeckByIdQuery, useGetDecksCardsQuery } from '@/services/decks'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './myPack.module.scss'

export const MyPackPage = () => {
  const params = useAppSelector(state => state.cardsParams)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useAppDispatch()
  const { iconVector, onVectorChange } = useSort()
  const { id } = useParams()
  const { data: cardsData } = useGetDecksCardsQuery({
    id: id,
    question: searchValue ? searchValue : undefined,
    ...params,
  })
  const { data: packData } = useGetDeckByIdQuery({ id })

  const closeRef = createRef<HTMLButtonElement>()

  /* const handleSearch = (searchValue: string) => {
    dispatch(decksActions.setName({ name: searchValue }))
  }*/

  useEffect(() => {
    dispatch(cardsActions.setItemsPerPage({ itemsPerPage: 10 }))
    dispatch(cardsActions.setCurrentPage({ currentPage: 1 }))
  }, [dispatch])

  const columnsData = [
    { id: '1', title: 'Question' },
    { id: '2', title: 'Answer' },
    { id: '3', title: 'Last Updated' },
    { id: '4', title: 'Grade' },
  ]

  if (packData?.cardsCount === 0) {
    return <EmptyPack id={id} isMyPack packName={packData?.name} />
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
        <div className={s.myPackWrapper}>
          <Typography as={'h1'} variant={'large'}>
            My Pack/{packData?.name}
          </Typography>
          <DropdownMenu position={'end'} trigger={<IconBurgerMenu />}>
            <DropDownItem className={s.dropItem}>
              <IconLearn />
              <Typography variant={'caption'}>Learn</Typography>
            </DropDownItem>
            <DropdownSeparator />
            <DropDownItem className={s.dropItem}>
              <IconEdit />
              <Typography variant={'caption'}>Edit</Typography>
            </DropDownItem>
            <DropdownSeparator />
            <DropDownItem className={s.dropItem}>
              <IconDelete />
              <Typography variant={'caption'}>Delete</Typography>
            </DropDownItem>
          </DropdownMenu>
        </div>
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
      <DebouncedInput
        callback={e => setSearchValue(e)}
        className={s.searchInput}
        id={'inputMy'}
        name={'search'}
        type={'search'}
      />
      <Table>
        <TableRow>
          {columnsData.map(el => (
            <TableHeadCell key={el.id}>
              {el.title === 'Last Updated' ? (
                <>
                  <Typography className={s.pointer} onClick={onVectorChange} variant={'subtitle-2'}>
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
              <TableCell className={s.starsAndIcons}>
                <StarRating filledStars={d.grade} />
                <div className={s.pointer}>
                  <IconEdit />
                  <Modals
                    icon={<IconClose className={s.IconButton} />}
                    ref={closeRef}
                    trigger={<IconDelete />}
                  >
                    <DeleteModal
                      closeRef={closeRef}
                      id={d.id}
                      name={d.question}
                      title={'Delete Card'}
                    />
                  </Modals>
                </div>
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
