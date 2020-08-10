import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
    ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
        return;
    }
    this.isSubmitted = true;
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      returnSecureToken: true,
    }

    if (isPlatformBrowser(this.platformId)) {
      this.authService.login(user).subscribe(res => {
        this.loginForm.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.isSubmitted = false;
      }, () => {
        this.isSubmitted = false;
      }) 
    }   
}

onReset() {
    this.isSubmitted = false;
}

}
