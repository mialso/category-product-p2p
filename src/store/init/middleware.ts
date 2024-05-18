// import { userData } from 'user/repository';
import { categoryData } from '../../model/category/repository';
import { productData } from '../../model/product/repository';
import { api } from '../../model/base/remote/api';
import { formController } from '../../model/base/form/controller';

export function connectMiddleware(controller) {
    return (store) => (next) => (message) => {
        next(message);
        controller(store, message);
    };
}

export const middlewares = [
    // userData,
    categoryData,
    productData,
    api,
    formController,
].map(connectMiddleware);
