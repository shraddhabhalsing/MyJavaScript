# currency-website
React website for currency conversion.

## Development setup

`npm install`: installs project dependencies

`npm run lint`: runs linting rules

`npm test`: runs tests

`npm run start`: starts up the development server

`npm run build`: builds the production-ready files in the 'public' folder

## Running the website in a Docker container

`docker build . -t website`

`docker run -p 8000:80 website`

The website will be accessible at http://localhost:8000

To stop the container:
`docker stop website`
