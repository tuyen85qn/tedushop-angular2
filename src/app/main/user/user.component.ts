import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { UploadService } from '../../core/services/upload.service';
import { NotificationService } from '../../core/services/notification.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageConstants } from '../../core/common/message.constants';
import { NgForm } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
declare var moment: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('userModal') public userModal: ModalDirective;
  @ViewChild('avatar') avatar;
  public optionPickers: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };
  public allRoles: IMultiSelectOption[] = [];
  public users: any;
  public totalRow: number;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public filter: string = '';
  public entity: any = {};
  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _uploadService: UploadService) { }

  ngOnInit() {
    this.loadData();
    this.loadRoleData();
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  loadUserDetail(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        this.entity.BirthDay = moment(this.entity.BirthDay, 'MM/DD/YYYY').format('DD/MM/YYYY');
      }, error => this._dataService.handleError(error));
  }
  loadData() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.users = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      }, error => this._dataService.handleError(error));
  }
  loadRoleData() {
    this._dataService.get('/api/appRole/getlistall')
      .subscribe((response: any) => {
        for (let role of response) {
          this.allRoles.push({ id: role.Name, name: role.Description })
        }
      }, error => this._dataService.handleError(error));
  }
  showAddUser() {
    this.entity = {};
    this.userModal.show();
  }
  showEditUser(id: any) {
    this.loadUserDetail(id)
    this.userModal.show();
  }
  saveChanged(form: NgForm) {
    let fi = this.avatar.nativeElement;
    if (fi.files.length > 0) {
      this._uploadService.postWithFile('/api/upload/saveImage', null, fi.files)
        .then((imageUrl: string) => {
          this.entity.Avatar = imageUrl;
        }).then(() => {
          this.saveData(form);
        });
    }
    else {
      this.saveData(form);
    }

  }
  saveData(form: NgForm) {
    if (this.entity.Id) {
      this._dataService.put('/api/appUser/update', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
          this.userModal.hide();
          this.loadData();
        }, error => this._dataService.handleError(error));

    }
    else {
      this._dataService.post('/api/appUser/add', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
          this.userModal.hide();
          this.loadData();

        }, error => this._dataService.handleError(error));
    }
    form.resetForm();
    this.userModal.hide();
  }
  deleteUserConfirm(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteUser(id));
  }
  deleteUser(id: any) {
    this._dataService.delete('/api/appUser/delete', 'Id', id)
      .subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.userModal.hide();
        this.loadData();
      }, error => this._dataService.handleError(error));

  }
  closeForm(form: NgForm) {
    this.userModal.hide();
    form.resetForm();
  }
  selectGender(event) {
    this.entity.Gender = event.target.value;
  }
  selectDate(event) {
    this.entity.BirthDay = moment(new Date(event.start._d)).format('DD/MM/YYYY').toString();
  }

}
