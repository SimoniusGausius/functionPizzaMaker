const { app,input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'PizzaMaker',
    containerName: 'PizzaCreations',
    connection: 'CosmosDB',
    sqlQuery: "select * from c"
});

app.http('httpTriggerPizzaMakerGET', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    route: 'items',
    handler: async (request, context) => {

        const pizzaPost = context.extraInputs.get(cosmosInput);

        return { 
            body: JSON.stringify(pizzaPost),
            status: 200
        }
    }
});