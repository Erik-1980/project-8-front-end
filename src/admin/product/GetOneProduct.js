import { useState } from "react";
import DeleteProduct from "./DeleteProduct";
import { fetchWithAuth } from '../../RefreshToken';


export default function GetOneProduct() {
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");

  const token = localStorage.getItem("token");

  const handleGetOneProduct = async () => {
    const url = `http://localhost:5000/product/onlyoneproduct`;
    try {
      const response = await fetchWithAuth(url, {
        method: "POST",
        body: JSON.stringify({ value }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.message) {
        alert(data.message);
      } else {
        const product_info = Object.entries(data.product);
        setProduct(product_info);
        const productId = data.product.id;
        setId(productId)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="get-user">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleGetOneProduct} disabled={!token}>
        GET PRODUCT
      </button>
      <br />
      <table>
        <tbody>
          {product.map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteProduct productId={id}/>
    </div>
  );
}
