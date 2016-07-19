import 'whatwg-fetch';

const baseURL =
  typeof window !== 'undefined' && window.config && window.config.apiUri
    ? window.config.apiUri : 'https://api-dev.floq.no';

const apiToken =
  typeof window !== 'undefined' && window.apiToken
    ? window.apiToken : 'dev-secret-shhh';

const headers = {
  Authorization: `Bearer ${apiToken}`,
  Prefer: 'return=representation', // ask for the updated entity after modifications (e.g. PATCH)
  Accept: 'application/json'
};

const dataHeaders = Object.assign({}, headers, {
  'Content-Type': 'application/json; charset=utf-8'
});

export const getProjects = () =>
fetch(`${baseURL}/projects?select=id,name&order=id.desc`, {
  headers
}).then(response => response.json());

export const getEmployees = () =>
  fetch(`${baseURL}/employees?select=id,first_name,last_name&order=first_name.desc`, {
    headers
  }).then(response => response.json());

export const getStaffing = () => fetch(`${baseURL}/staffing`, {
  headers
}).then(response => response.json());

export const addStaffing = body => fetch(`${baseURL}/rpc/add_days_to_week`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());

export const removeStaffing = body => fetch(`${baseURL}/rpc/remove_days_from_week`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());
