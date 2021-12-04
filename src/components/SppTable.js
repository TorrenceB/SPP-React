import {
  TextField,
  Container,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useTable } from "react-table";
import React, { useMemo, useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "../assets/styles/styles";

export default function SppTable() {
  const { containerStyles, textFieldStyles, buttonStyles } = styles();
  const [updatingItem, setUpdatingItem] = useState({
    isUpdating: false,
    index: null,
  });

  const [userInput, setUserInput] = useState({
    itemId: "",
    itemName: "",
    itemQuanity: "",
  });

  const [itemData, setItemData] = useState([]);
  const deleteItem = (id) =>
    setItemData((prevState) => prevState.filter((item) => item.itemId !== id));

  const data = useMemo(() => itemData, [itemData]);
  const columns = useMemo(
    () => [
      {
        Header: "Item #",
        id: "itemID",
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
              deleteItem(itemId);
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

  useEffect(() => {
    console.log(itemData);
  }, [itemData]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const nameAttr = e.target.name;

    setUserInput((state) => ({
      ...state,
      [nameAttr]: value,
    }));
  };

  const itemExists = (items, { itemId }) => {
    const index = items.findIndex((item) => item.itemId === itemId);

    return index === -1 ? false : true;
  };

  const addItem = ({ itemId, itemName, itemQuanity }) => {
    const newItem = {
      itemId,
      itemName,
      itemQuanity,
      lastUpdated: Date(),
    };

    setItemData((prevState) => [...prevState, newItem]);

    setUserInput({ itemId: "", itemName: "", itemQuanity: "" });
  };

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

    setUpdatingItem({ isUpdating: false, index: null });

    setUserInput({ itemId: "", itemName: "", itemQuanity: "" });
  };

  const validateInput = (str) => (str === "" ? true : false);

  return (
    <div className="table-wrapper">
      {/* Wrapper */}
      <Container maxWidth="false" sx={containerStyles}>
        <TextField
          error={validateInput(userInput.itemId)}
          label="Item #"
          value={userInput.itemId}
          name="itemId"
          required
          sx={textFieldStyles}
          onChange={onChangeHandler}
        />
        <TextField
          error={validateInput(userInput.itemName)}
          label="Name"
          value={userInput.itemName}
          name="itemName"
          required
          sx={textFieldStyles}
          onChange={onChangeHandler}
        />
        <TextField
          error={validateInput(userInput.itemQuanity)}
          label="Quantity"
          value={userInput.itemQuanity}
          name="itemQuanity"
          required
          sx={textFieldStyles}
          onChange={onChangeHandler}
        />
        {updatingItem.isUpdating ? (
          <Button
            color="warning"
            variant="outlined"
            sx={buttonStyles}
            onClick={() => updateItem(userInput, updatingItem)}
          >
            Edit
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={() => {
              if (itemExists(itemData, userInput)) {
                /* 
                  Handle update record index
                */
              } else {
                addItem(userInput);
              }
            }}
          >
            Add
          </Button>
        )}
      </Container>

      {/* Table... */}
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => {
            return (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <TableCell {...column.getHeaderProps()}>
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
                {...row.getRowProps()}
                onClick={() => {
                  setUpdatingItem({
                    isUpdating: true,
                    index: row.index,
                  });
                  setUserInput({ ...row.original });
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

{
  /* 
    Todo:       
      2. Refactor, break table and form into separate 
        component and assign props to each
      4. Simple field validation if str === "" don't submit...
      9. doesRecordExist function --> if !itemData[itemId], add record else update existing record
        w/ newly entered data. Maybe add prompt? Record already exists, update?
      10. Clean up, style components

      Notes: 
        - Clicking on a record in the table should load the record details to the Input form for editing

        - Only one record may exist for each Item Number – if an existing Item Number is entered, 
          it should update the existing data for that Item Number.
*/
}
