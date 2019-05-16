# [rsvp](http://www.nicolesbridalrsvp.com/)

generic form submission with validation template tailored for my sister's bridal shower

admittedly basic structural setup to start

Technologies Utilized:
- ReactJS
- NodeJS
- Express
- AJV 
- PostgresSQL
- Heroku

### Client setup:
```
    cd client
    npm i
    npm start
```

### Server setup:
`npm i`  
` cp ./config-defaults.ts ./config.ts`  
`psql CREATE DATABASE rsvp;`  
install [typeorm-cli](https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md) globally: `npm install -g ts-node`  
to initalize db: `typeorm migrations:run`  
compile typescript: `tsc`  
to start server: `npm run dev`

### TODO:
- separate areas of concern into files (ie. validation, types, routes)
- implement registration form and routing on FE
- config on FE for web service base url
- env var script for prod simulation
- SSL cert
