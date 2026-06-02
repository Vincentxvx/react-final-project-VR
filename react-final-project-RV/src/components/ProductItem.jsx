import Swal from "sweetalert2";
import Card from "../wrappers/Card";
import styles from "./ProductItem.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/loginContext";

const PrductItem = ({ product, deleteProduct }) => {
    const { isLogged } = useAuth(); 

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Biztosan törölni szeretnéd ezt a terméket?");
        if (confirmDelete) {
            const response = await fetch(`http://localhost:3000/products/${id}`, {
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
                })
                deleteProduct(id);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Hiba történt",
                    text: "Nem sikerült törölni a terméket.",
                });
            }
        }
    };

    return(
    <Card>
      <div className={styles.container}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{product.price} Ft</p>
      </div>
      {isLogged && <button onClick={() => handleDelete(product.id)}>Törlés</button>}
      <NavLink to={`/details/${product.id}`}>
        <button>Részletek</button>
      </NavLink>
    </Card>
    );
};

export default PrductItem;