export const hahdlePageChange = (
  value: number | string,
  page: number,
  setPage: (page: number) => void,
  totalPage: number
) => {
  if (value === '&laquo;' || value === '... ') {
    setPage(1)
  } else if (value === '&lsaquo;') {
    if (page !== 1) {
      setPage(page - 1)
    }
  } else if (value === '&rsaquo;') {
    if (page !== totalPage) {
      setPage(page + 1)
    }
  } else if (value === '&raquo;' || value === ' ...') {
    setPage(totalPage)
  } else {
    if (typeof value === 'number') {
      setPage(value)
    }
  }
}
