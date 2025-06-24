// token.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  //const token = localStorage.getItem('access_token');
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2JpemVuMTIzNDU2Nzg5IiwiaWQiOjE1LCJpYXQiOjE3NTA3MjIzODcsImV4cCI6MTc1MDcyNTk4N30.o1z6_oHm44HAhriXJ_-3zrRYyt_o8F2eP9yNbk9o3j8"

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
