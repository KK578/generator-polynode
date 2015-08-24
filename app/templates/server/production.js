var script = require('./server.js');
var server = script('production');

var port = process.env.PORT || 5000;
server.set('port', port);

server.listen(port, function () {
    console.log('Server listening on port ' + port);
});
