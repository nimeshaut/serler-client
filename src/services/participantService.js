import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "participants";

function participantUrl(id){
    return `${apiEndpoint}/${id}`;
}

export function  getParticipants(){
    return  http.get(apiEndpoint);
};

export function getParticipant(id){
    return http.get(participantUrl(id));
}

export function saveParticipant(participant){
    if(participant._id)
    {
        const body = {...participant};
        delete body._id;
        return http.put(participantUrl(participant._id), body);
    }
    else{
        return http.post(apiEndpoint, participant);
    }

}

export function deleteParticipant(id){
    return http.delete(participantUrl(id));

}
