import { SectionHeaderProps } from '@/_types/global';

export default function SectionHeader({title, subTitle}: SectionHeaderProps){
    return (
        <>
            <p className="heading-tertiary">{subTitle}</p>
            <p className="heading-secondary">{title}</p>
        </>
    )
}