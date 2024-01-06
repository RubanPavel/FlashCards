import { useState } from 'react'
import { IconClose } from '@/assets/icons/IconClose'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { AddNewPack } from '@/components/packs/modals/addNewPack'
import { Button } from '@/components/ui/button'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { ModalsNew } from '@/components/ui/modals/modalsNew'
import { SliderRadix } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { Typography } from '@/components/ui/typography'
import { AuthResponse } from '@/services/auth'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import s from './packs-controls.module.scss'
import { packsPageData } from '@/assets/variable'
import 'react-loading-skeleton/dist/skeleton.css'
import { DecksResponse } from '@/services/decks'

type Props = {
  user: AuthResponse
  decks: DecksResponse
}

export const PacksControls = ({ user, decks }: Props) => {
  const { tabsData } = packsPageData
  const dispatch = useAppDispatch()
  const params = useAppSelector(state => state.decksParams)
  const [openModalNewPack, onCloseModalNewPack] = useState<boolean>(false)
  const [externalValues, setExternalValues] = useState<number[]>(
    params.maxCardsCount !== '0' ? [Number(params.minCardsCount), Number(params.maxCardsCount)] : []
  )
  const [activeTab, setActiveTab] = useState<string>(
    params.authorId ? tabsData[0].value : tabsData[1].value
  )

  const [inputValue, setInputValue] = useState<string>(params.name || '')

  const maxValueSlider = decks ? decks.maxCardsCount : 0
  const minValuesSlider = 0

  const handleSearch = (searchValue: string) => {
    dispatch(decksActions.setName({ name: searchValue }))
  }

  const handleTabSwitcher = (tabValue: string) => {
    setActiveTab(tabValue)
    if (tabValue === tabsData[0].value) {
      dispatch(decksActions.setCurrentPage({ currentPage: 1 }))
      dispatch(decksActions.setAuthorId({ authorId: user.id }))
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

  return (
    <>
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
    </>
  )
}
