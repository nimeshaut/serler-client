import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "status";

function statusUrl(id){
    return `${apiEndpoint}/${id}`;
}

export function  getStatuses(){
    return  http.get(apiEndpoint);
};

export function getStatus(id){
    return http.get(statusUrl(id));
}

export function saveStatus(status){
    if(status._id)
    {
        const body = {...status};
        delete body._id;
        return http.put(statusUrl(status._id), body);
    }else{
        // console.log(http.post(apiEndpoint, status));
        return http.post(apiEndpoint, status);
    }
}

export function deleteStatus(id){
    return http.delete(statusUrl(id));
}
