import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageConstants } from '../../core/common/message.constants';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  @ViewChild('roleModal') public roleModal: ModalDirective;
  public roles: any;
  public totalRow: number;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public filter: string = '';
  public entity: any = {};
  constructor(private _dataService: DataService,
    private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  loadRoleDetail(id: any) {
    this._dataService.get('/api/appRole/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
      }, error => this._dataService.handleError(error));
  }
  loadData() {
    this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.roles = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      }, error => this._dataService.handleError(error));
  }
  showAddRole() {
    this.entity = {};
    this.roleModal.show();
  }
  showEditRole(id: any) {
    this.loadRoleDetail(id)
    this.roleModal.show();
  }
  saveChanged() {
    if (this.entity.Id) {
      this._dataService.put('/api/appRole/update', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
          this.roleModal.hide();
          this.loadData();
        }, error => this._dataService.handleError(error));

    }
    else {
      this._dataService.post('/api/appRole/add', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          this.roleModal.hide();
          this.loadData();
        }, error => this._dataService.handleError(error));
    }
  }
  deleteRoleConfirm(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteRole(id));
  }
  deleteRole(id: any) {
    this._dataService.delete('/api/appRole/delete', 'Id', id)
      .subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.roleModal.hide();
        this.loadData();
      }, error => this._dataService.handleError(error));

  }

}
