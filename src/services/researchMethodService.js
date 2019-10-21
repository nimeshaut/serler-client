import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "researchMethods";

function researchMethodUrl(id){
    return `${apiEndpoint}/${id}`;
}

export function  getResearchMethods(){
    return  http.get(apiEndpoint);
};

export function getResearchMethod(id){
    return http.get(researchMethodUrl(id));
}

export function saveResearchMethod(researchMethod){
    if(researchMethod._id)
    {
        const body = {...researchMethod};
        delete body._id;
        return http.put(researchMethodUrl(researchMethod._id), body);
    }
    else{
        return http.post(apiEndpoint, researchMethod);
    }

}

export function deleteResearchMethod(id){
    return http.delete(researchMethodUrl(id));

}
