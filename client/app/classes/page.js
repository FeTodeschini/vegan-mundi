import SectionHeader from '../_components/SectionHeader.js';
import Button from '../_components/Button.js';

export default function Page() {
    return <div class="container">
        <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
        <SectionHeader 
            title="Class Title" 
            subTitle="Class Details"/>
    </div>
}