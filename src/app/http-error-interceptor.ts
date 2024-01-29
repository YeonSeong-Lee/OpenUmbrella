import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      timeout(5420), // 5.42 seconds
      catchError(error => {
        if (error.name === 'TimeoutError') {
          alert(`서버의 응답이 오래걸린 관계로 요청 실패... 🥲 \n @seongyle, @susong, @joonhan에게 DM주세요! \n\n 에러메시지: ${error}`);
          throw error;
        }
        // Rethrow other errors
        alert(`🚧 !비상! 🚧 \n @seongyle, @susong, @joonhan에게 DM주세요! \n\n 에러메시지: ${error}`);
        throw error;
      }),
    );
  }
}