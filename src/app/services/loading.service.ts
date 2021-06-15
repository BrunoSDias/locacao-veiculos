import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private $loading = new BehaviorSubject(false);

  constructor() {}

  toggleLoading(status: boolean) {
    this.$loading.next(status);
  }

  statusLoading() {
    return this.$loading.asObservable();
  }
}
