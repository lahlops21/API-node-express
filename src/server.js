const express = require('express');
const usuariosRoutes = require('./routes/usuarios.routes');
const healthRoutes = require('./routes/health.routes');
const logMiddleware = require('./middlewares/log.middleware');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const errorHandlerMiddleware = require('./middlewares/errorHandler.middleware');
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(logMiddleware);
app.use('/health', healthRoutes);
app.use('/usuarios', usuariosRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
 console.log(
    `Servidor executando em http://localhost:${PORT}`
 );
});