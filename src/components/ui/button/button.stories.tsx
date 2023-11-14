import type { Meta, StoryObj } from '@storybook/react'

import { IconLogOut } from '@/components/ui/button/assets/IconLogOut'

import { Button, ButtonProps } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const PrimaryWithIcon: Story = ({
  disabled,
  ...args
}: { disabled: boolean } & ButtonProps) => {
  return (
    <Button {...args} disabled={disabled}>
      <>
        <IconLogOut
          color={disabled ? 'var(--color-light-900)' : 'var(--color-light-100)'}
          height={16}
          width={16}
        />
        Primary Button
      </>
    </Button>
  )
}

PrimaryWithIcon.args = {
  disabled: false,
  variant: 'primary',
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const SecondaryWithIcon: Story = ({
  disabled,
  ...args
}: { disabled: boolean } & ButtonProps) => {
  return (
    <Button {...args} disabled={disabled}>
      <>
        <IconLogOut
          color={disabled ? 'var(--color-light-900)' : 'var(--color-light-100)'}
          height={16}
          width={16}
        />
        Secondary Button
      </>
    </Button>
  )
}

SecondaryWithIcon.args = {
  disabled: false,
  variant: 'secondary',
}

export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    disabled: false,
    variant: 'tertiary',
  },
}

export const Link: Story = {
  args: {
    as: 'a',
    children: 'Link Button',
    disabled: false,
    variant: 'link',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}
