import { useForm } from 'react-hook-form'
import { Button } from '@//components/ui/button'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {Card} from "@/components/ui/card";
import {Typography} from "@/components/ui/typography";
import s from './sign-up.module.scss'

const loginSchema = z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(3, { message: 'Password must contain at least 3 characters' }).max(30, { message: 'Password must be at most 30 characters long' }),
        confirm: z.string().min(3, { message: 'Password must contain at least 3 characters' }).max(30, { message: 'Password must be at most 30 characters long' }),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ["confirm"],
    })

type FormValues = z.infer<typeof loginSchema>

export const SignUp = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
            confirm: '',
        },
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
    })

    // TODO
    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <Card className={s.card}>
            <Typography variant={'large'}>Sign Up</Typography>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <ControlInput
                    name={'email'}
                    control={control}
                    errorMessage={errors.email?.message}
                    label={'Email'}
                />
                <ControlInput
                    name={'password'}
                    type={"password"}
                    control={control}
                    errorMessage={errors.password?.message}
                    label={'Password'}
                />
                <ControlInput
                    name={'confirm'}
                    type={"password"}
                    control={control}
                    errorMessage={errors.confirm?.message}
                    label={'Confirm password'}
                />
                <Button className={s.button} fullWidth={true} type={'submit'}>Submit</Button>
            </form>
            <Typography className={s.message} variant={'body-2'}>Already have an account?</Typography>
           {/* TODO fix Link*/}
           {/* <Button variant={'link'} as={'Link'} to="/sign-in">Sign In</Button>*/}
            <Button className={s.button} variant={'link'} as={'a'}>Sign In</Button>
        </Card>
    )
}