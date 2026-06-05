import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

const ProductList = ({ products, deleteProduct }) => {
  return (
    <div className={styles.grid}>
      {products.length == 0 ? <h2>Nincs megjeleníthető termék</h2> : products.map((product) => (
        <ProductItem key={product.id} product={product} deleteProduct={deleteProduct} />
      ))}
    </div>
  );
};

export default ProductList;