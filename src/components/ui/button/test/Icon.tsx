type Props = {
  logo: string
}

export const Icon: React.FC<Props> = ({ logo }) => {
  return <img alt={'Logout'} src={logo} />
}
