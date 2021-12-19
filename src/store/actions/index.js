const addItem = ({ itemId, itemName, itemQuanity }) => ({
  type: "addItem",
  payload: {
    itemId,
    itemName,
    itemQuanity,
    lastUpdated: new Date(),
  },
});

const updateItem = () => ({
  type: "updateItem",
  payload: {},
});

const deleteItem = (id) => ({
  id,
  type: "deleteItem",
});

export { addItem, deleteItem };
