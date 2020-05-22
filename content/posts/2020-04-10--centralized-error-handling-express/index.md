---
title: Centralized error handling in Express applications.
subTitle: Custom error handler to handle the exceptions and way to hook it into express applciation 
postDescription: Handling exceptions in an express application, responding back with standard error response.
category: node
---

This post explains a way to centralize all the error handling for [express](https://expressjs.com/) application. 

_**Note: All my examples are in typescript and there are million other ways to achieve similar result, this is just my way of doing things.**_

If you are looking to start a new application in express, go over to the express site, to use [express-generator](https://expressjs.com/en/starter/generator.html) to create an application. 

## Error handling


### Custom error handler
Create your own ErrorHandler class (`error_handler.ts`), this will extend the node's [Error](https://nodejs.org/api/errors.html#errors_class_error) class.

```typescript
//error_handler.ts
export class AppError extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
```

Now in your application you can invoke this custom error handler by calling,

```typescript
new AppError(404, 'Unable to find the resource');
```

### Wiring error interceptor into express application

Once you start throwing exceptions within your application, the next step is to convert those errors into a meaningful response. Express app provides a way to hook up a custom error 
handler into your application. A middleware that takes in 4 parameters is your way to add your custom error handler.

I'm going to add the custom error handler function in the same `error_handler.ts` class and export. This generic function will decode the thrown error, construct the response and pass it over.

```typescript
//error_handler.ts
export const customErrorHandler = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({error: {message}});
};
```

```typescript
import express from 'express';
import customErrorHandler from 'error_handler';
const app = express();

// Other middlewares, routes... 

// Adding your custom error handler.
app.use((err, req, res, next) => {
  customErrorHandler(err, res);
});
```

### Dealing with asynchronous routes

### Dealing with unknown errors


