/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let errores;

/*function configuraEmailRequerido(value){
    $('#txtEmail').prop( "title", value);
    if(value == 'true'){
        $('#txtEmail').prop( "title", "requerido" );
    }
    
}*/

function validaFormularioDatos(div){
    validaFormulario(div);
    if( errores === 0 ) {

		
		document.formulario1.action="almacenamiento.php";
		document.formulario1.submit();
		
    } else {
        $('#divErrores').show().focus();
        $('#divErrores').focus();
        setTimeout(
                    function() 
                    {
                        goToByScroll(firstComp.id);
                    }, 4000);
    }
}
/*
let recaptcha;

function validaFormularioRegistro(div){
    validaFormulario(div);
    
    if( errores === 0 ) {
        
        uid_call('sfp.boton.registro','clickin');
        if(grecaptcha.getResponse(recaptcha) !== '') {
        $('#clkReg').click();
            } else {
                $('#msgCaptcha').show();
            } 
    } else {
        $('#divErrores').show().focus();
        $('#divErrores').focus();
        setTimeout(
                    function() 
                    {
                        goToByScroll(firstComp.id);
                    }, 4000);
    }
}*/


let firstComp = null; //Almacena el elemento en el que se detectÃ³ el primer error
/**
 * Realiza la validaciÃ³n de los elementos contenidos en el div especificado
 * @param {type} div
 * @returns {undefined}
 */
function validaFormulario(div) {
    firstComp = null;
    errores = 0;
    // Areas de Texto
    let lstTextarea = $('#'+ div +' textarea:visible');
    for ( let i=0; i < lstTextarea.length; i++ ) {
        if(lstTextarea[i].getAttribute('title') !== null && lstTextarea[i].getAttribute('title') === 'Requerido') {
            if( firstComp === null ) {
                firstComp = validaTexto(lstTextarea[i]) === false ? lstTextarea[i] : null;
            } else {
                validaTexto(lstTextarea[i]);
            }
        }
    }
    
    // Cajas de Texto
    let lstInputs = $('#'+ div +' input:visible');
    for ( let i=0; i < lstInputs.length; i++ ) {
        if(lstInputs[i].getAttribute('title') !== null && lstInputs[i].getAttribute('title') === 'Requerido') {
            if( firstComp === null ) {
                firstComp = validaTexto(lstInputs[i]) === false ? lstInputs[i] : null;
            } else {
                validaTexto(lstInputs[i]);
            }
        }
    }
    
    // Selects
    let lstSelects = $('#' + div + ' select:visible');
    for ( let i=0; i < lstSelects.length; i++ ) {
        if(lstSelects[i].getAttribute('title') !== null && lstSelects[i].getAttribute('title') === 'Requerido') {
            if( firstComp === null ) {
                firstComp = validaSelectsRequeridos(lstSelects[i]) === false ? lstSelects[i] : null;
            } else {
                validaSelectsRequeridos(lstSelects[i]);
            }
        }
    }
	
	
	// Radio Button
    let lstradio = $('#'+ div +' input:radio:visible');
    for ( let i=0; i < lstradio.length; i++ ) {
        if(lstradio[i].getAttribute('title') !== null && lstradio[i].getAttribute('title') === 'Requerido') {
            if( firstComp === null ) {
                firstComp = validaRadioReq(lstradio[i]) === false ? lstradio[i] : null;
            } else {
					validaRadioReq(lstradio[i]);
            }
        }
    }
}

/**
 * Valida que los elementos de tipo input contengan algÃºn valor siempre
 * y cuando sean requeridos
 * @param {type} curfield
 * @returns {undefined}
 */
function validaTexto( curfield ) {
    fieldValue  = curfield.value;
    fieldLength = fieldValue.length;
    let status = true;
    if( fieldLength === 0 || fieldValue === "" ) {
        status = false;
        errores++;
    }
    pinta(curfield,status);
    return status;
}
 
 /**
  * Valida que los elementos de tipo select tengan un valor seleccionado,
  * siempre y cuando sean requeridos
  * @param {type} select
  * @returns {undefined}
  */
function validaSelectsRequeridos(select) {
    let status = !(select.selectedIndex === 0);
    if(!status) {
        errores++;
    }
    pinta(select,status);
    return status;
}


function validaRadioReq(x) {
	
	let status = (x.checked);
    
	if(!status) {
        errores++;
    }
	else{
		errores--;
	}
		
		pinta(x,status);
		return status;	
}

/*function pintar(component, status) {
    let color = status ? "#66afe9" : "#D0021B";
    $("#" + component.id + "").css( "box-shadow", "0 0 3px " + color );
    $("#" + component.id + "").css( "border-color", color);
    $("#" + component.id + "").parent().find('label font').css('color', status ? '#000000' : '#D0021B');
    document.getElementById('requcomfir').style.display = 'block';
}*/
/**
 * Se encarga de dar estilo al componente, deacuerdo al estado de validaciÃ³n
 * @param {type} component componente de la interfaz grÃ¡fica
 * @param {type} status estado del componente correcto/Incorrecto
 * @returns {undefined}
 */
function pinta(component, status) {
    let color = status ? "#66afe9" : "#D0021B";
    $("#" + component.id + "").css( "box-shadow", "0 0 3px " + color );
    $("#" + component.id + "").css( "border-color", color);
    $("#" + component.id + "").parent().find('label font').css('color', status ? '#000000' : '#D0021B');
    $("#" + component.id + "").parent().find('small').css('display', status ? 'none' : 'inline' );
}

/**
 * Realiza un scrollTo al elemento con el id especificado
 * @param {type} id
 * @returns {undefined}
 */
function goToByScroll(id){
    try {
        $("#"+id).focus();
      $('html,body').animate({
        scrollTop: $("#"+id).offset().top - 150
      },'slow'
    );
    
    } catch(ex) {
        console.log('Error scrollTO');
    }
}
