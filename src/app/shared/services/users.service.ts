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
   * Get Users
   */

  public getListUser(): Observable<any>{
    return this.http.get( this.domain.listUsers );
  }

  public getUserDetails(emailUser): Observable<any>{
    return this.http.get( this.domain.userDetails + emailUser);
  }

  public getUsersByCategory(category): Observable<any>{
    return this.http.get( this.domain.userBySeed + category);
  }

}
