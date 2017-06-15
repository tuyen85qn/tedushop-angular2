import { Component, OnInit } from '@angular/core';
import {AuthenService} from "../core/services/authen.service";
import {UtilityService} from "../core/services/utility.service";
import {SystemConstants} from "../core/common/system.constants";
import {LoggedInUSer} from "../core/domain/loggedin.user";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public user: LoggedInUSer;
  constructor(private authenService:AuthenService, private utilityService:UtilityService) { 

  }

  ngOnInit() {
    this.user = this.authenService.getLoggedInUser();     
  }
  
  logout(){
    this.authenService.logout();    
    this.utilityService.navigateToLogin();
  }
}
