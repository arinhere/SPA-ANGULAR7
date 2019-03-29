import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/products.service';
import { MatSnackBar } from '@angular/material';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddProductComponent implements OnInit {
  pid="";
  addProductForm: FormGroup;

  constructor(private fb: FormBuilder, private _product: ProductService, private _snack: MatSnackBar, 
      private _router: Router, private _route:ActivatedRoute) { }

  ngOnInit() {
    this.addProductForm=this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: ['', Validators.required]
    })

    //Check if there is any ID in the param, then it will for edit purpose
    this._route.params.subscribe((params:Params)=>{
      if(params['id']){
        this.pid = params['id'];  //Getting data

        //Getting data from API & assign them
        this._product.getProductByID(this.pid)
        .subscribe(result=>{
          this.addProductForm.get('title').setValue(result['body']['title']);
          this.addProductForm.get('description').setValue(result['body']['description']);
          this.addProductForm.get('price').setValue(result['body']['price']);
        })

      }
    })
  }

  //Get the form controls for validation
  get f(){return this.addProductForm.controls}

  onSubmit(formVal){
    if(!this.pid){
      this._product.addProduct(formVal.value)
      .subscribe(result=>{
        this._snack.open("Product Added",'Success',{
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "bottom"
        });

        setTimeout(() => {
          this._router.navigate(['/products/list']);
        }, 1000);
      },
      err=>{
        this._snack.open("Unable to add product",'Error',{
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "bottom"
        });
      })
    }
    else{
      var body=formVal.value;
      body["_id"]=this.pid;

      this._product.updateProduct(body)
      .subscribe(result=>{
        this._snack.open("Product Updated",'Success',{
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "bottom"
        });

        setTimeout(() => {
          this._router.navigate(['/products/list']);
        }, 1000);
      },
      err=>{
        this._snack.open("Unable to update product",'Error',{
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "bottom"
        });
      })
    }
    
  }

}
