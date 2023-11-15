import { useState } from 'react'

import { Pagination } from '@/components/ui/pagination/pagination'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  args: {
    currentPage: 1,
    totalCount: 100,
  },
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const [page, setPage] = useState(args.currentPage)

    return (
      <Pagination
        currentPage={page}
        onChange={pageNumber => setPage(pageNumber)}
        totalCount={args.totalCount}
      />
    )
  },
}
