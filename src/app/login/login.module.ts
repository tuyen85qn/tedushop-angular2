import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule}  from '@angular/forms';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from '../core/services/notification.service';
import {HttpModule} from '@angular/http';
const loginRoutes: Routes =[
  {path:'',component:LoginComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(loginRoutes)
  ],
  providers:[AuthenService,NotificationService],
  declarations: [LoginComponent]
})
export class LoginModule { }
