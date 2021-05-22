//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//Variables globales:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

var personId = Math.floor((Math.random() * 1000000) + 1);
var group =99; 
//var Balanceo = Math.floor(Math.random()*2 + 1);
var state=99;           //controla el ensayo dentro de cada fase
var stateTexto=99;      //controla la pantalla de textos
var fase = 0;           //controla en qué fase estamos
var stateQuest = 1;     //controla en qué pregunta del cuestionario estamos
var training=[];        //contendrá el array de ensayos
var data=[];            //contendrá los datos.
var fecha="";           //contendrá la fecha/hora.
var Cuestionario=[];    //contiene las respuestas al cuestionario de generalizacion
var t0 = 0; 
var t1 = 0; 

// Indicadores de estado para ver qué pregunta se lanza  
var juiciorealizado =0;
var confianzaevaluada =0;
var riesgoevaluado =0;

//variables demográficas:
var Gender=""; 
var	Age=99;
var Experience=99;
var BalPanel = Math.floor((Math.random() * 2) + 1); //para aleatorizar la posición del panel de respuesta para cada sujeto
// var PartIP = ""; //Modified for testing TFK


var PregInduccionPrecio = "";	// No se usa, TFK comprobar y eliminar
var PregInduccion = ""; 		// No se usa, TFK comprobar y eliminar

// Seguimiento de los participantes en cada grupo para adjudicar contrabalanceo o no
var grupoA1 = 0;  	// grupo 0 -  controla el número de participantes del grupo A1
var grupoA2 = 0; 	// grupo 1 -  controla el número de participantes del grupo A2
var grupoB1 = 0;	// grupo 2
var grupoB2 = 0;	// grupo 3
var grupoC1 = 0;	// grupo 4
var grupoC2 = 0;	// grupo 5

// creamos un array para ver el número de participantes en cada grupo
let grouplist = [grupoA1, grupoA2, grupoB1, grupoB2, grupoC1, grupoC2];
var participantCount = new Array();
var tempArray = [0, 1, 2, 3, 4, 5]; 
var tempShuffled = shuffle(tempArray);
var grupoAsignado = tempShuffled[0]; 	// Elige un grupo al azar
// console.log("Grupo asignado aleatorio es el:"+grupoAsignado+".") 		// debug
//console.log(grouplist.length + " is the length");							// debug
for (var i = 0; i < grouplist.length; i++) {
	// console.log(grouplist[i]+"--- i ="+i)								// debug
	if (grouplist[i] < grouplist[grupoAsignado]) {
	  grupoAsignado = i;
	}
  }
console.log("El grupo asignado es el: "+grupoAsignado+".");					// debug


//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//Funciones generales:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++


//función para inyectar HTML:
function pintarHTML(targetDiv, htmlContenido){ 
	document.getElementById(targetDiv).innerHTML=htmlContenido;
}

//función para desordenar arrays...
function shuffle(array) {    
    var rand, 
        index = -1,        
        length = array.length,        
        result = Array(length);    
    while (++index < length) {        
        rand = Math.floor(Math.random() * (index + 1));        
        result[index] = result[rand];        
        result[rand] = array[index];    }    
    return result;
}


//función para rellenar arrays...
function fillArray(value, len) { 
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}
    
//funciones para mostrar/ocultar paneles:
function mostrar(panel){panel.style.display="block";}
function ocultar(panel){panel.style.display="none";}


//función de fecha:
function stringDate() {
  var fecha = new(Date);
  return(String(fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear() + "-" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()));
}


//precache de imágenes:
var preloadImages="img/BatatrimBoton.png, img/enfermo.png, img/noBatatrimBoton.png, img/noBatatrimBoton2.png, img/Nooutcome.png, img/outcome.png, img/outcomeAvion.png, img/outcomeNoAvion.png, img/Sano.png, img/uned.png, img/RecalibradoNo.png, img/RecalibradoSi.png".split(",");
var tempIMG=[];

function preloadIMG(){
	for (var i=0;i<preloadImages.length;i++){
		tempIMG[i]=new Image();
		tempIMG[i].src=preloadImages[i];    }
}

//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//Función ARRANCA:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

//función global
function arranca(){
    //preloadIMG();
    //GeneraEnsayos();
    
	// firebase.database().ref().on("value", gotData, errData); 	// MODO DEMO SIN CONEXIÓN
	
	
	// Ver IP
	// PartIP = myip; //Modified for testing TFK
	//console.log("my IP is: "+PartIP+"."); //debug
	
	function gotData(data) {
		
		//console.log("-------EMPIEZA EL UPDATE!----------") 		// debug
	    //console.log(data.val());									// debug
	    //console.log("Experimental: "+experimental+".");			// debug
	    //console.log("Balanceo: "+balanceo+".");					// debug
	    
	    // balanceo = data.val().GrupoControlContrabalanceo;		// MODO DEMO SIN CONEXIÓN
	    // experimental = data.val().GrupoControlExp;				// MODO DEMO SIN CONEXIÓN

	    //console.log("Experimental: "+experimental+".");			// debug
	    //console.log("Balanceo: "+balanceo+".");					// debug
	  
	    //if(balanceo > experimental){								// debug (el condicional entero)
		//	console.log("Arranca(): Balanceo > experimental");    
		//	console.log("porque"+balanceo+" > que "+experimental+", ole");
		//}
		//else {
		//	console.log("Arranca(): Pues no, experimental Igual o mayor");
		//	console.log("porque"+experimental+" > que "+balanceo+", ole");
		//}
		//console.log("-------UPDATE COMPLETO!----------")			// debug
	};
		
	function errData(err) {
		console.log("Error!");
		console.log(err);
	};
	
	state=0;
    stateTexto=0;
    fase=0;
    
    //genero las cadenas de outcomes:
    
	for(var i=0; i<2; i++){ //creo 2 bloques de 10 con 30%/70% de éxito
		if(grupoAsignado<2){  	// grupos A1 y A2 (expectativa inicial alta)
			var arrayOutcome= [1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
		}
		else{        			// grupos B1 y B2 (expectativa inicial baja)
			var arrayOutcome= [1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
		}  
		arrayOutcome=shuffle(arrayOutcome);
		FasePrevia.posibleOutcomes=FasePrevia.posibleOutcomes.concat(arrayOutcome);              
	}

	for(var i=0; i<5; i++){ //creo 5 bloques de 10 con 30%/70% de éxito
		if(grupoAsignado%2==0){  	// grupos A1, B1 y C1 (remisión espontánea baja)
			var arrayOutcome= [1, 1, 1, 0, 0, 0, 0, 0, 0, 0];}
		else{        				// grupos A2, B2 y C2 (remisión espontánea alta)
			var arrayOutcome= [1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
		}  
		arrayOutcome=shuffle(arrayOutcome);
		FaseTest.posibleOutcomes=FaseTest.posibleOutcomes.concat(arrayOutcome);
	}             

    //console.log("Resultados para fase previa:");	// debug
    //console.log(FasePrevia.posibleOutcomes);	// debug
	sum = FasePrevia.posibleOutcomes.reduce((a, b) => {
		return a + b;
	  });
	console.log("Expectativa inicial: "+100*sum/20+"%.");	// debug

    //console.log("Resultados para fase test:");	// debug
    //console.log(FaseTest.posibleOutcomes);	// debug
	sum2 = FaseTest.posibleOutcomes.reduce((a, b) => {
		return a + b;
	  });
	console.log("Remisión espontánea: "+100*sum2/50+"%.");	// debug


    pregInduccion();
    //if(group=="control"){
    //    siguienteTexto();    
    //}
    //else if(group=="Experimental"){
    //    pregInduccion();	  
    //}
	
    
    alert("Pulsa F11 para verme a pantalla completa.");
}


function asignagrupo() {

	group= "No asignado";	
	// En función del número de participantes que hayan realizado la tarea en la secuencia normal
	// y de contrabalanceo, asigna a un grupo o a otro al participante. 
	if(grupoAsignado > 3){

		training=[FaseControl, FaseTest];
		if(grupoAsignado == 4){
			group= "Control Remisión Baja - C1"; 
		}
		else if(grupoAsignado == 5){
			group= "Control Remisión Alta - C2"; 
		}
		else{
			group= "ERROR!!!"
			console.log(group);
			console.log("El grupo asignado era: "+grupoAsignado+".");  
		}
	}
	else if(grupoAsignado < 2){
		training=[FasePrevia, FaseTest];
		if(grupoAsignado == 0){
			group= "Expectativa Alta y Remisión Baja - A1"; 
		}
		else if(grupoAsignado == 1){
			group= "Expectativa Alta y Remisión Alta - A2"; 
		}
		else{
			group= "ERROR!!!"
			console.log(group);
			console.log("El grupo asignado era: "+grupoAsignado+".");
		}  
	}
	else{
		training=[FasePrevia, FaseTest];
		if(grupoAsignado == 2){
			group= "Expectativa Baja y Remisión Baja - B1"; 
		}
		else if(grupoAsignado == 3){
			group= "Expectativa Baja y Remisión Alta - B2"; 
		}
		else{
			group= "ERROR!!!"
			console.log(group);
			console.log("El grupo asignado era: "+grupoAsignado+".");  
		}
	}
    // console.log("Pues te ha tocado grupo :"+group+".");					// debug

}    
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//GENERACION DE ENSAYOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

var FaseTest = {
  	nombreClave: "Batatrim",
	nombreSindrome: "Síndrome de Lindsay",
	ImagenClave: "img/BatatrimBoton.png",
	ImagenNOClave: "img/noBatatrimBoton.png",
	ImagenSindrome: "img/Nooutcome.png",
	ImagenSano: "img/outcome.png",
	textoCue: "Este paciente tiene el Síndrome de Lindsay",
    textoPregunta: "¿Quieres administrarle Batatrim?",
	textoYES: "Has administrado Batatrim",
	textoNO: "No administrado usado Batatrim",
	numTrials: 50,
    posibleOutcomes: [],
    secuenciaCells: [],
    secuenciaResps: [],
    // Contingencia: ordenContingencias[1], //Ya no se usa 
    Juicio: 999,
    Confianza: 999,
	Riesgo: 999,
	TiemposRespuesta: [],
}

var FasePrevia = {
	nombreClave: "Batatrim",
	nombreSindrome: "Síndrome de Lindsay",
	ImagenClave: "img/BatatrimBoton.png",		// Cambiar imagen a YES
	ImagenNOClave: "img/noBatatrimBoton.png",	// Cambiar imagen a NO
	ImagenSindrome: "img/Nooutcome.png",
	ImagenSano: "img/outcome.png",
	textoCue: "Este paciente tiene el Síndrome de Lindsay y se le va a administrar Batatrim",
    textoPregunta: "¿Crees que va a recuperarse?",
	textoYES: "Se ha administrado Batatrim y crees que se va a recuperar",
	textoNO: "Se ha administrado Batatrim y crees que NO se va a recuperar",
    numTrials: 20,
    posibleOutcomes: [],   
    secuenciaCells: [],
    secuenciaResps: [],
    // Contingencia: ordenContingencias[1], //Ya no se usa
    Juicio: 999,
    Confianza: 999,
	Riesgo: 999,
	TiemposRespuesta: [],
}

var FaseControl = {
	nombreClave: "Batatrim",
	nombreSindrome: "Síndrome de Lindsay",
	ImagenClave: "img/BatatrimBoton.png",
	ImagenNOClave: "img/noBatatrimBoton.png",
	ImagenSindrome: "img/Nooutcome.png",
	ImagenSano: "img/outcome.png",
	textoCue: "Este paciente tiene el Síndrome de Lindsay",
	textoPregunta: "¿Quieres administrarle Batatrim?",
	textoYES: "Has administrado Batatrim",
	textoNO: "No administrado usado Batatrim",
	numTrials: 0,
	posibleOutcomes: [],
	secuenciaCells: [],
	secuenciaResps: [],
	// Contingencia: ordenContingencias[1], //Ya no se usa 
	Juicio: 999,
	Confianza: 999,
	Riesgo: 999,
	TiemposRespuesta: [],
}

function RandomString(length){
    var mask = 'ABCDEFGHIJKLMNOPQRSTUVW';
//    var mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}


function showCue(){
    ocultar(divTextos);
    ocultar(divEleccion);
    ocultar(divOutcome);
    ocultar(divBoton);
    	
    document.getElementById("divPreStatus").classList.remove('FadeOut');
    
    mostrar(divContingencia);
    
	t0 = performance.now(); // Medir tiempos
	//console.log("El tiempo actual es: "+t0+"."); // debug

	pintarHTML("divPreStatus", "<img src=\""+training[fase].ImagenSindrome+"\" width=250px>"+
            "<br><br><br><p class=\"mensaje\">"+training[fase].textoCue+"</p><p class=\"mensaje\">"+training[fase].textoPregunta+"</p>");
    
	pintarHTML("divRegistro", "<h3>Paciente "+RandomString(4)+"</h3>");
	
	
    mostrar(divRegistro);
    mostrar(divPreStatus);
    setTimeout('mostrarEleccion()', 500);
    
    //mostrar(divEleccion);
    //setTimeout('mostrar(divEleccion)', 500); 
}

function mostrarEleccion(){
		
	if(training[fase] == FaseTest){ 

		if(BalPanel==1){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div id=\"mensajeCue\"></div>"
				   );
		}
		else if(BalPanel==2){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div id=\"mensajeCue\"></div>"
				   );

		}

		mostrar(divEleccion);
    }
	else if(training[fase] == FasePrevia){

		if(BalPanel==1){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div id=\"mensajeCue\"></div>"
				   );
		}
		else if(BalPanel==2){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div id=\"mensajeCue\"></div>"
				   );

		}

		mostrar(divEleccion);
	}
	
    if(BalPanel==1){
            pintarHTML('divEleccion',
               "<div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div id=\"mensajeCue\"></div>"
               );
    }
    else if(BalPanel==2){
            pintarHTML('divEleccion',
               "<div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div id=\"mensajeCue\"></div>"
               );

    }

    mostrar(divEleccion);
}

function respuestaYES(){
	t1 = performance.now(); // Medir tiempos
	//console.log("El tiempo actual es: "+t1+"."); // debug
	tiempotranscurrido = t1 - t0; //
	//console.log("El tiempo de respuesta es: "+tiempotranscurrido+"."); // debug
	training[fase].TiemposRespuesta.push(tiempotranscurrido); 
	
	
	document.getElementById("botonNO").classList.add('unselected');
    training[fase].secuenciaResps.push(1);
    document.getElementById("imagenYES").classList.remove('icon_hover');
    document.getElementById("imagenYES").classList.remove('icon');
    document.getElementById("imagenNO").classList.remove('icon');
    document.getElementById("imagenYES").classList.add('iconselected');
    
    document.getElementById("botonYES").disabled = true;
    document.getElementById("botonNO").disabled = true;

    document.getElementById("divPreStatus").classList.add('FadeOut');
    mostrar(divPreStatus);
    
	pintarHTML("mensajeCue", "<p class=\"mensaje\">"+training[fase].textoYES+"</p>");
    
    setTimeout('showOutcome()', 500);
}

function respuestaNO(){
	t1 = performance.now(); // Medir tiempos
	//console.log("El tiempo actual es: "+t1+"."); // debug
	tiempotranscurrido = t1 - t0; //Medir tiempos
	//console.log("El tiempo de respuesta es: "+tiempotranscurrido+".");// debug
	training[fase].TiemposRespuesta.push(tiempotranscurrido); 
	
    document.getElementById("botonYES").classList.add('unselected');
    training[fase].secuenciaResps.push(0);
    document.getElementById("imagenNO").classList.remove('icon_hover');
    document.getElementById("imagenYES").classList.remove('icon');
    document.getElementById("imagenNO").classList.remove('icon');
    document.getElementById("imagenNO").classList.add('iconselected');       
    
    document.getElementById("botonYES").disabled = true;
    document.getElementById("botonNO").disabled = true;
    
    document.getElementById("divPreStatus").classList.add('FadeOut');
    mostrar(divPreStatus);
    
	pintarHTML("mensajeCue", "<p class=\"mensaje\">"+training[fase].textoNO+"</p>");
    
    setTimeout('showOutcome()', 500);
}


function showOutcome(){

    var imgOutcome = "";
    var textoOutcome = "";
    
    switch(training[fase].secuenciaResps[state]){
        case 1: //si ha respondido 1:
            if(training[fase].posibleOutcomes[state]==1) {
                imgOutcome = training[fase].ImagenSano;
				if(training[fase] == FasePrevia){ 
				
					textoOutcome = "<br><p class=\"mensaje\">¡El problema ha sido resuelto!</p>";
				}
				else if(training[fase] == FaseTest){
			
					textoOutcome = "<br><p class=\"mensaje\">¡El paciente ha superado la crisis!</p>";
				}		
				training[fase].secuenciaCells.push("a");
                //console.log(" debug: cell a");
            }
                
            else if(training[fase].posibleOutcomes[state]==0){
                imgOutcome = training[fase].ImagenSindrome;
				if(training[fase] == FasePrevia){ 
				
					textoOutcome = "<br><p class=\"mensajeMALO\">¡El problema NO ha sido resuelto!</p>";
				}
				else if(training[fase] == FaseTest){
			
	                textoOutcome = "<br><p class=\"mensajeMALO\">¡El paciente NO ha superado la crisis!</p>";
				}		
    
                training[fase].secuenciaCells.push("b");
                //console.log(" debug: cell b");
            }
     
            break;
        case 0: //si ha respondido 0:
            if(training[fase].posibleOutcomes[state]==1) {
                imgOutcome = training[fase].ImagenSano;
				if(training[fase] == FasePrevia){ 
					textoOutcome = "<br><p class=\"mensaje\">¡El problema ha sido resuelto!</p>";
				
				}
				else if(training[fase] == FaseTest){
					textoOutcome = "<br><p class=\"mensaje\">¡El paciente ha superado la crisis!</p>";

				}
				training[fase].secuenciaCells.push("c");   
                //console.log(" debug: cell c"); 				// debug
            }
                
            else if(training[fase].posibleOutcomes[state]==0){
                imgOutcome = training[fase].ImagenSindrome;
               	if(training[fase] == FasePrevia){ 
					textoOutcome = "<br><p class=\"mensajeMALO\">¡El problema NO ha sido resuelto!</p>";
				
				}
				else if(training[fase] == FaseTest){
					textoOutcome = "<br><p class=\"mensajeMALO\">¡El paciente NO ha superado la crisis!</p>";

				}  
                training[fase].secuenciaCells.push("d"); 
                //console.log(" debug: cell d"); 				// debug
            }            
            
    }
        

    pintarHTML('divOutcome', "<img src=\""+imgOutcome+"\" width=250px><br><br>"+textoOutcome);
    if(training[fase] == FasePrevia){ 
		pintarHTML('divBoton', "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='ITI()' value='Siguiente aeronave'/>")	
	}
	else if(training[fase] == FaseTest){
		pintarHTML('divBoton', "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='ITI()' value='Siguiente paciente'/>")	

	}
    mostrar(divOutcome);
    setTimeout('mostrar(divBoton)', 500);
    
    
}


function ITI(){
    
    ocultar(divOutcome);
    ocultar(divContingencia);
	ocultar(divBoton);	
        
    document.getElementById("botonNO").classList.remove('unselected');
    document.getElementById("botonYES").classList.remove('unselected');
    document.getElementById("imagenNO").classList.remove('iconselected');
    document.getElementById("imagenYES").classList.remove('iconselected');

    document.getElementById("imagenNO").classList.add('icon_hover');
    document.getElementById("imagenNO").classList.add('icon');
    document.getElementById("imagenYES").classList.add('icon_hover');
    document.getElementById("imagenYES").classList.add('icon');    
    
    document.getElementById("botonYES").disabled = false;
    document.getElementById("botonNO").disabled = false;
    
    document.getElementById("divPreStatus").classList.remove('FadeOut');
    
    if(state<training[fase].numTrials-1){
        state++;
        setTimeout("showCue()", 500);
    }
     else if(state==training[fase].numTrials-1){

		showJuicio();
		juiciorealizado++;
	
     }
}

function showJuicio(){
    ocultar(divContingencia);
    ocultar(divTextos);
    
    if(training[fase] == FasePrevia){ 
		textoJuicio= "<p class=\"pregunta\">¿Hasta qué punto crees que el recalibrado es efectivo para resolver los comportamientos erráticos de los sensores de ángulo de ataque?</p>";
	}
	else if(training[fase] == FaseTest){
		textoJuicio= "<p class=\"pregunta\">¿Hasta qué punto crees que el "+
			training[fase].nombreClave+" es efectivo para curar las crisis del "+training[fase].nombreSindrome+"?</p>";
	}
		
	textoInstrucciones="<p>Responde usando la siguiente escala, donde los números se interpretan así:</p><ul><li>0: Nada efectivo.</li><li>100: Completamente efectivo.</li></ul><p>Puedes hacer clic dentro de la escala tantas veces como desees hasta marcar el valor que consideres más adecuado. Cualquier valor entre 0 y 100 es válido.</p><br><br>";
	textoJuicio = textoJuicio.concat(textoInstrucciones);
	
	pintarHTML('divPregunta', textoJuicio);
		
    document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');

    ReseteoJuicios();
    
    document.getElementById("textInput").disabled = true;
    document.getElementById("textInput").value = "";

    
    textoBoton="<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaJuicio()' value='Confirmar'/>";
    pintarHTML('divBoton', textoBoton);
    
    mostrar(divJuicio);
    setTimeout('mostrar(divBoton)', 500);

}

function showConfianza(){
    ocultar(divContingencia);
    ocultar(divTextos);
    
    if(training[fase] == FasePrevia){ 
		textoConfianza= "<p class=\"pregunta\">¿Hasta qué punto estás seguro de tu respuesta sobre la efectividad del recalibrado?</p>";
	}
	else if(training[fase] == FaseTest){
		textoConfianza= "<p class=\"pregunta\">¿Hasta qué punto estás seguro de tu respuesta sobre la efectividad del "+training[fase].nombreClave+"?</p>";
	}

	textoInstrucciones="<p>Responde usando la siguiente escala, donde los números se interpretan así:</p><ul><li>0: He respondido al azar.</li><li>100: Completamente seguro.</li></ul><p>Puedes hacer clic dentro de la escala tantas veces como desees hasta marcar el valor que consideres más adecuado. Cualquier valor entre 0 y 100 es válido.</p><br><br>";
	textoConfianza = textoConfianza.concat(textoInstrucciones);
	pintarHTML('divPregunta', textoConfianza);
    
    document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');

    ReseteoJuicios();
    
    document.getElementById("textInput").disabled = true;
    document.getElementById("textInput").value = "";

    
    textoBoton="<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaJuicio()' value='Confirmar'/>";
    pintarHTML('divBoton', textoBoton);
    
    mostrar(divJuicio);
    setTimeout('mostrar(divBoton)', 500);    
}

function showRiesgo(){
    ocultar(divContingencia);
    ocultar(divTextos);
    
    if(training[fase] == FasePrevia){ 
		textoRiesgo= "<p class=\"pregunta\">¿Qué nivel de riesgo has considerado que tenían tus decisiones para la seguridad de la aeronave?</p>";
	}
	else if(training[fase] == FaseTest){
		textoRiesgo= "<p class=\"pregunta\">¿Qué nivel de riesgo has considerado que tenían tus decisiones para la salud de los pacientes?</p>";
	}
	textoInstrucciones="<p>Responde usando la siguiente escala, donde los números se interpretan así:</p><ul><li>0: Ningún riesgo.</li><li>100: Riesgo catastrófico.</li></ul><p>Puedes hacer clic dentro de la escala tantas veces como desees hasta marcar el valor que consideres más adecuado. Cualquier valor entre 0 y 100 es válido.</p><br><br>";
	textoRiesgo = textoRiesgo.concat(textoInstrucciones);

	pintarHTML('divPregunta', textoRiesgo);
    
    document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');

    ReseteoJuicios();
    
    document.getElementById("textInput").disabled = true;
    document.getElementById("textInput").value = "";

    
    textoBoton="<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaJuicio()' value='Confirmar'/>";
    pintarHTML('divBoton', textoBoton);
    
    mostrar(divJuicio);
    setTimeout('mostrar(divBoton)', 500);
    

}


function updateTextInput(val) {
	document.getElementById('textInput').value=val; 
}

function validaJuicio(){
    if (document.getElementById('textInput').value!=""){
		
		// Vamos a grabar el valor del slider en un punto u otro según nuestra fase
		if(training[fase].Juicio==999){
			training[fase].Juicio=document.getElementById('textInput').value;
			//console.log("--- LA HORA DEL JUICIO ESTÁ CERCA!!! ---");			// debug
			//console.log(training[fase].Juicio);								// debug
		}	
		else if(training[fase].Confianza==999){
			training[fase].Confianza=document.getElementById('textInput').value;
			//console.log("--- LA HORA DE LA CONFIANZA ESTÁ CERCA!!! ---");		// debug
			//console.log(training[fase].Confianza);							// debug
		}	
		else if(training[fase].Riesgo==999){
			training[fase].Riesgo=document.getElementById('textInput').value;
			//console.log("--- LA HORA DEL RIESGO ESTÁ CERCA!!! ---");			// debug
			//console.log(training[fase].Riesgo);								// debug
		}
		//training[fase].Juicio=document.getElementById('textInput').value;
        //console.log("--- LA HORA DEL JUICIO ESTÁ CERCA!!! ---");
		//console.log(training[fase].Juicio);
		document.getElementById("sliderJuicio").classList.remove('sliderCONTPrimero');
        
		if(confianzaevaluada==0){
			showConfianza();
			confianzaevaluada++;
		}
		else if(riesgoevaluado==0){
			showRiesgo();
			riesgoevaluado++;
		}	
		else if(riesgoevaluado==1){
			cambiafase();
		}
        
	}
	else {
        alert("Contesta la pregunta");
        document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');
        document.getElementById("textInput").value = "";
         }   
}

function cambiafase(){
    if(fase==0) {
        fase++;
        state=0; 
        
		juiciorealizado=0;
		confianzaevaluada=0;
		riesgoevaluado=0;
     }
    
    siguienteTexto();
}

function ReseteoJuicios(){
	document.getElementById('sliderJuicio').value=-10000;
	document.getElementById('textInput').value="";
}


//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//FUNCIONES DE CONTROL DE TEXTOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++


function siguienteTexto(){
	
	mostrar(divTextos);
	mostrar(divBoton);
    ocultar(divContingencia);
    ocultar(divJuicio);
    ocultar(divCuestionariosEdad);
	
    htmlContenido=arrayInstruc[stateTexto];
	htmlBotones=arrayBoton[stateTexto];
	
	pintarHTML("divTextos",htmlContenido);
    pintarHTML("divBoton",htmlBotones);

    stateTexto++;	
}

function previoTexto(){
	stateTexto=stateTexto-2;
    siguienteTexto();
}

// Inicializamos el arrayInstruc con el modo grupos experimentales (grupos A y B)

var arrayInstruc=[
	//0: (portada)  // TFK requiere cambio
	"<h2 class=\"titulo\">MÁSTER UNIVERSITARIO EN INVESTIGACIÓN EN PSICOLOGÍA</h2><p>¡Muchas gracias por participar en este trabajo fin de máster!</p><br><br><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"img/uned.png\" width=\"200px\"><p>Sigue las instrucciones que encontrarás a continuación.</p>",
		
	// EXPERIMENTAL! Instrucciones para la fase previa // TFK requiere cambio
	//2: Instrucciones 1
	"<h3 class=\"titulo\">Instrucciones</h3><p align=\"left\">Imagina que eres un médico que trabaja en el laboratorio de investigación de una universidad. Eres especialista en una enfermedad muy rara y peligrosa llamada "+ FaseTest.nombreSindrome+", que hay que tratar muy rápido en urgencias. Las crisis que provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada "+ FaseTest.nombreClave+", pero esta medicina aún está en fase experimental, por lo que todavía no se ha comprobado claramente su efectividad.</p><br>",
				
	//3: Instrucciones 2.a // TFK requiere cambio
	"<h3 class=\"titulo\">Instrucciones</h3><p>Te vamos a presentar una serie de fichas médicas de pacientes que están sufriendo una crisis del "+FaseTest.nombreSindrome +". En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el "+FaseTest.nombreClave+ ".</p>",
			
	//4: Instrucciones 2.b // TFK requiere cambio
	"<h3 class=\"titulo\">Instrucciones</h3><p>El procedimiento será el siguiente: para cada nuevo paciente, debes decidir si quieres administrar el "+FaseTest.nombreClave+ " o no, pulsando la imagen correspondiente de las dos siguientes.</p><br><br><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table><br><br>",
			
	//5: Instrucciones 2.c // TFK requiere cambio
	"<p><h3 class=\"titulo\">Instrucciones</h3>A continuación te informaremos de si el paciente superó la crisis. Después de darte esa información, se te presentará la ficha del siguiente paciente.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><p>Intenta averiguar hasta qué punto es efectivo el "+FaseTest.nombreClave+ ". Cuando hayas tratado a un buen número de pacientes te haremos algunas preguntas.</p>"
	,
			
	//6: Instrucciones de la tarea de ALERGIAS // TFK requiere cambio
	"<p><h3 class=\"titulo\">Instrucciones</h3>Ya has terminado de estudiar el "+FaseTest.nombreSindrome +". Muchas gracias por tu colaboración.</p><p>Ahora imagina que eres un ingeniero que trabaja para una aerolínea. Eres especialista en sistemas de navegación y mandos de vuelo,  trabajas resolviendo problemas que hay que tratar muy rápido durante el día a día para poder operar con normalidad.<br><br> Los pilotos de un cierto modelo de avión de la aerolínea están informando de comportamientos erráticos de los sensores de ángulo de ataque, necesarios para calcular la posición y actitud (orientación) del avión.<br>A pesar de que los comportamientos no se reproducen en tierra ni producen registros de fallos, se sospecha que estos problemas pueden deberse a una calibración incorrecta del sensor que no es detectable. Por lo que se soluciona realizando una nueva calibración del sensor. La causa raíz de este problema está aún en fase de investigación, por lo que todavía no se ha comprobado claramente que sea efectiva.</p>",

	//6: Instrucciones 1b Phase 2: // TFK requiere cambio
	"<p><h3 class=\"titulo\">Instrucciones</h3><p>Las crisis que provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada "+ FaseTest.nombreClave+", pero esta medicina aún está en fase experimental, por lo que todavía no se ha comprobado claramente su efectividad.<br><br>Te vamos a presentar una serie de fichas médicas de pacientes que están sufriendo una crisis del "+FaseTest.nombreSindrome+". En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el "+FaseTest.nombreClave+".</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table>",
			
	//7: Instrucciones 2 Phase 2 // TFK requiere cambio
	"<h3 class=\"titulo\">Instrucciones</h3><p>A continuación te informaremos de si el paciente superó la crisis. Después de darte esa información, se te presentará la ficha del siguiente paciente. </p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><br><p>Intenta averiguar hasta qué punto es efectivo el "+FaseTest.nombreClave+ ". Cuando hayas tratado a un buen número de pacientes te haremos algunas preguntas.</p>",
			
	// A guardar datos via Firebase!  
	//13: Save Data...
	"<h3 class=\"titulo\">Envío de datos</h3><p>A continuación podrás enviar los resultados para que se incluyan en nuestro estudio. Los datos que nos aportes se unirán a los del grupo y serán analizados estadísticamente.</p><p align=\"left\"> Para hacerlo, haz click en el botón \"Enviar\".</p>",
			
	//13:
	"<h3 class=\"titulo\">Ya has terminado. ¡Muchas gracias por tu colaboración!</h3><p><br>Pulsa F11 para salir del modo pantalla completa.<br>Autor: <br>Carlos Vera <br><br> Tutores del Trabajo Fin de Máster:<br> Pedro Montoro, Cris Orgaz y María José Contreras.</p>"		
]; 

function prepararInstrucciones(){

	if(grupoAsignado>3){ // Instrucciones para el grupo de control --> sin modificación 
		// GRUPO EXPERIMENTAL Contrabalanceo: Tarea alergia -> Tarea aeronáutica
		//console.log("Estamos generando instrucciones para el grupo de Contrabalanceo")	// debug
		// Hay que modificar el arrayInstruc
		arrayInstruc=[
			//0: (portada) //TFK Corregir 
			"<h2 class=\"titulo\">MÁSTER UNIVERSITARIO EN INVESTIGACIÓN EN PSICOLOGÍA</h2><p>¡Muchas gracias por participar en este trabajo fin de máster!</p><br><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"img/uned.png\" width=\"200px\"><p>Sigue las instrucciones que encontrarás a continuación.</p>",	
			
			//2: Instrucciones 1 //TFK Corregir 
			"<h3 class=\"titulo\">Instrucciones</h3><p align=\"left\">Imagina que eres un médico que trabaja en el laboratorio de investigación de una universidad. Eres especialista en una enfermedad muy rara y peligrosa llamada "+ FaseTest.nombreSindrome+", que hay que tratar muy rápido en urgencias. Las crisis que provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada "+ FaseTest.nombreClave+", pero esta medicina aún está en fase experimental, por lo que todavía no se ha comprobado claramente su efectividad.</p><br>",
			
			//3: Instrucciones 2.a //TFK Corregir 
			"<h3 class=\"titulo\">Instrucciones</h3><p>Te vamos a presentar una serie de fichas médicas de pacientes que están sufriendo una crisis del "+FaseTest.nombreSindrome +". En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el "+FaseTest.nombreClave+ ".</p>",
			
			//4: Instrucciones 2.b //TFK Corregir 
			"<h3 class=\"titulo\">Instrucciones</h3><p>El procedimiento será el siguiente: para cada nuevo paciente, debes decidir si quieres administrar el "+FaseTest.nombreClave+ " o no, pulsando la imagen correspondiente de las dos siguientes.</p><br><br><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table><br><br>",
			
			//5: Instrucciones 2.c //TFK Corregir 
			"<p><h3 class=\"titulo\">Instrucciones</h3>A continuación te informaremos de si el paciente superó la crisis. Después de darte esa información, se te presentará la ficha del siguiente paciente.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><p>Intenta averiguar hasta qué punto es efectivo el "+FaseTest.nombreClave+ ". Cuando hayas tratado a un buen número de pacientes te haremos algunas preguntas.</p>"
			,
				
			// EXPERIMENTAL //TFK Corregir 
			//6: Instrucciones 1a Phase 2:	//TFK Corregir 
			"<p><h3 class=\"titulo\">Instrucciones</h3>Ya has terminado de estudiar el "+FaseTest.nombreSindrome +". Muchas gracias por tu colaboración.</p><p>Ahora imagina que eres un ingeniero que trabaja para una aerolínea. Eres especialista en sistemas de navegación y mandos de vuelo,  trabajas resolviendo problemas que hay que tratar muy rápido durante el día a día para poder operar con normalidad.<br><br> Los pilotos de un cierto modelo de avión de la aerolínea están informando de comportamientos erráticos de los sensores de ángulo de ataque, necesarios para calcular la posición y actitud (orientación) del avión.<br>A pesar de que los comportamientos no se reproducen en tierra ni producen registros de fallos, se sospecha que estos problemas pueden deberse a una calibración incorrecta del sensor que no es detectable. Por lo que se soluciona realizando una nueva calibración del sensor. La causa raíz de este problema está aún en fase de investigación, por lo que todavía no se ha comprobado claramente que sea efectiva.</p>",

			//6: Instrucciones 1b Phase 2:	//TFK Corregir 
			"<p><h3 class=\"titulo\">Instrucciones</h3><p>Además, debes saber que esta re-calibración es una tarea larga y complicada con consecuencias que pueden ser graves, por lo que no siempre es posible realizarla.<br><br>Te vamos a presentar una serie de informes de pilotos de aeronaves en servicio que sufren este fallo.<br><br>El procedimiento será el siguiente: para cada nueva aeronave, debes decidir si quieres recalibrar el sensor o no, pulsando la imagen correspondiente de las dos siguientes.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FasePrevia.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+FasePrevia.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Recalibrar el sensor</td><td>No recalibrar el sensor</td></tr></table>",
			
			//7: Instrucciones 2 Phase 2	//TFK Corregir 
			"<h3 class=\"titulo\">Instrucciones</h3><p>A continuación, te informaremos de si el problema fue resuelto. Después de darte esa información, se te presentará la siguiente aeronave. </p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FasePrevia.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+FasePrevia.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Problema no resuelto</td><td>Problema resuelto</td></tr></table><p>Intenta averiguar hasta qué punto el recalibrado es efectivo. Cuando hayas observado a un buen número de aeronaves te haremos algunas preguntas.</p>",
						
			// A guardar datos! 
			//13: Save Data... 
			"<h3 class=\"titulo\">Envío de datos</h3><p>A continuación podrás enviar los resultados para que se incluyan en nuestro estudio. Los datos que nos aportes se unirán a los del grupo y serán analizados estadísticamente.</p><p align=\"left\"> Para hacerlo, haz click en el botón \"Enviar\".</p>",
			
			//13:
			"<h3 class=\"titulo\">Ya has terminado. ¡Muchas gracias por tu colaboración!</h3><p><br>Pulsa F11 para salir del modo pantalla completa.<br>Autor: <br>Carlos Vera <br><br> Tutores del Trabajo Fin de Máster:<br> Pedro Montoro, Cris Orgaz y María José Contreras.</p>"		
		];
	}
	else {
        // No hay que modificar el arrayInstruc
	}	
}

var arrayBoton = [
    //0:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='cuestionarioEdad()' value='Empezar'/>",
    
    //1:
    //"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='cuestionarioEdad()' value='Continuar'/>",
    
    //2:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",
    //3:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

    //4:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",
    
    //5:
	"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='showCue()' value='Comenzar'/>",
    
	
    //6a:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

    //6b:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

    
    //7:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='showCue()' value='Comenzar'/>",
    
    // A guardar datos! 
    //13:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='saveData()' value='Enviar'/>",
    
    //14:
    ""
    
];


//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//FUNCIONES DE CUESTTIONARIOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

function cuestionarioEdad(){
	
	
    ocultar(divTextos);
    mostrar(divCuestionariosEdad);
	
	// Aquí mientras se rellenan los cuestionarios lanzamos la llamada a Firebase 
	// para calcular grupos y tal
	asignagrupo();
	prepararInstrucciones();
    document.querySelector('input[name="edad"]').value="";
    
    var HTMLboton = "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaEdad()' value='Continuar'/>";
    pintarHTML('divBoton', HTMLboton);

}

function validaEdad(){
    if(
        // Esta condición exige que se respondan las preguntas de experiencia y edad	
        //(document.querySelector('input[name="experiencia"]').value=="") || (document.querySelector('input[name="edad"]').value=="")
		(document.querySelector('input[name="edad"]').value=="")
      ) {
        alert("Contesta las preguntas, por favor");
    }
    
	else { //el género se puede dejar sin marcar.
        
        if (document.querySelector('input[name="gender"]:checked')==null) 
            Gender = "noescoge";
        else Gender = document.querySelector('input[name="gender"]:checked').value;	
		
        Age = document.querySelector('input[name="edad"]').value
		//Experience = document.querySelector('input[name="experiencia"]').value;
    	// Curso = document.querySelector('input[name="curso"]:checked').value;
        siguienteTexto();
	}
}


function validaPregunta(){
    if(document.querySelector('input[name="Pregunta'+stateQuest+'"]:checked')==null) alert("Contesta la pregunta, por favor");
    else {
        Cuestionario.push(document.querySelector('input[name="Pregunta'+stateQuest+'"]:checked').value);
        //console.log(Cuestionario);		// debug
        stateQuest++;
        siguienteTexto();
    } 
}


// Podría cambiarle el título, ya que ahora no es realmente esto sino una bienvenida. 
function pregInduccion(){
    ocultar(divTextos);
    mostrar(divPregInduccion);
    
    pintarHTML('divBoton', "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaInduccion()' value='Aceptar y continuar'/>");
	
}


function validaInduccion(){
  
    if(document.querySelector('input[name="induccion1"]:checked')==null)
        // (document.querySelector('input[name="induccion1"]:checked')==null) || (document.querySelector('input[name="induccion2"]:checked')==null)
      // ) {
        // alert("Contesta las preguntas, por favor");
		alert("Para continuar, lee la hoja de información y confirma que estás de acuerdo con las condiciones.");
    
    else{
        PregInduccion = document.querySelector('input[name="induccion1"]').value;
        ocultar(divPregInduccion);
        siguienteTexto();
    }
}

//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//FUNCIONES DE SALIDA DE DATOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

function stringDate() {
  fecha = new(Date);
  return(String(fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear() + "-" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()));
}


function saveData(){
    
    stringDate();
    
    var Fase1countCells = new Map([...new Set(FaseTest.secuenciaCells)].map(
    x => [x, FaseTest.secuenciaCells.filter(y => y === x).length]));
    var Fase2countCells = new Map([...new Set(FasePrevia.secuenciaCells)].map(
    x => [x, FasePrevia.secuenciaCells.filter(y => y === x).length]));
    
    var BalanceoContingencia = FaseTest.Contingencia+"-"+FasePrevia.Contingencia;
     
   
    data = 
        "TFM-Control" + "," + 
        personId + "," +                	//ID aleatorio
		//PartIP + "," +						// IP del participante //Modified for testing TFK
        fecha + "," + 
        group + "," +                   	//grupo: normal / contrabalanceo
        Age + "," +         		
        Gender + "," +		
		Experience + "," +
        BalPanel + "," +               		//balanceo de panel botones
        BalanceoContingencia + "," +   		//orden de las contingencias
        FaseTest.Juicio + "," + 				//Juicio 
        FaseTest.Confianza + "," + 			//Confianza 
        FaseTest.Riesgo + "," + 				//Riesgo 
        FasePrevia.Juicio + "," + 				//Fase 2 - Juicio
        FasePrevia.Confianza + "," + 			//Fase 2 - Confianza 
        FasePrevia.Riesgo + "," + 				//Fase 2 - Riesgo 
		FaseTest.TiemposRespuesta + "," + 		//Tiempos de respuesta 
		FasePrevia.TiemposRespuesta + "," +  	//Fase 2 - Tiempos de respuesta 
		FaseTest.secuenciaResps + "," + 		//Secuencia de respuestas dada
		FaseTest.posibleOutcomes + "," + 		//Secuencia de resultados de éxito presentada
		FaseTest.secuenciaCells + "," + 		//Secuencia de combinaciones acción-éxito
		FasePrevia.secuenciaResps + "," + 		//Fase 2 - Secuencia de respuestas dada
		FasePrevia.posibleOutcomes + "," + 		//Fase 2 - Secuencia de resultados de éxito presentada
		FasePrevia.secuenciaCells 				//Fase 2 - Secuencia de combinaciones acción-éxito
    ;
    
	if(group == "Experimental"){
		//actualizarGrupo= grouplist[grupoAsignado]+1;
		//firebase.database().ref('GrupoControlExp').set(actualizarGrupo);				// MODO DEMO SIN CONEXIÓN
		//console.log("Un participante al grupo normal")				// debug
	}
	else {
		//actualizarGrupo= grouplist[grupoAsignado]+1;
		// firebase.database().ref('GrupoControlContrabalanceo').set(actualizarGrupo); 	// MODO DEMO SIN CONEXIÓN
		//console.log("Un participante al grupo de contrabalanceo")		// debug
	}
    //console.log(data);      // Debug
    guardaFirebase();
    siguienteTexto();
}

function guardaFirebase(){

	var expdata={
		expName:"TFM-Carlos",
		datos:data
	}
    
	//firebase.database().ref('tallerFEcyt/').push(data);
    //firebase.database().ref('datoscontrol/').push(data); 								// MODO DEMO SIN CONEXIÓN
	console.log("Experimento realizado en modo DEMO. ¡Datos NO guardados!");
}

