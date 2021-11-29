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

/* 
      ---State---
      - [] of data objects
          data: {
              itemId: "",
              itemName: "",
              itemQuantity: 0,
          }
*/
export default function SppTable() {
  const [data, setData] = useState([]);
  const columns = useMemo(() => [
    {
      Header: "Item #",
      accessor: "",
    },
    {
      Header: "Name",
      accessor: "",
    },
    {
      Header: "Quantity",
      accessor: "",
    },
  ]);
  const tableInstance = useTable({ columns, data });

  const styles = {
    containerStyles: {
      display: "flex",
      justifyContent: "space-between",
      my: 2,
    },
    textFieldStyles: {
      mx: 1,
    },
    buttonStyles: {
      mx: 1,
      px: 8,
      width: 2,
    },
  };

  const inputIsValid = (str) => (str.length === 0 ? false : true);
  const onChangeHandler = () => {};
  const addItem = () => {};
  const updateItem = () => {};
  const deleteItem = () => {};

  return (
    <div className="table-wrapper">
      {/* Wrapper */}
      <Container maxWidth="false" sx={styles.containerStyles}>
        <TextField
          label="Item #"
          value={""}
          required
          sx={styles.textFieldStyles}
        />
        <TextField
          label="Name"
          value={""}
          required
          sx={styles.textFieldStyles}
        />
        <TextField
          label="Quantity"
          value={""}
          required
          sx={styles.textFieldStyles}
        />
        <Button variant="contained" sx={styles.buttonStyles}>
          Add
        </Button>
        <Button color="warning" variant="outlined" sx={styles.buttonStyles}>
          Edit
        </Button>
        <Button color="error" variant="contained" sx={styles.buttonStyles}>
          Delete
        </Button>
      </Container>

      {/* Table... */}
      <Table>
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          <TableCell></TableCell>
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
