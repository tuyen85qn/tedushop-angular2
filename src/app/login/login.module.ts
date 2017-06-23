import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule}  from '@angular/forms';

const loginRoutes: Routes =[
  {path:'',component:LoginComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,  
    RouterModule.forChild(loginRoutes)
  ],
  providers:[],
  declarations: [LoginComponent]
})
export class LoginModule { }
