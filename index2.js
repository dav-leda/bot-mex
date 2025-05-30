import puppeteer from 'puppeteer';
import selectors from './selectors.js';
import { sleep, waitThenClick, countDown } from './helpers.js';

const { EMAIL, PASSWORD, NOMBRE, APELLIDO, FECHANAC, SEXO, PAIS, CIUDAD, ESTADO, ESTADO_CIVIL } = process.env;
const citasPage = 'https://citas.sre.gob.mx/';

// Tiempo de delay al tipear, en microsegundos
const delay = { delay: 100 };


// Abrir Chromium
// Para poder visualizar > headleess: false 
const browser = await puppeteer.launch({ headless: false })
const page = await browser.newPage()


// Ir a la pagina de citas de la embajada
await page.goto(citasPage)

await countDown(6)

// Clickear en ventana modal 'Oficinas Consulares'
await waitThenClick(page, selectors.oficinaBtn)

// Cerrar ventana modal Llave MX
await waitThenClick(page, selectors.modal1)

// Clickear en iniciar sesion con Llave MX
await waitThenClick(page, selectors.iniciarSesionBtn)

// Esperar a que termine de cargar la pagina
await countDown(6)

// Da error, nunca llega a estado "idle"
//await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 9999 });

// Ingresar email
await waitThenClick(page, selectors.inputEmail)
await sleep(2)
await page.type(selectors.inputEmail, EMAIL, delay)

// Ingresar password
await waitThenClick(page, selectors.inputPassword)
await sleep(2)
await page.type(selectors.inputPassword, PASSWORD, delay)

// Enviar formulario de Login
await waitThenClick(page, 'button[type=submit]')

// Esperar a que redirija a la nueva pagina
// await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 9999 });
await countDown(8)

// Cerrar ventana modal "Confirmacion de datos" 
await waitThenClick(page, selectors.modalConfDatos2)

// Clickear en boton "Programar"
await waitThenClick(page, selectors.programarBtn)

// Esperar a que redirija a la nueva pagina
await countDown(8)

// Cerrar modal "Si la oficina..." OK
await waitThenClick(page, selectors.modal3)


// Seleccionar oficina consular
// Clickear en selector de paises
const inputPais = '#vs4__combobox';
await waitThenClick(page, inputPais)

// Ingresar pais
await page.waitForSelector(selectors.inputPais)
await page.type(selectors.inputPais, PAIS)
await sleep(2)

// Clickear opcion en dropdown
const dropdownPais = '#vs4__listbox';
await waitThenClick(page, dropdownPais)

await countDown(6)

// Cerrar modal "Si la oficina..." OK
await waitThenClick(page, selectors.modal4)


// Clickear en selector de estados
await waitThenClick(page, selectors.selectEstado)

// Ingresar estado
await page.waitForSelector(selectors.inputEstado)
await page.type(selectors.inputEstado, CIUDAD)
await sleep(2)

// Clickear opcion en dropdown OK
const dropdownEstado = '#vs2__listbox';
await waitThenClick(page, dropdownEstado)

await countDown(3)

// Clickear en selector de oficinas
await waitThenClick(page, selectors.selectOficina)

// Ingresar oficina
await page.waitForSelector(selectors.inputOficina, timeout);
await page.type(selectors.inputOficina, CIUDAD)
await sleep(2)

// Clickear opcion en dropdown
const dropdownOficina = '#vs3__listbox';
await waitThenClick(page, dropdownOficina)

await countDown(3)

// Clickear en boton Seleccionar
await waitThenClick(page, selectors.seleccionarBtn)
await sleep(2)

// Cerrar modal "Confirmacion de oficina"
await waitThenClick(page, selectors.modal5)

// Clickear en link "Agregar manualmente"
await waitThenClick(page, selectors.agregarLink)

await countDown(6)

// Input nombre
await waitThenClick(page, selectors.inputNombre)
await sleep(2)
await page.type(selectors.inputNombre, NOMBRE, delay)

// Input apellido
await waitThenClick(page, selectors.inputApellido)
await sleep(2)
await page.type(selectors.inputApellido, APELLIDO, delay)


// Input fecha de nacimiento
// selector por atributo HTML: element[attribute]
const inputFechaId = '#dp1747502611741'; // OJO: El ID cambia en cada request

// Deshabilitar readonly en el input de fecha
const disableReadonly = await page.evaluate( () => {
  // Buscar elemento input de fecha OJO: El ID cambia en cada request
  let inputFecha = document.querySelector('#dp1747502611741');
  // Si encuentra el elemento, deshabilitar el readonly
  if (inputFecha) {
    inputFecha.removeAttribute('readonly');
  } else {
    // Loggea en la consola del browser, no en la terminal
    console.log('El id del input de fecha no fue encontrado')
  }
  return inputFecha
})


// Tipear fecha, solo si deshabilito el readonly del input
if (disableReadonly) {
  await waitThenClick(page, inputFechaId)
  await page.type(inputFechaId, FECHANAC, delay)
  await sleep(2)

} else {
  console.log({disableReadonly})
}


// Input sexo
const inputSexo = '#vs5__combobox';
await waitThenClick(page, inputSexo)
await sleep(2)
await page.type(inputSexo, SEXO, delay)

// Clickear opcion del select
const selectSexo = '#vs5__listbox';
await waitThenClick(page, selectSexo)
await sleep(2)


// Input nacionalidad
const inputNac = '#vs6__combobox';
await waitThenClick(page, inputNac)
await sleep(2)
await page.type(inputNac, PAIS, delay)

// Clickear en opcion del select
const selectNac = '#vs6__listbox';
await waitThenClick(page, selectNac)
await sleep(2)


// Input estado civil
const inputEstadoCivil = '#vs7__combobox';
await waitThenClick(page, inputEstadoCivil)
await sleep(2)
await page.type(inputEstadoCivil, ESTADO_CIVIL, delay)

// Clickear opcion del select
const selectEstCivil = '#vs7__listbox';
await waitThenClick(page, selectEstCivil)
await sleep(2)

// Input lugar de nacimiento PAIS
const inputLugarNacPais = '#vs8__combobox';
await waitThenClick(page, inputLugarNacPais)
await sleep(2)
await page.type(inputLugarNacPais, PAIS)

// Clickear opcion del select
const selectLugarNacPais = '#vs8__listbox';
await waitThenClick(page, selectLugarNacPais)
await sleep(2)


// Input Lugar de nacimiento ESTADO
const inputLugarNacEstado = '#vs9__combobox';
await waitThenClick(page, inputLugarNacEstado)
await sleep(2)
await page.type(inputLugarNacEstado, ESTADO, delay)

// Clickear opcion del select
const selectLugarNacEstado = '#vs9__listbox';
await waitThenClick(page, selectLugarNacEstado)
await sleep(2)


// Input Lugar de nacimiento LOCALIDAD
await waitThenClick(page, selectors.inputLugarNacLocalidad)
await sleep(2)
await page.type(selectors.inputLugarNacLocalidad, CIUDAD, delay)

// Clickear en boton "Verificar"
await waitThenClick(page, selectors.verificarBtn)

// Clickear en boton radio "NO"
await waitThenClick(page, selectors.opcionSiNo)

// Clickear en boton Continuar
await waitThenClick(page, selectors.continuarBtn)

// Esperar a que redirija a la nueva pagina
await countDown(8)

// Cerrar modal "Antes de presentarse..."
await waitThenClick(page, selectors.modalAntesPresentarse)

// Clickear en checkbox Visas
await waitThenClick(page, selectors.checkboxVisas)

// Clickear en boton Agregar
await waitThenClick(page, selectors.agregarBtn)


