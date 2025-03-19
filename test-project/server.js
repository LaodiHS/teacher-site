/*--------------------------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
 *-------------------------------------------------------------------------------------------------------------*/

'use strict';

const express = require('express');
const path = require("path");
// Constants
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Used for automated testing
if(process.env.REGRESSION_TESTING === 'true') { process.exit(0); }
