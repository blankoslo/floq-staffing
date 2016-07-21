import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn } from 'material-ui/Table';
import EditStaffingCell from './cell';

const EditStaffing = props =>
(
  <div>
    <div style={{ textAlign: 'center' }}>
      <h1>{props.employee.data.name}</h1>
      <h2>{props.tableData.data.weeks[0].year}</h2>
    </div>
    <div>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Prosjekter</TableHeaderColumn>
            {props.tableData.data.weeks.map((row, index) => (
              <TableHeaderColumn key={index}>
                Uke {row.week} ({props.tableData.data.weeks[index].total})
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {props.tableData.data.projects.map((project, index) => (
            <TableRow key={index}>
              <TableRowColumn>{project.name}</TableRowColumn>
              {project.days.map((col, colIndex) => (
                <TableRowColumn key={colIndex}>
                  <EditStaffingCell
                    value={col}
                    colIndex={colIndex}
                    week={props.tableData.data.weeks[colIndex].week}
                    total={props.tableData.data.weeks[colIndex].total}
                    projectId={project.id}
                    employee={props.employee}
                    tableData={props.tableData}
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
  employee: React.PropTypes.object,
  tableData: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default EditStaffing;
