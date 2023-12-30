import {memo, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { errorText } from '@/assets/variable'
import { ConfirmEmail } from '@/components/auth/confirm-email'
import { Loader } from '@/components/ui/loader'
import { useVerifyEmailMutation } from '@/services/auth'
import { ServerError } from '@/services/error.types'

import s from './verify-email.module.scss'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const VerifyEmailPage = memo(() => {
  const { userId } = useParams<string>()
  const [verifyMail, { data, isError, isLoading }] = useVerifyEmailMutation()
  const trigger = !!data || !isError
  const handleVerifyEmail = async () => {
    try {
      if (userId) {
        await verifyMail({ code: userId })
            .unwrap()
            .catch((e: ServerError & FetchBaseQueryError) => {
              toast.error(e?.data?.message || errorText, {
                position: toast.POSITION.BOTTOM_CENTER,
              })
            })
      }
    } catch (e: unknown) {
      toast.error(errorText, { position: toast.POSITION.BOTTOM_CENTER })
    }
  }
  useEffect(() => {
    handleVerifyEmail()


    // (async () => {
    //   if (!isLoading && userId && isError) {
    //     handleVerifyEmail();
    //   }
    // })();
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return <ConfirmEmail className={s.VerifyEmailPageRoot} trigger={trigger} />
})
