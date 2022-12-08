import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Product = ({ product, isFavorite, removeFromFavorites }) => {
	const t1 = new Date(product.createdAt)
	var diff = new Date() - t1.getTime();
	var period = diff / (1000 * 3600 );
	var time;
	if(period>24)
		time = Math.round(period/24)+ " Days Ago";
	else if(period>=1)
	time = Math.round(period)+ " Hours Ago";
	else
	time = Math.round(period*60)+ " Mintues Ago";

	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${product._id}`}>   {/*isFavorite*/}
				<div className='product-img'>
					<Card.Img style={{maxHeight:"300px", objectFit:"contain"}} src={product.picture} variant='top'/>
				</div>
				<Card.Body style={{backgroundColor: "white"}}>
					{/*isFavorite*/}
					<Card.Title as='div'>
						<strong>{product.title}</strong>
					</Card.Title> 
					<Card.Text as='h3'>Rs. {product.price}</Card.Text>
					<Card.Text as='h6'>{product.location}</Card.Text>
					<br/>
					<Card.Text align="Right" as='h6'>{time}</Card.Text>
				</Card.Body>
			</Link>

			{product.product && (
				<Button
					type='button'
					variant='light'
					// onClick={() => removeFromFavorites(product.product)}
				>
					<i className='fas fa-trash fa-2x'></i>
				</Button>
			)}
		</Card>
	);
};

export default Product;
