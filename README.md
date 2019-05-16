# rsvp

generic form submission with validation template tailored for my sister's bridal shower

[check it](http://www.nicolesbridalrsvp.com/)

Technologies Utilized:
- ReactJS
- NodeJS
- Express
- AJV 
- PostgresSQL
- Heroku

Client startup (no setup required):
`cd client`
`npm i`
`npm start`

Server setup:
`npm i`
cp `./config-defaults.ts` `./config.ts`
`psql CREATE DATABASE rsvp;`
install typeorm-cli globally `npm install -g ts-node`
typeorm migrations:run
`npm run dev`
