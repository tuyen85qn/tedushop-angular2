import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';

const roleRouter: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: RoleComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(roleRouter),
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [RoleComponent],
  providers: [DataService]
})
export class RoleModule { }
