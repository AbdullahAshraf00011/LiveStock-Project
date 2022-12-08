import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Container, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createProduct } from '../actions/product-actions';

const PrductAdding = () => {
	const [title, setTitle] = useState(' ');
	const [description, setDescription] = useState(' ');
	const [type, setType] = useState(' ');
	const [price, setPrice] = useState(' ');
	const [location, setLocation] = useState(' ');
	const [address, setAddress] = useState(' ');
	const [picture,setPicture] = useState(' ');
	const dispatch = useDispatch();
    
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;
	const navigate = useNavigate();
	const submitHandler = (e) => {
		e.preventDefault();
		const data = new FormData();
		const ob = JSON.stringify({ title, description, type, price, location, address })
		data.append(
			"myFile", ob
		);
		data.append(
		"myFile",
		picture
		);
		dispatch(createProduct(data));
		navigate('/ads')
	};

	const handleClick=(e)=>{
		setType(e.target.value)
	};

	const imgHandler = (e) => {
		setPicture(e.target.files[0])
	}

	return (
		<Container className='product_form'>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='text'>
					<Form.Label>Ad Title</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Title of Ad'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='comment'>
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						placeholder='Write down the discription of product'
						value={description}
						rows={5} 
						onChange={(e) => setDescription(e.target.value)}
					></Form.Control>
				</Form.Group>
				<br />
				<Form.Label>Catagory</Form.Label>
				<ButtonGroup onClick={handleClick}>
					<Button variant="secondary" value="Buffaloes">Buffaloes</Button>
					<Button variant="secondary" value="Bulls">Bulls</Button>
					<Button variant="secondary" value="Cows">Cows</Button>
					<Button variant="secondary" value="Goats">Goats</Button>
					<Button variant="secondary" value="Sheep">Sheep</Button>
					<Button variant="secondary" value="Other Livestock">Other Livestock</Button>
				</ButtonGroup>
				<Form.Group controlId='price'>
					<Form.Label>Price</Form.Label>
					<Form.Control
						type='number'
						placeholder='Price in ruppees'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="formFileLg" className="mb-3">
					<Form.Label>Large file input example</Form.Label>
					<Form.Control 
					type="file" 
					size="lg" 
					onChange={imgHandler}
					/>
				</Form.Group>
				<Form.Group controlId='text'>
					<Form.Label>Location</Form.Label>
					<Form.Control
						type='text'
						placeholder='Please enter your Location'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGridAddress1">
					<Form.Label>Address</Form.Label>
					<Form.Control 
					placeholder="1234 Main St" 
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formGridAddress2">
					<Form.Label>Address 2</Form.Label>
					<Form.Control placeholder="Apartment, studio, or floor" />
				</Form.Group>

				<Row className="mb-3">
					<Form.Group as={Col} controlId="formGridCity">
					<Form.Label>City</Form.Label>
					<Form.Control />
					</Form.Group>

					<Form.Group as={Col} controlId="formGridState">
					<Form.Label>State</Form.Label>
					<Form.Select defaultValue="Choose...">
						<option>Choose...</option>
						<option>...</option>
					</Form.Select>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridZip">
					<Form.Label>Zip</Form.Label>
					<Form.Control />
					</Form.Group>
				</Row>

				<Form.Group className="mb-3" id="formGridCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button type='submit' variant='primary'>
					Upload
				</Button>
			</Form>
		</Container>
	);
};

export default PrductAdding;
