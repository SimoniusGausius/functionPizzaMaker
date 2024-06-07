const { app,input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'PizzaMaker',
    containerName: 'PizzaCreations',
    connection: 'CosmosDB',
    sqlQuery: "select * from c"
});

app.http('pizzaMakerTriggerGET', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    route: 'items',
    handler: async (request, context) => {

        const defaultPost = context.extraInputs.get(cosmosInput);

        return { 
            body: JSON.stringify(defaultPost),
            status: 200
        }
    }
});