export default function MyClassTitle({ title, classId }: { title: string; classId: number }) {

    return (
        <div className="myclassess__title">
            {title}
            <div className="myclasses__download-icon">
                <img className="icon-small" src="/assets/download.svg" alt="Download icon" />
                <div>
                    <p>Download</p>
                    <p>Ingredients</p>
                </div>
            </div>
        </div>
    )
}