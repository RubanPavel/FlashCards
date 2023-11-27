export type DecksResponse = {
  items: Deck[]
  maxCardsCount: number
  pagination: Pagination
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type DecksResponseItemsAuthor = {
  id: string
  name: string
}

export type Deck = {
  author: DecksResponseItemsAuthor
  cardsCount: number
  cover?: null | string
  created: string
  id: string
  isBlocked?: any
  isDeleted?: any
  isPrivate?: boolean
  name: string
  rating: number
  shots: number
  updated: string
  userId: string
}

export type CreateDeckType = Pick<Deck, 'cover' | 'isPrivate' | 'name'>
