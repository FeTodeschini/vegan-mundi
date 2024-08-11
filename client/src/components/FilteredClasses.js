import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "../StateProvider.js";

import Card from "./Card.js"
import Button from "./Button.js";
import SeactionHeader from './SectionHeader.js';
import Modal from './Modal.js';

import leaf from '../assets/icon-leaf.svg';
import { removeFromCart } from "../utils/functions.js";

export default function FilteredClasses ({images, resultsFound, title, subTitle}){
    const { setCartQuantity, cartQuantity, cartItems, setCartItems } = useContext(StateContext);
    const navigate = useNavigate();
    
    function onAddToCart(item) {
        // Converts the cartItems to a string, as local storage only stores strings
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
        localStorage.setItem('cartQuantity', cartQuantity + 1);

        setCartItems([...cartItems, item]);
        setCartQuantity(items=>items+1);
    }

    return (
        <div className="container">
            <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
            <SeactionHeader title={title} subTitle={subTitle}/>

            {resultsFound > 0 ? <SeactionHeader title={""} subTitle={"Add a class to your cart to select if it will be in person or online"}/> : ""}

            <div className="grid-auto-fit">
                {images.map((item, index)=>(
                    <Card 
                        imgSource={item.PRE_SIGNED_URL}
                        imgLink={null}
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
                                <Button bgColor={"green"} type={"button"} size={"medium"} onClick={()=>removeFromCart(cartItems, cartQuantity, setCartItems, setCartQuantity, item.TITLE)}>Remove Item</Button>
                            :
                                <Button bgColor={"green"} type={"button"} size={"medium"} onClick={()=>onAddToCart(item)}>Add to cart</Button>
                                // <a href={`/category-classes/#${index}`}><Button bgColor={"green"} type={"button"} size={"medium"}>Add to cart</Button></a>
                            }
                            <Button size={"medium"}>Learn More &rarr;</Button>
                        </div>

                        <Modal modalId={index} padding={"8"}>
                            <p className="card__title">{item.TITLE}</p>
                            <p>Select the type of your class:</p>
                        </Modal>
                    </ Card>
                ))}
            </div>
        </div>
    )
}