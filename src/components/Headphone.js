import Link from "next/link";
import React from "react"

const Headphone = (params) => {
    const { image } = params;

    return (
        <div class="headphone img text">
            {image ? (
                <Link href={'/profile'}>
                    <img src={image} class="text" alt="headphone"
                        style={{ width: '28px', height: '28px', borderRadius: '100%' }}
                    />
                </Link>
            ) : (
                <img src="/images/headphone.png" class="text" alt="headphone" />
            )}

        </div>
    )
}

export default Headphone