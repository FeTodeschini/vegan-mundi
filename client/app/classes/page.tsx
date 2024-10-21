import SectionHeader from '../_components/SectionHeader';
import Button from '../_components/Button';

export default function Page() {
    return <div className="container">
        <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
        <SectionHeader 
            title="Class Title" 
            subTitle="Class Details"/>
    </div>
}