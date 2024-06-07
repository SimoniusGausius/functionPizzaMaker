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

app.http('pizzaMakerTriggerPOST', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        defaultPost.pizzaName = "keine Ahnung";
        defaultPost.zutaten = "Teig, Tomatensauce, Mozarella"

        const data = request.query.post(defaultPost);

        return data;
    }
});