import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ButtonRow } from '../styled/styled';
import PropTypes from 'prop-types';

const IndexTable = ({data, columns}) => {

  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(String(row.original.id), {replace: false});
  };

  const handleNewClick = (() => {
    navigate('new');
  });

  const columnsMemo = useMemo(() => columns,[columns]);
  const dataMemo = useMemo(() => Object.values(data), [data]);

  console.log(columns);

  const tableInstance = useTable(
    { 
      columns: columnsMemo,
      data: dataMemo 
    },
    useSortBy
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <>
      <Container className="my-5">
        { dataMemo ? 
          <>
            <Table striped bordered hover {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup, index) => {
                  return (
                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                      { headerGroup.headers.map((column, index) => {
                        return (
                          <th  key={index} {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                              {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                            </span>
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
                { rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr key={index} onClick={() => handleRowClick(row)} {...row.getRowProps()}>
                      {row.cells.map((cell, index) => {
                        return (
                          <td key={index} {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <ButtonRow>
              <Button style={{minWidth: '6rem'}} variant="primary" name="new" onClick={handleNewClick}>New Category</Button>
            </ButtonRow>
          </>
          :
          <Alert variant='info'>No data!</Alert>
        }
      </Container>
    </>
  );
};

IndexTable.propTypes = {
  data: PropTypes.object,
  columns: PropTypes.array,
};


export default IndexTable;
