import { useState } from "react";
import { StateContext } from "@/StateProvider";
import { useContext } from "react";
import { useGetSectionDataWithS3Image } from "@/hooks/useGetSectionDataWithS3Image";
import SectionHeader from "./SectionHeader";
import { useAddPreSignedUrlToArray } from "@/hooks/useAddPreSuignedUrlToArray";
import { Modal, useModal } from "./Modal";
import { SectionDataGallery } from "@/_types/section-data";
import '../_styles/gallery.css';

export default function Gallery (){

    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState<SectionDataGallery[]>([]);
    const [sectionData, setSectionData] = useState<SectionDataGallery[]>([]);
    const [preSignedUrl, setPreSignedUrl] = useState("");

    const { openModal } = useModal();
    const { isModalOpen, setIsModalOpen } = useContext(StateContext);
    
    // Retrieves all gallery info from the database
    useGetSectionDataWithS3Image(setSectionData, 'gallery')

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useAddPreSignedUrlToArray(sectionData, 'vegan-mundi-gallery', setImages, setIsLoading);

    function openGalleryPicture(url: string){
        setPreSignedUrl(url);
        openModal();
    }

    // checks if API calls are still being executed. If this line is ommited, than a runtime error (as freeClasses array will be empty) will occur when page is refreshed or user hits the browser's back button
    if (isLoading){
        return(<p>loading...</p>);
    }
    else {

        return (
            <>
                <section className="gallery-container">
                    <div className="container">
                        <SectionHeader title="Pictures of our happy students" subTitle="Gallery" />
                    </div>    
                    <div className="gallery__content grid-auto-fit">
                        {
                            images.map((item, index) => {
                                return (
                                    <figure key={item.PRE_SIGNED_URL}>
                                        <div className="gallery__img--container">
                                            <img
                                                className="gallery__img" 
                                                src={item.PRE_SIGNED_URL}
                                                onClick={()=>openGalleryPicture(item.PRE_SIGNED_URL!)}
                                            />
                                        </div>
                                        <figcaption className="gallery__caption">{item.LABEL}</figcaption>
                                    </figure>
                                )
                            }
                        )}
                    </div>

                </section>

                { isModalOpen &&
                    <Modal padding={"8"}>
                        <div className="gallery-modal-img">
                            <img
                                className="gallery__img-modal" 
                                src={preSignedUrl}
                            />
                        </div>
                    </Modal>
                }
            </>
        )
    }
}