import React from 'react';
import { useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../actions/user-actions';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_LOGIN_SUCCESS } from '../constants/user-constants';

const Header = () => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// console.log(userInfo);
	(async function() {
		if(!userInfo)
			return
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.get(
			'http://127.0.0.1:5000/api/users/token', config
		).then((res) => {
			console.log(res.data);
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: res.data,
			});
			localStorage.setItem('userInfo', JSON.stringify(res.data));
		}).catch((error) => {
			    console.log(error);
				if(error.code == "ERR_BAD_REQUEST"){
					window.alert("Token Expired");
					logoutHandler();
				}
		})

	}())
	const logoutHandler = () => {
		dispatch(logout());
		navigate('/login');
	};
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>LiveStock MarketPlace</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<SearchBox />
						<Nav className='ml-auto'>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/ads'>
										<NavDropdown.Item>My ads</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/favorites'>
										<NavDropdown.Item>Favorites</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>   
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i>Sign In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
