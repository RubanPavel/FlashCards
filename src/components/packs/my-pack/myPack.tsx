// import { FieldValues } from 'react-hook-form'

import { createRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { IconBurgerMenu } from '@/assets/icons/IconBurgerMenu'
import { IconClose } from '@/assets/icons/IconClose'
import { IconEdit } from '@/assets/icons/IconEdit'
import { IconLeftArrow } from '@/assets/icons/IconLeftArrow'
import { StarRating } from '@/components/packs/common/StarRating'
// import { SearchInput } from '@/components/packs/common/searchInput'
import { useSort } from '@/components/packs/hook/useSort'
import { AddNewCard } from '@/components/packs/modals/addNewCard'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdown-menu/dropdownSeparator'
import { Modals } from '@/components/ui/modals'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'

import s from './myPack.module.scss'

export const MyPack = () => {
  const { iconVector, onVectorChange } = useSort()
  const closeRef = createRef<HTMLButtonElement>()
  const { id } = useParams()
  const navigate = useNavigate()

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

  // const getValue = (value: FieldValues) => {
  //   console.log(value)
  // }

  const onClickHandler = () => {
    navigate('/')
  }

  return (
    <div className={s.container}>
      <div className={s.fieldBack} onClick={onClickHandler}>
        <IconLeftArrow transform={'translate(0, 2)'} />
        <Typography variant={'body-2'}>Back to Packs List</Typography>
      </div>
      <div className={s.packsList}>
        <div className={s.myPackWrapper}>
          <Typography as={'h1'} variant={'large'}>
            My Pack
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
        <Modals
          icon={<IconClose className={s.IconButton} />}
          ref={closeRef}
          trigger={
            <Button onClick={() => {}}>
              <Typography variant={'subtitle-2'}>Add New Card</Typography>
            </Button>
          }
        >
          <AddNewCard closeRef={closeRef} id={id ? id : null} />
        </Modals>
      </div>
      {/*<SearchInput className={s.searchInput} valueInput={getValue} />*/}
      <Table>
        <TableHead>
          <TableRow>
            {columnsData.map(el => (
              <TableHeadCell key={el.id}>
                {el.title === 'Last Updated' ? (
                  <>
                    <Typography
                      className={s.pointer}
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
              <TableCell className={s.starsAndIcons}>
                <StarRating filledStars={d.rating} />
                <div className={s.pointer}>
                  <IconEdit />
                  <IconDelete />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
