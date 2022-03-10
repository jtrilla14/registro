let errores;

function validaFormularioDatos(div){
    validaFormulario(div);
    if( errores === 0 ) {

//Si no hay errores invocamos el script para insertarlo en la BD
		

		document.formulario1.submit();
		
    } else {
        $('#divErrores').show().focus();
        $('#divErrores').focus();
        setTimeout(
                    function() 
                    {
                        recorrerForm(compError.id);
                    }, 4000);
    }
}



let compError = null; //Almacena el elemento en el que se da el error
//1
function validaFormulario(div) {
    compError = null;
    errores = 0;
    // area de Texto
    let lstTextarea = $('#'+ div +' textarea:visible');
    for ( let i=0; i < lstTextarea.length; i++ ) {
        if(lstTextarea[i].getAttribute('title') !== null && lstTextarea[i].getAttribute('title') === 'Requerido') {
            if( compError === null ) {
                compError = validaTexto(lstTextarea[i]) === false ? lstTextarea[i] : null;
            } else {
                validaTexto(lstTextarea[i]);
            }
        }
    }
    
    // Cajas de Texto
    let lstInputs = $('#'+ div +' input:visible');
    for ( let i=0; i < lstInputs.length; i++ ) {
        if(lstInputs[i].getAttribute('title') !== null && lstInputs[i].getAttribute('title') === 'Requerido') {
            if( compError === null ) {
                compError = validaTexto(lstInputs[i]) === false ? lstInputs[i] : null;
            } else {
                validaTexto(lstInputs[i]);
            }
        }
    }
    
    // Listas
    let lstSelects = $('#' + div + ' select:visible');
    for ( let i=0; i < lstSelects.length; i++ ) {
        if(lstSelects[i].getAttribute('title') !== null && lstSelects[i].getAttribute('title') === 'Requerido') {
            if( compError === null ) {
                compError = validaSelectsRequeridos(lstSelects[i]) === false ? lstSelects[i] : null;
            } else {
                validaSelectsRequeridos(lstSelects[i]);
            }
        }
    }
	
	
	// Radio Button
    let lstradio = $('#'+ div +' input:radio:visible');
    for ( let i=0; i < lstradio.length; i++ ) {
        if(lstradio[i].getAttribute('title') !== null && lstradio[i].getAttribute('title') === 'Requerido') {
            if( compError === null ) {
                compError = validaRadioReq(lstradio[i]) === false ? lstradio[i] : null;
            } else {
					validaRadioReq(lstradio[i]);
            }
        }
    }
}

//2
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
 
 //2
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
//3
function pinta(component, status) {
    let color = status ? "#66afe9" : "#D0021B";
    $("#" + component.id + "").css( "box-shadow", "0 0 3px " + color );
    $("#" + component.id + "").css( "border-color", color);
    $("#" + component.id + "").parent().find('label font').css('color', status ? '#000000' : '#D0021B');
    $("#" + component.id + "").parent().find('small').css('display', status ? 'none' : 'inline' );
}

//4
function recorrerForm(id){
    try {
        $("#"+id).focus();
      $('html,body').animate({
        scrollTop: $("#"+id).offset().top - 150
      },'slow'
    );
    
    } catch(ex) {
        console.log('Error scroll');
    }
}
