import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export const DataTable = ({data = [], editable = false, handleEdit }) => {

    if(data.length === 0){
        return <div>No Data Found.....</div>
    }

    const baseColumns = Object.keys(data[0]);
    const columns = editable ? [...baseColumns, "actions"] : baseColumns;

    return(
        <Table size="small">
            <TableHead>
                <TableRow>
                    {columns.map((col) => (
                        <TableCell key={col}>{col.toUpperCase()}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, index) => (
                        <TableRow key={row.id || row.student_id || index}>
                            {baseColumns.map((col) => (
                                <TableCell key={`${row.id || row.student_id || index}-${col}`}>{row[col]}</TableCell>
                            ))}
                        {editable && (
                            <TableCell key={`${row.id || row.student_id || index}-actions`}>
                                <button onClick={() => handleEdit(row)}>Edit</button>
                            </TableCell>
                        )}
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    )
}