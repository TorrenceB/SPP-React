export const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case "addItem":
      return [...state, action.payload];
    case "deleteItem":
      return state.filter((item) => item.itemId !== action.id);
    case "updateItem":
      return state.map((item, currIndex) => {
        return currIndex === action.payload.index
          ? action.payload.updatedItem
          : item;
      });
    default:
      return state;
  }
};
