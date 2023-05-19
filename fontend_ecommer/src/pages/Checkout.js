import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { createAOrder, getUserCart } from "../features/user/userSlice";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

let checkoutschema = yup.object().shape({
  lastname: yup.string().required("lastname is Required").min(3, 'must be at least 3 characters long'),
  firstname: yup.string().required("firstname is Required").min(3, 'must be at least 3 characters long'),
  address: yup.string().required("address is Required").min(3, 'must be at least 3 characters long'),
  country: yup.string().required("country is Required"),
  city: yup.string().required("city is Required"),
  state: yup.string().required("pincode is Required"),
  pincode: yup.string().required("pincode is Required"),
});



const Checkout = () => {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const cartState = useSelector(state=>state.auth.getCartProduct);
  
  useEffect(() =>{
    let sum = 0;
    let items=[]
    for(let index = 0; index < cartState?.length; index ++){
      items.push({"product": `${cartState[index]?.productId?._id}`,
      "color": `${cartState[index]?.color?._id}`, 
      "quantity": `${cartState[index]?.quantity}` ,"price": `${cartState[index]?.price}`});
      
      sum =sum + (Number(cartState[index].quantity) * cartState[index].price);
      setTotalAmount(sum);
      setOrderItems(items);
    }
  },[cartState]);
  // console.log(orderItems)

  useEffect(() =>{
    dispatch(getUserCart())
  },[]);

  const formik = useFormik({
    initialValues: {
      lastname: "",
      firstname: "",
      address: "",
      country: "",
      city: "",
      pincode: "",
      other: "",
      state: "",
    },
    validationSchema: checkoutschema,
    onSubmit: (values)=>{
      // console.log(values);
      // setShippingInfo(values);
      dispatch(createAOrder({
        totalPrice:totalAmount, 
        totalPriceAfterDiscount:totalAmount,
        orderItems:orderItems,
        shippingInfo: values
      }))
     
      
    }
  });


  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Navdeep Dahiya (monud0232@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select name="country" value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleBlur("country")} className="form-control form-select" id="">
                    <option value="" selected>
                      Select Country
                    </option>
                    <option value="vietnam">
                      Viet nam
                    </option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    value={formik.values.firstname} 
                    onChange={formik.handleChange("firstname")} 
                    onBlur={formik.handleBlur("firstname")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    value={formik.values.lastname} 
                    onChange={formik.handleChange("lastname")} 
                    onBlur={formik.handleBlur("lastname")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    value={formik.values.address} 
                    onChange={formik.handleChange("address")} 
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    value={formik.values.other} 
                    onChange={formik.handleChange("other")} 
                    onBlur={formik.handleBlur("other")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    value={formik.values.city} 
                    onChange={formik.handleChange("city")} 
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select name="" 
                  className="form-control form-select" 
                  id=""
                  value={formik.values.state} 
                    onChange={formik.handleChange("state")} 
                    onBlur={formik.handleBlur("state")}
                  >
                    <option value="" selected>
                      Select State
                    </option>
                    <option value="Hồ Chí minh" selected>
                      Hồ Chí Minh
                    </option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    value={formik.values.pincode} 
                    onChange={formik.handleChange("pincode")} 
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button className="button" type="submit">Place Order</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {
                cartState && cartState.map((item, index)=>{
                  return(
                    <div key={index} className="d-flex gap-10 mb-2 align-align-items-center">
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img className="img-fluid" src={item?.productId?.images[0].url ? item?.productId?.images[0].url : watch} alt="product" />
                        </div>
                        <div>
                          <h5 className="total-price">{item?.productId?.title}</h5>
                          <p className="total-price">
                          <ul className="colors ps-0">
                            <li style={{backgroundColor: item?.color?.title}} ></li>
                          </ul>
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">$ {item?.quantity * item?.price}</h5>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">$ {totalAmount?totalAmount:0}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 5</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">$ {totalAmount?totalAmount+5:0}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
