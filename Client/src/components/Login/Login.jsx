import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/sessionUserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { err, isAuthenticated } = useSelector((state) => state.sessionUser);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(()=>{
      if (isAuthenticated) {
        navigate("/user/form");
      }else{
        navigate("/");
      }
  },[isAuthenticated])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(formData));
  }

  return(
    <div className={`${styles.componentContainer}`}>
      <div className={styles.container}>
        <div className={styles.imageGraelForm}>
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.imageContainer}>
            <img className={styles.image} src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png" alt="icon_user" />
          </div>
          <h1>LOGIN</h1>
          <div className={`mb-3 ${styles.inputContainer}`}>
            <label className="form-label" htmlFor="username">Username</label>
            <input className="form-control form-control-lg" type="text" name="username" id="username" aria-label=".form-control-lg example" onChange={handleChange}/>
          </div>
          <div className={`mb-3 ${styles.inputContainer}`}>
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-control form-control-lg" type="password" name="password" id="password" aria-label=".form-control-lg example" onChange={handleChange}/>
          </div>
          {err && <p className={styles.error}>{err}</p>}
          <button type="submit" className={`btn btn-primary ${styles.btnLogin}`}>Login</button>
        </form>
      </div>  
    </div>
  )
}

export default Login;