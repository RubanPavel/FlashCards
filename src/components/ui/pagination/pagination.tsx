import React, { useState } from 'react'

import { hahdlePageChange } from '@/components/ui/pagination/utils/hahdlePageChange'
import { returnPaginationRange } from '@/components/ui/pagination/utils/returnPaginationRange'
import { Options, Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

import s from './pagination.module.scss'

export type Props = {
  className?: string
  getPage: (pageNumber: number, pageSize: number) => void
  selectOptions?: Options[]
  totalCount: number
}

export const Pagination = ({
  className,
  getPage,
  selectOptions = [
    { value: '10' },
    { value: '20' },
    { value: '30' },
    { value: '50' },
    { value: '100' },
  ],
  totalCount,
}: Props) => {
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)

  const totalPage = Math.ceil(totalCount / limit)

  if (totalPage < page) {
    setPage(totalPage)
  }

  const array = returnPaginationRange(totalPage, page, 1)

  const onPageClick = (value: number | string) => {
    if (typeof value === 'number') {
      getPage(value, limit)
    }
    hahdlePageChange(value, page, setPage, totalPage)
  }

  const onPageKeyPress = (e: React.KeyboardEvent, value: number | string) => {
    if (e.code === 'Enter') {
      if (typeof value === 'number') {
        getPage(value, limit)
      }
      hahdlePageChange(value, page, setPage, totalPage)
    }
  }

  const onLimitChange = (value: number) => {
    getPage(page, value)
    setLimit(value)
  }

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
          className={page === totalPage ? s.rightItem : ''}
          onClick={() => !(page === totalPage) && onPageClick('&rsaquo;')}
          onKeyUp={e => !(page === totalPage) && onPageKeyPress(e, '&rsaquo;')}
          tabIndex={!(page === totalPage) ? array.length + 2 : undefined}
        >
          <span>&rsaquo;</span>
        </li>
        <li
          className={page === totalPage ? s.rightItems : ''}
          onClick={() => !(page === totalPage) && onPageClick('&raquo;')}
          onKeyUp={e => !(page === totalPage) && onPageKeyPress(e, '&raquo;')}
          tabIndex={!(page === totalPage) ? array.length + 3 : undefined}
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
