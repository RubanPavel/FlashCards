export const returnPaginationRange = (totalPage: number, page: number, siblings: number) => {
  const totalPageNoInArray = 7 + siblings

  if (totalPageNoInArray >= totalPage) {
    return range(1, totalPage + 1)
  }

  const leftSiblingsIndex = Math.max(page - siblings, 1)
  const rightSiblingsIndex = Math.min(page + siblings, totalPage)

  const showLeftDots = leftSiblingsIndex > 2
  const showRightDots = rightSiblingsIndex < totalPage - 2

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblings
    const leftRange = range(1, leftItemCount + 1)

    return [...leftRange, ' ...', totalPage]
  } else if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblings
    const rightRange = range(totalPage - rightItemCount + 1, totalPage + 1)

    return [1, '... ', ...rightRange]
  } else {
    const middleRange = range(leftSiblingsIndex, rightSiblingsIndex + 1)

    return [1, '... ', ...middleRange, ' ...', totalPage]
  }
}

function range(start: number, end: number) {
  if (end === undefined) {
    end = start
    start = 0
  }

  const result = []
  let current = start

  while (current < end) {
    result.push(current)
    current += 1
  }

  return result
}
