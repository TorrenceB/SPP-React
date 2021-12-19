import {
  TextField,
  Container,
  Button,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
} from "@mui/material";
import { useTable } from "react-table";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import styles from "../assets/styles/styles";
import inputIsValid from "../util/validate";
import { addItem, deleteItem } from "../store/actions";

export default function SppTable() {
  const {
    containerStyles,
    textFieldStyles,
    buttonStyles,
    tableStyles,
    wrapperStyles,
    headerStyles,
    tableRowStyles,
  } = styles();

  const [errorState, setErrorState] = useState({
    itemIdError: false,
    itemNameError: false,
    itemQuanityError: false,
  });
  const [updatingItem, setUpdatingItem] = useState({
    isUpdating: false,
    index: null,
  });

  const [userInput, setUserInput] = useState({
    itemId: "",
    itemName: "",
    itemQuanity: "",
  });
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const [itemData, setItemData] = useState([]);
  // const deleteItem = (id) =>
  //   setItemData((prevState) => prevState.filter((item) => item.itemId !== id));

  const data = useMemo(() => items, [items]);
  const columns = useMemo(
    () => [
      {
        Header: "Item #",
        id: "itemId",
        accessor: (row) => row.itemId,
      },
      {
        Header: "Name",
        id: "itemName",
        accessor: (row) => row.itemName,
      },
      {
        Header: "Quantity",
        id: "itemQuanity",
        accessor: (row) => row.itemQuanity,
      },
      {
        Header: "Last Updated",
        id: "lastUpdated",
        accessor: (row) =>
          new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(row.lastUpdated)),
      },
      {
        Header: "Delete",
        id: "delete",
        accessor: ({ itemId }) => (
          <DeleteIcon
            color="error"
            onClick={(e) => {
              console.log(itemId);
              dispatch(deleteItem(itemId));
              /*
              Prevent event from bubbling up to
              row click handler.
            */
              e.stopPropagation();
            }}
          />
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const onChangeHandler = (e) => {
    const value = e.target.value < 0 ? 0 : e.target.value;
    const nameAttr = e.target.name;

    setUserInput((state) => ({
      ...state,
      [nameAttr]: value,
    }));
  };

  const findDuplicateId = (items, { itemId }) =>
    items.findIndex((item) => item.itemId === itemId);

  // const addItem = ({ itemId, itemName, itemQuanity }) => {
  //   const newItem = {
  //     itemId,
  //     itemName,
  //     itemQuanity,
  //     lastUpdated: Date(),
  //   };

  //   setItemData((prevState) => [...prevState, newItem]);

  //   setUserInput({ itemId: "", itemName: "", itemQuanity: "" });
  // };

  const updateItem = ({ itemId, itemName, itemQuanity }, { index }) => {
    const updatingItemIndex = index;
    const updatedItem = {
      itemId,
      itemName,
      itemQuanity,
      lastUpdated: Date(),
    };

    setItemData(() =>
      itemData.map((item, currIndex) =>
        currIndex === updatingItemIndex ? updatedItem : item
      )
    );

    setUpdatingItem(() => ({ isUpdating: false, index: null }));

    setUserInput({ itemId: "", itemName: "", itemQuanity: "" });
  };

  return (
    <div className="table-wrapper" style={wrapperStyles}>
      <div style={headerStyles}>
        <h2>Enter Item</h2>
        {updatingItem.isUpdating ? (
          <Button
            color="warning"
            variant="outlined"
            sx={buttonStyles}
            onClick={() => {
              if (inputIsValid(userInput, setErrorState)) {
                const index = findDuplicateId(itemData, userInput);

                return index === -1
                  ? updateItem(userInput, updatingItem)
                  : updateItem(userInput, { index });
              }
            }}
          >
            <EditIcon />
            <h4>Edit</h4>
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={() => {
              if (inputIsValid(userInput, setErrorState)) {
                const index = findDuplicateId(itemData, userInput);
                return index === -1
                  ? dispatch(addItem(userInput))
                  : updateItem(userInput, { index });
              }
            }}
          >
            <AddIcon style={{ marginRight: 5 }} />
            <h4>Add</h4>
          </Button>
        )}
      </div>
      <Container
        maxWidth="false"
        sx={containerStyles}
        style={{ paddingLeft: 0 }}
      >
        <form noValidate autoComplete="false">
          <TextField
            type="number"
            error={errorState.itemIdError}
            label="Item #"
            helperText={
              errorState.itemIdError ? "Please enter item number" : null
            }
            value={userInput.itemId}
            name="itemId"
            required
            sx={textFieldStyles}
            onChange={onChangeHandler}
          />
          <TextField
            error={errorState.itemNameError}
            label="Name"
            helperText={
              errorState.itemNameError ? "Please enter item name" : null
            }
            value={userInput.itemName}
            name="itemName"
            required
            sx={textFieldStyles}
            onChange={onChangeHandler}
          />
          <TextField
            type="number"
            error={errorState.itemQuanityError}
            label="Quantity"
            helperText={
              errorState.itemQuanityError ? "Please enter item quanity" : null
            }
            value={userInput.itemQuanity}
            name="itemQuanity"
            required
            sx={textFieldStyles}
            onChange={onChangeHandler}
          />
        </form>
      </Container>

      {/* Table... */}
      <Table {...getTableProps()} style={tableStyles}>
        <TableHead style={{ backgroundColor: "#ECECEC" }}>
          {headerGroups.map((headerGroup) => {
            return (
              <TableRow
                {...headerGroup.getHeaderGroupProps()}
                style={tableRowStyles}
              >
                {headerGroup.headers.map((column) => {
                  return (
                    <TableCell {...column.getHeaderProps()} align="left">
                      {column.render("Header")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow
                hover
                {...row.getRowProps()}
                onClick={() => {
                  setUpdatingItem({
                    isUpdating: true,
                    index: row.index,
                  });
                  setUserInput({ ...row.original });
                }}
                style={
                  row.id % 2 === 0
                    ? { backgroundColor: "#FFF" }
                    : { backgroundColor: "#ECECEC" }
                }
              >
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()} align="left">
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
}
