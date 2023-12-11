import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { ConfirmEmail } from '@/components/auth/confirm-email'
import { Loader } from '@/components/ui/loader'
import { useVerifyEmailMutation } from '@/services/auth'

export const VerifyEmailPage = () => {
  const { userId } = useParams()
  const [verifyMail, { data, isError, isLoading }] = useVerifyEmailMutation()
  const trigger = !!data || !isError

  useEffect(() => {
    const handleVerifyEmail = async () => {
      if (userId) {
        try {
          await verifyMail({ code: userId }).unwrap()
        } catch (error: any) {
          console.error('Ошибка при подтверждении email', error?.data?.errorMessage)
        }
      }
    }

    handleVerifyEmail().then()
  }, [userId, verifyMail])

  if (isLoading) {
    return <Loader />
  }

  return <ConfirmEmail trigger={trigger} />
}
