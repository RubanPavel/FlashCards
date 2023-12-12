import React, { useEffect } from 'react'

import { hahdlePageChange } from '@/components/ui/pagination/utils/hahdlePageChange'
import { returnPaginationRange } from '@/components/ui/pagination/utils/returnPaginationRange'
import { Options, Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

import s from './pagination.module.scss'

export type Props = {
  className?: string
  getPage: (pageNumber: number, pageSize: number) => void
  limit: number
  page: number
  selectOptions?: Options[]
  setLimit: (itemsPerPage: number) => void
  setPage: (currentPage: number) => void
  totalPages: number
}

export const Pagination = ({
  className,
  getPage,
  limit,
  page,
  selectOptions = [
    { value: '10' },
    { value: '20' },
    { value: '30' },
    { value: '50' },
    { value: '100' },
  ],
  setLimit,
  setPage,
  totalPages,
}: Props) => {
  if (totalPages < page) {
    setPage(totalPages ? totalPages : 1)
  }
  if (totalPages === 0) {
    totalPages = 1
  }

  const array = returnPaginationRange(totalPages, page, 1)

  const onPageClick = (value: number | string) => {
    hahdlePageChange(value, page, setPage, totalPages)
  }

  const onPageKeyPress = (e: React.KeyboardEvent, value: number | string) => {
    if (e.code === 'Enter') {
      hahdlePageChange(value, page, setPage, totalPages)
    }
  }

  const onLimitChange = (value: number) => {
    setLimit(value)
  }

  useEffect(() => {
    getPage(page, limit)
  }, [page, limit])

  return (
    <div className={`${s.container} ${className}`}>
      <ul className={s.items}>
        <li
          className={page === 1 ? s.leftItems : ''}
          onClick={() => !(page === 1) && onPageClick('&laquo;')}
          onKeyUp={e => !(page === 1) && onPageKeyPress(e, '&laquo;')}
          tabIndex={!(page === 1) ? 1 : undefined}
        >
          <span>&laquo;</span>
        </li>
        <li
          className={page === 1 ? s.leftItem : ''}
          onClick={() => !(page === 1) && onPageClick('&lsaquo;')}
          onKeyUp={e => !(page === 1) && onPageKeyPress(e, '&lsaquo;')}
          tabIndex={!(page === 1) ? 2 : undefined}
        >
          <span>&lsaquo;</span>
        </li>

        {array.map((value, id) => (
          <li
            className={`${value === page ? s.item : ''} ${s.hover}`}
            key={value}
            onClick={() => onPageClick(value)}
            onKeyUp={e => onPageKeyPress(e, value)}
            tabIndex={id + 2}
          >
            {value}
          </li>
        ))}

        <li
          className={page === totalPages ? s.rightItem : ''}
          onClick={() => !(page === totalPages) && onPageClick('&rsaquo;')}
          onKeyUp={e => !(page === totalPages) && onPageKeyPress(e, '&rsaquo;')}
          tabIndex={!(page === totalPages) ? array.length + 2 : undefined}
        >
          <span>&rsaquo;</span>
        </li>
        <li
          className={page === totalPages ? s.rightItems : ''}
          onClick={() => !(page === totalPages) && onPageClick('&raquo;')}
          onKeyUp={e => !(page === totalPages) && onPageKeyPress(e, '&raquo;')}
          tabIndex={!(page === totalPages) ? array.length + 3 : undefined}
        >
          <span>&raquo;</span>
        </li>
      </ul>
      <div className={s.wrapperForSelect}>
        <Typography variant={'body-2'}>Показать</Typography>
        <div className={s.select}>
          <Select onValueChange={value => onLimitChange(+value)} selectOptions={selectOptions} />
        </div>
        <Typography variant={'body-2'}>на странице</Typography>
      </div>
    </div>
  )
}
