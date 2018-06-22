import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

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
    // this.userService.getUserDetails(userEmail).subscribe( result => {
    //   this.userDetails = result.results[0];
    //   if(this.userDetails){
    //     this.userDetailsMode = true;
    //     this.userDetailEmail = this.userDetails.email;
    //   }
    //   console.log("User selected : ", this.userDetails);
    // });

    this.spinner.show();
    this.userDetails = user;
    this.userDetailsMode = true;
    this.userDetailEmail = user.email;
    console.log("User selected : ", user);
    console.log("UserDetails selected : ", this.userDetails);
    this.spinner.hide();
  }

  getByCategory(userCategory){

    this.spinner.show();

    this.userService.getUsersByCategory(userCategory).subscribe( result =>{
      this.users = result.results;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    })

  }


}
