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

export type DeleteResponse = {
  cardsCount: number
  created: string
  id: string
  isPrivate: boolean
  name: string
  rating: number
  shots: number
  updated: string
  userId: string
}

export type UpdateDeckRequest = {
  cover: string
  id: string
  isPrivate?: boolean
  name: string
}

export type GetDecksCardsParams = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: string
  question?: string
}

export type CardResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  id: string
  question: string
  questionImg: string
  questionVideo: string
  rating: number
  shots: number
  updated: string
  userId: string
}

export type CreateCardType = {
  answer: string
  answerImg: string
  answerVideo: string
  id: string
  question: string
  questionImg: string
  questionVideo: string
}

export type getRandomCardResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  id: string
  question: string
  questionImg: string
  questionVideo: string
  rating: number
  shots: number
  updated: string
  userId: string
}

export type getRandomCardType = {
  id: string
  previousCardId?: string
}
export type saveGradeType = {
  cardId: string
  grade: number
  id: string
}
