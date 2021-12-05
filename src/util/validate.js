const validateInput = ({ itemId, itemName, itemQuanity }, setErrorState) => {
  let isValid = false;
  if (itemId === "") {
    setErrorState((prevState) => ({ ...prevState, itemIdError: true }));
    isValid = false;
  } else {
    setErrorState((prevState) => ({ ...prevState, itemIdError: false }));
    isValid = true;
  }

  if (itemName === "") {
    setErrorState((prevState) => ({ ...prevState, itemNameError: true }));
    isValid = false;
  } else {
    setErrorState((prevState) => ({ ...prevState, itemNameError: false }));
    isValid = true;
  }

  if (itemQuanity === "") {
    setErrorState((prevState) => ({ ...prevState, itemQuanityError: true }));
    isValid = false;
  } else {
    setErrorState((prevState) => ({ ...prevState, itemQuanityError: false }));
    isValid = true;
  }

  return isValid;
};

export default validateInput;
