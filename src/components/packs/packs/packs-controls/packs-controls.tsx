import { useState } from 'react'

import { IconClose } from '@/assets/icons/IconClose'
import { packsPageData } from '@/assets/variable'
import { DebouncedInput } from '@/components/packs/common/DebouncedInput'
import { AddNewPack } from '@/components/packs/modals/addNewPack'
import { Button } from '@/components/ui/button'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { ModalsNew } from '@/components/ui/modals/modalsNew'
import { SliderRadix } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { Typography } from '@/components/ui/typography'
import { AuthResponse } from '@/services/auth'
import { DecksResponse } from '@/services/decks'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'

import 'react-loading-skeleton/dist/skeleton.css'

import s from './packs-controls.module.scss'

type Props = {
  decks: DecksResponse
  user: AuthResponse
}

export const PacksControls = ({ decks, user }: Props) => {
  const { buttonDelete, modal, sliderTitle, tabSwitcherLabel, tabsData, title } =
    packsPageData.controls
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
      <div className={s.ControlsRoot}>
        <Typography variant={'large'}>{title}</Typography>
        <ModalsNew
          className={{ title: s.ModalTitle }}
          icon={<IconClose className={s.ModalIconButton} />}
          onClose={onCloseModalNewPack}
          open={openModalNewPack}
          title={
            <Typography as={'p'} variant={'H2'}>
              {modal.title}
            </Typography>
          }
          trigger={
            <Button>
              <Typography variant={'subtitle-1'}>{modal.trigger}</Typography>
            </Button>
          }
        >
          <AddNewPack onClose={val => onCloseModalNewPack(val)} />
        </ModalsNew>
      </div>
      <div className={s.ControlsPanel}>
        <DebouncedInput
          callback={handleSearch}
          className={s.ControlsPanelSearchInput}
          inputValue={inputValue}
          name={'search'}
          setInputValue={setInputValue}
          type={'search'}
        />
        <TabSwitcher
          label={tabSwitcherLabel}
          onValueChange={handleTabSwitcher}
          tabs={tabsData}
          value={activeTab}
        />
        <div>
          <Typography variant={'body-2'}>{sliderTitle}</Typography>
          <SliderRadix
            externalValues={externalValues}
            max={maxValueSlider}
            min={minValuesSlider}
            onValueCommit={handleSliderValues}
          />
        </div>
        <Button className={s.ControlsClearFilter} onClick={handleClearFilter} variant={'secondary'}>
          <IconDelete />
          <Typography variant={'subtitle-2'}>{buttonDelete}</Typography>
        </Button>
      </div>
    </>
  )
}
