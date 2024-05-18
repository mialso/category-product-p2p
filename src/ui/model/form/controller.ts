import { shallowEqual } from 'react-redux';
import {
    CREATE_PRODUCT, UPDATE_PRODUCT, submitProduct,
} from '../../../model/product/action';
import { validator } from '../../../model/product/validation';
import { createItem } from '../../../model/product/reducer';
import { productById } from '../../../model/product/selector';
import { openModal } from '../../../model/base/modal';
import {
    SUBMIT_FORM_PRODUCT, CHANGE_FORM_PRODUCT,
    setFormProduct, formValidationFail, toggleFormPristine,
} from './action';
import { formProduct } from './reducer';
import { MODE_EDIT, MODE_CREATE } from './constants';

export const formController = ({ dispatch, getState }, message) => {
    switch (message.type) {
        case UPDATE_PRODUCT:
        case CREATE_PRODUCT: {
            const productId = message.payload;
            let product = createItem();
            let mode = MODE_CREATE;
            if (productId) {
                product = productById(productId)(getState());
                mode = MODE_EDIT;
            }
            dispatch(setFormProduct({ product, mode }));
            dispatch(openModal());
            break;
        }
        case CHANGE_FORM_PRODUCT: {
            const { product, isPristine } = formProduct(getState());
            let sourceProduct;
            if (product.id) {
                sourceProduct = productById(product.id)(getState());
            } else {
                sourceProduct = createItem();
            }
            if (isPristine !== shallowEqual(product, sourceProduct)) {
                dispatch(toggleFormPristine());
            }
            break;
        }
        case SUBMIT_FORM_PRODUCT: {
            const { mode, product } = formProduct(getState());
            // TODO - go with validator keys, instead of input object
            const productValidator = Object.keys(product).reduce(
                (acc, key) => {
                    const value = product[key];
                    let validatedValue = value;
                    if (validator[key]) {
                        const keyValidator = validator[key](value);
                        validatedValue = keyValidator[key];
                        if (!keyValidator.isValid) {
                            return {
                                ...acc,
                                hasErrors: true,
                                errors: { ...acc.errors, [key]: keyValidator.message },
                                values: { ...acc.values, [key]: validatedValue },
                            };
                        }
                    }
                    return {
                        ...acc,
                        values: { ...acc.values, [key]: validatedValue },
                    };
                },
                { hasErrors: false, errors: {}, values: product },
            );
            if (productValidator.hasErrors) {
                dispatch(formValidationFail(Object.keys(productValidator.errors).join(', ')));
                break;
            }
            dispatch(submitProduct({
                product: productValidator.values,
                mode,
            }));
            break;
        }
        default: break;
    }
};
