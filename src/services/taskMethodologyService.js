import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "methodologies";

function methodologiesUrl(id){
    return `${apiEndpoint}/${id}`;
}

export function  getTaskMethodologies(){
    return  http.get(apiEndpoint);
};

export function getTaskMethodology(id){
    return http.get(methodologiesUrl(id));
}

export function saveTaskMethodology(methodology){
    if(methodology._id)
    {
        const body = {...methodology};
        delete body._id;
        return http.put(methodologiesUrl(methodology._id), body);
    }
    else{
        return http.post(apiEndpoint, methodology);
    }

}

export function deleteTaskMethodology(id){
    return http.delete(methodologiesUrl(id));

}
