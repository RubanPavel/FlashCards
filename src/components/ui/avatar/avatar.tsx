import * as Avatar from '@radix-ui/react-avatar'
import s from './avatar.module.scss'
import {ComponentPropsWithoutRef, forwardRef} from 'react'

type Props = {
  className?: string
  imageUrl: string | null
  userName: string | null
  callback?: () => void
} & ComponentPropsWithoutRef<typeof Avatar.Root>

const AvatarRadix = forwardRef<HTMLButtonElement, Props>(
  ({className, userName, imageUrl, callback, ...rest}, ref) => (
    <div style={{display: 'flex', gap: 20, marginRight: 15}}>
      <Avatar.Root
        onClick={callback}
        className={`${s.AvatarRoot} ${className}`}
        {...rest}
        ref={ref}
      >
        <Avatar.Image className="AvatarImage" src={imageUrl ? imageUrl : ''} alt="img"/>
        <Avatar.Fallback className={s.AvatarFallback} delayMs={50}>
          {userName && userName[0]}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
)

export default AvatarRadix
