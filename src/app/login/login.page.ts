import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../_config/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    
})
export class LoginPage implements OnInit {
    form: any = {};
    formForgotPassword: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    successMessage = null;
    roles: string[] = [];
    returnUrl: string;
    isForgotPassword = false;
    resetPasswordForm: FormGroup;
    fieldTextType: boolean;
    public loginForm: FormGroup;
  email: string = "";
  password: string = "";


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

    ngOnInit() {
      
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().userRoles;
       
        }
       
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
      

      var model = {
        email: this.email,
        password : this.password
      }

      this.authService.login(model).subscribe(
            data => {
               
                this.tokenStorage.saveToken(data.token);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles;
               
                
                this.router.navigateByUrl(this.returnUrl);
            },
            err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    buildResetPasswordForm() {
        this.resetPasswordForm = this.formBuilder.group({
            email: ['', Validators.required],

        });
    }

    submitFormForgotPassword() {
        this.authService.forgotPassword(this.resetPasswordForm.value).subscribe(
            data => {
                //we should redirect to the login page
               
                this.errorMessage = null;
                this.successMessage = 'Please check your email for instructions on resetting your password';
            },
            err => {
                this.successMessage = null;
                this.errorMessage = err.error.result;
                this.isLoginFailed = true;
            }
        );
    }
    reloadPage() {
        window.location.reload();
    }
    forgotPassword() {
        this.buildResetPasswordForm();
        this.isForgotPassword = true;


    }

    cancelForgotPassword() {
        this.isForgotPassword = false;
  }

    toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
