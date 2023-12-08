import { Pagination } from '@/components/ui/pagination/pagination'
import { Meta, StoryObj } from '@storybook/react'
import {Provider} from "react-redux";
import {store} from "@/services/store";
import {useState} from "react";

const meta = {
  args: {
    page: 1,
    limit: 10,
    totalPages: 50,
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const [page, setPage] = useState(args.page)
    const [limit, setLimit] = useState(args.limit)

    return <Pagination
      getPage={() => {}}
      page={page}
      limit={limit}
      totalPages={args.totalPages}
      setLimit={(itemsPerPage) => {setLimit(itemsPerPage)}}
      setPage={(currentPage) => {setPage(currentPage)}}
    />
  },
}
