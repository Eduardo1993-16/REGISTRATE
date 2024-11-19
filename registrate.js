// import swal from 'sweetalert2'
// import swal from 'sweetalert2/dist/sweetalert2.js' //npm manejador de paquedes de node nides
//por aitageo

//endpoint ruta de la api

//por aitageo

document.addEventListener('DOMContentLoaded',()=>{

    const inputUsuario = document.getElementById('usuario');
    const inputPassword = document.getElementById('password');
    const enviar = document.getElementById('enviar');
    const formulario = document.getElementById('formulario');
    
    
    inputUsuario.addEventListener('blur',validar);//callback(una funcion como parametro dentro de otra funcion)
    inputPassword.addEventListener('blur',validar);
    
    function validar(e){
        const correo = inputUsuario.value.trim();
        const password = inputPassword.value.trim();
        if (e.target.value.trim()=== "") {
            MostrarAlerta(`El campo ${e.target.id} no debe estar vacio`, e.target.parentElement);
    
        } else {
            LimpiarAlerta(e.target.parentElement);//hace referencia el elemento padre del input
            enviar.disabled = false;
    
        }
    }
    
    
    function MostrarAlerta(mensaje,referencia){
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('text-light','bg-danger');
        error.style.width = "100%";
        error.style.height = "20px";
        error.style.marginTop = '8px';
    
    
        referencia.appendChild(error);
    
    }
    
    
    function LimpiarAlerta(referencia){
    const alerta = referencia.querySelector('.text-light');
    if (alerta) {
        alerta.remove();
    }
    
    
    }
    
    
    
    formulario.addEventListener('submit',(e)=>{
        e.preventDefault();
        const correo = inputUsuario.value.trim();
        const password = inputPassword.value.trim();
        if (correo === "" || password === "") {
            enviar.disabled = true;
            MostrarAlerta('Todos los campos son obligatorios');
    
        } else {
            enviar.disabled = false;
             Login(correo,password);
        }
    
    
    
    })
    
    //funcion que hace peticion a la api en el endpoint login validando con codigo de respuesta http
    function  Login(correo,password){
        fetch('http://localhost/api/usuarios/login',{
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            correo: correo,
            password: password
         })
        })
        .then(result=> {
              if (result.status === 200) {
                Swal.fire({
                    title: 'Bienvenido',
                    icon: 'success',
                    showConfirmButton : false
                });
                setTimeout(()=>{
                    window.location.href = 'dashboard.html';
                },1500)
              }else {
                Swal.fire({
                    title: 'Usuario o contraseña incorrectos',
                    icon: 'info',
                    showConfirmButton : true
                });
                setTimeout(()=>{
                    window.location.href = 'resgistrate.html';
                },1500)
              }
           
        }).catch(error=>console.log(error));
    
    }
    
    
    
    
    
    });