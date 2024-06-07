const { app } = require('@azure/functions');

const defaultPost = {
    id: 0,
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

app.http('pizzaMakerTriggerGET', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        defaultPost.id = request.query.get('id') || await request.text() || 0;
        defaultPost.pizzaName = request.query.get('pizzaName') || await request.text() || 'keine Ahnung';
        defaultPost.zutaten = request.query.get('zutaten') || await request.text() || 'nichts';
        defaultPost.rating = request.query.get('rating') || await request.text() || 0;

        return { body: `Eine Pizza ${defaultPost.pizzaName} mit ${defaultPost.zutaten}! Bewertung: ${defaultPost.rating} Sterne` };
    }
});