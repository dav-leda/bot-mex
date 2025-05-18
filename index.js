import puppeteer from 'puppeteer';
import { sleep } from './helpers.js';
import selectors from './selectors.js';

const { EMAIL, PASSWORD, NOMBRE, APELLIDO, FECHANAC, SEXO, PAIS, CIUDAD, ESTADO_CIVIL } = process.env;
const citasPage = 'https://citas.sre.gob.mx/';

// Tiempo de delay al tipear, en ms
const delay = { delay: 100 };


// Abrir Chromium
// Para poder visualizar > headleess: false 
const browser = await puppeteer.launch({ headless: false })
const page = await browser.newPage()

// Ir a la pagina de citas de la embajada
await page.goto(citasPage);
await sleep(5);

// Clickear en ventana modal 'Oficinas Consulares'
await page.click(selectors.oficinaBtn);
await sleep(2);

// Cerrar ventana modal Llave MX
await page.click(selectors.modal1);
await sleep(2);

// Clickear en iniciar sesion con Llave MX

await page.click(selectors.iniciarSesionBtn)

// Esperar a que redirija a pagina de Login
// await page.waitForNavigation({ waitUntil: 'networkidle0' });
await sleep(6)

// Ingresar email
await page.click('input[type=text]')
await page.type('input[type=text]', EMAIL, delay);
await sleep(1)

// Ingresar password
await page.click('input[type=password]')
await page.type('input[type=password]', PASSWORD, delay)
await sleep(1)

// Enviar formulario de Login
await page.click('button[type=submit]')

// Esperar a que redirija a nueva pagina
// await page.waitForNavigation({ waitUntil: 'networkidle0' });
await sleep(6)

// Cerrar ventana modal "Confirmacion de datos"
await page.click(selectors.modal2);
await sleep(1)

// Clickear en boton "Programar"
await page.click(selectors.programarBtn);
await sleep(4)

// Cerrar modal "Si la oficina..."
await page.click(selectors.modal3)
await sleep(1)


// Seleccionar oficina consular
// Clickear en selector de paises
await page.click(selectors.selectPais)
await sleep(1)

// Ingresar pais
await page.type(selectors.inputPais, PAIS)
await sleep(1)

// Clickear opcion en dropdown
await page.click('#vs4__listbox')
await sleep(3)

// Cerrar modal "Si la oficina..."
await page.click(selectors.modal4)
await sleep(1)

// Clickear en selector de estados
await page.click(selectors.selectEstado)
await sleep(1)

// Ingresar estado
await page.type(selectors.inputEstado, CIUDAD)
await sleep(1)

// Clickear opcion en dropdown
await page.click('#vs2__listbox')
await sleep(3)

// Clickear en selector de oficinas
await page.click(selectors.selectOficina)
await sleep(1)

// Ingresar oficina
await page.type(selectors.inputOficina, CIUDAD)
await sleep(1)

// Clickear opcion en dropdown
await page.click('#vs3__listbox')
await sleep(3)

// Clickear boton Seleccionar
await page.click(selectors.seleccionarBtn);
await sleep(3)

// Cerrar modal "Confirmacion de oficina"
await page.click(selectors.modal5);
await sleep(1);

// Clickear en link "Agergar manualmente"
await page.click(selectors.agregarLink)
await sleep(1);

// Input nombre
await page.click(selectors.inputNombre);
await page.type(selectors.inputNombre, NOMBRE, delay);

// Input apellido
await page.click(selectors.inputApellido);
await page.type(selectors.inputApellido, APELLIDO, delay);

// Input fecha de nacimiento
// #dp1747603282365
const inputFechaId = '#dp1747502611741';

// Deshabilitar readonly en el input de fecha
const disableReadonly = await page.evaluate( () => {
    // Buscar elemento input de fecha
    let inputFecha = document.querySelector('#dp1747502611741');
    // Si encuentra el elemento, deshabilitar el readonly
    inputFecha && inputFecha.removeAttribute('readonly');
    return inputFecha
  }
);

await sleep(1)

// Tipear fecha, solo si encontro el input de fecha
if (disableReadonly) {
  await page.click(inputFechaId);
  await page.type(inputFechaId, FECHANAC, delay);
  await sleep(1)
}

console.log({disableReadonly})

// Input sexo
const inputSexo = '#vs5__combobox';
await page.click(inputSexo);
await page.type(inputSexo, SEXO);
await sleep(1);
await page.click('#vs5__listbox');
await sleep(1)


// Input nacionalidad
const inputNac = '#vs6__combobox';
await page.click(inputNac);
await page.type(inputNac, PAIS);
await sleep(1)
await page.click('#vs6__listbox');
await sleep(1)

// Input estado civil
const inputEstadoCivil = '#vs7__combobox';
await page.click(inputEstadoCivil);
await page.type(inputEstadoCivil, ESTADO_CIVIL);
await sleep(1);
await page.click('#vs7__listbox');
await sleep(1)

// Input Lugar de nacimiento PAIS
const inputLugarNacPais = '#vs8__combobox';
await page.click(inputLugarNacPais);
await page.type(inputLugarNacPais, PAIS);
await sleep(1)
await page.click('#vs8__listbox');
await sleep(1)

// Input Lugar de nacimiento ESTADO not found
const inputLugarNacEstado = '#vs9__combobox';
// await page.click(inputLugarNacEstado);
// await page.type(inputLugarNacEstado, CIUDAD);
// await sleep(1)
// await page.click('#vs9__listbox');
// await sleep(1)

// Input Lugar de nacimiento LOCALIDAD
await page.click(selectors.inputLugarNacLocalidad);
await page.type(selectors.inputLugarNacLocalidad, CIUDAD, delay)
await sleep(1);

// Clickear en boton "Verificar"
//await page.click(selectors.verificarBtn);
await sleep(3);

