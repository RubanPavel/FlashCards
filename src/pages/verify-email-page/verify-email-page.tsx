  import {useCallback, useEffect, useState} from 'react'
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
      // const trigger = !!data || !isError;
      const trigger = (!!data && !isError) || (!data && !isError);

    const handleVerifyEmail = useCallback(async () => {
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
    }, [userId, verifyMail, requestSent]);

    useEffect(() => {
      if (!isLoading && !requestSent) {
        handleVerifyEmail();
      }
    }, [handleVerifyEmail, isLoading, requestSent]);


    if (isLoading) {
      return <Loader />
    }

    return <ConfirmEmail className={s.VerifyEmailPageRoot} trigger={trigger} />
  }
