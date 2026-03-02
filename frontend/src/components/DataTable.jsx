import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

export const DataTable = ({data = [], editable = false, handleEdit }) => {

    if(!data || data.length === 0){
        return <Typography variant='h6'>No Marks Found. Please Contact the Administration.</Typography>
    }

    try {
        const hasClassName = 'class_name' in data[0];
    
        let groupedData = {};
        if(hasClassName) {
            groupedData = data.reduce((acc, row) => {
                const className = row.class_name || 'Unassigned';
                if(!acc[className]) {
                    acc[className] = [];
                }
                acc[className].push(row);
                return acc;
            }, {});
        }

        const baseColumns = Object.keys(data[0]).filter(col => col !== 'class_name');
        const columns = editable ? [...baseColumns, "actions"] : baseColumns;

        const renderTable = (tableData, className = null) => (
            <div key={className || 'table'} style={{marginBottom: '30px'}}>
                {className && <Typography variant="h6" sx={{marginTop: 3, marginBottom: 2, fontWeight: 'bold'}}>{className}</Typography>}
                <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <Table size="small" sx={{ tableLayout: 'auto' }}>
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#f5f5f5'}}>
                                {columns.map((col) => (
                                    <TableCell key={col} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <strong>{col.toUpperCase()}</strong>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, index) => (
                                    <TableRow key={`${row.id || row.student_id || index}`}>
                                        {baseColumns.map((col) => (
                                            <TableCell key={`${row.id || row.student_id || index}-${col}`} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                                {row[col]}
                                            </TableCell>
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
                </TableContainer>
            </div>
        );

        return(
            <Box sx={{ width: '100%' }}>
                {hasClassName ? (
                    Object.keys(groupedData).sort().map(className => 
                        renderTable(groupedData[className], className)
                    )
                ) : (
                    renderTable(data)
                )}
            </Box>
        );
    } catch(error) {
        console.error("DataTable error:", error);
        return <div>Error rendering table</div>;
    }
}