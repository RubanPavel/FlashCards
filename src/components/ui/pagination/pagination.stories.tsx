import {Meta, StoryObj} from "@storybook/react";
import {Pagination} from "@/components/ui/pagination/pagination";
import {useState} from "react";

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
  args: {
    currentPage: 1,
    totalCount: 100,
  }
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const [page, setPage] = useState(args.currentPage)
    return <Pagination currentPage={page} totalCount={args.totalCount} onChange={(pageNumber) => setPage(pageNumber)} />
  }
}