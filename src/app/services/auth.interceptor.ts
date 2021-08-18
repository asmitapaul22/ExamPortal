import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>,
          next: HttpHandler): Observable<HttpEvent<any>> {

            //add the jwt token (local storage) request

        throw new Error('Method not implemented.');
    }

}