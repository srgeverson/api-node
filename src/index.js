import config from './core/config';
import app from './core/app';

app.listen(config.api.porta, () => {
    console.log(`Servidor iniciado em: ${config.api.url}`);
});