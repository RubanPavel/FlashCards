// import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
// import { Mutex } from 'async-mutex'
//
// const mutex = new Mutex()
// const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_BASE_URL,
//   credentials: 'include',
// })
//
// export const baseQueryWithReauth: BaseQueryFn<
//   FetchArgs | string,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   await mutex.waitForUnlock()
//   let result = await baseQuery(args, api, extraOptions)
//
//   if (result.error && result.error.status === 401) {
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire()
//       const refreshResult = await baseQuery(
//         { method: 'POST', url: '/v1/auth/refresh-token' },
//         api,
//         extraOptions
//       )
//
//       if (refreshResult.meta?.response?.status === 204) {
//         result = await baseQuery(args, api, extraOptions)
//       }
//       release()
//     } else {
//       await mutex.waitForUnlock()
//       result = await baseQuery(args, api, extraOptions)
//     }
//   }
//
//   return result
// }

import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const baseUrl = 'https://andri-flashcards-api.onrender.com'

// type CustomError = {
//   data: {
//     statusCode: number
//     message: string
//   }
// }
const mutex = new Mutex()
export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: 'include',
})

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
            {
              url: '/v1/auth/refresh-token',
              method: 'POST',
            },
            api,
            extraOptions
        )

        // if (refreshResult.data) {
        //   // retry the initial query
        //   await baseQuery(args, api, extraOptions)
        // }
        if (refreshResult.meta?.response?.status === 204) {
          result = await baseQuery(args, api, extraOptions)
        } else {
          await baseQuery(
              {
                url: '/v1/auth/logout',
                method: 'POST',
              },
              api,
              extraOptions
          )
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
