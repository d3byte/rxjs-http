import { Observable } from 'rxjs';

export interface MethodsInterface {
    get: <T>(...args: any[]) => Observable<T>;
    post: <T>(...args: any[]) => Observable<T>;
    put: <T>(...args: any[]) => Observable<T>;
    patch: <T>(...args: any[]) => Observable<T>;
    delete: <T>(...args: any[]) => Observable<T>;
}
