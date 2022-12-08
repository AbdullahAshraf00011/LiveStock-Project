import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {useNavigate } from 'react-router-dom';
// import Paginate from '../components/Paginate';
// import Meta from '../components/Meta';
import Product from '../components/Product';

import {
	listProducts,
	deleteProduct,
	createProduct,
} from '../actions/product-actions';
import { PRODUCT_CREATE_RESET } from '../constants/product-constants';

const AdScreen = ({ match }) => {
	const pageNumber =  1; //match.params.pageNumber ||
	const dispatch = useDispatch();
    const navigate = useNavigate();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, pages, page } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (successCreate) {
			navigate(`/ads`);
		} 
		else {
			dispatch(listProducts('', pageNumber, userInfo._id));
		}
	}, [
		dispatch,  //history,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = () => {
		// dispatch(createProduct());
		navigate('/Ad/new')
	};

	return (
		<>
			{/* <Meta title='Product List' /> */}
			{/* {loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>} */}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			<Row className='align-items-center'>
				<Col>
					<h1>My Ads</h1>
					<Col className='text-right'>
						<Button className='my-3' onClick={createProductHandler}>
							<i className='fas fa-plus'></i> Create Ad
						</Button>
					</Col>
				</Col>
			</Row>
			
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
					{/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
				</>
			)}
		</>
	);
};

export default AdScreen;
