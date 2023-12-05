import {useEffect, useState} from 'react'

import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { useSort } from '@/components/packs/hook/useSort'
import { Button } from '@/components/ui/button'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconEdit } from '@/components/ui/dropdown-menu/assets/IconEdit'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'

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
import {
  useCreateDeckMutation,
  useDeleteDeskMutation,
  useGetDecksQuery,
} from '@/services/decks/decks.service'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './packs.module.scss'
import {SliderRadix} from "@/components/ui/slider";

const dateOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}

export const Packs = () => {
  const dispatch = useAppDispatch()
  const params = useAppSelector(state => state.decksParams)

  console.log(params)

  const { iconVector, onVectorChange } = useSort()

  const { data: user } = useGetAuthMeQuery()
  const { data: decks } = useGetDecksQuery(params)
  const [deleteDeck, {}] = useDeleteDeskMutation()
  const [createDeck, { isLoading: isDeckCreated }] = useCreateDeckMutation()
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
  // dispatch(decksActions.setMaxCardsCount({ maxCardsCount: decks?.maxCardsCount.toString() }))
  const [valueSlider, setValueSlider] = useState<number[]>([0, Infinity])

  useEffect(() => {
    if (decks?.maxCardsCount) {
      dispatch(decksActions.setMaxCardsCount({ maxCardsCount: decks.maxCardsCount.toString() }))
      setValueSlider([parseInt(params.minCardsCount, 10), decks.maxCardsCount])
    }
  }, [dispatch, params.minCardsCount, decks?.maxCardsCount])

  const handleDelete = (id: string) => {
    deleteDeck(id)
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
    dispatch(decksActions.setMaxCardsCount({ maxCardsCount: '2000' }))
  }

  const handleSliderValues = (sliderValues: number[]) => {
    dispatch(decksActions.setMinCardsCount({ minCardsCount: sliderValues[0].toString() }))
    dispatch(decksActions.setMaxCardsCount({ maxCardsCount: sliderValues[1].toString() }))
  }

  return (
    <div className={s.container}>
      {isDeckCreated && <div>isDeckCreated.....</div>}
      <div className={s.packsList}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button
          onClick={() => {
            createDeck({ name: 'New world!' })
          }}
        >
          <Typography variant={'subtitle-1'}>Add new Pack</Typography>
        </Button>
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
          <SliderRadix
            max={decks?.maxCardsCount}
            min={0}
            value={valueSlider}
            onValueCommit={handleSliderValues}
            onValueChange={setValueSlider}
          />
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
                <TableCell>
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
      </div>
    </div>
  )
}
