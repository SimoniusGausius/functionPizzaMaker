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

app.http('pizzaMakerTriggerDELETE', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        data = request.query.get(defaultPost)

        return data;
    }
});
