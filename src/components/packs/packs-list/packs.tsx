import { createRef } from 'react'

import { IconClose } from '@/assets/icons/IconClose'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { useSort } from '@/components/packs/hook/useSort'
import { AddNewPack } from '@/components/packs/modals/addNewPack'
import { Button } from '@/components/ui/button'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconEdit } from '@/components/ui/dropdown-menu/assets/IconEdit'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
import { Modals } from '@/components/ui/modals'
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
import { useGetAuthMeQuery } from '@/services/auth'
import { useDeleteDeskMutation, useGetDecksQuery } from '@/services/decks/decks.service'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './packs.module.scss'

const dateOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}

export const Packs = () => {
  const dispatch = useAppDispatch()
  const params = useAppSelector(state => state.decksParams)
  const { iconVector, onVectorChange } = useSort()
  const { data: user } = useGetAuthMeQuery()
  const { data: decks, isLoading: decksIsLoading } = useGetDecksQuery(params)
  const [deleteDeck, {}] = useDeleteDeskMutation()
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
  const closeRef = createRef<HTMLButtonElement>()

  const handleDelete = (id: string) => {
    deleteDeck(id)
  }

  const pageValue = (currentPage: number, itemsPerPage: number) => {
    dispatch(decksActions.setCurrentPage({ currentPage }))
    dispatch(decksActions.setItemsPerPage({ itemsPerPage }))
  }

  // TODO поменять имя функциям
  const handleSearch = (searchValue: string) => {
    dispatch(decksActions.setName({ name: searchValue }))
  }

  const handleTabSwitcher = (tabValue: string) => {
    if (user && tabValue === tabsData[0].value) {
      dispatch(decksActions.setAuthorId({ authorId: user.id }))
    } else {
      dispatch(decksActions.setAuthorId({ authorId: undefined }))
    }
  }

  const handleClearFilter = () => {
    dispatch(decksActions.setAuthorId({ authorId: undefined }))
    dispatch(decksActions.setName({ name: '' }))
    dispatch(decksActions.setMinCardsCount({ minCardsCount: '0' }))
    dispatch(decksActions.setMaxCardsCount({ maxCardsCount: undefined }))
  }

  const handleSliderValues = (sliderValues: number[]) => {
    dispatch(decksActions.setMinCardsCount({ minCardsCount: sliderValues[0].toString() }))
    dispatch(decksActions.setMaxCardsCount({ maxCardsCount: sliderValues[1].toString() }))
  }

  return (
    <div className={s.container}>
      <div className={s.packsList}>
        <Typography variant={'large'}>Packs list</Typography>
        <Modals
          icon={
            <Button as={'button'} className={s.IconButton} ref={closeRef} variant={'icon'}>
              <IconClose />
            </Button>
          }
          trigger={
            <Button>
              <Typography variant={'subtitle-1'}>Add new Pack</Typography>
            </Button>
          }
        >
          <AddNewPack closeRef={closeRef} />
        </Modals>
      </div>
      <div className={s.controlPanel}>
        <DebouncedInput
          callback={handleSearch}
          className={s.searchInput}
          name={'search'}
          type={'search'}
        />
        <TabSwitcher label={'Show packs cards'} onValueChange={handleTabSwitcher} tabs={tabsData} />
        <div>
          <Typography variant={'body-2'}>Number of cards</Typography>
          {decksIsLoading ? (
            // TODO временно SliderRadix заменить что бы не ломалась верстка пока подгружаются данные
            <p>SliderRadix...</p>
          ) : (
            <SliderRadix max={decks?.maxCardsCount} min={0} onValueCommit={handleSliderValues} />
          )}
        </div>
        <div style={{ marginLeft: 20 }}>
          <Button onClick={handleClearFilter} variant={'secondary'}>
            <IconDelete />
            <Typography style={{ whiteSpace: 'nowrap' }} variant={'subtitle-2'}>
              Clear Filter
            </Typography>
          </Button>
        </div>
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
            {decks?.items.map(d => (
              <TableRow key={d.id}>
                <TableCell className={s.wrapCell}>
                  {d.cover && (
                    <img className={s.coverStyle} src={d.cover?.toString()} alt={'img'} />
                  )}
                  <Typography as={'p'} variant={'body-2'}>
                    {d.name}
                  </Typography>
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
                    <IconLearn />
                    <IconEdit />
                    <IconDelete onClick={() => handleDelete(d.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination getPage={pageValue} totalCount={decks ? decks.pagination.totalItems : 1} />
      </div>
    </div>
  )
}
