import { Card, CardWithUserId } from '@/services/cards'

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
  cover?: string
  created: string
  id: string
  isBlocked?: boolean | null
  isDeleted?: boolean | null
  isPrivate?: boolean
  name: string
  rating?: number
  shots: number
  updated: string
  userId: string
}

export type CreateDeckRequest = {
  cover?: File | string
  isPrivate?: boolean
  name: string
}

// export type CreateDeckRequest = Pick<Deck, 'cover' | 'isPrivate' | 'name'>

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
  cover?: File | string
  id?: string
  isPrivate?: boolean
  name: string
}

export type GetDecksCardsParams = {
  answer?: string
  currentPage?: number
  id?: string
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
  answer: FormData
  answerImg?: FormData
  answerVideo?: FormData
  id: FormData
  question: FormData
  questionImg?: FormData
  questionVideo?: FormData
}

export type getRandomCardResponse = CardWithUserId

export type saveGradeResponse = Card

export type getRandomCard = {
  id?: string
  previousCardId?: string
}
export type saveGrade = {
  // cardId?: string
  grade: number
  id?: string
}

export type Sort = 'cardsCount' | 'created' | 'name' | 'updated'
export type Direction = 'asc' | 'desc'

export type SortDirection = `${Sort}-${Direction}`

export type GetDecks = {
  authorId?: string
  currentPage: number
  itemsPerPage: number
  maxCardsCount: string
  minCardsCount: string
  name: string
  orderBy: SortDirection
}

export type CardsResponse = {
  items: CardsResponseItems[]
  pagination: CardsResponsePagination
}
export type CardsResponseItems = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}
export type CardsResponsePagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}
