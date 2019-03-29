import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BehaviorService {
    token: string='';
    tokenSource = new BehaviorSubject<string>(this.token);
    updatedToken= this.tokenSource.asObservable();

    constructor() {}

    changetoken(token: string) {
      this.tokenSource.next(token)
    }

}