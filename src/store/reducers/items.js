const itemState = [];

export const itemsReducer = (state = itemState, action) => {
  switch (action.type) {
    case "addItems":
      return {
        ...state,
      };
    default:
      return state;
  }
};
