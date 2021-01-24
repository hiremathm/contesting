import React from 'react'
import {Table} from 'react-bootstrap'
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { NavLink } from 'react-router-dom'

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
              <td>{index + 1}</td>
              <td>{row.title.toUpperCase()}</td>
              <td>{row.game_id}</td>
              <td>{row.no_of_winners}</td>
              <td>{row.status.toUpperCase()}</td>
              <td>{new Date(row.winners_declared_at).toDateString()}</td>
              <td>
                  
                  <NavLink to={`/contests/edit/${row.contest_id}`}>
                    <MdModeEdit 
                      style = {{cursor: 'pointer'}} 
                      size = "2em" 
                      color = "green"
                    />
                  </NavLink>
                  
                  <MdDeleteForever style = {{marginLeft: "5px", cursor: 'pointer' }} size = "2em" color = "red" onClick = {() => props.remove(row.contest_id)}/>
              </td>
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
