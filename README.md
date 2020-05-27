# rxjs-http

[![Build Status](https://travis-ci.com/d3byte/rxjs-http.svg?branch=master)](https://travis-ci.com/d3byte/rxjs-http)

HTTP client based on observables.

Compatible with both Javascript and Typescript.

### Table of Content

* [Example](#example)
* [Available methods](#available-methods)
* [Configuration](#configuration)
* [Interfaces](#interfaces)
    * [ConfigurationInterface](#configurationinterface)
    * [ObjectInterface](#objectinterface)

### Example 

```javascript
import { http } from '@d3byte/rxjs-http';

const configuration = {
    baseUrl: 'http://localhost:8080',
};

const httpClient = http(configuration);

httpClient
    .post(
        'login', 
        { username: 'user', password: 'pass' },
        { MyCustomHeader: 'Value' },
    )
    .subscribe(user => {
        // Do something with data
    });
```

### Available methods

All methods you would probably need are available in the package. You can use all of those:
* GET
* POST
* PUT
* PATCH
* DELETE

### Configuration

The package supports configuring clients and keeping multiple instances of clients at the same time.

To configure a client, you have to pass a [configuration object](#configuration-interface) to `http` function.

### Interfaces

#### ConfigurationInterface
This interface represents objects for configuring HTTP Client.

```javascript
interface ConfigurationInterface {
    jwt?: string;
    baseUrl?: string;
    defaultHeaders?: ObjectInterface;
}
```

Properties:
* <b>jwt</b> <i>[optional]</i> – property where you can store jwt token for communication with api. Client will automatically insert it into `Authorization` header with `Bearer`.
* <b>baseUrl</b> <i>[optional]</i> – URL to API. For example, `http://localhost:8080`. Pay attention that there should not be a a slash (`/`) at the end of the url. If no baseUrl passed, you will have to manually set the entire url in method calls.
* <b>defaultHeaders</b> <i>[optional]</i> – an object with pairs of keys and strings. Here you can pass any default headers you want. Client will insert them into requests.

#### ObjectInterface

A simple representation of object with dynamic keys and values. It suits for any object you would ever pass.

### Examples of all available methods

#### GET

```javascript
httpClient
    .get(
        'user', 
        { MyCustomHeader: 'Value' },
    )
    .subscribe(user => {
        // Do something with data
    });
```

#### POST

```javascript
httpClient
    .post(
        'login', 
        { username: 'user', password: 'pass' },
        { MyCustomHeader: 'Value' },
    )
    .subscribe(user => {
        // Do something with data
    });
```

#### PUT

```javascript
httpClient
    .put(
        'books', 
        { title: 'Fav Book' },
        { MyCustomHeader: 'Value' },
    )
    .subscribe(data => {
        // Do something with data
    });
```

#### PATCH

```javascript
httpClient
    .patch(
        'books', 
        { title: 'Fav Book' },
        { MyCustomHeader: 'Value' },
    )
    .subscribe(data => {
        // Do something with data
    });
```

#### DELETE

```javascript
httpClient
    .delete(
        'books', 
        { title: 'Fav Book' },
        { MyCustomHeader: 'Value' },
    )
    .subscribe(data => {
        // Do something with data
    });
```

