import { Injectable } from '@angular/core';

@Injectable()
export class SingletonService {

  private _loadedHubs = false;

  get loadedHubs() {
    return this._loadedHubs;
  };


  setLoadedHubs(value: boolean) {
    this._loadedHubs = value;
  }


}
