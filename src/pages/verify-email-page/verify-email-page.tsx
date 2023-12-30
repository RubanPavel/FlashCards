  import {useEffect, useState} from 'react'
  import { useParams } from 'react-router-dom'
  import { toast } from 'react-toastify'

  import { errorText } from '@/assets/variable'
  import { ConfirmEmail } from '@/components/auth/confirm-email'
  import { Loader } from '@/components/ui/loader'
  import { useVerifyEmailMutation } from '@/services/auth'
  import { ServerError } from '@/services/error.types'

  import s from './verify-email.module.scss'

  export const VerifyEmailPage = () => {
      const { userId } = useParams<string>();
      const [verifyMail, { data, isError, isLoading }] = useVerifyEmailMutation();
      const [requestSent, setRequestSent] = useState<boolean>(false);
      const trigger = !!data || !isError;

      useEffect(() => {
        const handleVerifyEmail = async () => {
          try {
            if (userId && !requestSent) {
              await verifyMail({ code: userId });
              setRequestSent(true);
            }
          } catch (e: unknown) {
            const err = e as ServerError;
            toast.error(err?.data?.message || errorText, {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        };

        (async () => {
          if (!isLoading) {
            await handleVerifyEmail();
          }
        })();
      }, [userId, verifyMail, requestSent, isLoading]);

    if (isLoading) {
      return <Loader />
    }

    return <ConfirmEmail className={s.VerifyEmailPageRoot} trigger={trigger} />
  }
