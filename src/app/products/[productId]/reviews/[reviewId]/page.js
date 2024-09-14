import { notFound } from "next/navigation";

export default function ReviewDetail({ params }) {
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