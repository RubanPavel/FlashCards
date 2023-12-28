import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {ConfirmEmail} from '@/components/auth/confirm-email'
import {Loader} from '@/components/ui/loader'
import {useVerifyEmailMutation} from '@/services/auth'
import s from './verify-email.module.scss'
import {errorText} from "@/assets/variable";
import {toast} from "react-toastify";
import {ServerError} from "@/services/error.types";

export const VerifyEmailPage = () => {
    const {userId} = useParams<string>()
    const [verifyMail, {data, isError, isLoading}] = useVerifyEmailMutation()
    const trigger = !!data || !isError

    useEffect(() => {
        const handleVerifyEmail = async () => {
            if (userId) {
                try {
                    await verifyMail({code: userId}).unwrap();
                } catch (e: unknown) {
                    const err = e as ServerError
                    toast.error(err?.data?.message || errorText, {
                        position: toast.POSITION.BOTTOM_CENTER,
                    });
                }
            }
        }

        handleVerifyEmail().then()
    }, [userId])

    if (isLoading) {
        return <Loader/>
    }

    return <ConfirmEmail className={s.VerifyEmailPageRoot} trigger={trigger}/>
}
