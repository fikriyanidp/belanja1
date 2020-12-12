var developmentDatabase = {
    postgres: {
    host: 'ec2-52-31-233-101.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'dc1ll4ae0pof15',
    user: 'gnoovwntthccie',
    password: '39a1df666bea31efc6adcb34c0e77b96a9c6870b47f42f254030db713a970b59'
    }
    }
    
    var connectionString ="gnoovwntthccie:39a1df666bea31efc6adcb34c0e77b96a9c6870b47f42f254030db713a970b59@ec2-52-31-233-101.eu-west-1.compute.amazonaws.com:5432/dc1ll4ae0pof15?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }