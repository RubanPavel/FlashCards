import { Packs } from '@/components/packs/packs'
import { Loader } from '@/components/ui/loader'
import { useGetAuthMeQuery } from '@/services/auth'
import {
  Deck,
  useCreateDeckMutation,
  useDeleteDeskMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { EditPack, FormValue } from '@/components/packs/modals/editPack'
import { ModalsBest } from '@/components/ui/modals/modalsBest'
import { useState } from 'react'
import { DeleteModal } from '@/pages/common/delete-modal/deleteModal'
import { optionsToast, packsPageData } from '@/assets/variable'
import { toast } from 'react-toastify'
import { decksActions } from '@/services/decks/decks.slice'
// import {useDeleteCardMutation} from "@/services/cards";

export const PacksPage = () => {
  const params = useAppSelector(state => state.decksParams)
  const dispatch = useAppDispatch()
  const { data: user, isLoading: userIsLoading } = useGetAuthMeQuery()
  const { data: decks, isLoading: decksIsLoading } = useGetDecksQuery(params)
  const [updateDeck, { isLoading: updateDeckIsLoading }] = useUpdateDeckMutation()
  const [createDeck, { isLoading: createDeckIsLoading }] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeskMutation()
  // const [deleteCard] = useDeleteCardMutation()
  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false)
  const [deckDel, setDeckDel] = useState<Deck>()
  const [deckEdit, setDeckEdit] = useState<Deck>()

  const { modals } = packsPageData

  const handleAddDeck = (formData: FormValue) => {
    const payload = {
      cover: formData.cover,
      isPrivate: formData.isPrivate,
      name: formData.name,
    }
    createDeck(payload)
      .unwrap()
      .then(() => {
        toast.success(`Your deck added successfully`, optionsToast)
        setIsModalAddOpen(false)
        dispatch(decksActions.setCurrentPage({ currentPage: 1 }))
      })
      .catch(() => {
        toast.error('Deck is not added', optionsToast)
      })
  }

  const handleUpdateDeck = (formData: FormValue) => {
    const payload = {
      id: deckEdit?.id,
      cover: formData.cover,
      isPrivate: formData.isPrivate,
      name: formData.name,
    }
    updateDeck(payload)
      .unwrap()
      .then(() => {
        toast.success(`Your deck updated successfully`, optionsToast)
        setIsModalEditOpen(false)
      })
      .catch(() => {
        toast.error('Deck is not found', optionsToast)
      })
  }

  // TODO мы удаляем деку, наверное нужно удалить карточки?
  const handleDeleteDeck = () => {
    if (deckDel) {
      deleteDeck(deckDel.id)
        .unwrap()
        .then(() => {
          toast.success('Pack deleted successfully', optionsToast)
          setIsModalDeleteOpen(false)
        })
        .catch(() => {
          toast.error('An error occurred while deleting.', optionsToast)
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

  if (userIsLoading || decksIsLoading) {
    return <Loader />
  } else if (user && decks) {
    return (
      <>
        <Packs
          decks={decks}
          user={user}
          handleOpenModalAddDecks={handleOpenModalAddDecks}
          handleOpenModalEditDecks={handleOpenModalEditDecks}
          handleOpenModalDeleteDecks={handleOpenModalDeleteDecks}
        />
        <ModalsBest
          isModalOpen={isModalAddOpen}
          setIsModalOpen={setIsModalAddOpen}
          title={modals.addPack.title}
        >
          {/*// TODO переименовать элемент (сделать более уневерсальным)*/}
          <EditPack
            variant={'add'}
            onClose={val => setIsModalAddOpen(val)}
            handleSubmitDecks={handleAddDeck}
            submitButtonDisabled={updateDeckIsLoading}
          />
        </ModalsBest>
        <ModalsBest
          isModalOpen={isModalEditOpen}
          setIsModalOpen={setIsModalEditOpen}
          title={modals.editPack.title}
        >
          {/*// TODO переименовать элемент (сделать более уневерсальным)*/}
          <EditPack
            variant={'edit'}
            deck={deckEdit}
            onClose={val => setIsModalEditOpen(val)}
            handleSubmitDecks={handleUpdateDeck}
            submitButtonDisabled={createDeckIsLoading}
          />
        </ModalsBest>
        <ModalsBest
          isModalOpen={isModalDeleteOpen}
          setIsModalOpen={setIsModalDeleteOpen}
          title={'Delete Pack'}
        >
          {/*// TODO переименовать элемент*/}
          <DeleteModal
            deck={deckDel}
            handleDelete={handleDeleteDeck}
            onClose={val => setIsModalDeleteOpen(val)}
            title={'Delete Pack'}
          />
        </ModalsBest>
      </>
    )
  }
}
