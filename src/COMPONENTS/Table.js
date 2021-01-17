import React, {Component} from 'react'
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Game Id',
    selector: 'game_id',
    sortable: true
  },
  {
    name: 'No of Winners',
    selector: 'winners',
    sortable: true
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true
  },
  {
  	name: 'Winners Declaration Date',
  	selector: 'date',
    sortable: true
  }
];


class MyComponent extends Component {
  
  render() {
    return (
      <DataTable
        columns={columns}
        data={this.props.data}
        pagination
      />
    )
  }
};

export default MyComponent