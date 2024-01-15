import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { errorText, optionsToast, toastInfo } from '@/assets/variable'
import { ConfirmEmail } from '@/components/auth/confirm-email'
import { Progress } from '@/components/ui/progress'
import { useVerifyEmailMutation } from '@/services/auth'
import { ServerError } from '@/services/error.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './verify-email.module.scss'

export const VerifyEmailPage = memo(() => {
  const { userId } = useParams<string>()
  const [verifyMail, { data, isError, isLoading }] = useVerifyEmailMutation()
  const { verifyMailToast } = toastInfo
  const trigger = !!data || !isError
  const handleVerifyEmail = async () => {
    try {
      if (userId) {
        await verifyMail({ code: userId })
          .unwrap()
          .then(() => {
            toast.success(verifyMailToast, optionsToast)
          })
          .catch((e: ServerError & FetchBaseQueryError) => {
            toast.error(e?.data?.message || errorText, optionsToast)
          })
      }
    } catch (e: unknown) {
      toast.error(errorText, optionsToast)
    }
  }

  useEffect(() => {
    ;(async () => {
      await handleVerifyEmail()
    })()
  }, [])

  return (
    <>
      {isLoading && <Progress />}
      <ConfirmEmail className={s.VerifyEmailPageRoot} trigger={trigger} />
    </>
  )
})
