import {useState} from 'react'

import {IconLogOut} from '@/assets/icons/IconLogOut'
import {IconLogo} from '@/assets/icons/Iconlogo'
import AvatarRadix from '@/components/ui/avatar/avatar'
import {Button} from '@/components/ui/button'
import {DropdownMenu} from '@/components/ui/dropdown-menu'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import {IconEdit} from '@/components/ui/dropdown-menu/assets/IconEdit'
import {IconLearn} from '@/components/ui/dropdown-menu/assets/IconLearn'
import {IconPerson} from '@/components/ui/dropdown-menu/assets/IconPerson'
import {DropDownItem} from '@/components/ui/dropdown-menu/dropdownItem'
import {DropdownSeparator} from '@/components/ui/dropdown-menu/dropdownSeparator'
import {Header} from '@/components/ui/header'
import {Input} from '@/components/ui/input'
import {SliderRadix} from '@/components/ui/slider'
import {TabSwitcher} from '@/components/ui/tab-switcher'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/tables'
import {Typography} from '@/components/ui/typography'

import s from '@/components/packs/packs.module.scss'
import {IconVectorDown} from "@/assets/icons/IconVectorDown";
import {IconVectorUp} from "@/assets/icons/IconVectorUp";

export const Packs = () => {
  const [valueSlider, setValueSlider] = useState<number[]>([1, 10])
  const [sort, setSort] = useState('lastUpdate-asc')

  const iconVector = sort === 'lastUpdate-asc' ? <IconVectorDown/> : <IconVectorUp/>

  const onVectorChange = () => {
    if (sort === 'lastUpdate-asc') setSort('lastUpdate-desc')
    if (sort === 'lastUpdate-desc') setSort('lastUpdate-asc')
    return sort
  }

  const columnsData = [
    {id: '1', title: 'Name'},
    {id: '2', title: 'Cards'},
    {id: '3', title: 'Last Updated'},
    {id: '4', title: 'Create by'},
    {id: '5', title: ''},
  ]

  const data = [
    {
      cards: 4,
      createdBy: 'Ivan Ivanov',
      id: '00',
      lastUpdated: '25.11.2023',
      name: 'Pack Name 1',
    },
  ]

  return (
    <div className={s.container}>
      <Header>
        <IconLogo/>
        <div>
          <Typography style={{marginRight: 10}} variant={'H3'}>
            name
          </Typography>
          <DropdownMenu
            position={'end'}
            trigger={<AvatarRadix imageUrl={''} style={{cursor: 'pointer'}} userName={'Name'}/>}
          >
            <DropDownItem>
              <AvatarRadix
                callback={() => {
                }}
                className={s.avatar}
                imageUrl={''}
                userName={'Name'}
              />
              <div>
                <div style={{marginBottom: 2}}>
                  <Typography variant={'subtitle-2'}>name</Typography>
                </div>
                <div>
                  <Typography style={{color: 'var(--color-dark-100)'}} variant={'caption'}>
                    user@incubator.com
                  </Typography>
                </div>
              </div>
            </DropDownItem>
            <DropdownSeparator/>
            <DropDownItem>
              <div className={s.iconAndDescription} onClick={() => {
              }}>
                <IconPerson/>
                <Typography variant={'caption'}>My Profile</Typography>
              </div>
            </DropDownItem>
            <DropdownSeparator/>
            <DropDownItem>
              <div className={s.iconAndDescription} onClick={() => {
              }}>
                <IconLogOut/>
                <Typography variant={'caption'}>Sign Out</Typography>
              </div>
            </DropDownItem>
          </DropdownMenu>
        </div>
      </Header>
      <div className={s.packsList}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button>
          <Typography variant={'subtitle-1'}>Add new Pack</Typography>
        </Button>
      </div>
      <div className={s.controlPanel}>
        <Input type={'search'}/>
        <TabSwitcher
          label={'Show packs cards'}
          onValueChange={() => {
          }}
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
          <SliderRadix onValueChange={setValueSlider} value={valueSlider}/>
        </div>
        <div style={{marginLeft: 20}}>
          <Button variant={'secondary'}>
            <IconDelete/>
            <Typography style={{whiteSpace: 'nowrap'}} variant={'subtitle-2'}>
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
                  {el.title === 'Last Updated'
                    ? <>
                      <Typography className={s.onChangeVector} onClick={onVectorChange} variant={'subtitle-2'}>
                        {el.title}
                      </Typography>
                      <span className={s.iconVector}>
                        {iconVector}
                      </span>
                    </>
                    : <Typography variant={'subtitle-2'}>
                      {el.title}
                    </Typography>
                  }
                </TableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(d => (
              <TableRow key={d.id}>
                <TableCell>
                  <Typography as={'p'} variant={'body-2'}>
                    {d.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography as={'p'} variant={'body-2'}>
                    {d.cards}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography as={'p'} variant={'body-2'}>
                    {d.lastUpdated}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography as={'p'} variant={'body-2'}>
                    {d.createdBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <div className={s.lastCell}>
                    <IconLearn/>
                    <IconEdit/>
                    <IconDelete/>
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
