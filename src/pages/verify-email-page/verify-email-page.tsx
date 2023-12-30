import { useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-toastify'

import { errorText } from '@/assets/variable'
import { ConfirmEmail } from '@/components/auth/confirm-email'
import { Loader } from '@/components/ui/loader'
import { useVerifyEmailMutation } from '@/services/auth'
import { ServerError } from '@/services/error.types'

import s from './verify-email.module.scss'
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export const VerifyEmailPage = () => {
  const navigate = useNavigate()
  const { userId } = useParams<string>()
  const [verifyMail, { data, isError, isLoading }] = useVerifyEmailMutation()
  const trigger = !!data || !isError

  useEffect(() => {
    const handleVerifyEmail = async () => {
      if (userId) {
        try {
          await verifyMail({ code: userId }).unwrap()
              .then(() => {
                navigate('/login')
                toast.success('succuess1', {
                  position: toast.POSITION.BOTTOM_CENTER,
                })
              })
              .catch((e: ServerError & FetchBaseQueryError) => {
                toast.error(e?.data?.message || errorText, {
                  position: toast.POSITION.BOTTOM_CENTER,
                })
              })

        } catch (e: unknown) {
          return e
        }
      }
    }

    handleVerifyEmail().then()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return <ConfirmEmail className={s.VerifyEmailPageRoot} trigger={trigger} />
}
