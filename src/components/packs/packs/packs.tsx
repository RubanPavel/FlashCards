import { packsPageData } from '@/assets/variable'
import { PacksControls } from '@/components/packs/packs/packs-controls/packs-controls'
import { PacksTable } from '@/components/packs/packs/packs-table/packs-table'
import { Pagination } from '@/components/ui/pagination'
import { Typography } from '@/components/ui/typography'
import { AuthResponse } from '@/services/auth'
import {Deck, DecksResponse} from '@/services/decks'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch } from '@/services/store'

import s from './packs.module.scss'
import {ModalsBest} from "@/components/ui/modals/modalsBest";
import {EditPack} from "@/components/packs/modals/editPack";
import {DeleteModal} from "@/pages/common/delete-modal";
import {useState} from "react";

type Props = {
  decks: DecksResponse
  user: AuthResponse
}

export const Packs = ({ decks, user }: Props) => {
  const { emptyTable } = packsPageData
  const dispatch = useAppDispatch()
    const [isModalDelOpen, setIsModalDelOpen] = useState<boolean>(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false)
    const [deckDel, setDeckDel] = useState<Deck>()
    const [deckEdit, setDeckEdit] = useState<Deck>()

    const handleDelete = (deck: Deck) => {
        setIsModalDelOpen(true)
        setDeckDel(deck)
    }

    const handleEdit = (deck: Deck) => {
        setIsModalEditOpen(true)
        setDeckEdit(deck)
    }

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
              <PacksControls decks={decks} user={user}/>
              <div className={s.PacksWrapper}>
                  <PacksTable decks={decks} user={user} handleDelete={handleDelete} handleEdit={handleEdit}/>
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
          <ModalsBest
              isModalOpen={isModalEditOpen}
              setIsModalOpen={setIsModalEditOpen}
              title={'Edit Pack'}
          >
              <EditPack deck={deckEdit} onClose={val => setIsModalEditOpen(val)} />
          </ModalsBest>
          <ModalsBest
              isModalOpen={isModalDelOpen}
              setIsModalOpen={setIsModalDelOpen}
              title={'Delete Pack'}
          >
              <DeleteModal deck={deckDel} onClose={val => setIsModalDelOpen(val)} title={'Delete Pack'} />
          </ModalsBest>
      </>
  )
}
