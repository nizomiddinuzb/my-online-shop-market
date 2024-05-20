import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/productsSlice";

export const loader = async ({ params }) => {
  const req = await customFetch(`/products/${params.id}`);
  const product = req.data;
  return { product };
};

function Product() {
  const dispatch = useDispatch();
  const { product } = useLoaderData();
  const [productAmount, setProductAmount] = useState(1);
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  const setAmount = (type) => {
    if (type === "decrease") {
      setProductAmount((prev) => (prev > 1 ? prev - 1 : prev));
    } else {
      setProductAmount((prev) => prev + 1);
    }
  };

  const addToBag = () => {
    const newProduct = {
      ...product,
      amount: productAmount,
    };

    dispatch(addProduct(newProduct));

    // Show the alert
    setShowAlert(true);

    // Hide the alert after 2 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto flex flex-col items-start">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="carousel carousel-center max-w-4xl mx-auto p-4 space-x-4 bg-neutral rounded-box">
          {product.images.map((image, index) => (
            <div key={index} className="carousel-item">
              <img className="rounded-box h-96" src={image} alt={`Product ${index + 1}`} />
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={() => setAmount('increase')} className="btn btn-secondary">+</button>
          <h3>{productAmount}</h3>
          <button onClick={() => setAmount('decrease')} className="btn btn-secondary" disabled={productAmount === 1}>-</button>
          <button onClick={addToBag} className="btn btn-secondary">Add to bag</button>
        </div>
      </div>

      {/* Conditionally render the alert */}
      {showAlert && (
        <div className="fixed top-0 right-0 mt-5 mr-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
          New amount created
        </div>
      )}
    </>
  );
}

export default Product;
