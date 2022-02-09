import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ButtonRow, Heading, SubHeading } from '../styled/styled';
import PropTypes from 'prop-types';
import { titleise } from '../utils/textUtils';

const defaultPropGetter = () => ({});

const IndexTable = ({data, columns, model, showNewButton, showFooter, allowRowClick, onRowClick, subHeading,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  getFooterProps = defaultPropGetter,
}) => {

  const navigate = useNavigate();

  const handleRowClick = (row) => {
    if (onRowClick) {
      onRowClick(row.original.id);
    } else {
      console.log(row);
      navigate(String(row.original.id), {replace: false});
    }
  };

  const handleNewClick = (() => {
    navigate('new');
  });

  const columnsMemo = useMemo(() => columns,[columns]);
  const dataMemo = useMemo(() => data, [data]);

  const initialState = { hiddenColumns: ['id'] };

  const tableInstance = useTable(
    { 
      columns: columnsMemo,
      data: dataMemo,
      initialState: initialState,
    },
    useSortBy
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <>

      { subHeading ? <SubHeading>{titleise(model.plural)}</SubHeading> : <Heading>{titleise(model.plural)}</Heading>}
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
                          <th key={index} {...column.getHeaderProps([
                            column.getSortByToggleProps(),
                            getColumnProps(column),
                            getHeaderProps(column),
                          ])}>
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
                    <tr key={index} onClick={() => allowRowClick && handleRowClick(row)} {...row.getRowProps([
                      getRowProps(row)
                    ])}>
                      {row.cells.map((cell, index) => {
                        return (
                          <td key={index} {...cell.getCellProps([
                            getColumnProps(cell.column),
                            getCellProps(cell),
                          ])}>
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              {showFooter && <tfoot>
                {footerGroups.map((group, index) => (
                  <tr key={index} {...group.getFooterGroupProps()}>
                    {group.headers.map((column, index) => (
                      <td key={index} {...column.getFooterProps([
                        getColumnProps(column),
                        getFooterProps(column)
                      ])}>
                        {column.render('Footer')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tfoot> }
            </Table>
            <ButtonRow>
              { showNewButton && <Button style={{minWidth: '6rem'}} variant="primary" name="new" onClick={handleNewClick}>{`New ${titleise(model.singular)}`}</Button> }
            </ButtonRow>
          </>
          :
          <Alert variant='info'>{`No ${titleise(model.plural)}`}</Alert>
        }
      </Container>
    </>
  );
};

IndexTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  model: PropTypes.object,
  showNewButton: PropTypes.bool,
  showFooter: PropTypes.bool,
  allowRowClick: PropTypes.bool,
  onRowClick: PropTypes.func,
  subHeading: PropTypes.bool,
  getHeaderProps: PropTypes.func,
  getColumnProps: PropTypes.func,
  getRowProps: PropTypes.func,
  getCellProps: PropTypes.func,
  getFooterProps: PropTypes.func,
};


export default IndexTable;
