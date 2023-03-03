import { ADD_ITEM_CART, REMOVE_ITEM_CART, REMOVE_ALL_ITEM_CART } from "./Constants";

export const addItem = (payload) => ({
    type: ADD_ITEM_CART,
    payload,
});

export const removeItem = (payload) => ({
    type: REMOVE_ITEM_CART,
    payload,
});
export const removeAllItem = (payload) => ({
    type: REMOVE_ALL_ITEM_CART,
    payload,
});
