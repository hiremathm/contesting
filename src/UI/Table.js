import React from 'react'
import {Table} from 'react-bootstrap'

import tableClasses from '../CSS/Table.module.css'

const table = props => {

  const getTableData = (row, index) => {
    const allColumns = row.map((data, i) => (
      <td key = {i}>{data}</td>
    ))
    return allColumns
  }

  const cssClass = props.cols.length > 5 ? tableClasses.Table : tableClasses.TableSmall

  return (
    <Table className = {cssClass} >
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
              {getTableData(row, index)}      
            </tr>
          ))
        }
      </tbody>
    </Table>  
  )
}


export default table;