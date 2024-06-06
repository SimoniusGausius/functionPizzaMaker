const { app } = require('@azure/functions');

/*
const cosmosInput = input.cosmosDB({
    databaseName: 'databaseName',
    containerName: 'containerName',
    connection: 'CosmosDB',
    sqlQuery: "select * from c"
});
*/

app.http('pizzaMakerTrigger', {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const pizzaName = request.query.get('pizzaName') || await request.text() || 'keine Ahnung';
        const zutaten = request.query.get('zutaten') || await request.text() || 'nichts';

        return { body: `Eine Pizza ${pizzaName} mit ${zutaten}!` };
    }}
);