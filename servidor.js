/*Servidor  que permite insertar noticias y listarlas, se puede acceder a traves del puerto 8080
http://localhos:8080   o por ejemplo http://127.0.0.2:8080 desde el navegador, utiliza los modulos express y fs
En la pagina index se mostrara un cuadro para insertar la noticia,y en la pagina listados aparecera
una lista de todas las noticias, esta pagina es creada atomaticamente con la aplicacion
GET/listado nos permite acceder al listado de noticias
POST/listado Nos permite crear una nueva noticia
GET/listado/identificador Nos permite acceder al detalle de la noticia
PUT/listado/identificador Nos permite editar la notiica, sustituyendo la totalidad de la información anterior por la nueva.
DELETE/listado/identificador Nos permite eliminar la noticia con el identificador 
*/

var express = require('express'); //Modulo express
var aplicacion = express(); //crea una instancia de express en la variable aplicacion
aplicacion.set('port', (process.env.PORT || 8080))
var fs = require('fs'); //este modulo permite usar ficheros
var index = fs.readFileSync('index.html', 'utf8');


var listado  = new Array; // array que almacenara todas las noticias


//variable que almacena el codigo html que mostrara la pagina
var string = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style type="text/css"> body {background-color: #FFC;}</style></head><body align="center">';
	//muestra pagina index, donde aparece recuadro para añadir noticia
aplicacion.get('/', function (req, res) {
  console.log('Respuesta recibida'); //mensaje que aparece en la terminal
  res.send(index); // aparecera la pagina index.html en el navegador
});
//genera pagina listado en la que aparece listado de todas las noticias
aplicacion.get('/listado/', function (req, res) {
  console.log('Respuesta recibida');
  var data = string + '<h1 style="color:#CDB369"> Listado de noticias</h1>';

  for (i = (listado.length-1) ; i> 0 ; i=i-2) { //recorre el array de noticias y lo guarda en un string
    data = data + '<p align="left" style="color:#8F4518;margin-left:150px;"><b>' +listado[i-1]+ '</b><br> ' + listado[i] + '</p>';
  }
  data = data + '<a style="color:#8F4518" href="/"> Volver a insertar noticia. </a></body></html>';

  fs.writeFileSync('listado.html', data); //Creo un documento listado.html y lo rellena con el string para cargarlo en el navegador
  var trabajoHTML = fs.readFileSync('listado.html', 'utf8');
  res.send(trabajoHTML); //Envio el documento html
});

aplicacion.get('/node/listado/', function (req, res) {
  console.log('Respuesta recibida');
  var data = '';
  for (i = (listado.length-1) ; i> 0 ; i=i-2) { //recorre el array de noticias y lo guarda en un string
    data = data + listado[i-1]+ '\n' + listado[i] + '\n\n';
  }
  res.send(data);
});
//permite insertar la noticia con un titulo y un contenido
aplicacion.post('/post/:titulo/:contenido/', function (req, res) {

  listado.push(req.params.titulo, req.params.contenido);
  res.send('La noticia ha sido publicada satisfactoriamente');
  console.log('La noticia ha sido publicada satisfactoriamente');
});
/*aplicacion.delete('/delete/:titulo/', function (req, res) {

  listado.slice(0);
  res.send('La noticia ha sido eliminada satisfactoriamente');
  console.log('La noticia ha sido eliminada satisfactoriamente');
});*/

aplicacion.listen(aplicacion.get('port'), function() {
  console.log("Servidor funcionando http:\\localhost:" + aplicacion.get('port'))
});

