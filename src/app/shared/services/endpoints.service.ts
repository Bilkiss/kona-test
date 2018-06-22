import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  //Added baseUrl var in case the api url changes
  private baseUrl = 'https://randomuser.me/api';

  public listUsers = this.baseUrl + '/?results=20';
  public userDetails = this.baseUrl + '/?email=';
  public userBySeed = this.baseUrl + '/?results=20&seed=';

  constructor() { }
}
