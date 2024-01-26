const express = require('express');//requiero librerias
const app = express();//requiero librerias
const axios = require('axios');//requiero librerias
const cheerio = require('cheerio');//requiero librerias
const fs = require('fs');//requiero librerias

const url = 'https://elpais.com/ultimas-noticias/';//Defino url a escrapear -->URL secundaria
const principalURL = 'https://elpais.com';//Defino url a escrapear -->URL principal

app.get('/', async (req, res) => { //Establezco la pagina inicial con asincronia
  try {
    const response = await axios.get(url); //creo asincronia, requiriendo axios y anexandome a url
    const html = response.data;  //creo una variable html que es igual a la respuesta del scrapping
    const $ = cheerio.load(html);//creo una constante dolar =cheerio porque me permite modificar el DOM

console.log(html); //Imprimo todo el html del url escrapeado

    const links = []; //creo una constante vacía = enlace
    $('article class="c c-d c--m "> ').each((index, element) => { //cheerio clase articulo  enlace 
      const link = $(element).attr('href'); //lo definimos por su attributo href
      links.push(link); //subo cada enlace al ar
    });
  const imagenes= [];// creo una constante vacia = imagenes
 $('img').each((index, element) => {
    const imagen = $(element).attr('src');
   imagenes.push(imagen);
  });
  const descripciones = [];
 $('.articulo a').each((index, element) => {
   const descripcion = $(element).attr('href');
   descripciones.push(descripcion);
    });

   const titulo= [];
    $('.articulo a').each((index, element) => {
      const enlace = $(element).attr('href');
      enlaces.push(enlace);
  });
    console.log(enlaces);





   // console.log(links);
    const noticias = [];

    for (const link of links) {
      const innerURL = `${principalURL}${link}`;
      const response = await axios.get(innerURL);
      const innerPage = response.data;
      const $ = cheerio.load(innerPage);

      const noticia = {
        titulo: $('h1').text(),
        imagen: $('.foto-principal img').attr('src'),
        descripcion: $('.articulo p').text(),
        enlace: innerURL,
      };

      noticias.push(noticia);
    }

    
    res.send(`
    <h2>Enlaces</h2>    
    <ul>${links.map(link=> `<li><a href="${url}${link}">${link}</a></li>`).join(``)}
    <ul>${imagenes.map(imagen=> `<li><a href="${url}${imagen}">${imagen}</a></li>`).join(``)}
    <ul>${descripciones.map(descripcion=> `<li><a href="${url}${descripcion}">${descripcion}</a></li>`).join(``)}
    <ul>${enlaces.map(enlace=> `<li><a href="${url}${enlace}">${enlace}</a></li>`).join(``)} 

       `);
    
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log('Express está escuchando en el puerto http://localhost:3000');
});
