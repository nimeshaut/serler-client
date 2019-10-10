import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "search";

function searchUrl(id){
    return `${apiEndpoint}/${id}`;
}

export function  getSearches(){
    return  http.get(apiEndpoint);
};

export function getSearch(id){
    return http.get(searchUrl(id));
}

export function saveSearch(search){
    if(search._id)
    {
        const body = {...search};
        delete body._id;
        return http.put(searchUrl(search._id), body);
    }
    else{
        return http.post(apiEndpoint, search);
    }

}

export function deleteSearch(id){
    return http.delete(searchUrl(id));

}
