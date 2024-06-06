const { app } = require('@azure/functions');

const defaultPost = {
    pizzaName: "",
    zutaten: "",
    rating: 0
}

/*
const cosmosInput = input.cosmosDB({
    databaseName: 'databaseName',
    containerName: 'containerName',
    connection: 'CosmosDB',
    sqlQuery: "select * from c"
});
*/

app.http('pizzaMakerTriggerGET', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        defaultPost.pizzaName = request.query.get('pizzaName') || await request.text() || 'keine Ahnung';
        defaultPost.zutaten = request.query.get('zutaten') || await request.text() || 'nichts';

        return { body: `Eine Pizza ${defaultPost.pizzaName} mit ${defaultPost.zutaten}! Bewertung: ${defaultPost.rating} Sterne` };
    }
});