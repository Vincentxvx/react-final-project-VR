import { useRef } from "react";
import Card from "../wrappers/Card";
import Swal from "sweetalert2";
import styles from "./ProductForm.module.css";

const ProductForm = ({ sendDataToApp }) => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const imgUrlRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    summarizeProductData();
  };

  const summarizeProductData = () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const img_url = imgUrlRef.current.value;
    const price = priceRef.current.value;
    const stock = stockRef.current.value;

    if (!name || !description || !img_url || !price || !stock) {
      Swal.fire({
        icon: "error",
        title: "Hiba",
        text: "Kérem töltse ki az összes mezőt!",
      });
      return;
    }

    const saveProductDataToDatabase = async () => {
      try {
        const response = await fetch("http://localhost:3000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name,
            description,
            img_url,
            price,
            stock,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          sendDataToApp(data);
          Swal.fire({
            icon: "success",
            title: "Siker",
            text: "A termék sikeresen hozzáadva!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Hiba",
            text: "A termék mentése nem sikerült!",
          });
        }
      } catch (error) {
        console.error("Hiba:", error);
      }
    };

    saveProductDataToDatabase();
  };

  return (
    <Card>
      <div className={styles.container}>
        <h2 className={styles.title}>Termék hozzáadása</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Termék neve*
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              ref={nameRef}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="description">
              Leírás*
            </label>
            <textarea
              className={styles.textarea}
              id="description"
              ref={descriptionRef}
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="imgUrl">
              Kép URL*
            </label>
            <input
              className={styles.input}
              type="text"
              id="imgUrl"
              ref={imgUrlRef}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="price">
              Ár (Ft)*
            </label>
            <input
              className={styles.input}
              type="number"
              id="price"
              ref={priceRef}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="stock">
              Készlet (db)*
            </label>
            <input
              className={styles.input}
              type="number"
              id="stock"
              ref={stockRef}
            />
          </div>

          <button className={styles.button} type="submit">
            Küldés
          </button>
        </form>
      </div>
    </Card>
  );
};

export default ProductForm;