export const returnPaginationRange = (totalPage: number, page: number, siblings: number) => {
  let totalPageNoInArray = 7 + siblings
  if (totalPageNoInArray >= totalPage) {
    return range(1, totalPage + 1)
  }

  let leftSiblingsIndex = Math.max(page - siblings, 1)
  let rightSiblingsIndex = Math.min(page + siblings, totalPage)

  let showLeftDots = leftSiblingsIndex > 2
  let showRightDots = rightSiblingsIndex < totalPage - 2

  if (!showLeftDots && showRightDots) {
    let leftItemCount = 3 + 2 * siblings
    let leftRange = range(1, leftItemCount + 1)
    return [...leftRange, " ...", totalPage]
  } else if (showLeftDots && !showRightDots) {
    let rightItemCount = 3 + 2 * siblings
    let rightRange = range(totalPage - rightItemCount + 1, totalPage + 1)
    return [1, "... ", ...rightRange]
  } else {
    let middleRange = range(leftSiblingsIndex, rightSiblingsIndex + 1)
    return [1, "... ", ...middleRange, " ...", totalPage]
  }
}


function range(start: number, end: number) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  const result = [];
  let current = start;

  while (current < end) {
    result.push(current);
    current += 1;
  }

  return result;
}