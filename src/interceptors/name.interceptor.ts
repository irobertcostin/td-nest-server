import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class UsernameInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        if (request.body && request.body.full_name) {
            request.body.full_name = request.body.full_name.toLowerCase();
        } else if (request.body && request.body.city) {
            request.body.city = request.body.city.toLowerCase();
        } else if (request.body && request.body.country) {
            request.body.country = request.body.country.toLowerCase();
        } else if (request.body && request.body.address) {
            request.body.address = request.body.address.toLowerCase();
        }
        return next.handle().pipe(
            map((data) => {
                return data
            })
        )
    }
}