import useFetch from "../utils/useFetch";
import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { useParams } from "react-router-dom";
import "./styles/Products.css";

function ProductList(){
    // Component for showing all product using ProductItem component for each product
    const [products, setProducts] = useState([]);
    const {data, error, loading} = useFetch("https://dummyjson.com/products"); // Fetching Data
    const [searchproducts, setSearchproducts] = useState([]);
    const params = useParams(); //using route parameters for search
    

    useEffect(()=>{ //Setting products from data
      if(data){
        setProducts(data.products);
      }
    }, [data]);

    useEffect(()=>{ // For searched Products using route parameters
      if(products.length > 0 && params.name){
          const searchedProducts = products.filter((product) => product.title.toLowerCase().includes(params.name.toLowerCase()))
          setSearchproducts(searchedProducts);
      } else {
        setSearchproducts([]);
      }
  },[params.name, products])

    if(loading){  // if loading...
      return (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      )
    }

    if(error){ // error handling
      return (
        <div className="error-loading">
          <p>Errorrrr: {error}</p>
        </div>
      ) 
    }

    return(
      <>

      {/* if there is a search showing searched Section */}
      {params.name && (
        <>
          {searchproducts.length > 0 ? (
            <>
              <h1 className="searchedP-title">Searched Products</h1>
              <div className="searchedP-div">
                {searchproducts.map((product) => (
                  <ProductItem key={product.id} Product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="notavailable-div">
              <p className="searchedP-title">
                <span className="span-text">Sorry</span>, we couldn’t find any products matching your search.
              </p>
              <p className="explore-text">
                <span className="span-text">Please</span> check out our other amazing products below!
              </p>
            </div>
          )}
        </>
      )}

      {/* Showing all products */}
      {products && products.length > 0 ? (
        <>
          <h1 className="products-title">Browse Our Complete Product Range</h1>
          <div className="products-list">
            {products.map((product) => (
              <ProductItem key={product.id} Product={product} />
            ))}
          </div>
        </>
      ) : (  // if there are no products due to error
        <div className="no-products-div">
          <p>Facing Technical Issues</p>
          <p>No products available</p>
          <p>Please Visit Again After Some Time!</p>
        </div>
      )}
    </>
        
    )
}

export default ProductList;