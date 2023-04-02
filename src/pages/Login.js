import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"
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
import { login } from '../features/auth/authSlice';

const initialState = {
    email: "",
    password: "",
};
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {error, loading} = useSelector(state => state.auth)
    console.log(error)
    const [formValue, setFormValue] = useState(initialState)

    useEffect(()=>{
      error && toast.error(error.message)
    },[error])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formValue)
        dispatch(login({ formValue, navigate, toast }))
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
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <div className="col-md-12">
                            <MDBInput
                                onChange={onInputChange}
                                label="Email"
                                type="email"
                                name="email"
                                required
                                invalid
                                validation="Please provide your email"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                onChange={onInputChange}
                                label="Password"
                                type="password"
                                name="password"
                                required
                                invalid
                                validation="Please provide your password"
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }} className="mt-2">

                              {
                                loading &&   <MDBSpinner
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
                    {/* <GoogleLogin
                        clientId="Your Client Id"
                        render={(renderProps) => (
                            <MDBBtn
                                style={{ width: "100%" }}
                                color="danger"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                            </MDBBtn>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't have an account ? Sign Up</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>

    )
}

export default Login
