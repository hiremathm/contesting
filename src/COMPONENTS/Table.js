import React, {Component} from 'react'
import DataTable from 'react-data-table-component';

const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};

const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Game Id',
    selector: 'game_id',
    sortable: true,
    right: true,
  },
  {
    name: 'No of Winners',
    selector: 'winners',
    sortable: true,
    right: true,
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    right: true,
  },
  {
  	name: 'Winners Declaration Date',
  	selector: 'date',
    sortable: true,
    right: true,
  }
];


class MyComponent extends Component {
  
  render() {
    return (
      <DataTable
        title="All Contests"
        columns={columns}
        data={this.props.data}
        
        highlightOnHover
        pointerOnHover
        responsive
        pagination
        fixedHeader
        subHeaderAlign='left'
	    customStyles={customStyles}
      />
    )
  }
};

export default MyComponent