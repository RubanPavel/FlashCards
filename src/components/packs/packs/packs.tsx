import { packsPageData } from '@/assets/variable'
import { PacksControls } from '@/components/packs/packs/packs-controls/packs-controls'
import { PacksTable } from '@/components/packs/packs/packs-table/packs-table'
import { Pagination } from '@/components/ui/pagination'
import { Typography } from '@/components/ui/typography'
import { AuthResponse } from '@/services/auth'
import { Deck, DecksResponse } from '@/services/decks'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch } from '@/services/store'

import s from './packs.module.scss'

type Props = {
  decks: DecksResponse
  handleOpenModalAddDecks: () => void
  handleOpenModalDeleteDecks: (deck: Deck) => void
  handleOpenModalEditDecks: (deck: Deck) => void
  user: AuthResponse
}

export const Packs = ({
  decks,
  handleOpenModalAddDecks,
  handleOpenModalDeleteDecks,
  handleOpenModalEditDecks,
  user,
}: Props) => {
  const { emptyTable } = packsPageData
  const dispatch = useAppDispatch()

  const setPageValues = (currentPage: number, itemsPerPage: number) => {
    dispatch(decksActions.setCurrentPage({ currentPage }))
    dispatch(decksActions.setItemsPerPage({ itemsPerPage }))
  }

  const setCurrentPage = (currentPage: number) => {
    dispatch(decksActions.setCurrentPage({ currentPage }))
  }

  const setItemsPerPage = (itemsPerPage: number) => {
    dispatch(decksActions.setItemsPerPage({ itemsPerPage }))
  }

  return (
    <>
      <div className={s.PacksRoot}>
        <PacksControls
          decks={decks}
          handleOpenModalAddDecks={handleOpenModalAddDecks}
          user={user}
        />
        <div className={s.PacksWrapper}>
          <PacksTable
            decks={decks}
            handleOpenModalDeleteDecks={handleOpenModalDeleteDecks}
            handleOpenModalEditDecks={handleOpenModalEditDecks}
            user={user}
          />
          {decks?.items.length === 0 && (
            <Typography as={'p'} className={s.PacksEmpty} variant={'H2'}>
              {emptyTable}
            </Typography>
          )}
          {decks?.items.length !== 0 && (
            <Pagination
              getPage={setPageValues}
              limit={decks ? decks.pagination.itemsPerPage : 10}
              page={decks ? decks.pagination.currentPage : 1}
              setLimit={setItemsPerPage}
              setPage={setCurrentPage}
              totalPages={decks ? decks.pagination.totalPages : 1}
            />
          )}
        </div>
      </div>
    </>
  )
}
