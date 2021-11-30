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
  const [itemData, setItemData] = useState([
    {
      itemId: "2534",
      itemName: "Plumbers wrench",
      itemQuanity: 2,
      lastUpdated: "2:30pm 12.13.2021",
    },
    {
      itemId: "4562",
      itemName: "Bolt set",
      itemQuanity: 4,
      lastUpdated: "10:30am 12.13.2021",
    },
  ]);
  const data = useMemo(() => itemData, [itemData]);
  const columns = useMemo(
    () => [
      {
        Header: "Item #",
        accessor: itemData.itemId,
      },
      {
        Header: "Name",
        accessor: itemData.itemName,
      },
      {
        Header: "Quantity",
        accessor: itemData.itemQuanity,
      },
      {
        Header: "Last Updated",
        accessor: itemData.lastUpdated,
      },
    ],
    []
  );
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const inputIsValid = (str) => (str.length === 0 ? false : true);
  const onChangeHandler = (e) => {};
  const addItem = () => {};
  const updateItem = () => {};
  const deleteItem = () => {};

  return (
    <div className="table-wrapper">
      {/* Wrapper */}
      <Container maxWidth="false" sx={containerStyles}>
        <TextField
          label="Item #"
          value={itemData.itemId}
          required
          sx={textFieldStyles}
        />
        <TextField
          label="Name"
          value={itemData.itemName}
          required
          sx={textFieldStyles}
        />
        <TextField
          label="Quantity"
          value={itemData.itemQuanity}
          required
          sx={textFieldStyles}
        />
        <Button variant="contained" sx={buttonStyles}>
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
  */
}
