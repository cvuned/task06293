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
//var testeo = 1;  // variable para reducir el número de ensayos durante el testeo del código // TFK -- mover a 0 para producción 
var testeo = 0;  

// Indicadores de estado para ver qué pregunta se lanza  
var juiciorealizado = 0;
var confianzaevaluada = 0;
var riesgoevaluado = 0;
var evidenciavaluado = 0; 
var evidenciaA = 999;
var evidenciaB = 999;
var evidenciaC = 999;
var evidenciaD = 999;
var tempOrden = ["a", "b", "c", "d"];
tempOrden = shuffle(tempOrden);

//variables demográficas:
var Gender=""; 
var	Age=99;
var Experience=99;
var BalPanel = Math.floor((Math.random() * 2) + 1); //para aleatorizar la posición del panel de respuesta para cada sujeto
//var PartIP = ""; //Modified for testing TFK


var PregInduccionPrecio = "";	// No se usa, TFK comprobar y eliminar
var PregInduccion = ""; 		// No se usa, TFK comprobar y eliminar

// Seguimiento de los participantes en cada grupo para adjudicar contrabalanceo o no
var grupoA1 = 0;  	// grupo 0 -  controla el número de participantes del grupo A1
var grupoA2 = 0; 	// grupo 1 -  controla el número de participantes del grupo A2
var grupoB1 = 0;	// grupo 2 - B1 
var grupoB2 = 0;	// grupo 3 - B2
var grupoC1 = 0;	// grupo 4 - Control 1
var grupoC2 = 0;	// grupo 5 - Control 2
// Esta variable realmente se verá como la variable: grupoAsignado
// [grupoA1 = 0, grupoA2 = 1, grupoB1 = 2, grupoB2= 3, grupoC1 = 4, grupoC2 = 5] 
// TFK Falta actualizar las variables de los grupos con el número de participantes reales en cada grupo

var groupNames = ["A1", "A2", "B1", "B2", "C1", "C2"]; // currently not used TFK


// creamos un array para ver el número de participantes en cada grupo
var grouplist = [grupoA1, grupoA2, grupoB1, grupoB2, grupoC1, grupoC2];
var participantCount = new Array();
var tempArray = [0, 1, 2, 3, 4, 5]; 
var tempShuffled = shuffle(tempArray);
var grupoAsignado = tempShuffled[0]; 	// Elige un grupo al azar


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
  //return(String(fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear() + "-" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()));
  return(String(fecha.getFullYear() + "/" + (fecha.getMonth()+1) + "/" + fecha.getDate() + "-" + fecha.getHours() + ":" + fecha.getMinutes() ));
}


//precache de imágenes:
var preloadImages="img/BatatrimBoton.png, img/enfermo.png, img/recuperaSi.png, img/recuperaNo.png, img/noBatatrimBoton.png, img/noBatatrimBoton2.png, img/Nooutcome.png, img/outcome.png, img/outcomeAvion.png, img/outcomeNoAvion.png, img/Sano.png, img/uned.png, img/RecalibradoNo.png, img/RecalibradoSi.png".split(",");
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
    preloadIMG();
	// CARGA la base de datos: 
	firebase.database().ref().on("value", gotData, errData); 	// MODO DEMO SIN CONEXIÓN
	
	
	//Ver IP
	//PartIP = myip; //Modified for testing TFK
	//console.log("my IP is: "+PartIP+"."); //debug
	
	function gotData(data) { //TFK actualizar líneas 64 y siguientes
		
		console.log("participantes: "+grouplist+".");				// debug para comprobar el grupo antes de leer datos
	    grouplist = data.val().participantesPorGrupo;				// esta línea lee el histórico de firebase (añadida en el 2º run de la app)
		console.log("participantes: "+grouplist+".");				// debug para comprobar el grupo antes de leer datos
	};
		
	function errData(err) {
		console.log("Error!");
		console.log(err);
	};
	
	state=0;
    stateTexto=0;
    fase=0;
    
    //genero las cadenas de outcomes: // TFK --> todo este bloque tiene que ir en una nueva función a la que llame después de leer de firebase
    
	for(var i=0; i<2; i++){ //creo 2 bloques de 10 con 30%/70% de éxito
		if(grupoAsignado<2){  	// grupos A1 y A2 (expectativa inicial alta)
			var arrayOutcome= [1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
		}
		else if(grupoAsignado>3){  	// grupos C1 y C2 (Control - sin ensayos)
			var arrayOutcome= []; // Añadido para que este grupo salte directamente 
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

    pregInduccion();
    alert("Pulsa F11 para verme a pantalla completa.");
}


function asignagrupo() {

	//console.log(groupNames[grupoAsignado]);
	
	console.log(grouplist.length + " is the length");							// debug
	for (var i = 0; i < grouplist.length; i++) {								// Este bucle asigna al grupo con menos participantes
		console.log(grouplist[i]+"--- i ="+i)								// debug
		if (grouplist[i] < grouplist[grupoAsignado]) {
			grupoAsignado = i;
		}
	console.log("El GRUPO asignado es el: "+groupNames[grupoAsignado]+".");
	console.log("El grupo asignado es el: "+grupoAsignado+".");					// debug
	console.log("Grupo asignado aleatorio es el:"+grupoAsignado+".") 		// debug
	}
	//grupoAsignado = 4;											// TFK -- Modificado para checkear grupo de control
	// TODO ESTE BLOQUE SIGUIENTE CHECKEA LAS PROBABILIDADES: 
	group= "No asignado";	
	// En función del número de participantes que hayan realizado la tarea en la secuencia normal
	// y de contrabalanceo, asigna a un grupo o a otro al participante. 
	if(grupoAsignado > 3){

		training=[FaseTest];
		//training=[FaseControl, FaseTest];
		//training=[FaseControl];
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
	console.log("Pues te ha tocado grupo :"+group+".");					// debug

}    
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//GENERACION DE ENSAYOS:

function generaEnsayos(){
	if(grupoAsignado<4){
		sum = FasePrevia.posibleOutcomes.reduce((a, b) => {
			return a + b;
		});
		console.log("Expectativa inicial: "+100*sum/20+"%.");	// debug
				// Para control qué dice
	}
	else{ 
		console.log("Este es un grupo de control sin manipulación");	
	}
    //console.log("Resultados para fase test:");	// debug
    //console.log(FaseTest.posibleOutcomes);	// debug
	sum2 = FaseTest.posibleOutcomes.reduce((a, b) => {
		return a + b;
	  });
	console.log("Remisión espontánea: "+100*sum2/50+"%.");	// debug
}

//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

var FaseTest = {
  	nombreClave: "\"Batatrim\"",
	nombreSindrome: "Síndrome de Lindsay",
	ImagenClave: "img/BatatrimBoton.png",
	ImagenNOClave: "img/noBatatrimBoton.png",
	ImagenSindrome: "img/Nooutcome.png",
	ImagenSano: "img/outcome.png",
	textoCue: "Este paciente tiene el Síndrome de Lindsay",
    textoPregunta: "¿Quieres administrarle \"Batatrim\"?",
	textoYES: "Has administrado \"Batatrim\"",
	textoNO: "No administrado usado \"Batatrim\"",
	numTrials: 50,
    posibleOutcomes: [],
    secuenciaCells: [],
    secuenciaResps: [],
    Juicio: 999,
    Confianza: 999,
	Riesgo: 999,
	EvidentialValue: [999,999,999,999],
	TiemposRespuesta: [],
}

var FasePrevia = {
	nombreClave: "\"Batatrim\"",
	nombreSindrome: "Síndrome de Lindsay",
	ImagenClave: "img/recuperaSi.png",		
	ImagenNOClave: "img/recuperaNo.png",	
	ImagenSindrome: "img/Nooutcome.png",
	ImagenSano: "img/outcome.png",
	textoTransitAlta: "alta",
	textoTransitBaja: "baja", 
	textoCue: "Este paciente tiene el Síndrome de Lindsay y se le ha administrado \"Batatrim\"",
    textoPregunta: "¿Crees que va a recuperarse?",
    textoYES: "Crees que se va a recuperar",
	textoNO: "Crees que NO se va a recuperar",
    numTrials: 20,
	posibleOutcomes: [],   
    secuenciaCells: [],
    secuenciaResps: [],
    Juicio: 999,
    Confianza: 999,
	Riesgo: 999,
	EvidentialValue: [999,999,999,999],
	TiemposRespuesta: [],
}

var FaseControl = {
	nombreClave: "\"Batatrim\"",
	nombreSindrome: "Síndrome de Lindsay",
	ImagenClave: "img/BatatrimBoton.png",
	ImagenNOClave: "img/noBatatrimBoton.png",
	ImagenSindrome: "img/Nooutcome.png",
	ImagenSano: "img/outcome.png",
	textoIntroControl: "Sin embargo, esta medicina aún está en fase experimental, por lo que todavía no se ha comprobado claramente su efectividad.",
	textoCue: "Este paciente tiene el Síndrome de Lindsay",
	textoPregunta: "¿Quieres administrarle \"Batatrim\"?",
	textoYES: "Has administrado \"Batatrim\"",
	textoNO: "No administrado usado \"Batatrim\"",
	numTrials: 50, 
    posibleOutcomes: [],   
    secuenciaCells: [],
    secuenciaResps: [],
	posibleOutcomes: [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9], // Esto lo dejamos para que todos los grupos tengan los datos ordenados igual
	secuenciaCells: [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
	secuenciaResps: [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
	Juicio: 999,
	Confianza: 999,
	Riesgo: 999,
	EvidentialValue: [999,999,999,999],
	TiemposRespuesta: [],
	TiemposRespuesta: [999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999],
}

//if(testeo === 1){
//	FaseControl.numTrials = 2;
//	FasePrevia.numTrials = 2;
//	FaseTest.numTrials = 2; 
//	console.log("This should only be running during tests.")
//}



function RandomString(length){
//    var mask = 'ABCDEFGHIJKLMNOPQRSTUVW';
//    var mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var mask = 'BCDFGHJKLMNPQRSTVWXZ';
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
    
	pintarHTML("divRegistro", "<h3>Paciente "+RandomString(8)+"</h3>");
	
	
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
        case 1: //si ha respondido 1 --> Administrar Batatrim:
            if(training[fase].posibleOutcomes[state]==1) {
                imgOutcome = training[fase].ImagenSano;
				textoOutcome = "<br><p class=\"mensaje\">¡El paciente ha superado la crisis!</p>";
				// Comentado el bloque que daba diferente texto por fases
				//if(training[fase] == FasePrevia){ 
				//
				//	textoOutcome = "<br><p class=\"mensaje\">¡El problema ha sido resuelto!</p>";
				//}
				//else if(training[fase] == FaseTest){
				//
				//	textoOutcome = "<br><p class=\"mensaje\">¡El paciente ha superado la crisis!</p>";
				//}		
				training[fase].secuenciaCells.push("a");
                //console.log(" debug: cell a");
            }
                
            else {
			//else if(training[fase].posibleOutcomes[state]==0){
                imgOutcome = training[fase].ImagenSindrome;
				textoOutcome = "<br><p class=\"mensajeMALO\">¡El paciente NO ha superado la crisis!</p>";
				// Comentado el bloque que daba diferente texto por fases
				//if(training[fase] == FasePrevia){ 
				//
				//	textoOutcome = "<br><p class=\"mensajeMALO\">¡El problema NO ha sido resuelto!</p>";
				//}
				//else if(training[fase] == FaseTest){
				//
	            //    textoOutcome = "<br><p class=\"mensajeMALO\">¡El paciente NO ha superado la crisis!</p>";
				//}		
    
                training[fase].secuenciaCells.push("b");
                //console.log(" debug: cell b");
            }
     
            break;
        case 0: //si ha respondido 0 --> no administrar Batatrim:
            if(training[fase].posibleOutcomes[state]==1) {
                imgOutcome = training[fase].ImagenSano;
				textoOutcome = "<br><p class=\"mensaje\">¡El paciente ha superado la crisis!</p>"; //en estos bloques hemos eliminado el if del Case 1
				training[fase].secuenciaCells.push("c");   
                //console.log(" debug: cell c"); 				// debug
            }
            
			else {
            //else if(training[fase].posibleOutcomes[state]==0){
                imgOutcome = training[fase].ImagenSindrome;
				textoOutcome = "<br><p class=\"mensajeMALO\">¡El paciente NO ha superado la crisis!</p>";
                training[fase].secuenciaCells.push("d"); 
                //console.log(" debug: cell d"); 				// debug
            }            
            
    }
        

    pintarHTML('divOutcome', "<img src=\""+imgOutcome+"\" width=250px><br><br>"+textoOutcome);
    if(training[fase] == FasePrevia){ 
		pintarHTML('divBoton', "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='ITI()' value='Siguiente paciente'/>")	
	}
	else if(training[fase] == FaseTest){
		pintarHTML('divBoton', "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='ITI()' value='Siguiente paciente'/>")	

	}
	else if(training[fase] == FaseControl){
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

		// Esta siguiente línea se activa si estamos en la fase de creación de expectativas TFK
		if(training[fase] == FasePrevia){
			console.log("Estamos en la fase de manipulación");
			cambiafase();
		}
		else{
			console.log("Esta es la fase de test de verdad");
			showJuicio();
			juiciorealizado++;	
		}
	
     }
}

function showJuicio(){
    ocultar(divContingencia);
    ocultar(divTextos);
    
	// Se deja comentado por si hay que segregar por fases: 
    //if(training[fase] == FasePrevia){ 
	//	textoJuicio= "<p class=\"pregunta\">¿Hasta qué punto crees que el recalibrado es efectivo para resolver los comportamientos erráticos de los sensores de ángulo de ataque?</p>";
	//}
	//lse if(training[fase] == FaseTest){
	//	textoJuicio= "<p class=\"pregunta\">¿Hasta qué punto crees que el "+
	//		training[fase].nombreClave+" es efectivo para curar las crisis del "+training[fase].nombreSindrome+"?</p>";
	//}
	textoJuicio= "<p class=\"pregunta\">¿Hasta qué punto crees que el "+
			training[fase].nombreClave+" es efectivo para curar las crisis del "+training[fase].nombreSindrome+"?</p>";
	

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
    
	textoConfianza= "<p class=\"pregunta\">¿Hasta qué punto estás seguro de tu respuesta sobre la efectividad del "+training[fase].nombreClave+"?</p>";
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
    
	//if(training[fase] == FasePrevia){ 
	//	textoRiesgo= "<p class=\"pregunta\">¿Qué nivel de riesgo has considerado que tenían tus decisiones para la seguridad de la aeronave?</p>";
	//}
	//else if(training[fase] == FaseTest){
	//	textoRiesgo= "<p class=\"pregunta\">¿Qué nivel de riesgo has considerado que tenían tus decisiones para la salud de los pacientes?</p>";
	//}
	textoRiesgo= "<p class=\"pregunta\">¿Qué nivel de riesgo has considerado que tenían tus decisiones para la salud de los pacientes?</p>";
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

function showEvidentialValue(){
	
	console.log("Vamos a ver que el orden de Evidential Value se haya hecho aleatorio de forma correcta:");
	console.log(tempOrden);

	tomaOno = "";
    recuperaOno = "";
	//while(tempOrden.length){  // Checks if tempOrden is empty --> False si está vacío, en ese momento tendremos que salir del bucle
	//	pregunta = tempOrden.pop()
	//}


	ocultar(divContingencia);
	ocultar(divTextos);
	pregunta = tempOrden.pop()
	console.log("Vamos a ver que efectivamente estamos eliminando opciones");
	console.log(tempOrden);

	if (pregunta == "a"){
		tomaOno = "fue administrado \"Batatrim\"";
		recuperaOno = "superó la crisis";
		Clarificar1 = FaseTest.ImagenClave;
		Clarificar2 = FaseTest.ImagenSano;
	}
	else if (pregunta == "b"){
		tomaOno = "fue administrado \"Batatrim\"";
		recuperaOno = "NO superó la crisis";
		Clarificar1 = FaseTest.ImagenClave;
		Clarificar2 = FaseTest.ImagenSindrome;
	}
	else if (pregunta == "c"){
		tomaOno = "NO fue administrado \"Batatrim\"";
		recuperaOno = "superó la crisis";
		Clarificar1 = FaseTest.ImagenNOClave;
		Clarificar2 = FaseTest.ImagenSano;
	}
	else if (pregunta == "d"){
		tomaOno = "NO fue administrado \"Batatrim\"";
		recuperaOno = "NO superó la crisis";
		Clarificar1 = FaseTest.ImagenNOClave;
		Clarificar2 = FaseTest.ImagenSindrome;
	}
	textoEvidentialValue= "<p class=\"pregunta\">A veces has visto que el paciente "+tomaOno +" y "+recuperaOno+". " 
		+"¿Consideras que estos casos son importantes para determinar la eficacia del \"Batatrim\"?<br>"
		+ "<table style=\"text-align: center; align-content:center; border: 0px; width: 100%;\"><tr><td><img src=\""+Clarificar1+"\" width=\"150px\"></td><td><img src=\""+Clarificar2+"\" width"
		+ "=\"150px\"></td></tr></table></p>";
	//	+ "=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table></p>";
	
	// Estas dos líneas ya son un poco redundantes
	textoInstrucciones="<p>Responde usando la siguiente escala, donde los números se interpretan así:</p><ul><li>0: Casualidad.</li><li>100: Evidencia.</li></ul>";
	textoEvidentialValue = textoEvidentialValue.concat(textoInstrucciones);

	pintarHTML('divPregunta', textoEvidentialValue);
	
	document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');

	ReseteoJuicios();
		
	document.getElementById("textInput").disabled = true;
	document.getElementById("textInput").value = "";

	// tempEvidentialValue = document.getElementById('textInput').value // <-- así se guarda el valor que da el participante de validaJuicio
	// Aquí hay que hacer que mientras no tengamos las cuatro preguntas no lance valida juicio
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
			//training[fase].Juicio=document.getElementById('textInput').value;
			FaseTest.Juicio=document.getElementById('textInput').value; 			// Añadido porque en el exp CVTD22XX2 solo guardamos en fase test
			//console.log("--- LA HORA DEL JUICIO ESTÁ CERCA!!! ---");			// debug
			//console.log(training[fase].Juicio);								// debug
		}	
		else if(training[fase].Confianza==999){
			//training[fase].Confianza=document.getElementById('textInput').value;
			FaseTest.Confianza=document.getElementById('textInput').value;			// Añadido porque en el exp CVTD22XX2 solo guardamos en fase test
			//console.log("--- LA HORA DE LA CONFIANZA ESTÁ CERCA!!! ---");		// debug
			//console.log(training[fase].Confianza);							// debug
		}	
		else if(training[fase].Riesgo==999){
			//training[fase].Riesgo=document.getElementById('textInput').value;
			FaseTest.Riesgo=document.getElementById('textInput').value;		// Añadido porque en el exp CVTD22XX2 solo guardamos en fase test
			//console.log("--- LA HORA DEL RIESGO ESTÁ CERCA!!! ---");			// debug
			//console.log(training[fase].Riesgo);								// debug
		}
		else{
			if (pregunta == "a"){
				evidenciaA = document.getElementById('textInput').value;
			}
			else if (pregunta == "b"){
				evidenciaB = document.getElementById('textInput').value;
			}
			else if (pregunta == "c"){
				evidenciaC = document.getElementById('textInput').value;
			}
			else if (pregunta == "d"){
				evidenciaD = document.getElementById('textInput').value;
			}
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
		else if(evidenciavaluado<4){
			showEvidentialValue() 
			evidenciavaluado++
		}
		else if(evidenciavaluado==4){
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
    if (grupoAsignado > 3){
		FaseTest.EvidentialValue = [evidenciaA, evidenciaB, evidenciaC, evidenciaD]; 
		console.log("The evidential value is: "+FaseTest.EvidentialValue+", TFK TFK TFK.");
		siguienteTexto();
	}
	else if(fase==0) {
        fase++;
        state=0; 
        

		juiciorealizado=0;
		confianzaevaluada=0;
		riesgoevaluado=0;
		evidenciavaluado=0;

		FaseTest.EvidentialValue = [evidenciaA, evidenciaB, evidenciaC, evidenciaD]; 
		console.log("The evidential value is: "+FaseTest.EvidentialValue+" without TFK TFK.");
		siguienteTexto();
     }
	else{
		FaseTest.EvidentialValue = [evidenciaA, evidenciaB, evidenciaC, evidenciaD]; 
		console.log("The evidential value is: "+FaseTest.EvidentialValue+" without TFK.");
		siguienteTexto();
	}

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
	console.log("Estado de texto actual = " + stateTexto)
    stateTexto++;	
}

function previoTexto(){
	stateTexto=stateTexto-2;
    siguienteTexto();
}

// Inicializamos el arrayInstruc con el modo grupos experimentales (grupos A y B)

if(grupoAsignado<2){ // Instrucciones para los grupos A1 y A2: 
	console.log("Preparando textos para grupo de ALTA");
	var arrayInstruc=[
		//0: (portada)  // TFK requiere cambio
		"<h2 class=\"titulo\">ESTUDIO CVTD22XX2</h2><p>¡Muchas gracias por participar en esta investigación, no seria posible sin ti!</p><br><br><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"img/uned.png\" width=\"200px\"><p>Sigue las instrucciones que encontrarás a continuación.</p>",
			
		// EXPERIMENTAL! Instrucciones para la fase previa // TFK Comprobar - modificada
		//2: Instrucciones 1
		"<h3 class=\"titulo\">Instrucciones</h3><p align=\"left\">Imagina que eres un médico que trabaja en el laboratorio de investigación de una universidad. Eres especialista en una enfermedad muy rara y peligrosa llamada "+ FaseTest.nombreSindrome+", que hay que tratar muy rápido en urgencias. Las crisis que provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada "+ FaseTest.nombreClave+".<br>",
					
		//3: Instrucciones 2.a // TFK requiere cambio // TFK Comprobar - modificada
		"<h3 class=\"titulo\">Instrucciones</h3><p> Como parte de un experimento piloto de los ensayos clínicos para evaluar la efectividad del \"Batatrim\", te vamos a presentar una serie de fichas médicas de pacientes que están sufriendo una crisis del \"Síndrome de Lindsay\". <br><br>En cada ficha verás un paciente al que se ha administrado \"Batatrim\" y se te pedirá intentar predecir si va a superar la crisis o no. </p>",
				
		//4: Instrucciones 2.b // TFK requiere cambio en las IMÁGENES!! 
		"<h3 class=\"titulo\">Instrucciones</h3><p>El procedimiento será el siguiente: para cada nuevo paciente, debes intentar predecir si va a superar la crisis o no, pulsando la imagen correspondiente de las dos siguientes.</p><br><br><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Va a superar la crisis</td><td>No va a superar la crisis</td></tr></table><br><br>",
				
		//5: Instrucciones 2.c // TFK requiere cambio // TFK Comprobar - modificada
		"<p><h3 class=\"titulo\">Instrucciones</h3>A continuación te informaremos de si el paciente superó la crisis. Después de darte esa información, se te presentará la ficha del siguiente paciente.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><p> Cuando hayas visto a un cierto número de pacientes pasaremos a la siguiente fase.</p>",
				
		//6: Instrucciones de la tarea de ALERGIAS // TFK requiere cambio - Texto fundamental en la fase de manipulación // CAMBIAR PARA GRUPOS B
		"<p><h3 class=\"titulo\">Instrucciones</h3>Ya has terminado esta fase del estudio de "+FaseTest.nombreSindrome +". Como has visto, la tasa de recuperación de los pacientes que han recibido \"Batatrim\" ha sido "+FasePrevia.textoTransitAlta+". <br><br> Después de ver los resultados anteriores, se te ha invitado a participar en un nuevo experimento con un grupo de población distinto al del experimento piloto.</p>",
	
		//6: Instrucciones 1b Phase 2: // TFK requiere cambio
		"<p><h3 class=\"titulo\">Instrucciones</h3><p>Como parte de los ensayos clínicos para evaluar la efectividad del \"Batatrim\", te vamos a presentar una nueva serie de fichas médicas de pacientes que están sufriendo una crisis del \"Síndrome de Lindsay\". En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el \"Batatrim\". <br><br> En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el "+FaseTest.nombreClave+".</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table>",
				
		//7: Instrucciones 2 Phase 2 // TFK requiere cambio
		"<h3 class=\"titulo\">Instrucciones</h3><p>A continuación te informaremos de si el paciente superó la crisis. Después de darte esa información, se te presentará la ficha del siguiente paciente. </p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><br><p>Intenta averiguar hasta qué punto es efectivo el "+FaseTest.nombreClave+ ". Cuando hayas tratado a un buen número de pacientes te haremos algunas preguntas.</p>",
				
		// A guardar datos via Firebase!  
		//13: Save Data...
		"<h3 class=\"titulo\">Envío de datos</h3><p>A continuación podrás enviar los resultados para que se incluyan en nuestro estudio. Los datos que nos aportes se unirán a los del grupo y serán analizados estadísticamente.</p><p align=\"left\"> Para hacerlo, haz click en el botón \"Enviar\".</p>",
				
		//13:
		"<h3 class=\"titulo\">Ya has terminado. ¡Muchas gracias por tu colaboración!</h3><p><br>Pulsa F11 para salir del modo pantalla completa.<br><br>Autores:"
			+" <br>Carlos Vera, Pedro Montoro, Cris Orgaz y María José Contreras.</p>"
	];
}
else if(grupoAsignado>3){ // Instrucciones para el grupo de CONTROL 
	// GRUPO EXPERIMENTAL Contrabalanceo: Tarea alergia -> Tarea aeronáutica
	// Hay que modificar el arrayInstruc
	console.log("Preparando textos para grupo de CONTROL");
	var arrayInstruc=[
		//0: (portada) //TFK Corregir 
		"<h2 class=\"titulo\">ESTUDIO CVTD22XX2</h2><p>¡Muchas gracias por participar en esta investigación, no seria posible sin ti!</p><br><br><img style=\"display"
		+ ": block; margin-left: auto; margin-right: auto;\" src=\"img/uned.png\" width=\"200px\"><p>Sigue las instrucciones que encontrarás a continuación.</p>",
	
		//2: Instrucciones 1 //TFK Corregir 
		"<h3 class=\"titulo\">Instrucciones</h3><p align=\"left\">Imagina que eres un médico que trabaja en el laboratorio de investigación de una universidad. "
		+ "Eres especialista en una enfermedad muy rara y peligrosa llamada "+ FaseTest.nombreSindrome+", que hay que tratar muy rápido en urgencias. "
		+ "Las crisis que provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada "+ FaseTest.nombreClave+", pero esta medicina aún está en " 
		+ "fase experimental, por lo que todavía no se ha comprobado claramente su efectividad.</p><br>",
		
		//3: Instrucciones 2.a //TFK Corregir 
		"<h3 class=\"titulo\">Instrucciones</h3><p>Como parte de los ensayos clínicos para evaluar la efectividad del \"Batatrim\", te vamos a presentar una serie "
			+ "de fichas médicas de pacientes que están sufriendo una crisis del "+FaseTest.nombreSindrome +". En cada ficha verás un paciente y se te dará la oportunidad "
			+ "de administrarle o no el "+FaseTest.nombreClave+ ".</p>",
		
		//4: Instrucciones 2.b //TFK Corregir 
		"<h3 class=\"titulo\">Instrucciones</h3><p>El procedimiento será el siguiente: para cada nuevo paciente, debes decidir si quieres administrar el "
		+ ""+FaseTest.nombreClave+ " o no, pulsando la imagen correspondiente de las dos siguientes.</p><br><br><table style=\"text-align: center; align-content:"
		+ "center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenNOClave+"\" width"
		+ "=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table><br><br>",
		
		//5: Instrucciones 2.c //TFK Corregir 
		"<p><h3 class=\"titulo\">Instrucciones</h3>A continuación te informaremos de si el paciente superó la crisis. Después de darte esa información, "
		+ "se te presentará la ficha del siguiente paciente.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\">"
		+ "<tr><td><img src=\""+FaseTest.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>"
		+ "Paciente enfermo</td><td>Paciente curado</td></tr></table><p>Intenta averiguar hasta qué punto es efectivo el "+FaseTest.nombreClave+ ". "
		+ "Cuando hayas tratado a un buen número de pacientes te haremos algunas preguntas.</p>",
						
		//6: Instrucciones de la tarea de ALERGIAS // TFK requiere cambio - Texto fundamental en la fase de manipulación // CAMBIAR PARA GRUPOS B
		//"<p><h3 class=\"titulo\">Instrucciones</h3>Ya has terminado esta fase del estudio de "+FaseTest.nombreSindrome +". Como has visto, la tasa de" 
		//+" recuperación de los pacientes que han recibido \"Batatrim\" ha sido "+FasePrevia.textoTransitBaja+". <br><br> Después de ver los resultados anteriores,"
		//+ " se te ha invitado a participar en un nuevo experimento con un grupo de población distinto al del experimento piloto.</p>", // TFK Eliminar texto
		
		//6: Instrucciones 1b Phase 2: // TFK requiere cambio
		//"<p><h3 class=\"titulo\">Instrucciones</h3><p>Como parte de los ensayos clínicos para evaluar la efectividad del \"Batatrim\", te vamos a presentar una nueva serie de fichas médicas de pacientes que están sufriendo una crisis del \"Síndrome de Lindsay\". En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el \"Batatrim\". <br><br> En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el "+FaseTest.nombreClave+".</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table>",
				
		//7: Instrucciones 2 Phase 2 // TFK requiere cambio
		//"<h3 class=\"titulo\">Instrucciones</h3><p>A continuación te informaremos de si el paciente superó la crisis. Después de darte esa información, se te presentará la ficha del siguiente paciente. </p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><br><p>Intenta averiguar hasta qué punto es efectivo el "+FaseTest.nombreClave+ ". Cuando hayas tratado a un buen número de pacientes te haremos algunas preguntas.</p>",

		// A guardar datos! 
		//13: Save Data... 
		"<h3 class=\"titulo\">Envío de datos</h3><p>A continuación podrás enviar los resultados para que se incluyan en nuestro estudio. Los datos que nos aportes se unirán a los del grupo y serán analizados estadísticamente.</p><p align=\"left\"> Para hacerlo, haz click en el botón \"Enviar\".</p>",
		
		//13:
		"<h3 class=\"titulo\">Ya has terminado. ¡Muchas gracias por tu colaboración!</h3><p><br>Pulsa F11 para salir del modo pantalla completa.<br><br>Autores:"
			+" <br>Carlos Vera, Pedro Montoro, Cris Orgaz y María José Contreras.</p>"
			//+ "<br><br> Si quieres más información sobre la ilusión de control puedes consultar nuestro trabajo previo aquí: <TFK Missing link>"
	];
}
else{
	console.log("Preparando textos para grupo de BAJA");
	var arrayInstruc=[ // Instrucciones para los grupos B1 y B2: 
		//0: (portada)  // TFK requiere cambio
		"<h2 class=\"titulo\">ESTUDIO CVTD22XX2</h2><p>¡Muchas gracias por participar en esta investigación, no seria posible sin ti!</p><br><br><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"img/uned.png\" width=\"200px\"><p>Sigue las instrucciones que encontrarás a continuación.</p>",
			
		// EXPERIMENTAL! Instrucciones para la fase previa // TFK Comprobar - modificada
		//2: Instrucciones 1
		"<h3 class=\"titulo\">Instrucciones</h3><p align=\"left\">Imagina que eres un médico que trabaja en el laboratorio de investigación de una universidad. Eres especialista en una enfermedad muy rara y peligrosa llamada "+ FaseTest.nombreSindrome+", que hay que tratar muy rápido en urgencias. Las crisis que provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada "+ FaseTest.nombreClave+".<br>",
					
		//3: Instrucciones 2.a // TFK requiere cambio // TFK Comprobar - modificada
		"<h3 class=\"titulo\">Instrucciones</h3><p> Como parte de un experimento piloto de los ensayos clínicos para evaluar la efectividad del \"Batatrim\", te vamos a presentar una serie de fichas médicas de pacientes que están sufriendo una crisis del \"Síndrome de Lindsay\". <br><br>En cada ficha verás un paciente al que se ha administrado \"Batatrim\" y se te pedirá intentar predecir si va a superar la crisis o no. </p>",
				
		//4: Instrucciones 2.b // TFK requiere cambio en las IMÁGENES!! 
		"<h3 class=\"titulo\">Instrucciones</h3><p>El procedimiento será el siguiente: para cada nuevo paciente, debes intentar predecir si va a superar la crisis o no, pulsando la imagen correspondiente de las dos siguientes.</p><br><br><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Va a superar la crisis</td><td>No va a superar la crisis</td></tr></table><br><br>",
				
		//5: Instrucciones 2.c // TFK requiere cambio // TFK Comprobar - modificada
		"<p><h3 class=\"titulo\">Instrucciones</h3>A continuación te informaremos de si el paciente superó la crisis. Después de darte esa información, se te presentará la ficha del siguiente paciente.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><p> Cuando hayas visto a un cierto número de pacientes pasaremos a la siguiente fase.</p>",
				
		//6: Instrucciones de la tarea de ALERGIAS // TFK requiere cambio - Texto fundamental en la fase de manipulación // CAMBIAR PARA GRUPOS B
		"<p><h3 class=\"titulo\">Instrucciones</h3>Ya has terminado esta fase del estudio de "+FaseTest.nombreSindrome +". Como has visto, la tasa de recuperación de los pacientes que han recibido \"Batatrim\" ha sido "+FasePrevia.textoTransitBaja+". <br><br> Después de ver los resultados anteriores, se te ha invitado a participar en un nuevo experimento con un grupo de población distinto al del experimento piloto.</p>",
		
		//6: Instrucciones 1b Phase 2: // TFK requiere cambio
		"<p><h3 class=\"titulo\">Instrucciones</h3><p>Como parte de los ensayos clínicos para evaluar la efectividad del \"Batatrim\", te vamos a presentar una nueva serie de fichas médicas de pacientes que están sufriendo una crisis del \"Síndrome de Lindsay\". En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el \"Batatrim\". <br><br> En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el "+FaseTest.nombreClave+".</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table>",
				
		//7: Instrucciones 2 Phase 2 // TFK requiere cambio
		"<h3 class=\"titulo\">Instrucciones</h3><p>A continuación te informaremos de si el paciente superó la crisis. Después de darte esa información, se te presentará la ficha del siguiente paciente. </p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+FaseTest.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+FaseTest.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><br><p>Intenta averiguar hasta qué punto es efectivo el "+FaseTest.nombreClave+ ". Cuando hayas tratado a un buen número de pacientes te haremos algunas preguntas.</p>",
				
		// A guardar datos via Firebase!  
		//13: Save Data...
		"<h3 class=\"titulo\">Envío de datos</h3><p>A continuación podrás enviar los resultados para que se incluyan en nuestro estudio. Los datos que nos aportes se unirán a los del grupo y serán analizados estadísticamente.</p><p align=\"left\"> Para hacerlo, haz click en el botón \"Enviar\".</p>",
				
		//13:
		"<h3 class=\"titulo\">Ya has terminado. ¡Muchas gracias por tu colaboración!</h3><p><br>Pulsa F11 para salir del modo pantalla completa.<br><br>Autores:"
			+" <br>Carlos Vera, Pedro Montoro, Cris Orgaz y María José Contreras.</p>"
			+ "<br><br> Si quieres más información sobre la ilusión de control puedes consultar nuestro trabajo previo aquí: <TFK Missing link>"		
	];
}
 
if(grupoAsignado>3){
	// También hay que modificar el array de botones?? TFK El bug de "Atrás / Comenzar" parece estar en otro sitio
	console.log("Preparando botones para grupo de CONTROL");
	var arrayBoton = [
		//0:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='cuestionarioEdad()' value='Empezar'/>",
		
		//1:
		//"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='cuestionarioEdad()' value='Continuar'/>",
		
		//2:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",
		//3:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>"
			+ "   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

		//4:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>"
			+ "   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",
		
		//5:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>"
			+"   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='showCue()' value='Comenzar'/>",
		
		//6a:
		//"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

		//6b:
		//"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>"
		//	+ "   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

		
		//7:
		//"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>"
		//	+ "   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='showCue()' value='Comenzar'/>",
		
		// A guardar datos! 
		//13:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='saveData()' value='Enviar'/>",
		
		//14:
		""
		
	];
}
else {
	console.log("Preparando textos para grupos A y B");
	var arrayBoton = [
		//0:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='cuestionarioEdad()' value='Empezar'/>",
		
		//1:
		//"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='cuestionarioEdad()' value='Continuar'/>",
		
		//2:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",
		//3:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>"
			+ "   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

		//4:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>"
			+ "   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",
		
		//5:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>"
			+"   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='showCue()' value='Comenzar'/>",
		
		//6a:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

		//6b:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>"
			+ "   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

		
		//7:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>"
			+ "   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='showCue()' value='Comenzar'/>",
		
		// A guardar datos! 
		//13:
		"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='saveData()' value='Enviar'/>",
		
		//14:
		""
		];
}




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
	generaEnsayos();
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
     
	if(grupoAsignado>3){  // En esta caso estamos en un participante del grupo de control
		data = 
			"ExpCVTD22XX2" + "," + 
			groupNames[grupoAsignado] + "," + 
			personId + "," +                		//ID aleatorio
			//PartIP + "," +						// IP del participante //Modified for testing TFK
			Age + "," +         		
			Gender + "," +		
			FaseTest.Juicio + "," + 				//Juicio 
			FaseTest.Confianza + "," + 				//Confianza 
			FaseTest.Riesgo + "," + 				//Riesgo 
			FaseTest.EvidentialValue + "," +  			//Evidential Value (a,b,c,d) respuestas dadas
			FaseTest.secuenciaResps + "," + 		//Secuencia de respuestas dada
			FaseTest.posibleOutcomes + "," + 		//Secuencia de resultados de éxito presentada
			FaseTest.secuenciaCells + "," + 		//Secuencia de combinaciones acción-éxito
			FaseControl.secuenciaResps + "," + 		//Fase 2 - Secuencia de respuestas dada
			FaseControl.posibleOutcomes + "," + 	//Fase 2 - Secuencia de resultados de éxito presentada
			FaseControl.secuenciaCells + "," +  				//Fase 2 - Secuencia de combinaciones acción-éxito
			FaseTest.TiemposRespuesta + "," + 		//Tiempos de respuesta 
			fecha
	}
	else{
		data = 
			"ExpCVTD22XX2" + "," + 
			groupNames[grupoAsignado] + "," + 
			personId + "," +                		//ID aleatorio
			//PartIP + "," +						// IP del participante //Modified for testing TFK
			Age + "," +         		
			Gender + "," +		
			FaseTest.Juicio + "," + 				//Juicio 
			FaseTest.Confianza + "," + 				//Confianza 
			FaseTest.Riesgo + "," + 				//Riesgo 
			FaseTest.EvidentialValue + "," +  		// Evidential value - respuestas dadas en un array
			FaseTest.secuenciaResps + "," + 		//Secuencia de respuestas dada
			FaseTest.posibleOutcomes + "," + 		//Secuencia de resultados de éxito presentada
			FaseTest.secuenciaCells + "," + 		//Secuencia de combinaciones acción-éxito
			FasePrevia.secuenciaResps + "," + 		//Fase 2 - Secuencia de respuestas dada
			FasePrevia.posibleOutcomes + "," + 		//Fase 2 - Secuencia de resultados de éxito presentada
			FasePrevia.secuenciaCells + "," + 	 				//Fase 2 - Secuencia de combinaciones acción-éxito
			FaseTest.TiemposRespuesta + "," + 		//Tiempos de respuesta 
			fecha
	}
    
    ;
    
	// Así guardaba los partizipantes en el primer experimento, que solo tenía 2 tipos. Ahora me da que ya no me vale porque tengo 6. 
	//if(group == "Experimental"){
		//actualizarGrupo= grouplist[grupoAsignado]+1;
		//firebase.database().ref('GrupoControlExp').set(actualizarGrupo);				// MODO DEMO SIN CONEXIÓN
		//console.log("Un participante al grupo normal")				// debug
	//}
	//else {
		//actualizarGrupo= grouplist[grupoAsignado]+1;
		// firebase.database().ref('GrupoControlContrabalanceo').set(actualizarGrupo); 	// MODO DEMO SIN CONEXIÓN
		//console.log("Un participante al grupo de contrabalanceo")		// debug
	//}
	// la siguiente línea guarda un vector con los participantes. 
	// Recordatorio de cómo se lee: 
	// grouplist = [grupoA1, grupoA2, grupoB1, grupoB2, grupoC1, grupoC2];
	console.log("participantes: "+grouplist+".")
	grouplist[grupoAsignado]++
	console.log("participantes: "+grouplist+".")
	firebase.database().ref('participantesPorGrupo').set(grouplist)
	//firebase.database().ref('participantes/porGrupo/participantesPorGrupo').set(grouplist)



    //console.log(data);      // Debug
    guardaFirebase();
    siguienteTexto();
}

function guardaFirebase(){

	var expdata={
		expName:"TFM-Carlos",
		datos:data
	}
    
	firebase.database().ref('datoscontrol/').push(data); 								// MODO Operativo! 
    //firebase.database().ref('datoscontrol/').push(data); 								// MODO DEMO SIN CONEXIÓN
	console.log("Experimento realizado en modo DEMO. ¡Datos NO guardados!");
}

