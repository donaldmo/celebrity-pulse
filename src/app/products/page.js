export default function ProductList() {
    return (
        <>
            <h1>Product Lists</h1>
            <ul>
                {[1, 2, 3, 4].map(i => (
                    <li key={i}>Product {i}</li>
                ))}
            </ul>
        </>
    )
}