'use client';

import { useContext } from "react";
import { StateContext } from "@/StateProvider";
import SectionHeader from "./SectionHeader";
import { PrimitiveTypeProp } from "@/_types/global";
import Link from "next/link";

export default function CheckoutConfirmation ({ orderNumber }: PrimitiveTypeProp<string>) {
    const { error, userInfo,  } = useContext(StateContext)

    const title = error === "" ? "ORDER PROCESSED SUCCESSFULLY" : "Order not processed"
    
    return (
        <div className="container">
            <SectionHeader title={title} />
            <div className="regular-text">
                {error === "" ?
                        <>
                            <p>Confrmation number: <strong>{orderNumber}</strong></p>
                            <br></br>
                            <p>You will be receiving a confirmation soon in the e-mail <strong>{userInfo!.email}</strong></p>
                            <br></br>
                            <p>Please access your classes at the <Link href="/myclasses">My Classes</Link> page</p>
                        </>
                    : 
                        <>
                            <p>You were not charged and your classes are still in your shopping cart</p>
                            <p>Please try checking out again, and rest assured that you won't be charged in case your order is not confirmed</p>
                            <p>You can send us an e-mail at anytime by clicking <a href="mailto:example@example.com">here</a>, and we will reply in a timely manner</p>
                        </>
                }
            </div>
        </div>
    )
}