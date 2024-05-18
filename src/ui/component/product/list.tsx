import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NOT_ASKED, READY } from '../../../model/base/remote/constants';
import { productState } from '../../../model/product/selector';
import { readProducts } from '../../../model/product/action';

export const RequireProducts = ({ children }) => {
    const product = useSelector(productState);
    const dispatch = useDispatch();
    useEffect(() => {
        if (product.dataStatus === NOT_ASKED) {
            dispatch(readProducts());
        }
    }, []);
    if (product.dataStatus !== READY) {
        return <div>Loading products...</div>;
    }
    return (<>{children}</>);
};
