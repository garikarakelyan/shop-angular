import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

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
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
        return;
    }
    this.isSubmitted = true;
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.authService.login(user).subscribe(res => {
      this.loginForm.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.isSubmitted = false;
    }, () => {
      this.isSubmitted = false;
    })

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    
}

onReset() {
    this.isSubmitted = false;
}

}
