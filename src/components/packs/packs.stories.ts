import { Packs } from '@/components/packs/packs'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Packs,
  tags: ['auto-docs'],
  title: 'Components/Packs',
} satisfies Meta<typeof Packs>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {}
