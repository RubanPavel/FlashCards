import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Input } from './'

const meta: Meta = {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = ({ ...args }) => {
  const [inputValue, setInputValue] = useState<string>('')

  return <Input {...args} onChangeValue={setInputValue} value={inputValue} />
}

Primary.args = {
  disabled: false,
  label: 'Input',
  placeholder: 'Input',
}

export const InputWithIconRight: Story = ({ ...args }) => {
  const [inputValue, setInputValue] = useState<string>('')

  return <Input {...args} onChangeValue={setInputValue} type={'password'} value={inputValue} />
}

InputWithIconRight.args = {
  disabled: false,
  label: 'Input',
  placeholder: 'Input',
}

export const SearchInput: Story = ({ ...args }) => {
  const [inputValue, setInputValue] = useState<string>('')

  return <Input {...args} onChangeValue={setInputValue} search value={inputValue} />
}

SearchInput.args = {
  disabled: false,
  label: 'Input',
  placeholder: 'Input',
}
