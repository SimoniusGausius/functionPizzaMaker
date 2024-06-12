const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");

const endpoint = "[YOUR ENDPOINT]";
const key =
  "[YOUR KEY]";

const client = new CosmosClient({ endpoint, key });

const databaseId = "PizzaMaker";
const containerId = "PizzaCreations";

app.http("httpTriggerPizzaMakerPOST", {
    methods: ["DELETE"],
    authLevel: "anonymous",
    route: "items/{id}",
    handler: async (request, context) => {
      const database = client.database(databaseId);
      const container = database.container(containerId);
  
      const itemId = request.params.id;
  
      const { resource: deletedItem } = await container.item(itemId).delete();
      // Falls die obere Zeile nicht funktioniert, bitte die untenstehende kommentierte Zeile brauchen
      // const { resource: deletedItem } = await container.item(itemId, itemId).delete();
      return {
        body: JSON.stringify(deletedItem),
        status: 200,
      };
    },
  });