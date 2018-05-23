---
description: Declarative server framework for serverless
---

# Introduction

Sunny is a server framework built on top of [express](http://expressjs.com) with the philosophy of:

* Built for serverless
* Batteries included
* Declarative approach
* Configuration over convention

It is heavily inspired by [hapi](https://www.hapijs.com) and its amazing ecosystem. However, hapi is built for a traditional server environment and is difficult to port to a  serverless environment.

### Built for serverless

Sunny is built for serverless. It is built on top of express to take advantage of the wide support from the express ecosystem. And the support from major vendors like GCP, AWS, Azure.

If you're happy using express then you can stop reading here. Go outside and enjoy the sunshine. 

### Batteries included

Sunny includes many common components of a server, CORS, body parsers, authentication, validation. They are built around a common lifecycle and common patterns. 

### Declarative approach

Sunny is mostly declarative. Most operations in Sunny is achieved by declaring what the server should do not how to do it. 



