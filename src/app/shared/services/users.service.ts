import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EndpointsService } from './endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  domain = this.endpointService;

  constructor(
    private endpointService: EndpointsService,
    public http: HttpClient
  ) { }

  /**
   * Get users
   */

  public getListUser(): Observable<any>{
    return this.http.get( this.domain.listUsers );
  }

  /**
   * Get user by email
   */

  public getUserDetails(emailUser): Observable<any>{
    return this.http.get( this.domain.userDetails + emailUser);
  }

  /**
   * Get users by category
   */

  public getUsersByCategory(category): Observable<any>{
    return this.http.get( this.domain.userBySeed + category);
  }

}
