import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./home.css";
import { updateData } from "../redux/actions";
import { Chat } from "./chat";  // Import Chat component
import { FileUpload } from "./fileUpload"; // Import FileUpload component

export const Home = () => {
  let data = useSelector((state) => state.data);
  let role = useSelector((state) => state.role);
  let token = JSON.parse(localStorage.getItem("token"));
  let dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:9000/students", {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        dispatch(updateData(res.data));
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <div className="maincontainerofhome">
      <FileUpload /> 
      <Chat /> 
      {data.map((ele, index) => {
        return (
          <div key={index}>
            <h4>Id : {ele.student_id}</h4>
            <p>Name : {ele.student_name}</p>
            <p>Age : {ele.student_age}</p>
            <p>Grade : {ele.grade}</p>
            <p>School_Id : {ele.school_id}</p>
            {role === "admin" ? (
              <>
                <button>Edit</button>
                <button>Delete</button>
              </>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};
