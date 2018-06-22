import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public users;
  userDetailsMode: boolean = false;
  userDetailEmail: string = '';
  public userDetails;
  subs: Subscription[] =[];
  searchTerm: string = '';

  userFilter = [];
  userTemp = [];

  constructor(
    public userService: UsersService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.spinner.show();
    this.userService.getListUser().subscribe( result => {
      this.users = result.results;
      this.spinner.hide();
      //console.log("Users : ", this.users);
    }, error =>{
      this.spinner.hide();
    });

  }

  getUserDetails(user){

    this.spinner.show();
    this.userDetails = user;
    this.userDetailsMode = true;
    this.userDetailEmail = user.email;
    // console.log("UserDetails selected : ", this.userDetails);
    this.spinner.hide();
  }

  getByCategory(userCategory){
    // console.log("userCategory : ", userCategory);
    this.spinner.show();

    this.subs.push(
      this.userService.getUsersByCategory(userCategory).subscribe( result =>{
        this.users = result.results;
        console.log("Users : ", this.users);
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      })
    );
  }

  filterUsers(){

    // console.log("searchTerm : ", this.searchTerm);

    this.userFilter = [];

    if(this.searchTerm == ''){
      this.users = this.userTemp;
      // console.log("searchTerm : ", this.searchTerm);
      // console.log("Users : ", this.users);
      return;
    }
    else {
      this.searchTerm = this.searchTerm.toLocaleLowerCase();

      if(this.userTemp.length == 0){
        this.userTemp = this.users;
      }

      for(let currentUser of this.users){
        if(currentUser.name.first.indexOf(this.searchTerm) > -1 || currentUser.name.last.indexOf(this.searchTerm) > -1){
          this.userFilter.push(currentUser);
        }
      }

      this.users = this.userFilter;

      // console.log("Users in filter: ", this.users);
    }



  }



}
