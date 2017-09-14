var mongoose = require("mongoose");
// import Counter schema
const ClientSchema = require("../models/client");

module.exports = {
  // Connect/Disconnect middleware
  connectDisconnect: (req, res, next) => {
    // Create connection using Mongo Lab URL
    // available in Webtask context
    const connection = mongoose.createConnection(
      req.webtaskContext.secrets.MONGO_URL
    );
    // Create a mongoose model using the Schema
    req.clientModel = connection.model("Client", ClientSchema);
    req.on("end", () => {
      // Disconnect when request
      // processing is completed
      mongoose.connection.close();
    });
    // Call next to move to
    // the next Express middleware
    next();
  }
};
