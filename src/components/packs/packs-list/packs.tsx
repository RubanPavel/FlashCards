import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { IconClose } from '@/assets/icons/IconClose'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { ExpandableText } from '@/components/packs/common/ExpandableText'
import { useSort } from '@/components/packs/hook/useSort'
import { AddNewPack } from '@/components/packs/modals/addNewPack'
import { Button } from '@/components/ui/button'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconEdit } from '@/components/ui/dropdown-menu/assets/IconEdit'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
import { Loader } from '@/components/ui/loader'
import { ModalsNew } from '@/components/ui/modals/modalsNew.'
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
import { decksActions, orderByUpdated } from '@/services/decks/decks.slice'
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

const columnsData = [
  { id: '1', title: 'Name' },
  { id: '2', title: 'Cards' },
  { id: '3', title: 'Last Updated' },
  { id: '4', title: 'Create by' },
  { id: '5', title: '' },
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

export const Packs = () => {
  const dispatch = useAppDispatch()
  const params = useAppSelector(state => state.decksParams)
  // const [loading, setLoading] = useState(true)
  const [openModalNewPack, onCloseModalNewPack] = useState(false)
  const [openModalDelete, onCloseModalDelete] = useState(false)
  const { iconVector, onVectorChange, sort } = useSort('updated')
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
    // setLoading(false)
  }, [])

  const onSortByName = () => {
    onVectorChange('updated')
    dispatch(decksActions.setOrderBy({ orderBy: sort as orderByUpdated }))
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

  const handleTabSwitcher = (tabValue: string) => {
    setActiveTab(tabValue)
    if (userData && tabValue === tabsData[0].value) {
      dispatch(decksActions.setAuthorId({ authorId: userData.id }))
    } else {
      dispatch(decksActions.setAuthorId({ authorId: undefined }))
    }
    // setLoading(false)
  }

  const handleClearFilter = () => {
    dispatch(decksActions.setAuthorId({ authorId: undefined }))
    dispatch(decksActions.setName({ name: '' }))
    dispatch(decksActions.setMinCardsCount({ minCardsCount: '0' }))
    dispatch(decksActions.setMaxCardsCount({ maxCardsCount: maxValueSlider.toString() }))
    setExternalValues([0, maxValueSlider])
    setInputValue('')
    setActiveTab(tabsData[1].value)
    // setDefaultValueTabSwitcher(tabsData[1].value)
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
          {/*{decksIsLoading ? (*/}
          {/*  <p>isLoading...</p>*/}
          {/*) : (*/}
          <SliderRadix
            externalValues={externalValues}
            max={maxValueSlider}
            min={minValuesSlider}
            onValueCommit={handleSliderValues}
          />
          {/*)}*/}
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
                  {el.title === 'Last Updated' ? (
                    <>
                      <Typography
                        className={s.onChangeVector}
                        onClick={onSortByName}
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
            {decks?.items.map(d => {
              const packPath =
                d.author.id !== userData?.id ? `/friend-pack/${d.id}` : `/my-pack/${d.id}`

              return (
                <TableRow key={d.id}>
                  <TableCell>
                    <Link className={clsx(s.wrapCell, s.link)} to={packPath}>
                      {d.cover && (
                        <img alt={'img'} className={s.coverStyle} src={d.cover?.toString()} />
                      )}
                      <Typography as={'span'} variant={'subtitle-1'}>
                        <ExpandableText maxLength={30} text={d.name} />
                      </Typography>
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
                      <Button as={Link} to={packPath} variant={'icon'}>
                        <Link to={`/learn/${d.id}`}>
                          <IconLearn />
                        </Link>
                      </Button>
                      {d.author.id === userData?.id && (
                        <>
                          <IconEdit />
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
