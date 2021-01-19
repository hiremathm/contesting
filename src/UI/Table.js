import React from 'react'
import {Table} from 'react-bootstrap'

import tableClasses from '../CSS/Table.module.css'

const table = (props) => {
  return (
    <Table className = {tableClasses.Table} >
      <thead>
        <tr>
          {
            props.cols && props.cols.map((col, index) => <th key = {index}>{col}</th>)
          }
        </tr>
      </thead>
      <tbody>        
        {
          props.rows && props.rows.map((row, index) => (
            <tr key = {index}>
              <td>{index}</td>
              <td>{row.title.toUpperCase()}</td>
              <td>{row.contest_unique_id}</td>
              <td>{row.no_of_winners}</td>
              <td>{row.status}</td>
              <td>{new Date(row.winners_declared_at).toDateString()}</td>
              <td>actions</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}


export default table;

/*{/*import DataTable from 'react-data-table-component';

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

export default MyComponent*/
