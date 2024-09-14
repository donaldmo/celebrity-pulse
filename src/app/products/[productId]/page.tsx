type ProductDetailsProp = {
    params: {
        productId: string
    }
}

export default function ProductDetails({ params }: ProductDetailsProp) {
    const { productId } = params;

    return <h1>Product Details: {productId}</h1>;
}
