import { Link, useParams } from 'react-router-dom'

import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { StarRating } from '@/components/packs/common/StarRating'
import { useSort } from '@/components/packs/hook/useSort'
import { dateOptions } from '@/components/packs/packs-list'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { useGetAuthMeQuery } from '@/services/auth'
import { useGetDeckByIdQuery, useGetDecksCardsQuery } from '@/services/decks'

import s from './friendPack.module.scss'

export const FriendPackPage = () => {
  const { iconVector, onVectorChange } = useSort()
  const { id } = useParams()
  const { data: CardsData } = useGetDecksCardsQuery({ id })
  const { data: user } = useGetAuthMeQuery()
  const { data: Datac } = useGetDeckByIdQuery({ id })

  console.log('Datac---' + Datac)
  console.log('id---' + id)
  console.log(user?.id + '---' + Datac?.author.id)
  console.log('---' + Datac?.cardsCount)

  const columnsData = [
    { id: '1', title: 'Question' },
    { id: '2', title: 'Answer' },
    { id: '3', title: 'Last Updated' },
    { id: '4', title: 'Grade' },
  ]

  const getValue = (value: string) => {
    return value
  }

  return (
    <div className={s.container}>
      <Link className={s.fieldBack} to={'/packs'}>
        <IconLeftArrow transform={'translate(0, 2)'} />
        <Typography variant={'body-2'}>Back to Packs List</Typography>
      </Link>
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
    </div>
  )
}
