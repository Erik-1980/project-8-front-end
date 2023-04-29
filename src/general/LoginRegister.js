import Form from "./Form";
import Logout from "./Logout";

const LoginRegister = () => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Do you really want to exit the page</p>
          <Logout />
        </div>
      ) : (
        <Form />
      )}
    </div>
  );
};

export default LoginRegister;
