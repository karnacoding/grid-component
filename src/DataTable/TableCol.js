import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Cell } from './Cell';
import { useTableContext } from './DataTableContext';
import NativeSortIcon from '../icons/NativeSortIcon';

const TableColStyle = styled(Cell)`
  ${props => props.column.button && 'text-align: center'};
`;

const ColumnSortable = styled.div`
  display: inline-flex;
  align-items: center;
  height: 100%;
  line-height: 1;
  user-select: none;
  ${props => (props.sortActive ? props.theme.headCells.activeSortStyle : props.theme.headCells.inactiveSortStyle)};
  span.__rdt_custom_sort_icon__ {
    i,
    svg {
      ${props => (props.sortActive ? 'opacity: 1' : 'opacity: 1')}; //kundan
      color: inherit;
      font-size: 18px !important;
      height: 18px !important;
      width: 18px !important;
      backface-visibility: hidden;
      transform-style: preserve-3d;
      transition-duration: 125ms;
      transition-property: transform;
    }
    &.asc i,
    &.asc svg {
      transform: rotate(180deg);
    }
  }
  &:hover {
    ${({ column }) => column.sortable && 'cursor: pointer'};
    ${({ column, theme }) => column.sortable && theme.headCells.activeStyle};
    span,
    span.__rdt_custom_sort_icon__ * {
      ${({ sortActive, column }) => !sortActive && column.sortable && 'opacity: 1'};
    }
  }
`;

const TableCol = memo(({ column }) => {
  const {
    dispatch,
    pagination,
    paginationServer,
    sortColumn,
    sortDirection,
    sortServer,
    selectableRowsVisibleOnly,
    persistSelectedOnSort,
  } = useTableContext();

  if (column.omit) {
    return null;
  }

  const handleSortChange = (e, sortD) => {
    if (column.sortable) {
      let direction = sortD;
      // change sort direction only if sortColumn (currently selected column) is === the newly clicked column
      // otherwise, retain sort direction if the column is switched
      if (sortColumn === column.selector) {
        direction = sortD;
      }

      dispatch({
        type: 'SORT_CHANGE',
        sortDirection: direction,
        sortColumn: column.selector,
        sortServer,
        selectedColumn: column,
        pagination,
        paginationServer,
        visibleOnly: selectableRowsVisibleOnly,
        persistSelectedOnSort,
      });
    }
  };
  const sortIconUp = (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill={
        sortDirection === 'desc' && sortColumn === column.selector
          ? '#023373'
          : '#A8A8A8'
      }
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.83992 8.70013C6.44595 9.30984 5.55405 9.30984 5.16008 8.70013L0.996834 2.257C0.566886 1.59161 1.04453 0.714284 1.83675 0.714284L10.1633 0.714285C10.9555 0.714285 11.4331 1.59161 11.0032 2.257L6.83992 8.70013Z"
        fill={
          ((sortDirection === 'desc' && sortColumn === column.selector)
            ? '#023373'
            : '#A8A8A8')
        }
      />
    </svg>
  );
  const sortIconDown = (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill={
        (sortDirection === 'asc' && sortColumn === column.selector)
          ? '#023373'
          : '#A8A8A8'
      }
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.16008 1.29987C5.55405 0.690158 6.44595 0.690158 6.83992 1.29987L11.0032 7.743C11.4331 8.40839 10.9555 9.28572 10.1633 9.28572L1.83675 9.28572C1.04453 9.28572 0.566883 8.40839 0.996831 7.743L5.16008 1.29987Z"
        fill={
          (sortDirection === 'asc' && sortColumn === column.selector)
            ? '#023373'
            : '#A8A8A8'
          }
      />
    </svg>
  );
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSortChange();
    }
  };

  const renderNativeSortIcon = (sortActive, sortD) => (
    <NativeSortIcon
      onClick={e => handleSortChange(e, sortD)}
      column={column}
      sortActive={sortActive}
      sortDirection={sortD}
      sortIconUp={sortIconUp}
      sortIconDown={sortIconDown}
    />
  );

  // const renderCustomSortIcon = dir => (
  //   <span
  //     onClick={handleSortChange}
  //     className={[dir, '__rdt_custom_sort_icon__'].join(' ')}
  //   >
  //     {sortIcon}
  //   </span>
  // );

  const sortActive = column.sortable && sortColumn === column.selector;
  // const nativeSortIconLeft = column.sortable && !sortIcon && !column.right;
  // const nativeSortIconRight = column.sortable && !sortIcon && column.right;
  // const customSortIconLeft = column.sortable && sortIcon && !column.right;
  // const customSortIconRight = column.sortable && sortIcon && column.right;

  return (
    <TableColStyle
      className="rdt_TableCol"
      column={column} // required by Cell.js
      head
    >
      {column.name && (
        <ColumnSortable
          id={`column-${column.selector}`}
          role="button"
          aria-pressed={sortActive}
          tabIndex={0}
          className="rdt_TableCol_Sortable"
          onKeyPress={handleKeyPress}
          sortActive={sortActive}
          column={column}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>{column.name}</div>
            {column.sortable && (
            <div>
              <div>
                {/* { renderCustomSortIcon('asc')} */}
                {renderNativeSortIcon(sortActive, 'asc')}
              </div>
              <div>
                {/* {renderCustomSortIcon('desc')} */}
                {renderNativeSortIcon(sortActive, 'desc')}
              </div>
            </div>
            )}
          </div>
        </ColumnSortable>
      )}
    </TableColStyle>
  );
});

TableCol.propTypes = {
  column: PropTypes.object.isRequired,
};

export default TableCol;
