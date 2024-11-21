import { SectionHeaderProps } from '../_types/ui-components';

export default function SectionHeader({title, subTitle, titleAdditionalClass=""}: SectionHeaderProps){
    return (
        <>
            {subTitle && <p className="heading-tertiary">{subTitle}</p>}
            {title && <p className={`heading-secondary ${titleAdditionalClass}`}>{title}</p>}
        </>
    )
}