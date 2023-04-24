import { fetchWithAuth } from '../../RefreshToken';

export default function DeleteProduct ({ productId }){
  console.log(productId);
    const token = localStorage.getItem('token')
    const handleDeleteProduct = async () => {
        const url = `http://localhost:5000/product/${productId}`;
        try {
          const response = await fetchWithAuth(url, {
            method: "DELETE",
            headers: {
              Authorization: token,
            }
          });
          const data = await response.json();
            alert(data.message)
          } catch (error) {
          console.error("Error:", error);
        }
      };
    return(
      <div>
        <button onClick={handleDeleteProduct} disabled={!token}>DELETE PRODUCT</button>
      </div>
    )
}
