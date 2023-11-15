import {ConfigProvider, Pagination as PaginationPage, Space, theme} from "antd";
import {ComponentPropsWithoutRef} from "react";

export type Props = {
  className?: string
  currentPage: number
  totalCount: number
  onChange: (pageNumber: number, pageSize: number) => void
} & ComponentPropsWithoutRef<typeof PaginationPage>

export const Pagination = ({className, currentPage, totalCount, onChange}: Props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            algorithm: true
          }
        },
        algorithm: theme.darkAlgorithm
      }}
    >
      <Space>
        <PaginationPage
          className={className}
          current={currentPage}
          total={totalCount}
          onChange={onChange}
        />
      </Space>
    </ConfigProvider>
  )
}