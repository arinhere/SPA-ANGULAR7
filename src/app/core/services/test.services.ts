import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestService{
    //apiEP="http://ec2-3-83-188-115.compute-1.amazonaws.com:8080/api/";
    apiEP="http://localhost:3000/api/";

    constructor(private _http: HttpClient){}

    getData(){
        var url=this.apiEP + "user/getData";
        return this._http.get(url);
    } 
    
    signUp(body){
        var url=this.apiEP + "user/signup";  
        console.log(url)      ;
        return this._http.post(url, body);
    }

    login(body){
        var url=this.apiEP +  "user/login";        
        return this._http.post(url, body);
    }

    deleteData(name){
        var url=this.apiEP + "user/deleteData/Arin";
        return this._http.delete(url);
    }
}