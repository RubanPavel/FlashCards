type CustomServerError = {
  message: string
  path: string
  statusCode: number
  timestamp: Date
}

export type ServerError = {
  data: CustomServerError
  status: string
}
