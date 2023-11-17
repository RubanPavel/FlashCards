import { useState } from "react";
import {Meta, StoryObj} from "@storybook/react";
import { Input } from "./";

const meta: Meta = {
  component: Input,
  tags: ["autodocs"],
  title: "Components/Input",
};

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = ({ ...args }) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
      <Input
          {...args}
          value={inputValue}
          onChangeValue={setInputValue}
      />
  );
};

Primary.args = {
  disabled: false,
  label: 'Input',
  placeholder: 'Input',
};


export const InputWithIconRight: Story = ({ ...args }) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
      <Input
          {...args}
          type='password'
          value={inputValue}
          onChangeValue={setInputValue}
      />
  );
};

InputWithIconRight.args = {
  disabled: false,
  label: 'Input',
  placeholder: 'Input',
};

export const SearchInput: Story = ({ ...args }) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
      <Input
          {...args}
          search={true}
          value={inputValue}
          onChangeValue={setInputValue}
      />
  );
};

SearchInput.args = {
  disabled: false,
  label: 'Input',
  placeholder: 'Input',
};
