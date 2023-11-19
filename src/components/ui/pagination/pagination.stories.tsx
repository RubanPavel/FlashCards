import { Pagination } from '@/components/ui/pagination/pagination'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  args: {
    totalCount: 50,
  },
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return <Pagination getPage={() => {}} totalCount={args.totalCount} />
  },
}
