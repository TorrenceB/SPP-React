export const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case "addItem":
      return [...state, action.payload];
    default:
      return state;
  }
};
