import { Injectable } from '@angular/core';
import { KbStorageService } from '../storage/storage.service';
import { kobipConfig } from '../../kobip.config';
import { KbAuthUser } from '../../../model/auth-user';

@Injectable()
export class KbTokenService {

  private token;

  constructor(private _storage: KbStorageService) {
  }


  getToken(): string {
    if (this.token) {
      return this.token;
    }
    const user: KbAuthUser = this._storage.getItem(kobipConfig.authUserKey);
    if (user) {
      this.token = user.token;
      return user.token;
    }
    return;
  }

  clearToken(): void {
    this.token = null;
    this._storage.removeItem(kobipConfig.authUserKey);
  }

  setToken(authToken: string): void {
    this.token = authToken;
    const user: KbAuthUser = this._storage.getItem(kobipConfig.authUserKey);
    if (user) {
      user.token = authToken;
    }
    this._storage.setItem(kobipConfig.authUserKey, user);
  }

}
