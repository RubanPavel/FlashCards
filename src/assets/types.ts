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
  modals: {
    editPack: {
      cancelButton: string
      imageButton: string
      imageInfo: string
      imageSpan: string
      inputLabel: string
      isPrivate: string
      saveButton: string
      title: string
    }
  }
  packsTable: {
    columnsData: ColumnsData
    modalTitle: string
  }
}
