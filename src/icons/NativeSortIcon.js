import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = styled.span`
  padding: 2px;
  color: inherit;
  flex-grow: 0;
  flex-shrink: 0;
  //  ${props => (props.sortActive ? 'opacity: 1' : 'opacity: 0')};
  // ${props => props.sortDirection === 'desc' && 'transform: rotate(180deg)'};
`;

props => (props.sortDirection == 'desc' ? (sortDir='desc') : sortDir='asc');
const NativeSortIcon = ({ sortActive, sortDirection, sortIcon, onClick, sortIconDesc,sortIConAsc = <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.83992 8.70013C6.44595 9.30984 5.55405 9.30984 5.16008 8.70013L0.996834 2.257C0.566886 1.59161 1.04453 0.714284 1.83675 0.714284L10.1633 0.714285C10.9555 0.714285 11.4331 1.59161 11.0032 2.257L6.83992 8.70013Z" fill={sortDirection == 'asc' ? '#023373' : '#A8A8A8'}/>
</svg>,
sortIconDes = <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.16008 1.29987C5.55405 0.690158 6.44595 0.690158 6.83992 1.29987L11.0032 7.743C11.4331 8.40839 10.9555 9.28572 10.1633 9.28572L1.83675 9.28572C1.04453 9.28572 0.566883 8.40839 0.996831 7.743L5.16008 1.29987Z" fill={sortDirection == 'desc' ? '#023373' : '#A8A8A8'}/>
</svg>}) => (
  
  <Icon onClick={onClick} sortActive={sortActive} sortDirection={sortDirection}>{sortDirection == 'desc' ? sortIConAsc : sortIconDes}</Icon>
);

NativeSortIcon.propTypes = {
  sortDirection: PropTypes.string.isRequired,
  sortActive: PropTypes.bool,
  sortIcon: PropTypes.node,
};

NativeSortIcon.defaultProps = {
  sortActive: true,
  sortIConAsc: <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.83992 8.70013C6.44595 9.30984 5.55405 9.30984 5.16008 8.70013L0.996834 2.257C0.566886 1.59161 1.04453 0.714284 1.83675 0.714284L10.1633 0.714285C10.9555 0.714285 11.4331 1.59161 11.0032 2.257L6.83992 8.70013Z" fill={'#A8A8A8'}/>
  </svg>,
  sortIconDes: <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.16008 1.29987C5.55405 0.690158 6.44595 0.690158 6.83992 1.29987L11.0032 7.743C11.4331 8.40839 10.9555 9.28572 10.1633 9.28572L1.83675 9.28572C1.04453 9.28572 0.566883 8.40839 0.996831 7.743L5.16008 1.29987Z" fill={'#A8A8A8'} />
  </svg>
  
};

export default NativeSortIcon;
