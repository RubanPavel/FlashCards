import { IconRating } from '@/assets/icons/IconRating'

type Props = {
  filledStars: number
}
export const StarRating = ({ filledStars }: Props) => {
  const maxStars = 5

  const renderStars = () => {
    const stars = []

    for (let i = 1; i <= maxStars; i++) {
      const isFilled = i <= filledStars

      stars.push(isFilled ? <IconRating color={'yellow'} key={i} /> : <IconRating key={i} />)
    }

    return stars
  }

  return <div>{renderStars()}</div>
}
