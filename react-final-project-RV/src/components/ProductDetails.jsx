import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/loginContext";
import Card from "../wrappers/Card";
import Swal from "sweetalert2";
import styles from "./ProductDetails.module.css";

function ProductDetails({ products, deleteProduct }) {

  const { id } = useParams();
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h1>Nincs ilyen termék</h1>;
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Biztosan törölni szeretnéd ezt a terméket?");
    if (confirmDelete) {
      const response = await fetch(`http://localhost:3000/products/${product.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Sikeres törlés",
          text: "A termék sikeresen törölve lett.",
        });
        deleteProduct(product.id);
        navigate('/');
      } else {
        Swal.fire({
          icon: "error",
          title: "Hiba történt",
          text: "Nem sikerült törölni a terméket.",
        });
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <Card>
        <div className={styles.container}>
          <img src={product.img_url} alt={product.name} className={styles.image} />
          <h1 className={styles.name}>{product.name}</h1>
          <p><strong>Leírás:</strong> {product.description}</p>
          <p><strong>Ár:</strong> {product.price} Ft</p>
          <p><strong>Készlet:</strong> {product.stock} db</p>
          <div className={styles.buttons}>
            <button onClick={() => navigate(-1)}>Vissza</button>
            {isLogged && <button onClick={handleDelete}>Törlés</button>}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProductDetails;