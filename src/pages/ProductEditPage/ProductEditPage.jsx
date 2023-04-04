import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/store/StoreContext';
import { useParams } from 'react-router-dom';

import AdminForm from '../../components/AdminForm';

const ProductEditPage = () => {
    const { id } = useParams()
    const { getProductsByIdRequest, editedProduct } = useContext(StoreContext)

    useEffect(() => {
        getProductsByIdRequest(id)
    }, [])

    console.log(editedProduct)

    return (
        <div>
            <AdminForm isEdit={true} editedProduct={editedProduct}/>
        </div>
    );
};

export default ProductEditPage;