import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { IconClose } from '@/assets/icons/IconClose'
import { IconVectorDown } from '@/assets/icons/IconVectorDown'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { AddNewPack } from '@/components/packs/modals/addNewPack'
import { EditPack } from '@/components/packs/modals/editPack'
import { Button } from '@/components/ui/button'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconEdit } from '@/components/ui/dropdown-menu/assets/IconEdit'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
import { Loader } from '@/components/ui/loader'
import { ModalsBest } from '@/components/ui/modals/modalsBest'
import { ModalsNew } from '@/components/ui/modals/modalsNew'
import { Pagination } from '@/components/ui/pagination'
import { SliderRadix } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
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
import { useGetAuthMeQuery } from '@/services/auth'
import { useGetDecksQuery } from '@/services/decks/decks.service'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import clsx from 'clsx'

import s from './packs.module.scss'
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

export const dateOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}

const columnsData: { id: string; sort: Sort; title: string }[] = [
  { id: '1', sort: 'name', title: 'Name' },
  { id: '2', sort: 'cardsCount', title: 'Cards' },
  { id: '3', sort: 'updated', title: 'Last Updated' },
  { id: '4', sort: 'created', title: 'Create by' },
  { id: '5', sort: '', title: '' },
]
const tabsData = [
  {
    title: 'My Cards',
    value: 'My Cards',
  },
  {
    title: 'All Cards',
    value: 'All Cards',
  },
]

type Sort = '' | 'cardsCount' | 'created' | 'name' | 'updated'
type Direction = 'asc' | 'desc'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const [isModalDelOpen, setIsModalDelOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [deckDel, setDeckDel] = useState('')
  const [deckEdit, setDeckEdit] = useState('')
  const params = useAppSelector(state => state.decksParams)
  const [openModalNewPack, onCloseModalNewPack] = useState(false)
  const [externalValues, setExternalValues] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<string>(
    params.authorId ? tabsData[0].value : tabsData[1].value
  )
  const { data: userData } = useGetAuthMeQuery()
  const { data: decks, isLoading: decksIsLoading, originalArgs } = useGetDecksQuery(params)

  const [inputValue, setInputValue] = useState<string>(params.name || '')

  const maxValueSlider = decks ? decks.maxCardsCount : 0
  const minValuesSlider = 0

  useEffect(() => {
    if (originalArgs && originalArgs.maxCardsCount !== '0') {
      setExternalValues([originalArgs.minCardsCount, originalArgs.maxCardsCount])
    }
  }, [])

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

  // console.log(decks)
  // TODO поменять имя функциям
  const handleSearch = (searchValue: string) => {
    dispatch(decksActions.setName({ name: searchValue }))
  }
  const deleteHandler = (deck: any) => {
    setIsModalDelOpen(true)
    setDeckDel(deck)
  }

  const editHandler = (deck: any) => {
    setIsModalEditOpen(true)
    setDeckEdit(deck)
  }

  const handleTabSwitcher = (tabValue: string) => {
    setActiveTab(tabValue)
    if (userData && tabValue === tabsData[0].value) {
      dispatch(decksActions.setCurrentPage({ currentPage: 1 }))
      dispatch(decksActions.setAuthorId({ authorId: userData.id }))
    } else {
      dispatch(decksActions.setAuthorId({ authorId: undefined }))
    }
  }

  const handleClearFilter = () => {
    dispatch(decksActions.setAuthorId({ authorId: undefined }))
    dispatch(decksActions.setName({ name: '' }))
    dispatch(decksActions.setMinCardsCount({ minCardsCount: '0' }))
    dispatch(decksActions.setMaxCardsCount({ maxCardsCount: maxValueSlider.toString() }))
    setExternalValues([0, maxValueSlider])
    setInputValue('')
    setActiveTab(tabsData[1].value)
    dispatch(decksActions.setOrderBy({ orderBy: `updated-desc` }))
  }

  const handleSliderValues = (sliderValues: number[]) => {
    dispatch(decksActions.setMinCardsCount({ minCardsCount: sliderValues[0].toString() }))
    dispatch(decksActions.setMaxCardsCount({ maxCardsCount: sliderValues[1].toString() }))
  }

  const setCurrentPage = (currentPage: number) => {
    dispatch(decksActions.setCurrentPage({ currentPage }))
  }

  const setItemsPerPage = (itemsPerPage: number) => {
    dispatch(decksActions.setItemsPerPage({ itemsPerPage }))
  }

  if (decksIsLoading) {
    return <Loader />
  }

  return (
    <div className={s.container}>
      <div className={s.packsList}>
        <Typography variant={'large'}>Packs list</Typography>
        <ModalsNew
          className={{ title: s.modalTitle }}
          icon={<IconClose className={s.IconButton} />}
          onClose={onCloseModalNewPack}
          open={openModalNewPack}
          title={
            <Typography as={'p'} variant={'H2'}>
              Add New Pack
            </Typography>
          }
          trigger={
            <Button>
              <Typography variant={'subtitle-1'}>Add new Pack</Typography>
            </Button>
          }
        >
          <AddNewPack onClose={val => onCloseModalNewPack(val)} />
        </ModalsNew>
      </div>
      <div className={s.controlPanel}>
        <DebouncedInput
          callback={handleSearch}
          className={s.searchInput}
          inputValue={inputValue}
          name={'search'}
          setInputValue={setInputValue}
          type={'search'}
        />
        <TabSwitcher
          label={'Show packs cards'}
          onValueChange={handleTabSwitcher}
          tabs={tabsData}
          value={activeTab}
        />
        <div>
          <Typography variant={'body-2'}>Number of cards</Typography>
          <SliderRadix
            externalValues={externalValues}
            max={maxValueSlider}
            min={minValuesSlider}
            onValueCommit={handleSliderValues}
          />
        </div>
        <Button className={s.ClearFilter} onClick={handleClearFilter} variant={'secondary'}>
          <IconDelete />
          <Typography variant={'subtitle-2'}>Clear Filter</Typography>
        </Button>
      </div>
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
                d.author.id !== userData?.id ? `/friend-pack/${d.id}` : `/my-pack/${d.id}`

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
                      {d.author.id === userData?.id && (
                        <>
                          <Button onClick={() => editHandler(d)} variant={'icon'}>
                            <IconEdit />
                          </Button>
                          <Button onClick={() => deleteHandler(d)} variant={'icon'}>
                            <IconDelete />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <ModalsBest
            isModalOpen={isModalEditOpen}
            setIsModalOpen={setIsModalEditOpen}
            title={'Edit Pack Test'}
          >
            <EditPack deck={deckEdit} onClose={val => setIsModalEditOpen(val)} />
          </ModalsBest>
          <ModalsBest
            isModalOpen={isModalDelOpen}
            setIsModalOpen={setIsModalDelOpen}
            title={'Delete Pack Test'}
          >
            <DeleteModal
              deck={deckDel}
              onClose={val => setIsModalDelOpen(val)}
              title={'Delete Pack'}
            />
          </ModalsBest>
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
