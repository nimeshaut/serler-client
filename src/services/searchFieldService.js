import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "searchFields";

function searchFieldUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getSearchFields() {
  return http.get(apiEndpoint);
}

export function getSearchField(id) {
  return http.get(searchFieldUrl(id));
}

export function saveSearchField(searchField) {
  if (searchField._id) {
    const body = { ...searchField };
    delete body._id;
    return http.put(searchFieldUrl(searchField._id), body);
  } else {
    return http.post(apiEndpoint, searchField);
  }
}

export function deleteSearchField(id) {
  return http.delete(searchFieldUrl(id));
}
