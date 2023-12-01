import { ChangeEvent, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Input } from './'

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

  return <Input {...args} name={'primary'} onChange={onChange} value={inputValue} />
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

  return (
    <Input {...args} name={'search'} onChange={onChange} setValue={setValue} value={inputValue} />
  )
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

  return (
    <Input
      {...args}
      name={'password'}
      onChange={onChange}
      setValue={setInputValue}
      type={'password'}
      value={inputValue}
    />
  )
}

PasswordInput.args = {
  disabled: false,
  label: 'Input',
  placeholder: 'Input',
  type: 'password',
}
