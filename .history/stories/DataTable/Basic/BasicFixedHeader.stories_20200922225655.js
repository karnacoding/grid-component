
import React from 'react';
import { storiesOf } from '@storybook/react';
import data from '../constants/sampleMovieData';
import DataTable from '../../../src/index';

const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Director',
    selector: 'director',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
  },
];

const rowDragged = event => event.stopPropagation();

const BasicFixedHeader = () => (
  <DataTable
    title="Movie List"
    columns={columns}
    data={data}
    fixedHeader
    fixedHeaderScrollHeight="300px"
    draggable
    onDrag={rowDragged}
    onDragEnd={rowDragged}
  />
);


storiesOf('General', module)
  .add('Fixed Header', BasicFixedHeader);
