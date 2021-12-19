export const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case "addItem":
      return [...state, action.payload];
    case "deleteItem":
      return state.filter((item) => item.itemId !== action.id);
    default:
      return state;
  }
};
