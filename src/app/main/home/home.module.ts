import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {Routes,RouterModule} from '@angular/router';
const homeRoute: Routes =[
  {path:'',component:HomeComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoute)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
