import { useState } from 'react'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { useSort } from '@/components/packs/hook/useSort'
import { Button } from '@/components/ui/button'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconEdit } from '@/components/ui/dropdown-menu/assets/IconEdit'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
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
import {
  useCreateDeckMutation,
  useDeleteDeskMutation,
  useGetDecksQuery,
} from '@/services/decks/decks.service'
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

  console.log(params)

  const [valueSlider, setValueSlider] = useState<number[]>([1, 10])
  const { iconVector, onVectorChange } = useSort()

  const { data } = useGetDecksQuery(params)
  const [deleteDeck, {}] = useDeleteDeskMutation()
  const [createDeck, { isLoading: isDeckCreated }] = useCreateDeckMutation()
  const columnsData = [
    { id: '1', title: 'Name' },
    { id: '2', title: 'Cards' },
    { id: '3', title: 'Last Updated' },
    { id: '4', title: 'Create by' },
    { id: '5', title: '' },
  ]

  // const getValue = (value: FieldValues) => {
  //   return value
  // }

  const handleDelete = (id: string) => {
    deleteDeck(id)
  }

  const setSearch = (name: string) => {
    dispatch(decksActions.setName({ name }))
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
        <DebouncedInput name={'search'} type={'search'} className={s.searchInput} callback={setSearch}/>
        <TabSwitcher
          label={'Show packs cards'}
          onValueChange={() => {}}
          tabs={[
            {
              title: 'My Cards',
              value: 'My Cards',
            },
            {
              title: 'All Cards',
              value: 'All Cards',
            },
          ]}
        />
        <div>
          <Typography variant={'body-2'}>Number of cards</Typography>
          <SliderRadix onValueChange={setValueSlider} value={valueSlider} />
        </div>
        <div style={{ marginLeft: 20 }}>
          <Button variant={'secondary'}>
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
            {data?.items.map(d => (
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
