import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { ResetPassword } from "../features/user/userSlice";

let forgotpasswordschema = yup.object().shape({
  password: yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: yup.string()
    .required('No password provided.') 
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

const Resetpassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getToken = location.pathname.split("/")[2];
  
  const formik = useFormik({
    initialValues: {
      password: ""
    },
    validationSchema: forgotpasswordschema,
    onSubmit: (values)=>{
      console.log(values);
      dispatch(ResetPassword({token:getToken, password:values.password}));
    }
  });


  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}  
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <CustomInput
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}  
                  onChange={formik.handleChange("confirmPassword")}
                  onBlur={formik.handleBlur("confirmPassword")}
                />
                <div className="error">
                  {formik.touched.confirmPassword && formik.errors.confirmPassword}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Ok</button>
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

export default Resetpassword;
