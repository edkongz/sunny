---
description: The server in serverless
---

# Sunny Server

## Getting Started

### Requirements

* node 6+

### Installation

```text
npm install @sunny-server/core
```

### Hello world

Create a file called `index.js`

```javascript
module.exports = {
    register: (server, options) => {
        server.route({
            method: "GET",
            path: "/",
            handler: (request, reply) => {
                reply("Everything is sunny!");
            }
        });
    }
}
```

To start the server

```text
npx sunny start --plugins=index.js
```

Goto [localhost:3000](http://localhost:300) and everything should be sunny!



