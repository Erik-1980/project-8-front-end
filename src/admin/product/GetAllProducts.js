import { useState } from "react";
import DeleteProduct from "./DeleteProduct";
import { fetchWithAuth } from '../../RefreshToken';

export default function GetAllProducts() {
    const [products, setProducts] = useState([]);

    const token = localStorage.getItem("token");
  
    const handleGetProducts = async () => {
      const url = `http://localhost:5000/product`;
      try {
        const response = await fetchWithAuth(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        if (data.error) {
          alert(data.error);
        } else {
          const product_info = data.products;
          setProducts(product_info);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return (
      <div className="get-user">
        <button onClick={handleGetProducts} disabled={!token}>
          Get All Products
        </button>
        <br />
        <table>
          <thead>
            <tr>
              {products[0] && Object.keys(products[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, index) => (
                  <td key={index}>{value || "N/A"} </td>
                ))}
                <DeleteProduct productId={item.id}/>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  