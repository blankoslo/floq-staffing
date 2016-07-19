import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import IconButton from 'material-ui/IconButton';

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
                  <div>
                    <IconButton
                      id={`remove-${project.id}-${props.tableData.data.weeks[colIndex].week}`}
                      disabled={props.tableData.data.weeks[colIndex].total > 6
                      && col === 0}
                      onClick={() => props.onChange(
                        project.id,
                        props.tableData.data.weeks[colIndex].week,
                        col === 0 ? 7 - props.tableData.data.weeks[colIndex].total : -1)
                      }
                    >
                      <ContentRemove />
                    </IconButton>
                    <TextField
                      value={col}
                      style={{ width: 20 }}
                      id={`field-${project.id}-${props.tableData.data.weeks[colIndex].week}`}
                      onChange={e => props.onChange(
                        project.id,
                        props.tableData.data.weeks[colIndex].week,
                        e.target.value - col)
                      }
                    />
                    <IconButton
                      id={`add-${project.id}-${props.tableData.data.weeks[colIndex].week}`}
                      disabled={props.tableData.data.weeks[colIndex].total > 6}
                      onClick={() => props.onChange(
                        project.id,
                        props.tableData.data.weeks[colIndex].week,
                        1)
                      }
                    >
                      <ContentAdd />
                    </IconButton>
                  </div>
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
