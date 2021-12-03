// export default {
//   addItem: ({ itemId, itemName, itemQuanity }, setItemData, setUserInput) => {
//     const newItem = {
//       itemId,
//       itemName,
//       itemQuanity,
//       lastUpdated: Date(),
//     };

//     setItemData((prevState) => [...prevState, newItem]);

//     setUserInput({ itemId: "", itemName: "", itemQuanity: "" });
//   },

//   updateItem: ({ itemId, itemName, itemQuanity }, { index }, setItemData) => {
//     const updatingItemIndex = index;
//     const updatedItem = {
//       itemId,
//       itemName,
//       itemQuanity,
//       lastUpdated: Date(),
//     };

//     setItemData(() =>
//       itemData.map((item, currIndex) =>
//         currIndex === updatingItemIndex ? updatedItem : item
//       )
//     );

//     setUpdatingItem({ isUpdating: false, index: null });

//     setUserInput({ itemId: "", itemName: "", itemQuanity: "" });
//   },
//   deleteItem: () => {},
// };
