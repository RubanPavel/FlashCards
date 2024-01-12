import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { IconBurgerMenu } from '@/assets/icons/IconBurgerMenu'
import { IconClose } from '@/assets/icons/IconClose'
import { IconEdit } from '@/assets/icons/IconEdit'
import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { dateOptions } from '@/assets/variable'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { ExpandableText } from '@/components/packs/common/ExpandableText'
import { StarRating } from '@/components/packs/common/StarRating'
import { AddNewCard } from '@/components/packs/modals/addNewCard'
import { EditCard } from '@/components/packs/modals/editCard'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdown-menu/dropdownSeparator'
import { ModalsBest } from '@/components/ui/modals/modalsBest'
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
import { DeleteModalOld } from '@/pages/common/delete-modal/deleteModalOld'
import { EmptyPack } from '@/pages/empty-pack-page/empty-pack'
import { updateCardType } from '@/services/cards'
import { cardsActions } from '@/services/cards/cards.slice'
import { useGetDeckByIdQuery, useGetDecksCardsQuery } from '@/services/decks'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './myPack.module.scss'
import { EditPackOld } from '@/components/packs/modals/editPack/editPackOld'

export const MyPackPage = () => {
  console.log('test')
  const params = useAppSelector(state => state.cardsParams)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalEditPackOpen, setIsModalEditPackOpen] = useState(false)
  const [isModalDelOpen, setIsModalDelOpen] = useState(false)
  const [isModalDelPackOpen, setIsModalDelPackOpen] = useState(false)
  const [openModalNewCard, onCloseModalNewCard] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')

  const [cardEdit, setCardEdit] = useState<updateCardType>()
  const [cardDel, setCardDel] = useState('')
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { data: cardsData } = useGetDecksCardsQuery({
    id: id,
    ...params,
  })
  const { data: packData } = useGetDeckByIdQuery({ id })

  const editPackHandler = () => {
    setIsModalEditPackOpen(true)
  }
  const editHandler = (card: any) => {
    setIsModalEditOpen(true)
    setCardEdit(card)
  }

  const deleteHandler = (card: any) => {
    setIsModalDelOpen(true)
    setCardDel(card)
  }
  const deletePackHandler = () => {
    setIsModalDelPackOpen(true)
  }
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
    { id: '5', title: '' },
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
          {packData?.cover && <img alt={'img'} className={s.image} src={packData.cover} />}
          <Typography as={'h1'} variant={'large'}>
            My Pack/{packData?.name}
          </Typography>
          <DropdownMenu position={'end'} trigger={<IconBurgerMenu />}>
            <DropDownItem className={s.dropItem}>
              <Button as={Link} to={`/learn/${id}`} variant={'icon'}>
                <IconLearn />
                <Typography className={s.typText} variant={'caption'}>
                  Learn
                </Typography>
              </Button>
            </DropDownItem>
            <DropdownSeparator />
            <DropDownItem className={s.dropItem}>
              <Button onClick={() => editPackHandler()} variant={'icon'}>
                <IconEdit />
                <Typography variant={'caption'}>Edit</Typography>
              </Button>
            </DropDownItem>
            <DropdownSeparator />
            <DropDownItem className={s.dropItem}>
              <Button onClick={() => deletePackHandler()} variant={'icon'}>
                <IconDelete />
                <Typography variant={'caption'}>Delete</Typography>
              </Button>
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
        inputValue={inputValue}
        name={'search'}
        setInputValue={setInputValue}
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
          {cardsData?.items.map(card => {
            return (
              <TableRow key={card.id}>
                <TableCell>
                  {card.questionImg && (
                    <img alt={'img'} className={s.image} src={card.questionImg} />
                  )}
                  <Typography as={'p'} variant={'body-2'}>
                    <ExpandableText maxLength={30} text={card.question} />
                  </Typography>
                </TableCell>
                <TableCell>
                  {card.answerImg && <img alt={'img'} className={s.image} src={card.answerImg} />}
                  <Typography as={'p'} variant={'body-2'}>
                    <ExpandableText maxLength={30} text={card.answer} />
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography as={'p'} variant={'body-2'}>
                    {new Date(card.updated).toLocaleDateString('ru-RU', dateOptions)}
                  </Typography>
                </TableCell>
                <TableCell className={s.starsAndIcons}>
                  <StarRating filledStars={card.grade} />
                </TableCell>
                <TableCell>
                  <div className={s.pointer}>
                    <Button onClick={() => editHandler(card)} variant={'icon'}>
                      <IconEdit />
                    </Button>
                    <Button onClick={() => deleteHandler(card)} variant={'icon'}>
                      <IconDelete />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>

        <ModalsBest
          isModalOpen={isModalEditPackOpen}
          setIsModalOpen={setIsModalEditPackOpen}
          title={'Edit Pack'}
        >
          <EditPackOld deck={packData} onClose={val => setIsModalEditPackOpen(val)} />
        </ModalsBest>
        <ModalsBest
          isModalOpen={isModalDelPackOpen}
          setIsModalOpen={setIsModalDelPackOpen}
          title={'Delete Pack'}
        >
          <DeleteModalOld
            deck={packData}
            isNavigate
            onClose={val => setIsModalDelPackOpen(val)}
            title={'Delete Pack'}
          />
        </ModalsBest>
        <ModalsBest
          isModalOpen={isModalEditOpen}
          setIsModalOpen={setIsModalEditOpen}
          title={'Edit Сard'}
        >
          <EditCard card={cardEdit} onClose={val => setIsModalEditOpen(val)} />
        </ModalsBest>
        <ModalsBest
          isModalOpen={isModalDelOpen}
          setIsModalOpen={setIsModalDelOpen}
          title={'Delete Card'}
        >
          <DeleteModalOld
            card={cardDel}
            onClose={val => setIsModalDelOpen(val)}
            title={'Delete Card'}
          />
        </ModalsBest>
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
