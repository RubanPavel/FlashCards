import { useState } from 'react'
import { toast } from 'react-toastify'

import { errorText, optionsToast, packsPageData, toastInfo } from '@/assets/variable'
import { EditPack, FormValue } from '@/components/packs/modals/editPack'
import { Packs } from '@/components/packs/packs'
import { Loader } from '@/components/ui/loader'
import { ModalsBest } from '@/components/ui/modals/modalsBest'
import { Progress } from '@/components/ui/progress'
import { DeleteModal } from '@/pages/common/delete-modal/deleteModal'
import { useGetAuthMeQuery } from '@/services/auth'
import {
  Deck,
  useCreateDeckMutation,
  useDeleteDeskMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks'
import { decksActions } from '@/services/decks/decks.slice'
import { ServerError } from '@/services/error.types'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
// import {useDeleteCardMutation} from "@/services/cards";

export const PacksPage = () => {
  const params = useAppSelector(state => state.decksParams)
  const dispatch = useAppDispatch()
  const { data: user, isLoading: userIsLoading } = useGetAuthMeQuery()
  const { data: decks, isLoading: decksIsLoading } = useGetDecksQuery(params)
  const [updateDeck, { isLoading: updateDeckIsLoading }] = useUpdateDeckMutation()
  const [createDeck, { isLoading: createDeckIsLoading }] = useCreateDeckMutation()
  const [deleteDeck, { isLoading: deleteDeckIsLoading }] = useDeleteDeskMutation()
  // const [deleteCard] = useDeleteCardMutation()
  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false)
  const [deckDel, setDeckDel] = useState<Deck>()
  const [deckEdit, setDeckEdit] = useState<Deck>()

  const { modals } = packsPageData
  const { addDeckToast, deleteDeckToast, updateDeckToast } = toastInfo
  const handleAddDeck = (formData: FormValue) => {
    const payload = {
      cover: formData.cover,
      isPrivate: formData.isPrivate,
      name: formData.name,
    }

    createDeck(payload)
      .unwrap()
      .then(() => {
        toast.success(addDeckToast, optionsToast)
        setIsModalAddOpen(false)
        dispatch(decksActions.setCurrentPage({ currentPage: 1 }))
      })
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, optionsToast)
      })
  }

  const handleUpdateDeck = (formData: FormValue) => {
    const payload = {
      cover: formData.cover,
      id: deckEdit?.id,
      isPrivate: formData.isPrivate,
      name: formData.name,
    }

    updateDeck(payload)
      .unwrap()
      .then(() => {
        toast.success(updateDeckToast, optionsToast)
        setIsModalEditOpen(false)
      })
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, optionsToast)
      })
  }

  // TODO мы удаляем деку, наверное нужно удалить карточки?
  const handleDeleteDeck = () => {
    if (deckDel) {
      deleteDeck(deckDel.id)
        .unwrap()
        .then(() => {
          toast.success(deleteDeckToast, optionsToast)
          setIsModalDeleteOpen(false)
        })
        .catch((e: ServerError & FetchBaseQueryError) => {
          toast.error(e?.data?.message || errorText, optionsToast)
        })
    }
  }

  const handleOpenModalAddDecks = () => {
    setIsModalAddOpen(true)
  }

  const handleOpenModalEditDecks = (deck: Deck) => {
    setIsModalEditOpen(true)
    setDeckEdit(deck)
  }

  const handleOpenModalDeleteDecks = (deck: Deck) => {
    setIsModalDeleteOpen(true)
    setDeckDel(deck)
  }

  if (updateDeckIsLoading || createDeckIsLoading || deleteDeckIsLoading) {
    return <Progress />
  } else if (userIsLoading || decksIsLoading) {
    return <Loader />
  } else if (user && decks) {
    return (
      <>
        <Packs
          decks={decks}
          handleOpenModalAddDecks={handleOpenModalAddDecks}
          handleOpenModalDeleteDecks={handleOpenModalDeleteDecks}
          handleOpenModalEditDecks={handleOpenModalEditDecks}
          user={user}
        />
        <ModalsBest
          isModalOpen={isModalAddOpen}
          setIsModalOpen={setIsModalAddOpen}
          title={modals.addPack.title}
        >
          {/*// TODO переименовать элемент (сделать более уневерсальным)*/}
          <EditPack
            handleSubmitDecks={handleAddDeck}
            onClose={val => setIsModalAddOpen(val)}
            submitButtonDisabled={updateDeckIsLoading}
            variant={'add'}
          />
        </ModalsBest>
        <ModalsBest
          isModalOpen={isModalEditOpen}
          setIsModalOpen={setIsModalEditOpen}
          title={modals.editPack.title}
        >
          {/*// TODO переименовать элемент (сделать более уневерсальным)*/}
          <EditPack
            deck={deckEdit}
            handleSubmitDecks={handleUpdateDeck}
            onClose={val => setIsModalEditOpen(val)}
            submitButtonDisabled={createDeckIsLoading}
            variant={'edit'}
          />
        </ModalsBest>
        <ModalsBest
          isModalOpen={isModalDeleteOpen}
          setIsModalOpen={setIsModalDeleteOpen}
          title={modals.deletePack.title}
        >
          {/*// TODO переименовать элемент*/}
          <DeleteModal
            deck={deckDel}
            handleDelete={handleDeleteDeck}
            onClose={val => setIsModalDeleteOpen(val)}
            title={modals.deletePack.title}
          />
        </ModalsBest>
      </>
    )
  }
}
