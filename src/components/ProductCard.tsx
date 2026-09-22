import type { Product } from "../types/product";


type ProductCardProps = {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps){

return(
    <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price} kr</p>
        <p>Lager: {product.stock}</p>
    </div>
)





}