import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { StoreContext } from '../../context/store/StoreContext';
import ProductDetails from '../../components/ProductDetails';

const ProductDetailsPage = () => {
    const { getProductsByIdRequest, currentProduct } = useContext(StoreContext)

    const { id } = useParams()


    useEffect(() => {
        getProductsByIdRequest(id, true)
    }, [])

    return <ProductDetails product={currentProduct}/>
}

export default ProductDetailsPage;