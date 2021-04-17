# currency-api

NodeJS API for currency conversion.

## Endpoints

### GET /conversions/currencies
Returns a list of available currencies.

Response:

200 (OK)

```json
["AED", "AFN", "ALL"]
```
### POST /conversions
Converts the provided value to the desired currency.

Request:
```json
{
  "from": "EUR",
  "to": "YEN",
  "value": 1
}
```

Response:
200 (OK)

```json
{
  "convertedValue": 121.07
}
```

500 (Internal Server Error)

400 (Bad Request)

## Development setup

`npm install`: installs project dependencies

`npm run lint`: runs linting rules

`npm test`: runs tests

`npm run start`: runs server locally

## Running the API in a Docker container

`docker build . -t api`

`docker run -d -p 8001:80 api`

The API will be accessible at http://localhost:8001

To stop the container:
`docker stop api`
