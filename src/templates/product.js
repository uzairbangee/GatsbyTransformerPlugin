import React from "react"
import { graphql } from "gatsby";

const Product = (props) => {
    // const { shopifyProduct, allShopifyProduct } = data
    console.log("data ", props);
    return (
        <div>Product</div>
    )
}

// export const postQueries = graphql`
//   query allShopifyProduct {
//     allShopifyProduct {
//         edges {
//             node {
//                 id
//             }
//         }
//     }
//   }
// `

export default Product;