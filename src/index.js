import config from './core/config';
import app from './core/App';

app.listen(config.porta, () => {
    console.log("Servidor iniciado na porta: " + config.porta);
});