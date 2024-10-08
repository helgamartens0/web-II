import express from 'express';
import bodyParser from 'body-parser';
import translate from 'node-google-translate-skidz';
import { franc } from 'franc';
import fetch from 'node-fetch'; 

const app = express();
const port = 3000;

const URL_DPTOS = "https://collectionapi.metmuseum.org/public/collection/v1/departments";

app.use(express.static("public"));
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.post("/traducir", async(req, res) => {
    const { titulo, dinastia, cultura } = req.body;
    const traducciones = {};

    try {

        const tituloTraducido = await translate({ text: titulo, source: 'en', target: 'es' });
        const dinastiaTraducida = await translate({ text: dinastia, source: 'en', target: 'es' });
        const culturaTraducida = await translate({ text: cultura, source: 'en', target: 'es' });


        traducciones.titulo = tituloTraducido.translation;
        traducciones.dinastia = dinastiaTraducida.translation;
        traducciones.cultura = culturaTraducida.translation;

        res.json(traducciones);
    } catch (error) {
        console.error('Error al traducir:', error);
        res.status(500).json({ error: 'Error al traducir' });
    }
});