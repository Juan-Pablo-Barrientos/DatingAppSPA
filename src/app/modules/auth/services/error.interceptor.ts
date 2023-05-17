import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ObservableInput, catchError, throwError } from "rxjs";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
          if (error instanceof HttpErrorResponse){
              if(error.status===401){
                return throwError(error.statusText);
              }
              const applicationError = error.headers.get('Application-Error');
              if(applicationError){
                console.error(applicationError);
                return throwError(() => new Error(applicationError));
              }
              const serverError = error.error;
              let modelStateErrors='';
              if(serverError.errors && typeof serverError === 'object'){
                for (const key in serverError.errors){
                  if(serverError.errors[key]){
                    modelStateErrors += serverError.errors[key] + '\n';
                  }
                }
              }
              return throwError(() => new Error(modelStateErrors || serverError || 'Server Error'));
            }
            return throwError(() => new Error('Server Error'));
          }
        )
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi:true
}
