import { ComponentPropsWithoutRef, forwardRef } from 'react'

import * as Avatar from '@radix-ui/react-avatar'

import s from './avatar.module.scss'

type Props = {
  callback?: () => void
  className?: string
  imageUrl: null | string
  userName: null | string
} & ComponentPropsWithoutRef<typeof Avatar.Root>

const AvatarRadix = forwardRef<HTMLButtonElement, Props>(
  ({ callback, className, imageUrl, userName, ...rest }, ref) => (
    <div style={{ display: 'flex', gap: 20, marginRight: 15 }}>
      <Avatar.Root
        className={`${s.AvatarRoot} ${className}`}
        onClick={callback}
        {...rest}
        ref={ref}
      >
        <Avatar.Image alt={'img'} className={'AvatarImage'} src={imageUrl ? imageUrl : ''} />
        <Avatar.Fallback className={s.AvatarFallback} delayMs={50}>
          {userName && userName[0]}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
)

export default AvatarRadix