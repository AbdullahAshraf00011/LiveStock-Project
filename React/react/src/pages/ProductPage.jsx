import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card,
    Button, Form, } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
	listProductDetails,
	createProductReview,
} from '../actions/product-actions';
import {
	addToFavorites,
	removeFavorite,
	getFavorites,
} from '../actions/user-actions';
// import useIsMounted from '../hooks/useIsMounted';
import { useParams } from 'react-router-dom';
import deflt from '../assets/default-marker.jpg';

const ProductPage = ({ history, match }) => {
	const { id } = useParams();
	const [isFavorite, setIsFavorite] = useState(null);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		success: successProductReview,
		error: errorProductReview,
	} = productReviewCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userFavorites = useSelector((state) => state.userGetFavorites);
	const { favorites } = userFavorites;

	useEffect(() => {
		dispatch(listProductDetails(id));//match.params.id

		// if (userInfo) {
		// 	dispatch(getFavorites(userInfo._id));
		// }
	}, [dispatch, match, userInfo, successProductReview]);

	// const isMounted = useIsMounted();

	// useEffect(() => {
	// 	if (isMounted.current && favorites) {
	// 		setIsFavorite(() => {
	// 			return favorites.some((x) => x.product === match.params.id);
	// 		});
	// 	}
	// }, [isMounted, favorites, match.params.id]);

	const addToFavoritesHandler = () => {
		setIsFavorite(!isFavorite);
		if (isFavorite) {
			dispatch(removeFavorite(product._id, userInfo._id));
		} else {
			dispatch(addToFavorites(product, userInfo._id));
		}
	};

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						<Col md={7} style={{paddingLeft:"120px"}}>
							<div className='product-page-img'>
								<Image src={product.picture} alt={product.title} fluid />
							</div>
							<ListGroup.Item style={{marginTop:"40px", border:"solid"}}>
								<h3>Description: </h3> <br/>
								{product.description}
							</ListGroup.Item>
						</Col>
						<Col md={4}>
							<div style={{border:"solid", height:"200px"}}>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<h3>{product.title}</h3>
									</ListGroup.Item>
									{/* {userInfo && (
										<ListGroup.Item>
											<div
												onClick={addToFavoritesHandler}
												variant='light'
												type='button'
												className='like-center'
												// disabled={product.countInStock === 0}
											>
												<i
													className={
														isFavorite
															? 'fas fa-heart fa-3x'
															: 'far fa-heart fa-3x'
													}
												></i>
											</div>
										</ListGroup.Item>
									)} */}

									<ListGroup.Item>Price: Rs. {product.price}</ListGroup.Item>
									<ListGroup.Item>Location: {product.location}</ListGroup.Item>
								</ListGroup>
							</div>
							<div style={{marginTop:"20px", border:"solid", height:"400px"}}>
									User Detials
							</div>
							<div style={{marginTop:"20px", border:"solid", height:"320px"}}>
								<Image src={deflt} alt={product.title} fluid />
							</div>
						</Col>
						{/* <Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												Available
											</Col>
										</Row>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col> */}
					</Row>
					
					
				</>
			)}
		</>
	);
};

export default ProductPage;
