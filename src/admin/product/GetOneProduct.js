import { useState } from "react";
import DeleteProduct from "./DeleteProduct";
import { fetchWithAuth } from '../../RefreshToken';


export default function GetOneProduct() {
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [imageSrc, setImageSrc] = useState("");

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
        setId(data.product.id);
        setImageSrc(`http://localhost:5000/${data.product.image}`);
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
      <div className="showimage">
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
       {imageSrc ? (
                <img src={imageSrc} alt={product.name} width={600}/>
              ) : (
                <div>No image available</div>
              )}
      </div>
      <DeleteProduct productId={id}/>
    </div>
  );
}
