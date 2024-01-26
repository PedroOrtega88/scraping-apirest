
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const PORT = 3000;

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';

//  noticia por índice
app.get('/noticias/:index', (req, res) => {
    const index = req.params.index;
    leerDatos();
    const noticia = noticias[index];
    res.json(noticia);
  });

// Crear nueva noticia
app.post('/noticias', (req, res) => {
    const nuevaNoticia = req.body;
    leerDatos();
    noticias.push(nuevaNoticia);
    guardarDatos();
    res.json({ message: 'Noticia creada exitosamente.' });
  });




// Función para realizar el scraping de una página
function scrap(pageUrl) {
    return app.get(pageUrl)
        .then(response => {
            const $ = cheerio.load(response.text);

            // Recopilar datos 
            const pageTitle = $('h1').text();
            const images = $('img').map((index, element) => $(element).attr('src')).get();
            const paragraphs = $('p').map((index, element) => $(element).text()).get();

            return {
                title: pageTitle,
                images,
                paragraphs,
            };
        })
        .catch(error => {
            console.error('Error de servidor:', error);
            return null;
        });
}

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});