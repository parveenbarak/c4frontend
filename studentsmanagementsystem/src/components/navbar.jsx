import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { updateLogin, updateRole } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  let login = useSelector((state) => state.isLogin);
  let role = useSelector((state) => state.role);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(updateLogin(false));
    dispatch(updateRole(""));
    navigate("/login");
  }

  return (
    <div className="mainconatinerofnavbar">
      <div className="containerofnav">
        <h2>Students Management</h2>
        <div className="elementsofnav">
          {role === "admin" && (
            <>
              <p>Add Students</p>
              <p>Add Schools</p>
            </>
          )}
          {login ? (
            <p onClick={handleLogout}>Logout</p>
          ) : (
            <>
              <p onClick={() => navigate("/login")}>Login</p>
              <p onClick={() => navigate("/signup")}>Signup</p>
            </>
          )}
          <p onClick={() => navigate("/chat")}>Chat</p>  
        </div>
      </div>
    </div>
  );
};
