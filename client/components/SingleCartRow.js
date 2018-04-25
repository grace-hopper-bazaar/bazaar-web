import React from 'react';

export default function SingleCartRow(props) {
  const item = props.cart;
  async function deleteHandler(event) {
		event.preventDefault()
		await props.deleteCart(event.target.id);
  }
  
  async function addHandler (event) {
		event.preventDefault()
		const li = {
			quantity: 1,
			productId: item.productId
		}
		await props.addCart(li, 1)
  }
  
  async function minusHandler (event) {
		event.preventDefault()
		const li = {
			quantity: 1,
			productId: item.productId
		}
		await props.addCart(li, -1)
	}
  
    return (
          <div className="card row" key={item.id}>
            <div className="col">
              <h5>{item.title}</h5>
            </div>
            <div className="col">
              <p> ${item.price}.00 </p>
            </div>
            <div className="col">
            <p> {item.quantity} </p>
            </div>
            <div className="col">
              <i
                type="button"
                onClick={addHandler}
                id={item.id}
                className="fas fa-plus"
              />
              
  
              <i
                type="button"
                onClick={minusHandler}
                id={item.id}
                className="fas fa-minus"
              />
     
            </div>
            <div className="col">
              <button
                type="button"
                onClick={deleteHandler}
                id={item.id}
                className="badge badge-warning"
              >
                Remove
              </button>
            </div>
          </div>
    )

}

