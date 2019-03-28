import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductService{
    apiEP="http://ec2-3-83-188-115.compute-1.amazonaws.com:8080/api/";
    //apiEP="http://localhost:3000/";

    constructor(
        private _http: HttpClient, 
        private _store: Store<{products: fromApp.State}>){}

    addProduct(body){
        var url=this.apiEP + "products/add";
        return this._http.post(url,body);
    }

    listProduct(){
        //this._store.dispatch({type: 'LOAD_PRODUCTS'});
        var url=this.apiEP + "products";
        return this._http.get(url);
    }
}