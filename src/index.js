//import fastify & mongoose
const fastify = require('fastify');
const mongoose = require('mongoose');

//initialized Fastify App
const app = fastify();
const noteRoutes = require('./routes/noteRoutes');
const contentRangeHook = require('./hooks/contentRangeHook');

//connected fastify to mongoose
try {
  mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.tivi4.mongodb.net/fastify-api?retryWrites=true&w=majority'
  );
} catch (e) {
  console.error(e);
}
app.addHook('preHandler', contentRangeHook);
noteRoutes(app);
app.register(require('fastify-cors'), {
  // put your options here
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
});

//handle root route
app.get('/', (request, reply) => {
  try {
    reply.send('Hello world!');
  } catch (e) {
    console.error(e);
  }
});

//set application listening on port 5000 of localhost
app.listen(5000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});
