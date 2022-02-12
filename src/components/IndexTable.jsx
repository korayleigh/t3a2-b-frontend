import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Container, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { StyledTable } from '../styled/styled';

const defaultPropGetter = () => ({});

const defaultOnRowClick = () => {};

const IndexTable = ({data, columns, showFooter,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  getFooterProps = defaultPropGetter,
  onRowClick = defaultOnRowClick,
}) => {

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
      <Container className="my-5">
        { dataMemo.length ? 
          <>
            <StyledTable striped bordered hover {...getTableProps()}>
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
                    <tr key={index} onClick={() => onRowClick(row.original.id)} {...row.getRowProps([
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
            </StyledTable>
          </>
          :
          <Alert variant='info'>No data...</Alert>
        }
      </Container>
    </>
  );
};

IndexTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  model: PropTypes.object,
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
