# Performance

The server is not designed for performance. Not to say it performs badly but it is designed for a serverless environment. It is less relevant in a serverless environment because a new instance of the function will be spun up to handle the incoming request.

Each instance only handles a single incoming request. It does not process multiple requests concurrently with the same instance. 

Considering how providers like GCP charge in 100ms blocks optimising for performance does not make much sense. If it takes 20ms or 100ms the pricing is the same.

