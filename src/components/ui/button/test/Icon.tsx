type Props= {
    logo: string
}

export const Icon: React.FC<Props> = ({logo}) => {
    return <img src={logo} alt="Logout" />;
};
