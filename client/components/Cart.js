import React from 'react';
import SingleCartListing from './SingleCartListing';
import SubCartTotal from './SubCartTotal';

export default function Cart () {
	
		return (
			<div className="container">
				<h1>Shopping Cart</h1>
				<div className="row">
					<div className="col">
						<SingleCartListing />
					</div>
				</div>
			</div>
		);
	}

