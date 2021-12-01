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
import React, { useMemo, useState } from "react";

import styles from "../assets/styles/styles";

export default function SppTable() {
  const { containerStyles, textFieldStyles, buttonStyles } = styles();
  const [userInput, setUserInput] = useState({
    itemId: "",
    itemName: "",
    itemQuanity: "",
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
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const inputIsValid = (str) => (str.length === 0 ? false : true);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const nameAttr = e.target.name;

    setUserInput((state) => ({
      ...state,
      [nameAttr]: value,
    }));
  };

  /* 
    Create newItem object
    - setItemData w/ new Object
      pass in function, spread 
      prevArr and append new Item
      to end of arr
  */
  const addItem = ({ itemId, itemName, itemQuanity }) => {
    const newItem = {
      itemId: itemId ?? "",
      itemName: itemName ?? "",
      itemQuanity: itemQuanity ?? "",
      lastUpdated: Date(),
    };

    setItemData((prevState) => [...prevState, newItem]);
  };

  const updateItem = () => {};
  const deleteItem = () => {};

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
        <Button
          variant="contained"
          sx={buttonStyles}
          onClick={() => addItem(userInput)}
        >
          Add
        </Button>
        <Button color="warning" variant="outlined" sx={buttonStyles}>
          Edit
        </Button>
        <Button color="error" variant="contained" sx={buttonStyles}>
          Delete
        </Button>
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
              <TableRow {...row.getRowProps()}>
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
      5. Add function --> Add an object to itemData array
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
