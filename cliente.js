/*Se trata de un cliente node a traves del cual se pueden realizar dos acciones a traves de la consola o teminal,
 una es insertar una nueva noticia y la otra es listar todas las noticias previamente insertadas. 
 1º para insertar noticia-->  node cliente post titulo contenido
 2º para listar noticias -->  node cliente get
 
 donde la segunda palabra titulo es el argumento 2 y corresponde al titular de la noticia.
 y la tercera palabra o tercer argumento contenido es el cuerpo de la noticia.
 Al listar las noticias, las primeras en aparecer de la lista son las ultimas en insertar.
*/
var rest = require('restler'); // usa modulo restler
var url = 'http://localhost:8080/'; 
var accion = process.argv[2]?process.argv[2]:''; //el argumento 2 será la acción (Post o Get)
var titulo = process.argv[3]?process.argv[3]:''; //el argumento 3 es el titular de la noticia
var arrayContenido = process.argv.slice(4); //el argumento 4 sera el contenido de la noticia
var contenido = toString(arrayContenido); //Para a string el array 
var listado = 'listado';

if (accion == 'post') { //Si la acción es añadir una noticia
    rest.post(url + 'post/' + titulo + '/' + contenido ).on('complete', function(data) {
    console.log(data);
  });
}
if (accion == 'get') { //Si la acción es listar las noticias
  rest.get(url + 'node/' + listado).on('complete', function(data) {
    console.log(data);
  });
}

//funcion usada para pasar de array a una variable tipo string
function toString(array) {
  var string = '';
  for (i = 0 ; i<array.length ; i++) {
    string = string + array[i] + ' ';
  }
  return string;
}
