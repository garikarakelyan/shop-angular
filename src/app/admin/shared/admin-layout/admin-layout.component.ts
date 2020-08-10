import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public isBrowser: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
    ) { }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  logout(event: any) {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      this.authService.logout();
      this.router.navigate(['/admin', 'login']);
    }
  }

}
