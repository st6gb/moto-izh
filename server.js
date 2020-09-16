const express = require('express');
const app = express();

app.use(express.static(`./dist/bikeizh-web`));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/bikeizh-web/'});
});

app.listen(process.env.PORT || 8080);
