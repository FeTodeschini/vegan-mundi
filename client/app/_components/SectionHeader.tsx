import { SectionHeaderProps } from '@/_types/ui-components';

export default function SectionHeader({title, subTitle}: SectionHeaderProps){
    return (
        <>
            {subTitle && <p className="heading-tertiary">{subTitle}</p>}
            {title && <p className="heading-secondary">{title}</p>}
        </>
    )
}