import { notFound } from "next/navigation";

type ReviewDetailProp = {
    params: {
        productId: string,
        reviewId: string
    }
}

export default function ReviewDetail({ params }: ReviewDetailProp) {
    const { productId, reviewId } = params;

    if (parseInt(reviewId) > 1000) {
        notFound();
    }

    return (
        <>
            <h1>Review {productId} for product {reviewId}</h1>
        </>
    )
}