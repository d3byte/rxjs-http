import { EMPTY, from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fetchPonyfill from 'fetch-ponyfill';

import { ObjectInterface } from './interfaces/object.interface';
import { ConfigurationInterface } from './interfaces/configuration.interface';

const { fetch } = fetchPonyfill();

interface RequestParams {
    url: string;
    method: RequestType;
    body?: BodyInit | ObjectInterface;
    headers?: ObjectInterface;
}

type RequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function isResponseOk(response: Response): boolean {
    return response.ok || (response.status >= 200 && response.status < 300);
}

export class HttpClient {
    constructor(public configuration: ConfigurationInterface) {}

    private getHeaders(headers: ObjectInterface = {}): ObjectInterface {
        return {
            ...(this.configuration.defaultHeaders || {}),
            ...(this.configuration.jwt ? { Authorization: `Bearer ${this.configuration.jwt}` } : {}),
            ...headers,
        };
    }

    private isBodyJson(body: BodyInit): boolean {
        return !(body instanceof Blob) && !(body instanceof FormData) && !(body instanceof URLSearchParams);
    }

    private handleFetch(request: Promise<Response>): Promise<any> {
        return request.then((response: Response) => {
            if (isResponseOk(response)) {
                return response.json();
            }
            throw response;
        });
    }

    private request<ResponseType>({ url, method, body, headers }: RequestParams): Observable<ResponseType> {
        const handledBody = this.isBodyJson(body as BodyInit) ? JSON.stringify(body) : (body as BodyInit);
        const options: RequestInit = {
            method,
            body: handledBody,
            headers: this.getHeaders(headers),
        };
        const handledUrl: string = (this.configuration.baseUrl ? `${this.configuration.baseUrl}/` : '') + url;
        return from(this.handleFetch(fetch(handledUrl, options))).pipe(
            catchError((error) => {
                if (error instanceof Error && error.name === 'AbortError') {
                    return EMPTY;
                }
                return of(error);
            }),
        );
    }

    public get<ResponseType>(url: string, headers?: ObjectInterface): Observable<ResponseType> {
        return this.request({ url, method: 'GET', headers });
    }

    public post<ResponseType>(
        url: string,
        body: BodyInit | ObjectInterface,
        headers?: ObjectInterface,
    ): Observable<ResponseType> {
        return this.request({ url, method: 'POST', body, headers });
    }

    public patch<ResponseType>(
        url: string,
        body: BodyInit | ObjectInterface,
        headers?: ObjectInterface,
    ): Observable<ResponseType> {
        return this.request({ url, method: 'PATCH', body, headers });
    }

    public put<ResponseType>(
        url: string,
        body: BodyInit | ObjectInterface,
        headers?: ObjectInterface,
    ): Observable<ResponseType> {
        return this.request({ url, method: 'PUT', body, headers });
    }

    public delete<ResponseType>(
        url: string,
        body: BodyInit | ObjectInterface,
        headers?: ObjectInterface,
    ): Observable<ResponseType> {
        return this.request({ url, method: 'DELETE', body, headers });
    }
}
