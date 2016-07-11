import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';

const EditStaffing = (props) => {
  // TODO: Switch tableData to props (need selector)
  const tableData = {
    weeks: [4, 5, 6, 7],
    projects: [
      {
        id: 1,
        name: 'projectOne',
        days: [2, 1, 3, 4]
      }
    ],
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h3>{props.employee.data.name}</h3>
      </div>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Uke</TableHeaderColumn>
            {tableData.weeks.map((row, index) => (
              <TableHeaderColumn key={index}>{row}</TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {tableData.projects.map((project, index) => (
            <TableRow key={index}>
              <TableRowColumn>{project.name}</TableRowColumn>
              {project.days.map((col, colIndex) => (
                <TableRowColumn key={colIndex}>
                  <TextField
                    floatingLabelText={'Dager:'}
                    floatingLabelFixed={false}
                    value={col}
                    id={`${project.id}-${tableData.weeks[colIndex]}`}
                  />
                </TableRowColumn>
              ))}
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

EditStaffing.propTypes = {
  employee: React.PropTypes.object,
  staffing: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default EditStaffing;
