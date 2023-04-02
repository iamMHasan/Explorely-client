import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../features/auth/authSlice';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};
const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error, loading } = useSelector(state => state.auth)
  console.log(error)
  const [formValue, setFormValue] = useState(initialState)
  const {firstName, lastName, email, password, confirmPassword} = formValue

  useEffect(() => {
    error && toast.error(error.message)
  }, [error])


  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return toast.error("password does not match")
    }
    console.log(formValue)
    dispatch(register({ formValue, navigate, toast }))
  }


  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
            <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide first name"
              />
            </div>
            <div className="col-md-6">
            <MDBInput
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide last name"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                onChange={onInputChange}
                value={email}
                label="Email"
                type="email"
                name="email"
                required
                invalid
                validation="Please provide email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                onChange={onInputChange}
                value={password}
                label="Password"
                type="password"
                name="password"
                required
                invalid
                validation="Please provide password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password Confirm"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide confirm password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">

                {
                  loading && <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                }

                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>

  )
}

export default Register
