//geht nicht

const { app } = require('@azure/functions');

const defaultPost = {
    pizzaName: "",
    zutaten: "",
    rating: 0
}

const cosmosInput = input.cosmosDB({
    databaseName: 'PizzaMaker',
    containerName: 'PizzaCreations',
    connection: 'CosmosDB',
    sqlQuery: "select * from c"
});

app.http('pizzaMakerTriggerDELETE', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    route: 'items',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const data = request.query.get(defaultPost)

        return {
            body: JSON.stringify(data),
            status: 200
        };
    }
});
