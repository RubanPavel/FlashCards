type Sort = '' | 'cardsCount' | 'created' | 'name' | 'updated'
type Direction = 'asc' | 'desc'

type ColumnsData = { id: string; sort: Sort; title: string }[]
type TabsData = { id: string; value: string }[]

export type PacksPageData = {
  columnsData: ColumnsData
  tabsData: TabsData
}
