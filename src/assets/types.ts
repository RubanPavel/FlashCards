import { Sort } from '@/services/decks'

type ColumnsData = {
  id: string
  sort: '' | Sort
  title: string
}[]

type TabsData = {
  id: string
  value: string
}[]

export type PacksPageData = {
  controls: {
    buttonDelete: string
    modal: {
      title: string
      trigger: string
    }
    sliderTitle: string
    tabSwitcherLabel: string
    tabsData: TabsData
    title: string
  }
  emptyTable: string
  packsTable: {
    columnsData: ColumnsData
  }
}
