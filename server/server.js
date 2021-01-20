const path = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT || 6060;

const publicPath = path.join(__dirname, '..',  'build')
console.log("PUBLIPATH", publicPath)
app.use(express.static(publicPath));

app.get('/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
	console.log("server is listening to port", port)
})