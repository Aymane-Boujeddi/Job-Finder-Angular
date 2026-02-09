import {  HttpInterceptorFn } from "@angular/common/http";
import { environement } from "../../environements/environment.local";

export const apiInterceptor : HttpInterceptorFn = (request , next) => {
    const isApiRequest = request.url.includes('data.usajobs.gov');
    
    if(isApiRequest){
        const requestHeader = request.clone({
            setHeaders : {
                'Authorization-Key' : environement.apiKey,
                // 'User-Agent' : environement.email,
               
            }
        });

        return next(requestHeader);
    }
    return next(request);
}