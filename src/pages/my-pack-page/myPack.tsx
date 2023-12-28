import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { IconBurgerMenu } from '@/assets/icons/IconBurgerMenu'
import { IconClose } from '@/assets/icons/IconClose'
import { IconEdit } from '@/assets/icons/IconEdit'
import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { ExpandableText } from '@/components/packs/common/ExpandableText'
import { StarRating } from '@/components/packs/common/StarRating'
import { AddNewCard } from '@/components/packs/modals/addNewCard'
import { dateOptions } from '@/components/packs/packs-list'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdown-menu/dropdownSeparator'
import { ModalsNew } from '@/components/ui/modals/modalsNew.'
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
import { EmptyPack } from '@/pages/empty-pack-page/empty-pack'
import { cardsActions } from '@/services/cards/cards.slice'
import { useGetDeckByIdQuery, useGetDecksCardsQuery } from '@/services/decks'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './myPack.module.scss'

export const MyPackPage = () => {
  const params = useAppSelector(state => state.cardsParams)

  const [openModalNewCard, onCloseModalNewCard] = useState(false)
  const [openModalDelete, onCloseModalDelete] = useState(false)

  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { data: cardsData } = useGetDecksCardsQuery({
    id: id,
    ...params,
  })
  const { data: packData } = useGetDeckByIdQuery({ id })

  const handleSearch = (searchValue: string) => {
    dispatch(cardsActions.setQuestion({ question: searchValue }))
  }

  useEffect(() => {
    dispatch(cardsActions.setItemsPerPage({ itemsPerPage: 10 }))
    dispatch(cardsActions.setCurrentPage({ currentPage: 1 }))
    dispatch(cardsActions.setQuestion({ question: '' }))
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
        <ModalsNew
          className={{ title: s.modalTitle }}
          icon={<IconClose className={s.IconButtonMyPack} />}
          onClose={onCloseModalNewCard}
          open={openModalNewCard}
          title={
            <Typography as={'p'} variant={'H2'}>
              Add New Card
            </Typography>
          }
          trigger={
            <Button>
              <Typography variant={'subtitle-1'}>Add new Card</Typography>
            </Button>
          }
        >
          <AddNewCard id={id} onClose={val => onCloseModalNewCard(val)} />
        </ModalsNew>
      </div>
      <DebouncedInput
        callback={handleSearch}
        className={s.searchInput}
        id={'inputMy'}
        name={'search'}
        type={'search'}
      />
      <Table>
        <TableHead>
          <TableRow>
            {columnsData.map(el => (
              <TableHeadCell key={el.id}>
                <Typography variant={'subtitle-2'}>{el.title}</Typography>
              </TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cardsData?.items.map(d => (
            <TableRow key={d.id}>
              <TableCell>
                {d.questionImg && <img alt={'img'} className={s.image} src={d.questionImg} />}
                <Typography as={'p'} variant={'body-2'}>
                  <ExpandableText maxLength={30} text={d.question} />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography as={'p'} variant={'body-2'}>
                  <ExpandableText maxLength={30} text={d.answer} />
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
                  <ModalsNew
                    className={{ title: s.modalTitle }}
                    icon={<IconClose className={s.IconButtonMyPack} />}
                    onClose={onCloseModalDelete}
                    open={openModalDelete}
                    title={
                      <Typography as={'p'} variant={'H2'}>
                        Delete Card
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
                      name={d.question}
                      onClose={val => onCloseModalDelete(val)}
                      title={'Delete Card'}
                    />
                  </ModalsNew>
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
