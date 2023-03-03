import { ADD_ITEM_CART, REMOVE_ITEM_CART,REMOVE_ALL_ITEM_CART } from "./Constants";

export const initialCartState = {
    items: [],
    totalAmount: 0,
    voucher: ''
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM_CART:
            //// dùng method concat để tạo ra một mảng mới và add phần tử vào và không add trực tiếp vào mảng cũ
            //// dùng method push trong trường hợp này sẽ xảy ra lỗi
            const updatedTotalAmount =
                state.totalAmount +
                action.payload.price * action.payload.amount;

            const existingCartItemIndex = state.items.findIndex((item) => {
                return item.id === action.payload.id;
            });
            const existingCartItem = state.items[existingCartItemIndex];
            let upItems;

            if (existingCartItem) {
                const upItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.payload.amount,
                };

                upItems = [...state.items];
                upItems[existingCartItemIndex] = upItem;
            } else {
                upItems = state.items.concat(action.payload);
            }

            return {
                items: upItems,
                totalAmount: updatedTotalAmount,
            };

        case REMOVE_ITEM_CART:
            const existingCartItemIndexRemove = state.items.findIndex(
                (item) => item.id === action.payload,
            );
            const existingItemRemove = state.items[existingCartItemIndexRemove];
            const updatedTotalAmountRemove =
                state.totalAmount - existingItemRemove.price;
            let updatedItems;

            if (existingItemRemove.amount === 1) {
                updatedItems = state.items.filter(
                    (item) => item.id !== action.payload,
                );
            } else {
                const updatedItem = {
                    ...existingItemRemove,
                    amount: existingItemRemove.amount - 1,
                };
                console.log(updatedItems);
                updatedItems = [...state.items];
                console.log(updatedItems);
                updatedItems[existingCartItemIndexRemove] = updatedItem;
                console.log(updatedItems);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmountRemove,
            };
        case REMOVE_ALL_ITEM_CART:
            const existingCartItemIndexRemoveAll = state.items.findIndex(
                (item) => item.id === action.payload,
            );
            const existingItemRemoveAll = state.items[existingCartItemIndexRemoveAll];
            console.log(existingItemRemoveAll);
            const updatedTotalAmountRemoveAll =
                state.totalAmount - existingItemRemoveAll.price * existingItemRemoveAll.amount;

            const updatedItemsAll = state.items.filter(
                (item) => item.id !== action.payload,
            );
        

            return {
                items: updatedItemsAll,
                totalAmount: updatedTotalAmountRemoveAll,
            };
        default:
            throw new Error("Invalid action!");
    }
};
export default cartReducer;
