export default function SectionHeader({title, subTitle}){
    return (
        <>
            <p className="heading-tertiary">{subTitle}</p>
            <p className="heading-secondary">{title}</p>
        </>
    )
}