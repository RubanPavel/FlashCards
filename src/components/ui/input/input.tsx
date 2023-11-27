import { ComponentPropsWithoutRef, FocusEvent, forwardRef, useState } from 'react'

import { IconClose } from '@/assets/icons/IconClose'
import { IconEyeOffOutline } from '@/assets/icons/IconEyeOffOutline'
import { IconEyeOutline } from '@/assets/icons/IconEyeOutline'
import { IconSearch } from '@/assets/icons/IconSearch'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography/typography'
import { clsx } from 'clsx'

import s from './input.module.scss'

//TODO setValueSearch сделать более универсальной
export type Props = {
  className?: string
  errorMessage?: string
  label?: string
  name: string
  setValue?: (name: string, value: string) => void
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      disabled,
      errorMessage,
      label,
      name,
      onBlur,
      onChange,
      setValue,
      type,
      value,
      ...rest
    },
    ref
  ) => {
    // const { name, className, disabled, errorMessage, label, onBlur, onChange, setValue, type, value, ...rest } = props

    const [isInputFocused, setIsInputFocused] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    function handleInputBlurred(
      e: FocusEvent<HTMLInputElement & HTMLButtonElement & SVGSVGElement>
    ) {
      e.target instanceof HTMLInputElement && onBlur?.(e)
      setIsInputFocused(false)
    }

    function handleFocused() {
      setIsInputFocused(true)
    }

    const handleClearClicked = () => {
      setValue?.(name, '')
    }

    const toggleButtonClicked = () => {
      setIsPasswordVisible(!isPasswordVisible)
    }

    const inputType = type === 'password' && isPasswordVisible ? 'text' : type
    const isDirtyInput = typeof value === 'string' ? value?.length > 0 : !!value
    const isSearchInput = type === 'search'
    const isTogglePasswordInput = type === 'password' || isPasswordVisible
    const isShowSearchInputClearButton = type === 'search' && isDirtyInput
    const colorIconSearch = isInputFocused ? 'var(--color-light-100)' : 'var(--color-dark-300)'
    const colorIconEye = disabled ? 'var(--color-dark-300)' : 'var(--color-light-100)'
    const colorIconClose = isInputFocused && isDirtyInput ? 'var(--color-light-100)' : 'transparent'

    const classNameWrapper = clsx(s.wrapper, {
      [s.activeWrapper]: isInputFocused && isDirtyInput,
      [s.errorWrapper]: errorMessage && !isInputFocused,
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
            <IconSearch
              className={s.searchIcon}
              color={colorIconSearch}
              height={20}
              onBlur={handleInputBlurred}
              onFocus={handleFocused}
              width={20}
            />
          )}
          <input
            {...rest}
            className={clsx(s.input, errorMessage && s.errorInput)}
            disabled={disabled}
            name={name}
            onBlur={handleInputBlurred}
            onChange={onChange}
            onFocus={handleFocused}
            ref={ref}
            type={inputType}
            value={value}
          />
          {isShowSearchInputClearButton && (
            <Button
              disabled={disabled}
              onBlur={handleInputBlurred}
              onClick={handleClearClicked}
              onFocus={handleFocused}
              type={'button'}
              variant={'icon'}
            >
              <IconClose color={colorIconClose} height={20} width={20} />
            </Button>
          )}
          {isTogglePasswordInput && (
            <Button
              disabled={disabled}
              onBlur={handleInputBlurred}
              onClick={toggleButtonClicked}
              onFocus={handleFocused}
              type={'button'}
              variant={'icon'}
            >
              {isPasswordVisible ? (
                <IconEyeOffOutline color={colorIconEye} height={20} width={20} />
              ) : (
                <IconEyeOutline color={colorIconEye} height={20} width={20} />
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
