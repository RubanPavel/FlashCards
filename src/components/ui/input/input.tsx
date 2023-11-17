import {ChangeEvent, FocusEvent, ComponentPropsWithoutRef, FC, useRef, useState} from 'react'

import s from './input.module.scss'
import { Typography } from '@/components/ui/typography/typography'
import { IconEyeOutline } from '@/components/ui/input/assets/IconEyeOutline'
import { IconEyeOffOutline } from '@/components/ui/input/assets/IconEyeOffOutline'
import { IconSearch } from '@/components/ui/input/assets/IconSearch'
import { IconClose } from '@/components/ui/input/assets/IconClose'

export type InputProps = {
  search?: boolean
  errorMessage?: string
  label?: string
    onChangeValue?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

export const Input: FC<InputProps> = props => {
  const { className, value, onChangeValue, type, label, disabled, errorMessage , search, ...rest } = props
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [isInputTouched, setIsInputTouched] = useState(false);
    const [isClearButtonVisible, setIsClearButtonVisible] = useState(false);
    const clearButtonRef = useRef(null);

    const handleClear = () => {
        onChangeValue && onChangeValue('')
        setIsClearButtonVisible(false);
    }

    const handleFocus = () => {
        setIsInputFocused(true);
        setIsClearButtonVisible(!!value);
    };

    const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
        const isClearButton = e.relatedTarget === clearButtonRef.current;
        setIsClearButtonVisible(!isClearButton);
        setIsInputFocused(false);

    };

    const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value.trim()
        !isInputTouched && setIsInputTouched(true)
        onChangeValue && onChangeValue(newValue)
        setIsClearButtonVisible(!!newValue);
    }

    const inputFocused = isInputFocused && !value
    const inputActive = isInputFocused && value
    const wrapperStyle = errorMessage && !isInputTouched ? s.errorWrapper : inputFocused ? s.focus : inputActive ? s.active : s.wrapper

  const colorIcon = inputActive || !disabled ? "var(--color-light-100)" : "var(--color-dark-300)"

  return (
    <div className={s.container} aria-disabled={disabled}>
        {label && <label aria-disabled={disabled}>{label}</label>}
        <div className={wrapperStyle}
             aria-disabled={disabled}
             onFocus={handleFocus}
             onBlur={handleBlur}
        >
            {search && (
                <IconSearch color={colorIcon} height={20} width={20} />
            )}
            <input
                disabled={disabled}
                className={`${s.input} ${errorMessage && !isInputTouched && s.errorInput}`}
                value={value}
                onChange={handleInputOnChange}
                {...rest}
            />
            {(search && isClearButtonVisible) && (
                <button disabled={disabled} onClick={handleClear}>
                  <IconClose height={20} width={20} />
                </button>
            )}
            {type === 'password' && (
                <button ref={clearButtonRef} disabled={disabled} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                  {isPasswordVisible ? (
                    <IconEyeOutline color={colorIcon} height={20} width={20} />
                  ) : (
                    <IconEyeOffOutline color={colorIcon} height={20} width={20} />
                  )}
                </button>
            )}
        </div>
        <Typography className={s.error} variant="caption" children={`${errorMessage || ''}`} />
    </div>
  )
}
