'use client';

import { useContext } from "react";
import { StateContext } from "@/StateProvider";
import SectionHeader from "@/_components/SectionHeader";
import Link from "next/link";
import Button from "@/_components/Button";

export default function Page () {
    const { error, userInfo, orderNumber  } = useContext(StateContext)

    let title;
    let subTitle="";

    if (error === ""){
        title = "Order processed successfully"
        subTitle=""
    }
    else {
        title = "Order not processed"
        subTitle="We apologize. Your order did not go through"
    }
    
    return (
        <div className="container section-checkout-confirmation">
            <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
            <SectionHeader title={title} subTitle={subTitle}/>
            <div className="regular-text">
                {error === "" ?
                        <>
                            <p>Confrmation number: <strong>{orderNumber}</strong></p>
                            <br></br>
                            <p>You will be receiving a confirmation soon in the e-mail <strong>{userInfo!.email}</strong></p>
                            <br></br>
                            <p>Please access your classes at the <Link className="link" href="/classes/myclasses">My Classes</Link> page</p>
                        </>
                    : 
                        <>
                            <p><strong>You were not charged</strong> and your classes are still in your <Link className="link" href="/cart">Shopping Cart</Link></p>
                            <br></br>
                            <p>Please try checking out again. You won't be charged until your order is confirmed</p>
                        </>
                }
            </div>
        </div>
    )
}