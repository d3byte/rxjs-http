import { HttpClient } from '../client';
import { ConfigurationInterface } from '../interfaces/configuration.interface';
import { http } from '../http';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

const BASE_URL: string = `http://localhost:${process.env.PORT || 8080}`;

interface TestResponse {
    test: 'data';
}

describe('Http Client', () => {
    describe('init', () => {
        test('Http Client inits with full configuration', () => {
            const configuration: ConfigurationInterface = {
                jwt: '2yuhijdakwaodiuhwygadrfatwygdbhujnakwdaw-==dawdauid,..waduhuawidkawd',
                defaultHeaders: {
                    'My-X-Header': 'Value',
                },
                baseUrl: BASE_URL,
            };

            const httpClient = http(configuration);

            expect(httpClient).toBeInstanceOf(HttpClient);
            expect(httpClient.configuration.jwt).toBeDefined();
            expect(httpClient.configuration.baseUrl).toBeDefined();
            expect(httpClient.configuration.defaultHeaders).toBeDefined();
        });

        test('Http Client inits with jwt and base url', () => {
            const configuration: ConfigurationInterface = {
                jwt: '2yuhijdakwaodiuhwygadrfatwygdbhujnakwdaw-==dawdauid,..waduhuawidkawd',
                baseUrl: BASE_URL,
            };

            const httpClient = http(configuration);

            expect(httpClient).toBeInstanceOf(HttpClient);
            expect(httpClient.configuration.jwt).toBeDefined();
            expect(httpClient.configuration.baseUrl).toBeDefined();
            expect(httpClient.configuration.defaultHeaders).toBeUndefined();
        });

        test('Http Client inits with default headers and base url', () => {
            const configuration: ConfigurationInterface = {
                defaultHeaders: {
                    'My-X-Header': 'Value',
                },
                baseUrl: BASE_URL,
            };

            const httpClient = http(configuration);

            expect(httpClient).toBeInstanceOf(HttpClient);
            expect(httpClient.configuration.jwt).toBeUndefined();
            expect(httpClient.configuration.baseUrl).toBeDefined();
            expect(httpClient.configuration.defaultHeaders).toBeDefined();
        });

        test('Http Client inits with base url', () => {
            const configuration: ConfigurationInterface = {
                baseUrl: BASE_URL,
            };

            const httpClient = http(configuration);

            expect(httpClient).toBeInstanceOf(HttpClient);
            expect(httpClient.configuration.jwt).toBeUndefined();
            expect(httpClient.configuration.baseUrl).toBeDefined();
            expect(httpClient.configuration.defaultHeaders).toBeUndefined();
        });
    });

    describe('HTTP methods', () => {
        const configuration: ConfigurationInterface = {
            baseUrl: BASE_URL,
        };

        const httpClient = http(configuration);

        test('Declarative request', (done) => {
            const get$ = httpClient
                .declarativeRequest<TestResponse>('test', { method: 'get' })
                .pipe(
                    tap((response: TestResponse) => {
                        expect(response.test).toBeDefined();
                        expect(response.test).toBe('data');
                    }),
                );

            const post$ = httpClient
                .declarativeRequest<TestResponse>('test', { method: 'post', body: { anyBody: 'is Cool' } })
                .pipe(
                    tap((response: TestResponse) => {
                        expect(response.test).toBeDefined();
                        expect(response.test).toBe('data');
                    }),
                );

            const put$ = httpClient
                .declarativeRequest<TestResponse>('test', { method: 'put', body: { anyBody: 'is Cool' } })
                .pipe(
                    tap((response: TestResponse) => {
                        expect(response.test).toBeDefined();
                        expect(response.test).toBe('data');
                    }),
                );

            const patch$ = httpClient
                .declarativeRequest<TestResponse>('test', { method: 'patch', body: { anyBody: 'is Cool' } })
                .pipe(
                    tap((response: TestResponse) => {
                        expect(response.test).toBeDefined();
                        expect(response.test).toBe('data');
                    }),
                );

            const delete$ = httpClient
                .declarativeRequest<TestResponse>('test', { method: 'delete', body: { anyBody: 'is Cool' } })
                .pipe(
                    tap((response: TestResponse) => {
                        expect(response.test).toBeDefined();
                        expect(response.test).toBe('data');
                    }),
                );

            forkJoin(get$, post$, put$, patch$, delete$).subscribe(() => done());
        });

        test('GET', (done) => {
            httpClient.get<TestResponse>('test').subscribe((response: TestResponse) => {
                expect(response.test).toBeDefined();
                expect(response.test).toBe('data');
                done();
            });
        });

        test('POST', (done) => {
            httpClient
                .post<TestResponse>('test', { anyBody: 'is Cool' })
                .subscribe((response: TestResponse) => {
                    expect(response.test).toBeDefined();
                    expect(response.test).toBe('data');
                    done();
                });
        });

        test('PUT', (done) => {
            httpClient
                .put<TestResponse>('test', { anyBody: 'is Cool' })
                .subscribe((response: TestResponse) => {
                    expect(response.test).toBeDefined();
                    expect(response.test).toBe('data');
                    done();
                });
        });

        test('PATCH', (done) => {
            httpClient
                .patch<TestResponse>('test', { anyBody: 'is Cool' })
                .subscribe((response: TestResponse) => {
                    expect(response.test).toBeDefined();
                    expect(response.test).toBe('data');
                    done();
                });
        });

        test('DELETE', (done) => {
            httpClient
                .delete<TestResponse>('test', { anyBody: 'is Cool' })
                .subscribe((response: TestResponse) => {
                    expect(response.test).toBeDefined();
                    expect(response.test).toBe('data');
                    done();
                });
        });
    });
});
