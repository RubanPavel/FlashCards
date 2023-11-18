import React, {useState} from "react";
import {returnPaginationRange} from "@/components/ui/pagination/utils/returnPaginationRange";
import s from './pagination.module.scss'
import {hahdlePageChange} from "@/components/ui/pagination/utils/hahdlePageChange";

export type Props = {
  className?: string
  getPage: (pageNumber: number, pageSize: number) => void
  totalCount: number
}

export const Pagination = ({className, getPage, totalCount}: Props) => {
  const [limit, setLimit] = useState<number>(5)
  const [page, setPage] = useState<number>(1)

  let totalPage = Math.ceil(totalCount / limit )
  if (totalPage < page) {
    setPage(totalPage)
  }

  let array = returnPaginationRange(totalPage, page, 1)

  const onPageClick = (value: number | string) => {
    hahdlePageChange(value, page, setPage, totalPage)
    getPage(page, limit)
  }

  const onPageKeyPress = (e: React.KeyboardEvent, value: number | string) => {
    if (e.code === 'Enter') {
      hahdlePageChange(value, page, setPage, totalPage)
      getPage(page, limit)
    }
  }

  return (
    <div className={className}>
      <ul className={s.items}>
        <li
          className={page === 1 ? s.leftItems : ''}
          tabIndex={!(page === 1) ? 1 : undefined}
          onClick={() => !(page === 1) && onPageClick( '&laquo;')}
          onKeyUp={e => !(page === 1) && onPageKeyPress(e, '&laquo;')}
        >
          <span>
            &laquo;
          </span>
        </li>
        <li
          className={page === 1 ? s.leftItem : ''}
          tabIndex={!(page === 1) ? 2 : undefined}
          onClick={() => !(page === 1) && onPageClick('&lsaquo;')}
          onKeyUp={e => !(page === 1) && onPageKeyPress(e, '&lsaquo;')}
        >

          <span>
            &lsaquo;
          </span>
        </li>

        {array.map((value, id) => (
          <li
            key={value}
            tabIndex={id + 2}
            className={`${value === page ? s.item : ''} ${s.hover}`}
            onClick={() => onPageClick(value)}
            onKeyUp={e => onPageKeyPress(e, value)}
          >
            {value}
          </li>
        ))}

        <li
          className={page === totalPage ? s.rightItem : ''}
          tabIndex={!(page === totalPage) ? array.length + 2 : undefined}
          onClick={() => !(page === totalPage) && onPageClick('&rsaquo;')}
          onKeyUp={e => !(page === totalPage) && onPageKeyPress(e, '&rsaquo;')}
        >
          <span>
            &rsaquo;
          </span>
        </li>
        <li
          className={page === totalPage ? s.rightItems : ''}
          tabIndex={!(page === totalPage) ? array.length + 3  : undefined}
          onClick={() => !(page === totalPage) && onPageClick('&raquo;')}
          onKeyUp={e => !(page === totalPage) && onPageKeyPress(e, '&raquo;')}
        >
          <span>
            &raquo;
          </span>
        </li>
      </ul>
    </div>
  )
}
