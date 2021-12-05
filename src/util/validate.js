const validateInput = ({ itemId, itemName, itemQuanity }, setErrorState) => {
  let isValid = false;

  setErrorState(() => ({
    itemIdError: false,
    itemNameError: false,
    itemQuanityError: false,
  }));

  if (itemId === "") {
    setErrorState((prevState) => ({ ...prevState, itemIdError: true }));
  }

  if (itemName === "") {
    setErrorState((prevState) => ({ ...prevState, itemNameError: true }));
  }

  if (itemQuanity === "") {
    setErrorState((prevState) => ({ ...prevState, itemQuanityError: true }));
  }

  if (itemId && itemName && itemQuanity) {
    isValid = true;
  }

  return isValid;
};

export default validateInput;
