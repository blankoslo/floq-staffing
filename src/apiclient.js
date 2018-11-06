import 'whatwg-fetch';
import dateFns from 'date-fns';

const baseURL =
  typeof window !== 'undefined' && window.config && window.config.apiUri
    ? window.config.apiUri : 'https://api-dev.floq.no';

const apiToken =
  typeof window !== 'undefined' && window.apiToken
    ? window.apiToken : 'dev-secret-shhh';

const headers = {
  Authorization: `Bearer ${apiToken}`,
  Prefer: 'return=representation',
  Accept: 'application/json'
};

const dataHeaders = Object.assign({}, headers, {
  'Content-Type': 'application/json; charset=utf-8'
});

export const fetchEmployees = () =>
  fetch(`${baseURL}/employees?select=
    id,
    first_name,
    last_name,
    date_of_employment,
    termination_date
    &order=first_name.desc`, {
      headers
    }).then(response => response.json());

export const fetchProjects = () =>
  fetch(`${baseURL}/projects?select=id,name,billable,active,customer{*}&order=id.desc`, {
    headers
  }).then(response => response.json());

export const fetchHolidays = () =>
  fetch(`${baseURL}/holidays?select=name,date`, {
    headers
  }).then(response => response.json());

export const fetchStaffing = (fromDate, toDate) => {
  const endPoint = `${baseURL}/staffing?select=employee,project,date` +
          `&date=gte.${dateFns.format(fromDate, 'YYYY-MM-DD')}` +
          `&date=lte.${dateFns.format(toDate, 'YYYY-MM-DD')}`;
  return fetch(endPoint, { headers }).then(response => response.json());
};

export const fetchAbsence = (fromDate, toDate) => {
  const endPoint = `${baseURL}/absence?select=employee_id,reason,date` +
          `&date=gte.${dateFns.format(fromDate, 'YYYY-MM-DD')}` +
          `&date=lte.${dateFns.format(toDate, 'YYYY-MM-DD')}`;
  return fetch(endPoint, { headers }).then(response => response.json());
};

export const fetchAbsenceReasons = () => {
  const endPoint = `${baseURL}/absence_reasons`;
  return fetch(endPoint, { headers }).then(response => response.json());
};

export const addStaffing = (employee, project, year, week, days) =>
  fetch(`${baseURL}/rpc/add_staffing`, {
    method: 'POST',
    headers: dataHeaders,
    body: JSON.stringify({
      in_employee: employee,
      in_project: project,
      in_year: year,
      in_week: week,
      in_days: days
    })
  }).then(response => response.json());

export const removeStaffing = (employee, project, year, week, days) =>
  fetch(`${baseURL}/rpc/remove_staffing`, {
    method: 'POST',
    headers: dataHeaders,
    body: JSON.stringify({
      in_employee: employee,
      in_project: project,
      in_year: year,
      in_week: week,
      in_days: days
    })
  }).then(response => response.json());
