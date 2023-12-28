import {useNavigate} from 'react-router-dom'

import {ForgotPassword, FormValues} from '@/components/auth/forgot-password'
import {useRecoveryPasswordMutation} from '@/services/auth'

import s from './forgot-password-page.module.scss'
import {ServerError} from "@/services/error.types";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {toast} from "react-toastify";
import {errorText, forgotPageContent} from "@/assets/variable";

export const ForgotPasswordPage = () => {
    const [recovery, {}] = useRecoveryPasswordMutation()
    const navigate = useNavigate()
    const handleForgotPassword = (formData: FormValues) => {
        const payload = {
            email: formData.email,
            html: forgotPageContent.html,
            subject: forgotPageContent.subject,
        }

        recovery(payload)
            .unwrap()
            .then(() => {
                navigate('/check-email')
            })
            .catch((e: ServerError & FetchBaseQueryError) => {
                toast.error(e?.data?.message || errorText, {
                    position: toast.POSITION.BOTTOM_CENTER,
                })
            })
    }

    return (
        <ForgotPassword
            className={s.ForgotPasswordPageRoot}
            handleForgotPassword={handleForgotPassword}
        />
    )
}
