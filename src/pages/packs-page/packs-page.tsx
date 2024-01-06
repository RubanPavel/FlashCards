import { Packs } from '@/components/packs/packs'
import { useGetAuthMeQuery } from '@/services/auth'
import { useGetDecksQuery } from '@/services/decks'
import { useAppSelector } from '@/services/store'
import { Loader } from '@/components/ui/loader'

export const PacksPage = () => {
  const params = useAppSelector(state => state.decksParams)
  const { data: user, isLoading: userIsLoading } = useGetAuthMeQuery()
  const { data: decks, isLoading: decksIsLoading } = useGetDecksQuery(params)

  if (userIsLoading || decksIsLoading) {
    return <Loader />
  } else if (user && decks) {
    return <Packs user={user} decks={decks} />
  }
}
