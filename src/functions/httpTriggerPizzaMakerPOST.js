const { app,output } = require('@azure/functions');

const cosmosOutput = output.cosmosDB({
    databaseName: 'PizzaMaker',
    containerName: 'PizzaCreations',
    connection: 'CosmosDB',
    createIfNotExists: true
});

app.http('httpTriggerPizzaMakerPOST', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraInputs: [cosmosOutput],
    route: 'items',
    handler: async (request, context) => {

        const pizzaPost = await request.json();
        data.id = (Math.random() + 1).toString(36);
        context.extraOutputs.set(cosmosOutput, pizzaPost)

        return {
            body: JSON.stringify(pizzaPost),
            status: 201
        }
    }
});