import { ComponentPropsWithoutRef } from 'react'

import { ConfigProvider, Pagination as PaginationPage, Space, theme } from 'antd'

export type Props = {
  className?: string
  currentPage: number
  onChange: (pageNumber: number, pageSize: number) => void
  totalCount: number
} & ComponentPropsWithoutRef<typeof PaginationPage>

export const Pagination = ({ className, currentPage, onChange, totalCount }: Props) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Pagination: {
            algorithm: true,
          },
        },
      }}
    >
      <Space>
        <PaginationPage
          className={className}
          current={currentPage}
          onChange={onChange}
          total={totalCount}
        />
      </Space>
    </ConfigProvider>
  )
}
