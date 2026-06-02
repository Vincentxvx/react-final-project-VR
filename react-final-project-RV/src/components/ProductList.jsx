import ProductItem from "./ProductItem";

const ProductList = ({ products, deleteProduct }) => {
    return(
        <div className="product-list">
            {products.length == 0 ? <h2>Nincs megjelenítendő termék</h2> : products.map((product) => (
                <ProductItem key={product.id} product={product} deleteProduct={deleteProduct} />
            ))}
        </div>
    );
};

export default ProductList;