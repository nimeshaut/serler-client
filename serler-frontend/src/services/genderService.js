import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "genders";

function genderUrl(id){
    return `${apiEndpoint}/${id}`;
}

export function  getGenders(){
    return  http.get(apiEndpoint);
};

export function getGender(id){
    return http.get(genderUrl(id));
}

export function saveGender(gender){
    if(gender._id)
    {
        const body = {...gender};
        delete body._id;
        return http.put(genderUrl(gender._id), body);
    }
    else{
        return http.post(apiEndpoint, gender);
    }

}

export function deleteGender(id){
    return http.delete(genderUrl(id));

}
