import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = styled.span`
  padding: 2px;
  color: inherit;
  flex-grow: 0;
  flex-shrink: 0;
`;
const NativeSortIcon = ({ sortActive, sortDirection, sortIconUp, sortIconDown, onClick }) => (
  <Icon onClick={onClick} sortActive={sortActive} sortDirection={sortDirection}>{sortDirection === 'desc' ? sortIconUp : sortIconDown }</Icon>
);

NativeSortIcon.propTypes = {
  sortDirection: PropTypes.string.isRequired,
  sortActive: PropTypes.bool,
  sortIconUp: PropTypes.string.isRequired,
  sortIconDown: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

NativeSortIcon.defaultProps = {
  sortActive: true,
  onClick: PropTypes.func,
};

export default NativeSortIcon;
