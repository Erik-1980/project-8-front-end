import { fetchWithAuth } from '../../RefreshToken';

export default function DeleteCategory (id){
    console.log(id.categoryId);
    const token = localStorage.getItem('token')
    const handleDeleteCategory = async () => {
        const url = `http://localhost:5000/product/category/${id.categoryId}`;
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
        <button onClick={handleDeleteCategory} disabled={!token}>DELETE CATEGORY</button>
      </div>
    )
}