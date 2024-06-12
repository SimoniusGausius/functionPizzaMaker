const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://pizzamaker.documents.azure.com:443/";
const key = "vVaKKGYBYesw5L3yZrqw2Zr8ZRfzeVoH9MGVnkOGaXGGI8Qd5f5sIzyHeigW28QQA6ax2b6wuvTVACDbmzXEAg==";

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
  
      const { resource: deletedItem } = await container.item(itemId).delete();
      // Falls die obere Zeile nicht funktioniert, bitte die untenstehende kommentierte Zeile brauchen
      // const { resource: deletedItem } = await container.item(itemId, itemId).delete();
      return {
        body: JSON.stringify(deletedItem),
        status: 200,
      };
  },
});