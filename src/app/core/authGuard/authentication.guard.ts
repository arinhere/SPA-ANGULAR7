import { Router,CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private _router:Router, private _snackBar: MatSnackBar){}

    //Prevent unauthorized access to dashboard module
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let role = route.data["role"] as Array<string>;        

        if(localStorage.getItem("token")){
            return true;     
        }

        this.openSnackBar("Unauthorized. Login to continue",'Error');
        this._router.navigate(["/"]);
        return false;
       
    }

    openSnackBar(message,action){
        this._snackBar.open(message, action, {
            duration: 2000,
            horizontalPosition: "right",
            verticalPosition: "bottom"
        });
    }
}