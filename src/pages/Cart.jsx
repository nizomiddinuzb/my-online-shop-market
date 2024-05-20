import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../features/productsSlice';
import { FaTrashCan } from "react-icons/fa6";

function Cart() {
  const dispatch = useDispatch();
  const { products, amount, price } = useSelector((state) => state.products);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      {products.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <div className="flex flex-col gap-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={product.images[0]} alt={product.title} className="w-24 h-24 object-cover rounded-md" />
                  <div>
                    <h2 className="text-xl font-bold">{product.title}</h2>
                    <p>{product.amount} x ${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeProduct({ id: product.id }))}
                  className="btn btn-danger"
                >
                  <FaTrashCan />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold">Total Amount: {amount}</h2>
            <h2 className="text-2xl font-bold">Total Price: ${price.toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
