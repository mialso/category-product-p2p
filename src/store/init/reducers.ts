import { combineReducers } from 'redux';
import { categoryReducer } from '../../model/category/reducer';
import { productReducer } from '../../model/product/reducer';
import { apiReducer } from '../../model/base/remote/reducer';
import { modalReducer } from '../../model/base/modal';
import { errorReducer } from '../../ui/model/error';
import { formReducer } from '../../model/base/form/reducer';
import { VIEW_MODEL_ID, viewReducer } from '../../ui/model/view/reducer';

export const rootReducer = combineReducers({
    api: apiReducer,
    error: errorReducer,
    modal: modalReducer,
    category: categoryReducer,
    product: productReducer,
    form: formReducer,
    [VIEW_MODEL_ID]: viewReducer,
});
