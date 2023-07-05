import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { User } from "../../shared/models/User";
import { Observable, catchError, of } from "rxjs";
import { UserService } from "../../auth/services/user.service";
import { AlertifyService } from "../../shared/services/alertify.service";
import { AuthService } from "../../auth/services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";



export const memberEditResolver: ResolveFn<User|null> = (route: ActivatedRouteSnapshot) => {
      let nameId:number = inject(JwtHelperService).decodeToken(inject(AuthService).savedToken).nameid;
      return inject(UserService).getUser(nameId).pipe(
        catchError(error=>{
          inject(AlertifyService).error('Problem retrieving data');
          inject(Router).navigate(['/members']);
          return of(null)
        })
      );
    };
