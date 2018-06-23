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
  userCategorySelected = 'Student';
  userFilter = [];
  userTemp = [];

  constructor(
    public userService: UsersService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    /** Before fetching list of user, show the spinner */
    this.spinner.show();
    this.userService.getListUser().subscribe( result => {
      this.users = result.results;
      /** Hide the spinner, if there is no error */
      this.spinner.hide();
      //console.log("Users : ", this.users);

    }, error =>{
      /** Hide the spinner, if there is an error */
      this.spinner.hide();
    });

  }

  getUserDetails(user){

    this.spinner.show();

    /**
     * Assigning the user object to the userDetails, when clicking on the row in the markup,
     * as whenever we fetch data from the API, it re generate the user object.
    */
    this.userDetails = user;
    this.userDetailsMode = true;
    this.userDetailEmail = user.email;
    // console.log("UserDetails selected : ", this.userDetails);
    this.spinner.hide();
  }

  getByCategory(userCategory){

    /**
     * Assigning category here, to show which category in the markup,
     * as there are no category in the user details object.
    */
    this.userCategorySelected = userCategory;
    this.spinner.show();

    /**
     * Added subscription, as the user object will updated only once
     * Each time the category changes, the getUsersByCategory is trigger.
     */
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

    /**
     * Check if searchTerm is an empty string,
     * assign userTemp to users object
     */
    if(this.searchTerm == ''){
      this.users = this.userTemp;
      // console.log("searchTerm : ", this.searchTerm);
      // console.log("Users : ", this.users);
      return;
    }
    else {

      /** If searchTerm is not an empty string, change it to lowercase */
      this.searchTerm = this.searchTerm.toLocaleLowerCase();

      /** If length of userTemp is zero, assign users object to userTemp */
      if(this.userTemp.length == 0){
        this.userTemp = this.users;
      }

      /**
       * For each user,
       * check the first or the last name is like the searchTerm.
       * Then push the user in the userFilter object
       */
      for(let currentUser of this.users){
        if(currentUser.name.first.indexOf(this.searchTerm) > -1 || currentUser.name.last.indexOf(this.searchTerm) > -1){
          this.userFilter.push(currentUser);
        }
      }

      /** After the filter has been done, Re assigning it to the users object */
      this.users = this.userFilter;

      // console.log("Users in filter: ", this.users);
    }



  }



}
