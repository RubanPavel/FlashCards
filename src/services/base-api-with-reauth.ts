// import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
//
// import { fetchBaseQuery } from '@reduxjs/toolkit/query'
//
// const baseQuery = fetchBaseQuery({ baseUrl: '/' })
//
// export const baseQueryWithReauth: BaseQueryFn<
//   FetchArgs | string,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions)
//
//   if (result.error && result.error.status === 401) {
//     // try to get a new token
//     const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
//
//     if (refreshResult.data) {
//       // store the new token
//       api.dispatch(tokenReceived(refreshResult.data))
//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions)
//     } else {
//       api.dispatch(loggedOut())
//     }
//   }
//
//   return result
// }
