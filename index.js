const express = require('express');

const { PORT } = require('./config/config');
const routes = require('./routes');
const app = express();

require('./config/express')(app, express);
require('./config/mongoose')(app);
app.use(routes);

app.listen(PORT, console.log(`Listening on port http://localhost:${PORT}/ ! Now its up to you...`));