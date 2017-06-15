import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../core/services/authen.service';
import {Router} from '@angular/router';
import { UrlConstants } from '../core/common/url.constants';
import { NotificationService } from '../core/services/notification.service';
import {MessageConstants} from '../core/common/message.constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  model: any = {};
  constructor(private authenService: AuthenService, private router:Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }
  
  login() {
    this.loading = true;
    this.authenService.login(this.model.username, this.model.password).subscribe(data => {
      this.loading = true;
      this.router.navigate([UrlConstants.HOME]);
    }, error => {
      this.notificationService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
      this.loading = false;
      this.router.navigate([UrlConstants.LOGIN]);
    })
  }
}
