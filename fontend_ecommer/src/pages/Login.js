import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";

let loginschema = yup.object().shape({
  email: yup.string()
    .required('Email is required.')
    .email('must be a valid email'),
  password: yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  
});

const Login = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginschema,
    onSubmit: (values)=>{
      dispatch(loginUser(values));
    }
  });
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput 
                  type="email" 
                  name="email" 
                  value={formik.values.email} 
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  placeholder="Email" />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  value={formik.values.password}  
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  placeholder="Password"
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
