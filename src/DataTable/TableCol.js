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


const TableCol = memo(({
  column,
  sortIcon,
}) => {
  const { dispatch, pagination, paginationServer, sortColumn, sortDirection, sortServer, selectableRowsVisibleOnly, persistSelectedOnSort } = useTableContext();

  if (column.omit) {
    return null;
  }

  const handleSortChange = (e,sortD) => {
    if (column.sortable) {
      let direction = sortDirection;
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

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSortChange();
    }
  };

  const renderNativeSortIcon = (sortActive,sortD) => (
    <NativeSortIcon
      onClick={(e) => handleSortChange(e,sortD)}
      column={column}
      sortActive={sortActive}
      sortDirection={sortD}
    />
  );

  const renderCustomSortIcon = (dir) => (
    <span  onClick={handleSortChange} className={[dir, '__rdt_custom_sort_icon__'].join(' ')}>
      {sortIcon}
    </span>
  );

  const sortActive = column.sortable && sortColumn === column.selector;
  const nativeSortIconLeft = column.sortable && !sortIcon && !column.right;
  const nativeSortIconRight = column.sortable && !sortIcon && column.right;
  const customSortIconLeft = column.sortable && sortIcon && !column.right;
  const customSortIconRight = column.sortable && sortIcon && column.right;

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
         
         
          <div style={{display:"flex",alignItems:"center"}}>
            <div>
            {column.name}
            </div>
            <div>
                  <div>
                  {/* { renderCustomSortIcon('asc')} */}
                    {renderNativeSortIcon(sortActive,'asc')}
                  </div> 
                  <div>
                  {/* {renderCustomSortIcon('desc')} */}
                  { renderNativeSortIcon(sortActive,'desc')}
                  </div>
            </div>
          </div>
          
        </ColumnSortable>
      )}
    </TableColStyle>
  );
});

TableCol.propTypes = {
  column: PropTypes.object.isRequired,
  sortIcon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default TableCol;
