import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';

const EditStaffing = (props) =>
   (
  <div>
    <div style={{ textAlign: 'center' }}>
      <h3>{props.employee.data.name}</h3>
      <h2>{props.tableData.data.weeks[0].year}</h2>
    </div>
    <div>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Uke</TableHeaderColumn>
            {props.tableData.data.weeks.map((row, index) => (
              <TableHeaderColumn key={index}>{row.week}</TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {props.tableData.data.projects.map((project, index) => (
            <TableRow key={index}>
              <TableRowColumn>{project.name}</TableRowColumn>
              {project.days.map((col, colIndex) => (
                <TableRowColumn key={colIndex}>
                  <TextField
                    floatingLabelText={'Dager:'}
                    floatingLabelFixed={false}
                    value={col}
                    id={`${project.id}-${props.tableData.data.weeks[colIndex]}`}
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
  employee: React.PropTypes.object,
  tableData: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default EditStaffing;
