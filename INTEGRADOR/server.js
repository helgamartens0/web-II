const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Definición del endpoint
app.post('/traducir-departamento', (req, res) => {
    const { departamento } = req.body;

    // Simulación de traducción
    const traducciones = {
        "American Decorative Arts": "Artes Decorativas Americanas",
        "Ancient Near Eastern Art": "Arte del Antiguo Cercano Oriente",
        // Agrega más traducciones según sea necesario
    };

    if (traducciones[departamento]) {
        res.json({ traduccion: traducciones[departamento] });
    } else {
        res.status(404).json({ error: 'Departamento no encontrado' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
