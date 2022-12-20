# unit-testing

## Using jest 
https://jestjs.io/docs/getting-started

```ruby
npm install --save-dev jest
```
```ruby
{
  "scripts": {
    "test": "jest"
  }
}
```

* Mock request response 
```ruby
  request = {
      body: {}
  }

  response = {
    send: jest.fn(function (x) {
      this.message = x
      return x
    }),
    status: jest.fn(function (s) {
      this.status = s;
      return this;
    })
  };
```