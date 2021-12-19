const addItem = ({ itemId, itemName, itemQuanity }) => ({
  type: "addItem",
  payload: {
    itemId,
    itemName,
    itemQuanity,
    lastUpdated: new Date(),
  },
});

const updateItem = ({ itemId, itemName, itemQuanity }, { index }) => ({
  type: "updateItem",
  payload: {
    index,
    updatedItem: {
      itemId,
      itemName,
      itemQuanity,
      lastUpdated: new Date(),
    },
  },
});

const deleteItem = (id) => ({
  id,
  type: "deleteItem",
});

export { addItem, deleteItem, updateItem };
