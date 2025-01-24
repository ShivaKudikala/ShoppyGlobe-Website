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

    const cart = useSelector((state) => state.cart);
    const [product, setProduct] = useState(null); // product for detailed information about it
    const {data, error, loading} = useFetch("https://dummyjson.com/products");  // fetching data using custom useFetch hook

    const dispatch = useDispatch();

    const params = useParams(); // using route parameters to get id  of product
    useEffect(()=>{ 
        if(data){
            const item = data.products.find((x) => x.id == params.id);
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
    
    if (!product) {  // if no product found
        return (
            <div className="no-product">
                <p>Sorry! Product not found</p>
                <Link to={"/"}><button className="backtohome-btn">Back to Home</button></Link>
            </div>
        ) 
    }

    function handleClick(){  // add to cart function
        dispatch(addToCart(product));
    }

        return (
            
            // Showing full details of the product
            <div className="product-detail">
                    <div className="product">
                        <div className="productd-image">
                            <img className="item-image" src={product.thumbnail}/>
        
                            {
                                (!cart.some((item) => item.id === product.id) 
                                ? <button onClick={handleClick} className="addCart-btn"><FontAwesomeIcon className="addcart-icon" icon={faCartShopping} />Add to Cart</button> 
                                : <p className="addedCart2">Added to cart <FontAwesomeIcon color="#26a451" icon={faCheck}/></p>)
                            }
                        </div>
                        <div className="productd-content">
                            <p className="productd-brand">{product.brand}</p>
                            <p className="productd-title">{product.title}</p>
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
                                    {product.reviews.map((review) => (
                                        <div className="reviews-div" key={review.id}>
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