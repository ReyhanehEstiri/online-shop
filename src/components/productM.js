import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import React from "react";

export function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function ProductM({product}) {
//   const isMember = useSelector(state => state.user.isMember);

//   return (
//     <div>resr</div>
//   );
  return (
      <div className="supply-product">
          <Link to={`/product?id=${product.id}`}>
              <img src={product.imageUrl}
                   className="product-image" alt="img"/>

              {/* <h2 className="product-title">
                  {product.title}
              </h2> */}
          </Link>

          <h2 className="product-author">
              {product.author}
          </h2>

          <div className="price-container">
              {/* {isMember ?
                  <h3 className="original-price">{numberWithSpaces(isMember ? product.price : '')} Ft</h3>
                  : null
              } */}

              {/* <h2 className="product-price">
                  {numberWithSpaces(isMember ? Math.round(product.price * 0.9) : product.price)} Ft
              </h2> */}
          </div>
      </div>
  );
}
export default ProductM;