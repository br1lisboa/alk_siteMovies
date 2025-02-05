import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import swAlert from 'sweetalert2';

function Login() {

  const uNavigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    //console.log(regexEmail.test(email));

    if (email === '' || password === '') {
      swAlert.fire({
        title: 'Error!',
        text: 'Debes rellenar los campos de login',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }
    if (email !== '' && !regexEmail.test(email)) {
      swAlert.fire({
        title: 'Error!',
        text: 'Debes escribir una direccion de correo electronico valida',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }
    if (email !== 'challenge@alkemy.org' || password !== 'react') {
      swAlert.fire({
        title: 'Error!',
        text: 'Los datos ingresados son erroneos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }

    axios
      .post('http://challenge-react.alkemy.org', { email, password }) // Los dos parametros que recibe axio son, la url que tiene el endpoint, y los datos que se enviaran.
      .then(res => {
        swAlert.fire({
          title: 'Bienvenido',
          text: 'Has ingresado de manera correcta',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        const tokenRecibido = res.data.token;
        sessionStorage.setItem('token', tokenRecibido); // Localstorage recibe 2 argumentos, el nombre bajo el cual se guarda, y los datos que se recibe
        uNavigate('/listado')
      })
  }

  let token = sessionStorage.getItem('token');

  return (
    <>
      {token && <Navigate to='/listado' />}
      <div className='bg-slate-300 h-screen flex flex-col justify-center items-center'>
        <h2 className='text-4xl w-full flex align-middle justify-center py-8'>Formulario de login</h2>
        <form onSubmit={submitHandler} className='w-full flex flex-col items-center justify-center py-3'>
          <label>
            <span>Correo electronico</span>
            <br />
            <input type="text" name="email" />
            <br />
            <br />
          </label>
          <label>
            <span>Contraseña</span>
            <br />
            <input type="password" name="password" />
            <br />
            <br />
          </label>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </>
  );
}

export default Login;