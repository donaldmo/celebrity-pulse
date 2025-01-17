'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { useSearchParams } from "next/navigation";
import NavigationContnet from '@/components/NavigationContent';
import Navigation from '@/components/Navigation';


export default function Purchase({ params }) {
    const { data: session, status } = useSession();

    const searchParams = useSearchParams();
    let ticketId = searchParams.get("ticketId");

    useEffect(async () => {
        if (ticketId && status === 'authenticated') {
            console.log('Session: ', session)

            // const ticket = await getTicket(ticketId);

            // const invoice = {
            //     metadata: {
            //         user_email: userData.email,
            //         product_id: ticket._id,
            //         product_item: "ticket"
            //     },
            //     amount: ticket.amount,
            //     currency: "ZAR",
            // };

            // const redirectUrl = purchaseTicket(invoice);
            // return window.open(redirectUrl, '_blank');
        } else {
            alert('No tickedId found in the URL');
        }
    }, [status, session]);

    console.log('status', status)

    return (
        <main id="songs-one">
            <div id="songs-one-content">
                <Navigation />
                <NavigationContnet />

                <div>
                    <div className="heading">
                        <div className="text">
                            Purchase Ticket
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
