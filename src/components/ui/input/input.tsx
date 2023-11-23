import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/input/assets/IconClose'
import { IconEyeOffOutline } from '@/components/ui/input/assets/IconEyeOffOutline'
import { IconEyeOutline } from '@/components/ui/input/assets/IconEyeOutline'
import { IconSearch } from '@/components/ui/input/assets/IconSearch'
import { Typography } from '@/components/ui/typography/typography'
import { clsx } from 'clsx'

import s from './input.module.scss'

export type Props = {
  className?: string
  errorMessage?: string
  label?: string
  name?: string
  onChangeValue?: (value: string) => void
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, disabled, errorMessage, label, onChangeValue, type, value, ...rest }, ref) => {
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(errorMessage || null)

    function handleInputChanged(e: ChangeEvent<HTMLInputElement>) {
      onChangeValue?.(e.target.value)
      error && setError(null)
    }

    function handleInputBlurred() {
      setIsInputFocused(false)
    }

    function handleFocus() {
      setIsInputFocused(true)
    }

    const handleClearClicked = () => {
      onChangeValue?.('')
      error && setError(null)
    }

    const inputType = type === 'password' && isPasswordVisible ? 'text' : type
    const isDirtyInput = value?.length! > 0
    const isSearchInput = type === 'search'
    const isTogglePasswordInput = type === 'password' || isPasswordVisible
    const isShowSearchInputClearButton = type === 'search' && isDirtyInput
    const colorIconSearch = isInputFocused ? 'var(--color-light-100)' : 'var(--color-dark-300)'
    const colorIconEye = disabled ? 'var(--color-dark-300)' : 'var(--color-light-100)'
    const colorIconClose = isInputFocused && isDirtyInput ? 'var(--color-light-100)' : 'transparent'

    const classNameWrapper = clsx(s.wrapper, {
      [s.activeWrapper]: isInputFocused && isDirtyInput,
      [s.errorWrapper]: error && !isInputFocused,
      [s.focusWrapper]: isInputFocused && !isDirtyInput,
    })

    return (
      <div aria-disabled={disabled} className={`${s.root} ${className}`}>
        {label && (
          <label aria-disabled={disabled} className={s.label}>
            {label}
          </label>
        )}
        <div aria-disabled={disabled} className={classNameWrapper}>
          {isSearchInput && (
            <IconSearch className={s.searchIcon} color={colorIconSearch} height={20} width={20} />
          )}
          <input
            className={clsx(s.input, errorMessage && s.errorInput)}
            disabled={disabled}
            onBlur={handleInputBlurred}
            onChange={handleInputChanged}
            onFocus={handleFocus}
            ref={ref}
            type={inputType}
            value={value}
            {...rest}
          />
          {isShowSearchInputClearButton && (
            <Button disabled={disabled} onClick={handleClearClicked} variant={'icon'}>
              <IconClose color={colorIconClose} height={20} width={20} />
            </Button>
          )}
          {isTogglePasswordInput && (
            <Button
              disabled={disabled}
              type={'button'}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              variant={'icon'}
            >
              {isPasswordVisible ? (
                <IconEyeOutline color={colorIconEye} height={20} width={20} />
              ) : (
                <IconEyeOffOutline color={colorIconEye} height={20} width={20} />
              )}
            </Button>
          )}
        </div>
        {
          <Typography className={s.errorMessage} variant={'caption'}>
            {errorMessage}
          </Typography>
        }
      </div>
    )
  }
)
