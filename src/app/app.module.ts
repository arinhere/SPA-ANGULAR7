import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';//Adding NGRX Module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestService } from './core/services/test.services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceInterceptor } from './core/interceptor/service.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule, MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ProductService } from './core/services/products.service';
import { RouterModule } from '@angular/router';
import { ProductsModule } from './products/products.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppReducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    ProductsModule,
    BrowserAnimationsModule,
    //NGRX Module Import
    StoreModule.forRoot({AppReducer}),
    //NGRX Module Import End
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    TestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
