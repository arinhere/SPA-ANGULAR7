import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  //itemList: Observale<[]>
  itemList: Array<any>=[];
  constructor(private _productService: ProductService, private _store: Store<{products: fromApp.State}>,
              private _router: Router, private _snack: MatSnackBar) { }

  ngOnInit() {
    this.populate();
  }

  populate(){
    this.itemList=[];
    this._productService.listProduct()
      .subscribe(result=>{
        this.itemList=result['body'];
      })
  }

  navigate(action,id){
    if(action=='edit'){//Redirecting to the edit page, which is Add component
      this._router.navigate(['/products/' + id + '/edit']);
    }

    if(action=='delete'){//Deleting the user
      if(confirm('Are you sure to remove this product?')){
        this._productService.deleteProduct(id)
          .subscribe(result=>{
            this._snack.open("Product Removed",'Success',{
              duration: 5000,
              horizontalPosition: "right",
              verticalPosition: "bottom"
            });
            this.populate();
          },
          err=>{
            this._snack.open("Unable to remove data",'Error',{
              duration: 5000,
              horizontalPosition: "right",
              verticalPosition: "bottom"
            });
          })
      }
    }
  }

}
