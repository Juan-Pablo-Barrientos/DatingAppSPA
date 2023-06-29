import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { User } from "../../shared/models/User";
import { Observable, catchError, of } from "rxjs";
import { UserService } from "../../auth/services/user.service";
import { AlertifyService } from "../../shared/services/alertify.service";



export const memberDetailResolver: ResolveFn<User|null> = (route: ActivatedRouteSnapshot) => {
      return inject(UserService).getUser(route.params['id']).pipe(
        catchError(error=>{
          inject(AlertifyService).error('Problem retrieving data');
          inject(Router).navigate(['/members']);
          return of(null)
        })
      );
    };
