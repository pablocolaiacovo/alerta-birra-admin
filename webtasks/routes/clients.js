var mongoose = require("mongoose");
const Client = require("../models/client");

module.exports = app => {
  app.get("/clients", (req, res) => {
    req.clientModel
      .find({})
      .sort({ created_at: -1 })
      .exec((err, clients) => res.json(clients));
  });

  app.get("/clients/:id", (req, res) => {
    req.clientModel
      .findOne({ id: req.params.id })
      .exec((err, client) => res.json(client));
  });

  app.post("/clients", (req, res) => {
    const newClient = new req.clientModel(
      Object.assign({}, req.body, { created_at: Date.now() })
    );
    newClient.save((err, updatedClient) => {
      res.json(updatedClient);
    });
  });

  app.put("/clients", (req, res) => {
    const idParam = req.webtaskContext.query.id;
    req.clientModel.findOne({ _id: idParam }, (err, clientToUpdate) => {
      const updatedClient = Object.assign(clientToUpdate, req.body);
      updatedClient.save((err, client) => res.json(client));
    });
  });

  app.delete("/clients", (req, res) => {
    const idParam = req.webtaskContext.query.id;
    req.clientModel.remove({ _id: idParam }, (err, removedClient) =>
      res.json(removedClient)
    );
  });
};
