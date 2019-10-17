import http from "./httpService";
import {apiUrl} from "../config.json";
import * as genderApi from "./genderService";
import * as roleApi from "./roleService";

const apiEndpoint = apiUrl + "users";

function userUrl(id){
    return `${apiEndpoint}/${id}`;
}

export function register(user){
    console.log(user);
    return http.post(apiEndpoint,{
        email: user.email,
        genderId: user.genderId,
        name: user.name,
        password: user.password
    });
}

export function  getUsers(){
    return  http.get(apiEndpoint);
};

export function getUser(id){
    return http.get(userUrl(id));
}

export function saveUser(user){
    if(user._id)
    {
        const body = {...user};
        delete body._id;
        delete body.email;
        return http.put(userUrl(user._id), body);
    }
    else{
        return http.post(apiEndpoint, user);
    }

}

export function deleteUser(id){
    return http.delete(userUrl(id));

}