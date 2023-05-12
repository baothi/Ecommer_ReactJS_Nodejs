import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";

let signUpschema = yup.object().shape({
  lastname: yup.string().required("lastname is Required").min(3, 'must be at least 3 characters long'),
  firstname: yup.string().required("firstname is Required").min(3, 'must be at least 3 characters long'),
  password: yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  email: yup.string().min(3, 'must be at least 3 characters long').email('must be a valid email'),
  mobile: yup.number()
    .required("mobile is Required")
    .min(10, 'Mobile is too short - should be 10 chars minimum.'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: ""
    },
    validationSchema: signUpschema,
    onSubmit: (values)=>{
      dispatch(registerUser(values));
    }
  });
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput 
                  type="text" 
                  name="firstname"
                  value={formik.values.firstname} 
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                  placeholder="First Name" />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <CustomInput 
                type="text" 
                name="lastname" 
                value={formik.values.lastname} 
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur("lastname")}
                placeholder="Last Name" />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
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
                  type="tel"
                  name="mobile"
                  value={formik.values.mobile}  
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  placeholder="Mobile Number"
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
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
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Sign Up</button>
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

export default Signup;
