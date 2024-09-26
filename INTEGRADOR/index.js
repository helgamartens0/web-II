import express from 'express';
import bodyParser from 'body-parser';
import translate from 'node-google-translate-skidz';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.post("/traducir", async(req, res) => {
    const { titulo, dinastia, cultura } = req.body;
    const traducciones = {};

    try {
        // Traducciones para cada campo
        const tituloTraducido = await new Promise((resolve, reject) => {
            translate({
                text: titulo,
                source: 'en',
                target: 'es'
            }, (err, result) => {
                if (err) return reject(err);
                resolve(result.translation); // Asegurarse de usar .translation
            });
        });

        const dinastiaTraducida = await new Promise((resolve, reject) => {
            translate({
                text: dinastia,
                source: 'en',
                target: 'es'
            }, (err, result) => {
                if (err) return reject(err);
                resolve(result.translation);
            });
        });

        const culturaTraducida = await new Promise((resolve, reject) => {
            translate({
                text: cultura,
                source: 'en',
                target: 'es'
            }, (err, result) => {
                if (err) return reject(err);
                resolve(result.translation);
            });
        });

        // Asignar traducciones al objeto de respuesta
        traducciones.titulo = tituloTraducido;
        traducciones.dinastia = dinastiaTraducida;
        traducciones.cultura = culturaTraducida;

        // Enviar respuesta
        res.json(traducciones);

    } catch (error) {
        console.error('Error al traducir:', error);
        res.status(500).json({ error: 'Error al traducir' });
    }
});