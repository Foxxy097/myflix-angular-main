import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';


import { FetchApiDataService } from '../fetch-api-data.service';


import { MatSnackBar } from '@angular/material/snack-bar';

//import for routing to different path 
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { 
    Username: '', 
    Password: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
 
    this.dialogRef.close(); // This will close the modal on success!
    console.log(result)
    localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
    this.snackBar.open('logged in successfully', 'OK', {
        duration: 2000
    });
    this.router.navigate(['movies']);
    }, (result) => {
      console.log(result)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}