import "./styles/Products.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { addToCart } from "../utils/cartSlice";
import useFetch from "../utils/useFetch";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function ProductDetail(){

    const cart = useSelector((state) => state.cart.items);
    const [product, setProduct] = useState(null); // product for detailed information about it
    const {data, error, loading} = useFetch("http://localhost:9898/api/products");  // fetching data using custom useFetch hook
    const dispatch = useDispatch();

    const params = useParams(); // using route parameters to get id  of product
    useEffect(()=>{ 
        if(data){
            const item = data.find((x) => x._id == params.id);
            setProduct(item);
        }
    },[data, params])
    
    if(loading){ // if loading...
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        )
    }
  
    if(error){ // error handlingg
        return (
            <div className="error-loading">
              <p>Error: {error}</p>
            </div>
          )
    }

    const handleClick = async () => {
        try {
            const token = localStorage.getItem("token"); // Get the token from local storage

            if (!token) {
                alert("You must be logged in to add items to the cart.");
                return;
            }
            const newCartItem = {
                id: product._id,
                brand: product.brand,
                name: product.name,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: 1, // Default quantity
                shippingInformation: product.shippingInformation,
                discountPercentage: product.discountPercentage,
                returnPolicy: product.returnPolicy
            };
    
            const response = await fetch("http://localhost:9898/api/cart",{
                method: "POST",
                headers: { 
                    "Content-type" : "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newCartItem),
            })
            if (response.status === 403) {
                alert("Unauthorized! Please login again.");
                return;
            }
            const newItem = await response.json();
            dispatch(addToCart(newItem));
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add product to cart.");
        }
    };
    
    if (!product) {  // if no product found
        return (
            <div className="no-product">
                <p>Sorry! Product not found</p>
                <Link to={"/"}><button className="backtohome-btn">Back to Home</button></Link>
            </div>
        ) 
    }

        return (
            
            // Showing full details of the product
            <div className="product-detail">
                    <div className="product">
                        <div className="productd-image">
                            <img className="item-image" src={product.thumbnail}/>
        
                            {
                                (!cart.some((item) => item.id === product._id) 
                                ? <button onClick={handleClick} className="addCart-btn"><FontAwesomeIcon className="addcart-icon" icon={faCartShopping} />Add to Cart</button> 
                                : <p className="addedCart2">Added to cart <FontAwesomeIcon color="#26a451" icon={faCheck}/></p>)
                            }
                        </div>
                        <div className="productd-content">
                            <p className="productd-brand">{product.brand}</p>
                            <p className="productd-title">{product.name}</p>
                            <p className="productd-description">{product.description}</p>
                            <p className="productd-category">{product.category}</p>
                            <div className="productd-div">
                                <p className="productd-price">${product.price}</p>
                                <span className="productd-discount">- {product.discountPercentage}% off</span>
                            </div>
                            <div className="productd-div">
                                <p className="productd-rating">{product.rating} <FontAwesomeIcon className="rating-icon" color="white" icon={faStar} /></p>
                                <span className="review-count"> {product.reviews.length} reviews</span>
                            </div>
                            <p className="productd-stock">Only {product.stock} available</p>
                            <p className="productd-shippinginfo">{product.shippingInformation}</p>
                            <p className="productd-warrantyinfo">{product.warrantyInformation}</p>

                            <hr />

                            <div className="ratings-reviews">
                                    <p className="rr-title">Ratings and Reviews</p>
                                    {product.reviews.map((review, index ) => (
                                        <div className="reviews-div" key={index}>
                                            <div className="rating-div">
                                                <p className="review-rating" style={{
                                                    backgroundColor:
                                                        review.rating >= 3 ? "green" :
                                                        review.rating === 2 ? "orange" : "red",
                                                }}>{review.rating} <FontAwesomeIcon className="rating-icon" color="white" icon={faStar} /></p>
                                                <p>{review.comment}</p>
                                            </div>
                                            <div className="reviewer-div">
                                                <p className="reviewer-name">{review.reviewerName}</p>
                                                <p>{review.date}</p>
                                            </div>
                                            
                                            <hr />
                                        </div>
                                        
                                    ))}
                            </div>
                        </div>
                    </div>
            </div>
        )
}
    


export default ProductDetail;