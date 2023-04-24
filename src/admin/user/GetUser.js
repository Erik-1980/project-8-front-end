import { useState } from "react";
import { fetchWithAuth } from '../../RefreshToken';

export default function GetUser (){
    const [user, setUser] = useState([]);
    const token = localStorage.getItem('token')
    const handleGetUsers = async () => {
      const url = `http://localhost:5000/user/currentuser`;
      try {
        const response = await fetchWithAuth(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        if (data.error) {
          alert(data.error)
        } else {
          const user_info = Object.entries(data.user);
          setUser(user_info);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    return(
        <div className="get-user">
            <button onClick={handleGetUsers} disabled={!token}>
        Get User
      </button>
      <br />
      <table>
        <tbody>
           {user.map(([key, value]) => (
           <tr key={key}>
             <td>{key}</td>
             <td>{value || "N/A"}</td>
           </tr>
            ))}
        </tbody>
      </table>
        </div>
    )
}