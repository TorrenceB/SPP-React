const addItem = ({ itemId, itemName, itemQuanity }) => ({
  type: "addItem",
  payload: {
    itemId,
    itemName,
    itemQuanity,
    lastUpdated: new Date(),
  },
});

export { addItem };
