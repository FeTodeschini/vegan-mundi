import React, { useMemo, useState } from "react";
import { useCallback, useContext } from "react";
import { StateContext } from "../StateProvider";
import { useSelector } from "react-redux";
import SectionHeader from './SectionHeader';
import Card from "./Card"
import Button from "./Button";
import ButtonRemoveFromCart from "./ButtonRemoveFromCart";
import ModalAddToCart from "./ModalAddToCart";
import { ReduxRootState } from "@/_types/redux";
import { FilteredClassesProps } from '@/_types/global';
import { CookingClass } from '@/_types/cooking-class';
import '../_styles/gallery.css';
import '../_styles/review.css';
import ReviewStarsContainer from "./ReviewStarsContainer";


const FilteredClasses = React.memo(function FilteredClasses ({images, resultsFound, title, subTitle}: FilteredClassesProps){
    const { cartItems } = useSelector((state: ReduxRootState)=> state.cart)
    const { selectedClass, isModalOpen, setIsModalOpen, setSelectedClass } = useContext(StateContext);
    
    const closeModal = () => {setIsModalOpen(false);};

    const onSelectClassType = useCallback((item: CookingClass) => {
        if (setSelectedClass)
            setSelectedClass(item);
        setIsModalOpen(true);
    }, [selectedClass])

    // Memoize all cards to prevent re-computation and wasted renders
    const memoizedCards = useMemo(() => (
        images.map((item) => (
            <div key={item.TITLE}>
                <Card key={item.TITLE}>
                    <Card.TopImage imgSource={item.PRE_SIGNED_URL} imgLink={`/classes/${encodeURIComponent(item.CATEGORY_ID)}`} />
                    <Card.Title>
                        {item.TITLE}
                        <ReviewStarsContainer stars={item.AVERAGE_STARS} isReviewed={false} />
                    </Card.Title>
                    <Card.Content>{item.DESCRIPTION}</Card.Content>
                    <Card.Content>
                        {item.CLASSES_LIST ? item.CLASSES_LIST.split("|").map((listItem: any) => (
                            <div className="card__items-list" key={listItem}>
                                <img className="icon-list" src="/assets/icon-leaf.svg" alt="Leaf icon" />
                                <p>{listItem}</p>
                            </div>
                        )) : ''}
                    </Card.Content>
                    <Card.Footer>
                        <div className="flex-col">
                            {cartItems.some((currentItem) => currentItem.TITLE === item.TITLE) ?
                                <ButtonRemoveFromCart item={item} />
                                :
                                <Button bgColor={"green"} type={"button"} size={"medium"} onClick={() => onSelectClassType(item)}>
                                    Add to cart
                                </Button>
                            }
                                <Button size={"medium"}>Learn More &rarr;</Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        ))
    ), [images, cartItems, onSelectClassType]);

    return (
        <div className="container">
            <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
            <SectionHeader title={title} subTitle={subTitle}/>
            {(resultsFound ?? 0) > 0 || subTitle!.includes("Category:") ? 
                <>
                    <SectionHeader subTitle={"Add a class to your cart to select if it will be in person or online"}/>
                    <div className="grid-auto-fit top-margin--medium">
                        {memoizedCards}
                    </div>
                    { isModalOpen && (
                        <ModalAddToCart padding={"8"} closeModal={closeModal} modalTitle={"Select Your Class Type:"} modalSubTitle={selectedClass!.TITLE}/>
                    )}
                </>
            : 
                ""
            }
        </div>
    )
})

export default FilteredClasses;