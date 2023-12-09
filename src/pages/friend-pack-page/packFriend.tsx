import { useParams } from 'react-router-dom'

import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { StarRating } from '@/components/packs/common/StarRating'
import { useSort } from '@/components/packs/hook/useSort'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { useGetAuthMeQuery } from '@/services/auth'
import { useGetDeckByIdQuery, useGetDecksCardsQuery } from '@/services/decks'

import s from './packFriend.module.scss'

export const PackFriend = () => {
  const { iconVector, onVectorChange } = useSort()
  const { id } = useParams()
  const { data: CardsData } = useGetDecksCardsQuery({ id })

  const { data: user } = useGetAuthMeQuery()
  const { data: Datac } = useGetDeckByIdQuery({ id })

  console.log(user?.id + '---' + Datac?.author.id)

  const columnsData = [
    { id: '1', title: 'Question' },
    { id: '2', title: 'Answer' },
    { id: '3', title: 'Last Updated' },
    { id: '4', title: 'Grade' },
  ]

  const getValue = (value: string) => {
    return value
  }

  const onClickHandler = () => {
    alert('Назад на Packs List')
  }

  return (
    <div className={s.container}>
      <div className={s.fieldBack} onClick={onClickHandler}>
        <IconLeftArrow transform={'translate(0, 2)'} />
        <Typography variant={'body-2'}>Back to Packs List</Typography>
      </div>
      <div className={s.packsList}>
        <Typography variant={'large'}>Friend&apos;s Pack</Typography>
        <Button onClick={() => {}}>
          <Typography variant={'subtitle-2'}>Learn to Pack</Typography>
        </Button>
      </div>
      <DebouncedInput
        callback={getValue}
        className={s.searchInput}
        name={'search'}
        type={'search'}
      />
      <Table>
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
        <TableBody>
          {CardsData?.items.map(d => (
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
                  {d.updated}
                </Typography>
              </TableCell>
              <TableCell>
                <StarRating filledStars={d.grade} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
