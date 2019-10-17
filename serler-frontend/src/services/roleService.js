import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "roles";

function roleUrl(id){
    return `${apiEndpoint}/${id}`;
}

export function  getRoles(){
    return  http.get(apiEndpoint);
};

export function getRole(id){
    return http.get(roleUrl(id));
}

export function saveRole(role){
    if(role._id)
    {
        const body = {...role};
        delete body._id;
        return http.put(roleUrl(role._id), body);
    }
    else{
        return http.post(apiEndpoint, role);
    }

}

export function deleteRole(id){
    return http.delete(roleUrl(id));

}