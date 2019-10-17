import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "articles";

function articleUrl(id){
    return `${apiEndpoint}/${id}`;
}

export function  getArticles(){
    return  http.get(apiEndpoint);
};

export function getArticle(id){
    return http.get(articleUrl(id));
}

export function conditionQuery(condition) {
    return http.post(apiEndpoint + "/condition/query", condition);
}

export function saveArticle(article){
    if(article._id)
    {
        const body = {...article};
        delete body._id;
        return http.put(articleUrl(article._id), body);
    }else{
        // console.log(http.post(apiEndpoint, status));
        return http.post(apiEndpoint, article);
    }
}

export function deleteArticle(id){
    return http.delete(articleUrl(id));
}
