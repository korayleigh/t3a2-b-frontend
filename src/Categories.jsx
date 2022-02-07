import React, { useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { indexCategories } from './services/categoryServices';
import { setCategories } from './services/globalContextServices';
import {useGlobalContext} from './utils/globalContext';
import { useNavigate } from 'react-router-dom';
import Heading from './components/Heading';
import { ButtonRow } from './styled/styled';
import { showToast } from './services/toastServices';

const Categories = () => {

  const {store, dispatch} = useGlobalContext();
  const {categories} = store;

  useEffect(() => {
    indexCategories()
      .then(categories => {
        setCategories(dispatch ,categories);
      })
      .catch(error => {
        console.log(error);
        showToast(store, dispatch, error.message, 'danger');
      });
  },[]);

  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(String(row.original.id), {replace: false});
  };

  const handleNewClick = (() => {
    navigate('new');
  });


  const categories_data = useMemo(() => Object.values(categories), [categories]);
  const categories_columns = useMemo(() => {
    return [{
      Header: 'id',
      accessor: 'id',
      sortType: 'basic'
    },{
      Header: 'Name',
      accessor: 'name',
      sortType: 'alphanumeric',
    }];
  },[categories]);

  const categoriesTableInstance = useTable(
    { 
      columns: categories_columns,
      data: categories_data 
    },
    useSortBy
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = categoriesTableInstance;

  return (
    <>
      <Heading>Categories</Heading>
      <Container className="my-5">
        { categories ? 
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
              <Button style={{minWidth: '6rem'}} variant="primary" name="edit" onClick={handleNewClick}>New Category</Button>
            </ButtonRow>
          </>
          :
          
          <Alert variant='danger'>No Categories!</Alert>
        }
      </Container>
    </>
  );

};

export default Categories;