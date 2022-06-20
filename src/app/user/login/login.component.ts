import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { AuthService } from '@app-core/services/auth.service';
import { first } from 'rxjs/operators';
import { appRoutingsConfig } from '@app-core/routings';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {
    if (this._authService.currentUser) {
      this._router.navigate(['customer']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._authService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  this._router.navigate([appRoutingsConfig.customer.data.url]);
                },
                error => {
                    this.error = error.message;
                    this.loading = false;
                });
  }
}
