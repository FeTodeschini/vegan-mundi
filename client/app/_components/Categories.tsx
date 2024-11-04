import React from 'react';
import SectionHeader from './SectionHeader';
import Button from './Button';
import Card from './Card';
import { CookingClassCategory } from '@/_types/cooking-class';
import { ArrayProps } from '@/_types/global';

export default function Categories({categories}: ArrayProps<CookingClassCategory>) {

    return (
        <>
            <section className="classes-categories container">
                <SectionHeader 
                    title="Pick the class level that best fits your needs and skills" 
                    subTitle="3 Levels of Classes"/>
                <div className="grid-auto-fit">
                    {categories.map( item => 
                        <Card 
                            title={item.TITLE} 
                            imgSource={`/assets/${item.PHOTO}`}
                            imgLink={`/classes/${encodeURIComponent(item.CATEGORY_ID)}`} 
                            callOutTag={item.LEVEL}
                            description={item.DESCRIPTION}

                            // Split the items of a recipe's list that are stored altogether in a single field in the database, 
                            // separated by a delimiter ("|") instead of them being stored in individual rows in a related table
                            descriptionList={
                                item.DESCRIPTION_ITEMS_LIST.split("|").map(item => {
                                    return (
                                        <div className="card__items-list" key={item}>
                                            <img className='icon-list' src="/assets/icon-leaf.svg" alt="Leaf icon" />
                                            <p>{item}</p>
                                        </div>
                                    )
                                    }
                                )
                            }
                            key= {item.PRE_SIGNED_URL}
                        >
                            <Button additionalClass="top-margin--small" link={`/classes/${encodeURIComponent(item.CATEGORY_ID)}`}>See Classes &rarr;</Button>
                        </Card>
                    )}

                </div>
            </section>
        </>
    )
}