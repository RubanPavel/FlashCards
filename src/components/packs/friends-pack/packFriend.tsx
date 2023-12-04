import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { StarRating } from '@/components/packs/common/StarRating'
import { useSort } from '@/components/packs/hook/useSort'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'

import s from './packFriend.module.scss'
import {DebouncedInput} from "@/components/packs/common/DebouncedInput";

export const PackFriend = () => {
  const { iconVector, onVectorChange } = useSort()

  const columnsData = [
    { id: '1', title: 'Question' },
    { id: '2', title: 'Answer' },
    { id: '3', title: 'Last Updated' },
    { id: '4', title: 'Grade' },
  ]

  const data = [
    {
      answer: 'This is how "This" works in JavaScript',
      id: 5,
      lastUpdate: '28.11.2023',
      question: 'How "This" works in JavaScript?',
      rating: 3,
    },
    {
      answer: 'This is how "This" works in JavaScript',
      id: 6,
      lastUpdate: '27.11.2023',
      question: 'How "This" works in JavaScript?',
      rating: 2,
    },
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
      <DebouncedInput name={'search'} type={'search'} className={s.searchInput} callback={getValue} />
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
          {data.map(d => (
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
                  {d.lastUpdate}
                </Typography>
              </TableCell>
              <TableCell>
                <StarRating filledStars={d.rating} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
