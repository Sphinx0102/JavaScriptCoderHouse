
const menu = () =>{
    let opcion = parseInt(prompt("Ingrese 1 si desea calcular o 2 si quiere ver el resultado de la ultima operacion o 3 para salir:"));
    let calculo;

    while(opcion != 3){
        if(opcion == 1){
            calculo = operacion ();
        }
        else if(opcion == 2){
            alert(calculo);
        }
        else{
            alert("la opcion ingresada no corresponde con ninguna opcion correcta. Reintente por favor!");
        }
        opcion = parseInt(prompt("Ingrese 1 si desea calcular o 2 si quiere ver el resultado de la ultima operacion o 3 para salir:"));
    }
}


const operacion = () => {
    let numero = parseInt(prompt("Ingrese el primer numero:"));
    let numero2= parseInt(prompt("Ingrese el segundo numero:"));
    let operador = prompt("Ingrese una de las siguientes operaciones para realizar: \n (Opciones: +, -, /, *)");
    let mensaje = "";
    let resultado = 0;
    while(operador != 'salir'){
        switch(operador){
            case "-":
                resultado= numero - numero2;
                mensaje = "El resultado de la resta es: "+ resultado;
                alert(mensaje);
                break;
            case "+":
                resultado= numero + numero2;
                mensaje = "El resultado de la suma es: "+ resultado;
                alert(mensaje);
                break;
            case "/":
                resultado= numero / numero2;
                mensaje = "El resultado de la division es: "+ resultado;
                alert(mensaje);
                break;
            case "*":
                resultado= numero * numero2;
                mensaje = "El resultado de la multiplicacion es: "+ resultado;
                alert(mensaje);
                break;
            default:{
                alert("la opcion ingresada no corresponde con ninguna opcion correcta. Reintente por favor!");
                break
            }
        }
            
        operador = prompt("Ingrese la operacion a realizar o ingrese salir para el terminar el calculo:");
    }

    return resultado;
}

menu();


