import { Meta, StoryObj } from '@storybook/react'

import { Input } from './'
import {ChangeEvent, useState} from "react";

const meta: Meta = {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = ({ ...args }) => {
  const [inputValue, setInputValue] = useState<string>('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return <Input {...args} name={'primary'} value={inputValue} onChange={onChange}/>
}

Primary.args = {
  disabled: false,
  label: 'Input',
  placeholder: 'Input',
  type: 'text',
}

export const SearchInput: Story = ({ ...args }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const setValue = (name: string, value: string) => {
    name === 'search' && setInputValue(value)
  }

  return <Input {...args} name={'search'} value={inputValue} onChange={onChange} setValue={setValue}/>
}

SearchInput.args = {
  disabled: false,
  label: 'Input',
  placeholder: 'Input',
  type: 'search',
}
export const PasswordInput: Story = ({ ...args }) => {
  const [inputValue, setInputValue] = useState<string>(args.value || '')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return <Input {...args} name={'password'} setValue={setInputValue} type={'password'} value={inputValue}
                onChange={onChange}/>
}

PasswordInput.args = {
  disabled: false,
  label: 'Input',
  type: 'password',
  placeholder: 'Input',
}

