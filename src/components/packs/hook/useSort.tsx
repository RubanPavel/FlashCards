import { useState } from 'react'

import { IconVectorDown } from '@/assets/icons/IconVectorDown'
import { IconVectorUp } from '@/assets/icons/IconVectorUp'

export const useSort = () => {
  const [sort, setSort] = useState('updated-asc')

  const iconVector = sort === 'updated-asc' ? <IconVectorDown /> : <IconVectorUp />
  const onVectorChange = () => {
    if (sort === 'updated-asc') {
      setSort('updated-desc')
    }
    if (sort === 'updated-desc') {
      setSort('updated-asc')
    }

    return sort
  }

  return { iconVector, onVectorChange, sort }
}
