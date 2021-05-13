import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../../shared/services/alert.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-add',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  Users: User[];
  userForm: FormGroup;
  userAction: string;
  SortKey: string;
  SearchKey: string;

  constructor(private userService: UserService, private formbuilder: FormBuilder, private alertService: AlertService) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      vaccineName: ['', Validators.required],
      doseNo: ['', Validators.required],
      userId: ''
    });
    this.userAction = 'Add';
  }

  ngOnInit() {
    //load initial user lists
    this.refreshList();
  }


  refreshList() {

    this.userService.getUsersList(this.SearchKey, this.SortKey)
      .subscribe(response => {
        if (response.Success == true) {
          this.Users = response.Data;
        }
      });
  }

  addorUpdateUser() {
    if (this.userAction == 'Add') {
      this.addUser();
    }
    else if (this.userAction == 'Update') {
      this.updateUser();
    }
  }

  addUser() {
    const newUser = <User>{
      First_Name: this.userForm.controls['firstName'].value,
      Vaccine_Name: this.userForm.controls['vaccineName'].value,
      Dose_No: this.userForm.controls['doseNo'].value
    };

    this.userService.addUser(newUser)
      .subscribe(response => {
        console.log(response);
        if (response.Success == true) {
          //show success message and refresh the list
          this.alertService.success('User added successfully!', 'Success', 3000);

          this.refreshList();
        }
        else
          this.alertService.error(response.Message, 'Error', 3000);
      });
  }

  editUser(userID) {

    this.userService.getUser(userID)
      .subscribe(response => {
        if (response.Success == true) {
          this.userForm = this.formbuilder.group({
            firstName: [response.Data.First_Name, Validators.required],
            vaccineName: [response.Data.Vaccine_Name, Validators.required],
            doseNo: [response.Data.Dose_No, Validators.required],
            userId: response.Data.User_ID
          });

          this.userAction = 'Update';
        }
        else {
          this.alertService.error(response.Message, 'Error', 3000);
        }
      });
  }

  updateUser() {
    const updateUser = <User>{
      User_ID: this.userForm.controls['userId'].value,
      First_Name: this.userForm.controls['firstName'].value,
      Vaccine_Name: this.userForm.controls['vaccineName'].value,
      Dose_No: this.userForm.controls['doseNo'].value
    };

    this.userService.editUser(updateUser)
      .subscribe(response => {
        console.log(response);
        if (response.Success == true) {
          //show success message and refresh the list
          this.alertService.success('User updated successfully!', 'Success', 3000);

          this.refreshList();

          this.reset();
        }
        else
          this.alertService.error(response.Message, 'Error', 3000);
      });
  }

  deleteUser(userID) {
    this.userService.deleteUser(userID)
      .subscribe(response => {
        if (response.Success == true) {
          this.alertService.success('User deleted successfully!', 'Success', 3000);
          this.refreshList();
        }
        else {
          this.alertService.error(response.Message, 'Error', 3000);
        }
      });
  }

  reset() {
    this.userForm.reset();
    this.userAction = 'Add';
    this.SearchKey = null;
    this.SortKey = null;
  }

  search(searchValue: string) {
    this.SearchKey = searchValue;
    this.refreshList();
  }

  sort(sortKey: string) {
    if (sortKey == 'firstName')
      this.SortKey = 'First_Name';
    else if (sortKey == 'vaccineName')
      this.SortKey = 'Vaccine_Name';
    else if (sortKey == 'doseNo')
      this.SortKey = 'Dose_No';
    console.log(this.SortKey);
    this.refreshList();
  }
}