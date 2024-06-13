const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.DBENDPOINT
const key = process.env.DBKEY

const client = new CosmosClient({ endpoint, key });

const databaseId = "PizzaMaker";
const containerId = "PizzaCreations";

app.http("httpTriggerPizzaMakerDELETE", {
    methods: ["DELETE"],
    authLevel: "anonymous",
    route: "items/{id}",
    handler: async (request, context) => {
      const database = client.database(databaseId);
      const container = database.container(containerId);
  
      const itemId = request.params.id;
      
      const { resource: deletedItem } = await container.item(itemId, itemId).delete();
      return {
        body: JSON.stringify(deletedItem),
        status: 200,
      };
  },
});