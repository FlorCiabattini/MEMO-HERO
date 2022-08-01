
// Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let timerInicial = 50;
let tiempoRegresivoId = null;


// Sonidos
let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

// Apuntando a doc HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tRestante');

// POPUP
let modal_containerWin = document.getElementById('modal_containerWin');
let modal_containerLose = document.getElementById('modal_containerLose');

// Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

// Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer}`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();

            //ver si funciona
            modal_containerLose.classList.add('show');

        }
    },1000);
}

function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numeros[i]}.png" alt=""></img>`;
        tarjetaBloqueada.disabled = true;
    }
}

// Restart
function restart(){
    location.reload();
}


function volver(){
    modal_containerWin.classList.remove('show');
    modal_containerLose.classList.remove('show');
}

// Funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

        if(tarjetasDestapadas == 1){
            // Mostrar primeri numero
            tarjeta1 = document.getElementById(id);
            primerResultado = numeros[id];
            tarjeta1.innerHTML = `<img src="./imagenes/${primerResultado}.png" alt="">`;
            clickAudio.play();
            
            // Deshabilitar primer boton
            tarjeta1.disabled = true;


        }else if(tarjetasDestapadas == 2){
            // Mostrar segundo numero
            tarjeta2 = document.getElementById(id);
            segundoResultado = numeros[id];
            tarjeta2.innerHTML = `<img src="./imagenes/${segundoResultado}.png" alt=""></img>`;

            // Deshabilitar segundo boton
            tarjeta2.disabled = true;

            // Incrementar movimientos
            movimientos++;
            mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

            if(primerResultado == segundoResultado){
                // Encerrar contador tarjetas destapadas
                tarjetasDestapadas = 0;

                // Aumentar aciertos
                aciertos++;
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                rightAudio.play();

                if(aciertos == 8){
                    winAudio.play();
                    clearInterval(tiempoRegresivoId);
                    mostrarAciertos.innerHTML = `Aciertos: ${aciertos} &#128526`;
                    mostrarTiempo.innerHTML = `Excelente! ${timerInicial - timer} segundos &#127881`;
                    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`

                    //viendo si funciona
                    modal_containerWin.classList.add('show');
                }

            }else{
                wrongAudio.play();
                // Mostrar momentaneamente valores y volver a tapar
                setTimeout(()=>{
                    tarjeta1.innerHTML = '';
                    tarjeta2.innerHTML = '';
                    tarjeta1.disabled = false;
                    tarjeta2.disabled = false;
                    tarjetasDestapadas = 0;
                },800);
            }
        }

}
