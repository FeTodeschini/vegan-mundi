export default function Gallery() {

    {/*
    
    some code that fetches the names of the images and stores them in the gallery array
    
    */}
    
    
        return (
    
                <section className="gallery-container">
                    <div className="container">
                        <SectionHeader title="Pictures of our happy students" subTitle="Gallery" />
                    </div>    
    
                    <div className="gallery__content grid-auto-fit">
    
                        {
                            gallery.map(image=>
                                (
                                    <figure>
                                        <div className="gallery__img--container">
                                            <img 
                                                className="gallery__img" 
                                                src={`https://s3-location-amazonaws.com/my-bucket-name/${image.FILE_NAME}`} 
                                            />
                                        </div>
                                        <figcaption className="gallery__caption">{image.LABEL}</figcaption>
                                    </figure>
                                )
                            )
                        } 
    
                    </div>
                        
                </section>
            )
    
    }
            