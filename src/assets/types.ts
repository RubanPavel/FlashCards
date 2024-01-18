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
    addPack: {
      submitButton: string
      title: string
    }
    deletePack: {
      info: string
      question: {
        main: string
        span: string
      }
      submitButton: string
      title: string
    }
    editPack: {
      submitButton: string
      title: string
    }
  }
  packsTable: {
    columnsData: ColumnsData
    modalTitle: string
  }
}

export type CardsPageData = {
  modals: {
    deleteCard: {
      info: string
      question: {
        main: string
        span: string
      }
      submitButton: string
      title: string
    }
  }
}
