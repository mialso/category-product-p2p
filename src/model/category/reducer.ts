// @ts-nocheck
import { compose } from 'redux';
import { getTreeFromParentsMap, itemTreeNode, cleanParentChildren } from '../base/tree/tree';
import {
    stateSelectable, createSelectableFromMap, itemSelectable,
    toggleParentSelect, toggleChildSelect, toggleSelect, removeSelected,
    SelectedState,
} from '../base/tree/selectable';
import { CREATE_PRODUCT_API, UPDATE_PRODUCT_API, DELETE_PRODUCT_API } from '../product/action';
import { SUCCESS } from '../base/remote/api';
import {
    NOT_ASKED, ASKED, READY, DataStatus,
} from '../base/remote/constants';
import {
    SET_CATEGORIES, READ_CATEGORIES, CREATE_CATEGORY, CREATE_CATEGORY_API,
    CATEGORY_NORMAL_MODE, UPDATE_CATEGORY, UPDATE_CATEGORY_API, TOGGLE_SELECT_CATEGORY,
    READ_CATEGORIES_BYPRODUCT_API, SET_CATEGORY_BYPRODUCT, DELETE_CATEGORY_API,
} from './action';
import {
    MODE_EDIT, MODE_CREATE, MODE_NORMAL, CategoryMode,
} from './constants';

export type Category = {
    id: string,
    name: string,
    parentId: string,
};

export type CategoryState = {
    ids: string[],
    byId: Rectord<string, Category>
    dataStatus: DataStatus,
    error: string,
    edit: Category | {},
    mode: CategoryMode,
    byProductId: Rectord<string, Category>,
};

const initialState: CategoryState & SelectedState = compose(
    stateSelectable,
)({
    ids: [],
    byId: {},
    dataStatus: NOT_ASKED,
    error: '',
    edit: {},
    mode: MODE_NORMAL,
    byProductId: {},
});

export const createCategoryItem = (data: Partial<Category>): Category => ({
    id: data.id ?? '',
    name: data.name ?? '',
    parentId: data.parentId ?? '',
});

export const createItem = compose(
    itemSelectable,
    itemTreeNode,
    createCategoryItem,
);

export const addItem = (item) => (state) => ({
    ...state,
    ids: state.ids.concat(item.id),
    byId: {
        ...state.byId,
        [item.id]: item,
    },
});
export const updateItem = (item) => (state) => ({
    ...state,
    byId: { ...state.byId, [item.id]: item },
});
export const removeItem = (id) => function(state) {
    return {
        ...state,
        ids: state.ids.filter((itemId) => itemId !== id),
        byId: { ...state.byId, [id]: null },
    };
};
export const removeRelations = (id) => (state) => ({
    ...state,
    byProductId: Object.keys(state.byProductId).reduce(
        (acc, relId) => {
            let relCategoryIds = state.byProductId[relId];
            if (relCategoryIds.includes(id)) {
                relCategoryIds = relCategoryIds.filter((catId) => catId !== id);
            }
            return { ...acc, [relId]: relCategoryIds };
        },
        {},
    ),
});

export const updateParent = (item) => (state) => {
    if (!item.parentId) {
        return state;
    }
    const parentCat = state.byId[item.parentId];
    if (!(parentCat?.id)) {
        // TODO: create transaction cancel
        return { ...state, error: `unable to updateParent of [${item.id}]` };
    }
    return {
        ...state,
        byId: {
            ...state.byId,
            [parentCat.id]: {
                ...parentCat,
                children: parentCat.children.concat(item.id),
            },
        },
    };
};

export const switchMode = (mode) => (state) => ({ ...state, mode });

export const setEditItem = (itemId, item) => (state) => ({
    ...state,
    edit: item || state.byId[itemId],
});
export const cleanEditItem = (state) => ({ ...state, edit: {} });

export const categoryReducer = (state = initialState, message) => {
    switch (message.type) {
        case READ_CATEGORIES: return { ...state, dataStatus: ASKED };
        case SET_CATEGORIES: {
            const { payload } = message;
            const ids = Object.keys(payload);
            if (!(Array.isArray(ids) && ids.length)) {
                if (state.dataStatus === ASKED) {
                    return {
                        ...state,
                        dataStatus: READY,
                    };
                }
                // no data -> do nothing
                return state;
            }
            const categories = compose(
                createSelectableFromMap,
                getTreeFromParentsMap,
                (dtoMap) => Object.values(dtoMap).reduce(
                    (acc, item) => ({ ...acc, [item.id]: createCategoryItem(item) }),
                    {},
                ),
            )(message.payload);
            return {
                ...state,
                ids: state.ids.concat(ids.filter((id) => !state.ids.includes(id))),
                byId: ids.reduce((acc, catId) => ({
                    ...acc,
                    [catId]: categories[catId],
                }), { ...state.byId }),
                dataStatus: READY,
            };
        }
        case CREATE_CATEGORY: {
            const { payload: { parentId } } = message;
            return compose(
                switchMode(MODE_CREATE),
                setEditItem(null, { name: '', parentId }),
            )(state);
        }
        case CREATE_CATEGORY_API + SUCCESS: {
            const { payload } = message;
            const newCategory = createItem(payload);
            return compose(
                switchMode(MODE_NORMAL),
                updateParent(newCategory),
                addItem(newCategory),
            )(state);
        }
        case UPDATE_CATEGORY: return compose(
            switchMode(MODE_EDIT),
            setEditItem(message.payload),
        )(state);
        case UPDATE_CATEGORY_API + SUCCESS: {
            const { payload: { id, name } } = message;
            return compose(
                switchMode(MODE_NORMAL),
                updateItem({ ...state.byId[id], name }),
            )(state);
        }
        case CATEGORY_NORMAL_MODE: return compose(
            switchMode(MODE_NORMAL),
            cleanEditItem,
        )(state);
        case TOGGLE_SELECT_CATEGORY: return compose(
            toggleChildSelect(message.payload),
            toggleParentSelect(message.payload),
            toggleSelect(message.payload),
        )(state);
        case SET_CATEGORY_BYPRODUCT: return {
            ...state,
            byProductId: message.payload,
        };
        case DELETE_PRODUCT_API + SUCCESS:
        case UPDATE_PRODUCT_API + SUCCESS:
        case CREATE_PRODUCT_API + SUCCESS: {
            const { id, categoryIds = [] } = message.payload;
            return {
                ...state,
                byProductId: {
                    ...state.byProductId,
                    [id]: categoryIds,
                },
            };
        }
        case READ_CATEGORIES_BYPRODUCT_API + SUCCESS: {
            return {
                ...state,
                byProductId: message.payload,
            };
        }
        case DELETE_CATEGORY_API + SUCCESS: return compose(
            removeRelations(message.payload.id),
            removeSelected(message.payload.id),
            removeItem(message.payload.id),
            cleanParentChildren(state.byId[message.payload.id]),
        )(state);
        default: return state;
    }
};
