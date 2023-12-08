import { useState } from 'react'
import { Provider } from 'react-redux'

import { Pagination } from '@/components/ui/pagination/pagination'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  args: {
    limit: 10,
    page: 1,
    totalPages: 50,
  },
  component: Pagination,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const [page, setPage] = useState(args.page)
    const [limit, setLimit] = useState(args.limit)

    return (
      <Pagination
        getPage={() => {}}
        limit={limit}
        page={page}
        setLimit={itemsPerPage => {
          setLimit(itemsPerPage)
        }}
        setPage={currentPage => {
          setPage(currentPage)
        }}
        totalPages={args.totalPages}
      />
    )
  },
}
