import Form from "./Form";
import Logout from "./Logout";

const LoginRegister = () => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div>
      {isLoggedIn ? (
        <Logout />
      ) : (
        <Form />
      )}
    </div>
  );
};

export default LoginRegister;
