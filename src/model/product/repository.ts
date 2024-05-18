import { SUCCESS } from '../base/remote/api';
import { ASKED } from '../base/remote/constants';
import { closeModal } from '../base/modal';
import { MODE_EDIT, MODE_CREATE } from '../base/form/constants';
import { withToken } from '../base/stub';
import { READ_CATEGORIES_API } from '../category/action';
import {
    READ_PRODUCTS, READ_PRODUCTS_API, DELETE_PRODUCT,
    CREATE_PRODUCT_API, UPDATE_PRODUCT_API, SUBMIT_PRODUCT,
    readProductsApi, setProducts, createProductApi, updateProductApi,
    setProductByCategory, deleteProductApi,
} from './action';

export function productData({ dispatch, getState }, message) {
    switch (message.type) {
        case READ_PRODUCTS: {
            const { product } = getState();
            if (product.dataStatus === ASKED) {
                withToken(dispatch, readProductsApi);
            }
            break;
        }
        case READ_PRODUCTS_API + SUCCESS: {
            dispatch(setProducts(message.payload));
            break;
        }
        case READ_CATEGORIES_API + SUCCESS: {
            dispatch(setProductByCategory(message.payload.productByCategory));
            break;
        }
        case SUBMIT_PRODUCT: {
            const { mode, product } = message.payload;
            if (mode === MODE_CREATE) {
                withToken(dispatch, createProductApi(product));
            }
            if (mode === MODE_EDIT) {
                withToken(dispatch, updateProductApi(product));
            }
            break;
        }
        case CREATE_PRODUCT_API + SUCCESS:
        case UPDATE_PRODUCT_API + SUCCESS: {
            dispatch(closeModal());
            break;
        }
        case DELETE_PRODUCT: {
            withToken(dispatch, deleteProductApi(message.payload));
            break;
        }
        default: break;
    }
}
