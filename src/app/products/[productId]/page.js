export default function ProductDetails({ params }) {
    const { productId } = params;

    return <h1>Product Details: {productId}</h1>;
}