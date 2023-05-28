import React from 'react';
import Container from '../components/Container';
import BreadCrumb from '../components/BreadCrumb';
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from '../features/user/userSlice';
import { useState } from 'react';
import { FiEdit } from "react-icons/fi"

let profileschema = yup.object().shape({
  lastname: yup.string().required("lastname is Required").min(3, 'must be at least 3 characters long'),
  firstname: yup.string().required("firstname is Required").min(3, 'must be at least 3 characters long'),
  email: yup.string().required("email is Required").min(3, 'must be at least 3 characters long').email('must be a valid email'),
  mobile: yup.number()
    .required("mobile is Required")
    .min(10, 'Mobile is too short - should be 10 chars minimum.'),
});


const Profile = () => {
  const dispatch = useDispatch();
  const userState=useSelector(state=>state.auth.user);
  const [edit, setEdit] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname ? userState.firstname : "",
      lastname: userState?.lastname ? userState.lastname :"",
      email:  userState?.email ? userState.email :"",
      mobile:  userState?.mobile ? userState.mobile :"",
    },
    validationSchema: profileschema,
    onSubmit: (values)=>{
      dispatch(updateProfile(values));
      setEdit(true);
      window.location.reload();
    }
  });
  return (
    <>
      <BreadCrumb title="My Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className='my-3'>Update Profile</h3>
            <FiEdit className='fs-3 update-profile' onClick={()=>setEdit(false)}/>
          </div>
          <div className="col-12">
          <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
              <label htmlFor="example1" className="form-label">First Name</label>
              <input 
                type="text" 
                name="firstname" 
                className="form-control" 
                id="example1" 
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")}
                placeholder="First Name" 
                disabled={edit}/>
            <div className="error">
              {formik.touched.firstname && formik.errors.firstname}
            </div>
            </div>
            <div className="mb-3">
              <label htmlFor="example2" className="form-label">Last Name</label>
              <input 
                type="text" 
                name="lastname" 
                className="form-control" 
                id="example2" 
                value={formik.values.lastname} 
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                  placeholder="Last Name" 
                  disabled={edit}/>
              <div className="error">
                {formik.touched.lastname && formik.errors.lastname}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input 
                type="email" 
                name="email" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                value={formik.values.email} 
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  placeholder="Email" 
                  disabled={edit}/>
              <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail2" className="form-label">Mobile No</label>
              <input 
                type="number" 
                name="mobile" 
                className="form-control" 
                id="exampleInputEmail2" 
                aria-describedby="emailHelp" 
                value={formik.values.mobile}  
                onChange={formik.handleChange("mobile")}
                onBlur={formik.handleBlur("mobile")}
                placeholder="Mobile Number"
                disabled={edit}/>
              <div className="error">
                {formik.touched.mobile && formik.errors.mobile}
              </div>
            </div>
            {
              edit===false && <button type="submit" className="btn btn-primary">Save</button>
            }
            
          </form>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Profile