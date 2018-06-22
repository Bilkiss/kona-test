import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public users;

  constructor(
    public userService: UsersService
  ) { }

  ngOnInit() {

    this.userService.getListUser().subscribe( result => {
      this.users = result.results;
      console.log("Results : ", this.users);
    });


  }

}
