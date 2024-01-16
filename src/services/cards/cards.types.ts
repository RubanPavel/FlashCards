export type Card = {
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
}

export type CardWithUserId = Card & {
  userId: string
}

export type CardsResponse = CardWithUserId

export type updateCardType = {
  answer: string
  answerImg?: File | string
  answerVideo: string
  id?: string
  question: string
  questionImg?: File | string
  questionVideo: string
}

export type updateCardResponse = {
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
