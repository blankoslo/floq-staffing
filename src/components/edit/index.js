import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn } from 'material-ui/Table';
import EditStaffingCell from './cell';
import { formatDate } from '../../utils/weekUtil';

const EditStaffing = props =>
(
  <div>
    <div style={{ textAlign: 'center' }}>
      <h1>{props.employee.name}</h1>
      <h2>{props.selectedYear}</h2>
      <span>
        <button
          className='mdl-button mdl-js-button mdl-button--fab  mdl-button--icon
            mdl-js-ripple-effect mdl-button--colored'
          onClick={props.onBackClick}
        >
          <i className='material-icons'>arrow_back</i>
        </button>
        <h2 style={{ display: 'inline-block' }}>Uke</h2>
        <button
          className='mdl-button mdl-js-button mdl-button--fab  mdl-button--icon
            mdl-js-ripple-effect mdl-button--colored'
          onClick={props.onForwardClick}
        >
          <i className='material-icons'>arrow_forward</i>
        </button>
      </span>
    </div>
    <div>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Prosjekter</TableHeaderColumn>
            {props.tableHeader.map((row, index) => (
              <TableHeaderColumn key={index}>
                Uke {formatDate(row.startOfWeek)} ({row.sum})
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {props.tableBody.map((row, index) => (
            <TableRow key={index}>
              <TableRowColumn>{row.projectname}</TableRowColumn>
              {row.daysPerWeek.map((col, colIndex) => (
                <TableRowColumn key={colIndex}>
                  <EditStaffingCell
                    value={col}
                    colIndex={colIndex}
                    startOfWeek={props.tableHeader.get(colIndex).startOfWeek}
                    total={props.tableHeader.get(colIndex).sum}
                    projectId={row.projectid}
                    onChange={props.onChange}
                  />
                </TableRowColumn>
              ))}
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

EditStaffing.propTypes = {
  selectedYear: React.PropTypes.number,
  employee: React.PropTypes.object,
  tableHeader: React.PropTypes.object,
  tableBody: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onBackClick: React.PropTypes.func,
  onForwardClick: React.PropTypes.func
};

export default EditStaffing;
