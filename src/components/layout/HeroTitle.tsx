type HeroTitleProps = {
    title: string
}

const HeroTitle = ({ title }: HeroTitleProps) => {
    return (
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-900">
            {title}
        </h1>
    )
}

export default HeroTitle