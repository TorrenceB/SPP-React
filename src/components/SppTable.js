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

import styles from "../assets/styles/styles";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SppTable() {
  const { containerStyles, textFieldStyles, buttonStyles } = styles();
  const [updatingItem, setUpdatingItem] = useState({
    isUpdating: false,
    index: null,
  });

  const [userInput, setUserInput] = useState({
    itemId: "",
    itemName: "",
    itemQuanity: 0,
  });

  const [itemData, setItemData] = useState([
    {
      itemId: "2534",
      itemName: "Plumbers wrench",
      itemQuanity: 2,
      lastUpdated: Date(),
    },
    {
      itemId: "4562",
      itemName: "Bolt set",
      itemQuanity: 4,
      lastUpdated: Date(),
    },
  ]);
  const data = useMemo(() => itemData, [itemData]);
  const columns = useMemo(
    () => [
      {
        Header: "Item #",
        accessor: (row) => row.itemId,
      },
      {
        Header: "Name",
        accessor: (row) => row.itemName,
      },
      {
        Header: "Quantity",
        accessor: (row) => row.itemQuanity,
      },
      {
        Header: "Last Updated",
        accessor: (row) => row.lastUpdated,
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

  const isInputValid = (str) => (str.length === 0 ? false : true);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const nameAttr = e.target.name;

    setUserInput((state) => ({
      ...state,
      [nameAttr]: value,
    }));
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

  const deleteItem = (id) => {
    setItemData(() => itemData.filter((item) => item.itemId !== id));
  };

  return (
    <div className="table-wrapper">
      {/* Wrapper */}
      <Container maxWidth="false" sx={containerStyles}>
        <TextField
          label="Item #"
          value={userInput.itemId}
          name="itemId"
          required
          sx={textFieldStyles}
          onChange={onChangeHandler}
        />
        <TextField
          label="Name"
          value={userInput.itemName}
          name="itemName"
          required
          sx={textFieldStyles}
          onChange={onChangeHandler}
        />
        <TextField
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
            onClick={() => addItem(userInput)}
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
  /* Row w/ data entry form
      - Fields:
          Item # (string)
          Item name (string)
          Item Qty (int)
      - Buttons:
          Add - Add function
          Update - update function
          Delete - delete function
    ReactTable
      - Columns:
          Item #
          Item Name
          Quantity
          Last Updated (Timestamp)

    Todo: 
      1. Create mockData.js and pull into component state
      2. Refactor, break table and form into separate 
        component and assign props to each
      3. Timestamp for each object needs to be Date.now() or something...
      4. Simple field validation if str === "" don't submit...
    * 5. Add function --> Add an object to itemData array
      6. Update function --> Update object property in itemData array
      7. Delete function --> Delete object from array
      8. onRecordSelect function...
      9. doesRecordExist function --> if !itemData[itemId], add record else update existing record
        w/ newly entered data. Maybe add prompt? Record already exists, update?
      10. Clean up, style components

      Notes: 
        - Clicking on a record in the table should load the record details to the Input form for editing

        - Only one record may exist for each Item Number – if an existing Item Number is entered, 
          it should update the existing data for that Item Number.
  */
}
