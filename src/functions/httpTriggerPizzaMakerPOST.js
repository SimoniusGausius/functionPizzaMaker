//geht nicht

const { app,input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'PizzaMaker',
    containerName: 'PizzaCreations',
    connection: 'CosmosDB',
    sqlQuery: "select * from c"
});

app.http('pizzaMakerTriggerPOST', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    route: 'items',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        defaultPost.pizzaName = "keine Ahnung";
        defaultPost.zutaten = "Teig, Tomatensauce, Mozarella"

        const data = request.query.post(defaultPost);

        return data;
    }
});