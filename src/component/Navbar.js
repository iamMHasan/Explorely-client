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
import { Link, NavLink } from 'react-router-dom';
import { logOutUser } from '../features/auth/authSlice';

const Navbar = () => {
    const [showBasic, setShowBasic] = useState(false);
    const { user } = useSelector(state => state.auth) || {}
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOutUser())
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
                            <MDBNavbarLink style={{fontWeight : "600"}}>Welcome {user?.result?.name}</MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>

                    <form className='d-flex input-group w-auto'>
                        <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
                        <MDBBtn color='primary'>Search</MDBBtn>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Navbar