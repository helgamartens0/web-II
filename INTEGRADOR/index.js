import express from 'express';
import bodyParser from 'body-parser';
import translate from 'node-google-translate-skidz';
import { franc } from 'franc';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/traducir", async(req, res) => {
    const { titulo, dinastia, cultura } = req.body; // Esperar un objeto con estos campos
    const traducciones = {};

    try {
        const textsToTranslate = { titulo, dinastia, cultura };
        const promises = Object.keys(textsToTranslate).map(async(key) => {
            const texto = textsToTranslate[key];
            const sourceLang = franc(texto); // Detectar el idioma
            const targetLang = 'es'; // Idioma de destino

            const result = await translate({
                text: texto,
                source: sourceLang,
                target: targetLang
            });
            traducciones[key] = result.translation;
        });

        await Promise.all(promises);
        res.json(traducciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al traducir' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});