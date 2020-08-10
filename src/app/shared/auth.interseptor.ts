import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterseptor implements HttpInterceptor{
    constructor(
        private auth: AuthService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (isPlatformBrowser(this.platformId)) {
            if(this.auth.isAuth()) {
                req = req.clone({
                    setParams: {
                        auth: this.auth.token
                    }
                })
            }  
        }

        return next.handle(req)
        .pipe(
            catchError( error => {
                if (isPlatformBrowser(this.platformId)) {
                    if(error.status === '401') {
                        this.auth.logout();
                        this.router.navigate(['/admin', 'login'])
                    }
                    return throwError(error)
                }
            })
        )
    }

}