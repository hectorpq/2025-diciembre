// token.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
 // const token = localStorage.getItem('access_token');
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2JpemVuMTIzNDU2Nzg5NCIsImlkIjoxNiwiaWF0IjoxNzUwODcyMDE5LCJleHAiOjE3NTA4NzU2MTl9.jYURDvPaRjmlOdtztbJHnttdmjpENE0xDSLdnj9AXqk"

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
