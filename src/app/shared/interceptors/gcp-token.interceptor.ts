import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { switchMap } from "rxjs";
import { environment } from "../../../environments/environment";
import { BacktokenService } from "../services/backtoken.service";

export function gcpTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    if (whiteList(req)) {
        return next(req);
    }

    let newReq = req.clone()

    return inject(BacktokenService).getBackToken().pipe(
        switchMap((response: any) => {
            newReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${response.token}`,
                }
            });
            return next(newReq);
        })
    )
}

function whiteList(req: HttpRequest<unknown>) {
    const list = [
        environment.URI_SOCIAL3 + 'auth/back',
        environment.AWS_API_URL + 'log',
    ];

    return list.includes(req.url);
}