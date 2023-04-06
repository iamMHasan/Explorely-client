import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logOutUser } from '../features/auth/authSlice';
import { getTourBySearch } from '../features/tour/tourSlice';
import jwt_decode from "jwt-decode"

const Navbar = () => {
    const [showBasic, setShowBasic] = useState(false);
    const [search, setSearch] = useState("")
    const { user } = useSelector(state => state.auth) || {}
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = user?.token 

    if(token){
        const decodedToken = jwt_decode(token)
        if(decodedToken.exp * 1000 < new Date().getTime()){
            dispatch(logOutUser())
        }
    }

    const handleLogOut = () => {
        dispatch(logOutUser())
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(search){
            dispatch(getTourBySearch(search))
            navigate(`/tours/search?searchQuery=${search}`)
            setSearch("")
        } else{
            navigate("/")
        }

    }
    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='#'>Explorely</MDBNavbarBrand>

                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='#'>
                                <NavLink to="/">Home</NavLink>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {
                            user?.result?._id && (
                                <>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href='#'><Link to='/addTour'>Add Tour</Link></MDBNavbarLink>
                                    </MDBNavbarItem>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href='#'><Link to='/dashboard'>Dashboard</Link></MDBNavbarLink>
                                    </MDBNavbarItem>
                                </>
                            )
                        }

                        {
                            user?.result?._id ? (
                                <>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink onClick={handleLogOut}>Log out</MDBNavbarLink>
                                    </MDBNavbarItem>
                                </>
                            ) : (
                                <>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink><NavLink to="/login">Login</NavLink></MDBNavbarLink>
                                    </MDBNavbarItem>
                                </>
                            )
                        }
                        <MDBNavbarItem>
                            <MDBNavbarLink style={{ fontWeight: "600" }}>Welcome {user?.result?.name}</MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>

                    <form onSubmit={handleSubmit} className='d-flex input-group w-auto'>
                        <input 
                        onChange={e => setSearch(e.target.value)}
                         type='text' 
                         className='form-control' 
                         value={search}
                         placeholder='Search tours' aria-label='Search' />
                         
                        <MDBBtn color='primary'>Search</MDBBtn>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Navbar