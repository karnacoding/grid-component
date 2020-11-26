import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTableContext } from './DataTableContext';
import { CellBase } from './Cell';
import Checkbox from './Checkbox';

const TableColStyle = styled(CellBase)`
  flex: 0 0 48px;
  justify-content: center;
  align-items: center;
  user-select: none;
  white-space: nowrap;
`;

const TableColCheckbox = ({ head }) => {
  const {
    dispatch,
    data,
    selectedRows,
    allSelected,
    selectableRowsComponent,
    selectableRowsComponentProps,
    selectableRowDisabled,
    keyField,
    mergeSelections,
  } = useTableContext();
  const indeterminate = selectedRows.length > 0 && !allSelected;
  const rows = selectableRowDisabled ? data.filter(row => !selectableRowDisabled(row)) : data;
  const isDisabled = rows.length === 0;
  // The row count should subtrtact rows that are disabled
  const rowCount = Math.min(data.length, rows.length);

  const handleSelectAll = useCallback(() => dispatch({
    type: 'SELECT_ALL_ROWS',
    rows,
    rowCount,
    mergeSelections,
    keyField,
  }), [dispatch, keyField, mergeSelections, rowCount, rows]);

  return (
    <TableColStyle className="rdt_TableCol" head={head} noPadding>
      <Checkbox
        name="select-all-rows"
        component={selectableRowsComponent}
        componentOptions={selectableRowsComponentProps}
        onClick={handleSelectAll}
        checked={allSelected}
        indeterminate={indeterminate}
        disabled={isDisabled}
      />
    </TableColStyle>
  );
};

TableColCheckbox.propTypes = {
  head: PropTypes.bool,
};

TableColCheckbox.defaultProps = {
  head: true,
};
export default TableColCheckbox;
