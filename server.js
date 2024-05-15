const express = require('express');
const routes = require('./routes/html');
const api = require('./routes/api');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(routes);
app.use(api);

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}!`);
});