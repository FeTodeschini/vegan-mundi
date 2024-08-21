import { useContext } from "react";
import { StateContext } from "../StateProvider.js";
import Card from "./Card.js"
import Button from "./Button.js";
import ButtonRemoveFromCart from "./ButtonRemoveFromCart.js";
import SeactionHeader from './SectionHeader.js';
import { useModal } from "./Modal.js";
import ModalAddToCart from "./ModalAddToCart";
import '../_styles/gallery.css';
import leaf from '../../public/assets/icon-leaf.svg';


export default function FilteredClasses ({images, resultsFound, title, subTitle}){
    const { setCartQuantity, cartQuantity, cartItems, setCartItems, selectedClass, setSelectedClass, cartAmount, setCartAmount } = useContext(StateContext);
    const { openModal } = useModal();
    const { isModalOpen } = useContext(StateContext);

    function onSelectClassType(item) {
        setSelectedClass(item);
        openModal();
    }

    return (
        <div className="container">
            <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
            <SeactionHeader title={title} subTitle={subTitle}/>

            {resultsFound > 0 ? <SeactionHeader title={""} subTitle={"Add a class to your cart to select if it will be in person or online"}/> : ""}

            <div className="grid-auto-fit">
                {images.map((item, index)=>( 
                    <>
                        <Card 
                            imgSource={item.PRE_SIGNED_URL}
                            imgLink={`/classes/${encodeURIComponent(item.CATEGORY_ID)}`}
                            title={item.TITLE} 
                            description={item.DESCRIPTION} 
                            key={item.PRE_SIGNED_URL}
                            descriptionList={item.CLASSES_LIST === null ? '' :
                                item.CLASSES_LIST.split("|").map(item => {
                                    return (
                                        <div className='card__items-list' key={item}>
                                            <img className='icon-list' src={leaf.src} alt="Leaf icon" />
                                            <p>{item}</p>
                                        </div>
                                    )
                                    }
                                )
                            }
                        >
                            {/* Render the Add or Remove button */}
                            <div className="flex-col">
                                {/* If item is not in the shopping cart yet, renders the "Add to Cart" button. Otherwise, renders the "Remove" button */}
                                {cartItems.filter(currentItem=>currentItem.TITLE === item.TITLE).length > 0 ?
                                    <ButtonRemoveFromCart itemTitle={item.TITLE} />
                                :
                                    <Button bgColor={"green"} type={"button"} size={"medium"} onClick={()=>onSelectClassType(item)}>Add to cart</Button>
                                }
                                <Button size={"medium"}>Learn More &rarr;</Button>
                            </div>

                        </ Card>

                        { isModalOpen &&
                            <ModalAddToCart padding={"8"} modalTitle={"Select Your Class Type:"} modalSubTitle={selectedClass.TITLE}/>
                        }
                    </>
                ))}
            </div>
        </div>
    )
}