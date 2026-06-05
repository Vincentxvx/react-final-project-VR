import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({ products }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = products.find((item) => item.id === Number(id));

    if (!product) {
        return <h1>Nincs ilyen termék</h1>;
    }

    return (
        <div>
            <h1>{product.name}</h1>

            <img src={product.img_url} alt={product.name} width="500"/>

            <p><strong>Leírás:</strong> {product.description}</p>

            <p><strong>Ár:</strong> {product.price} Ft</p>

            <p><strong>Készlet:</strong> {product.stock} db</p>

            <button onClick={() => navigate(-1)}>Vissza</button>
        </div>
    );
}

export default ProductDetails;