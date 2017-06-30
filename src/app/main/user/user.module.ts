import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

const userRoute: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UserComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoute),
    PaginationModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    Daterangepicker,
    MultiselectDropdownModule
  ],
  declarations: [UserComponent],
  providers: [DataService]
})
export class UserModule { }
