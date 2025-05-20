import puppeteer from 'puppeteer';
import selectors from './selectors.js';
import { sleep } from './helpers.js';

const { EMAIL, PASSWORD, NOMBRE, APELLIDO, FECHANAC, SEXO, PAIS, CIUDAD, ESTADO, ESTADO_CIVIL } = process.env;
const citasPage = 'https://citas.sre.gob.mx/';

// Tiempo de delay al tipear, en microsegundos
const delay = { delay: 100 };
// Tiempo de espera antes de abortar
const timeout = { timeout: 9999 };


// Abrir Chromium
// Para poder visualizar > headleess: false 
const browser = await puppeteer.launch({ headless: false })
const page = await browser.newPage()


try {
  // Ir a la pagina de citas de la embajada
  await page.goto(citasPage)
  
  // Clickear en ventana modal 'Oficinas Consulares'
  await page.waitForSelector(selectors.oficinaBtn, timeout)
  await page.click(selectors.oficinaBtn)
  
  // Cerrar ventana modal Llave MX
  await page.waitForSelector(selectors.modal1, timeout) 
  await page.click(selectors.modal1)
  
  // Clickear en iniciar sesion con Llave MX
  await page.waitForSelector(selectors.iniciarSesionBtn, timeout) 
  await page.click(selectors.iniciarSesionBtn)

  // Esperar a que termine de cargar la pagina
  await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 9999 });

  // Ingresar email
  await page.waitForSelector(selectors.inputEmail, timeout) 
  await page.click(selectors.inputEmail)
  await page.type(selectors.inputEmail, EMAIL, delay)

  // Ingresar password
  await page.waitForSelector(selectors.inputPassword, timeout)
  await page.click(selectors.inputPassword)
  await page.type(selectors.inputPassword, PASSWORD, delay)

  // Enviar formulario de Login
  await page.waitForSelector('button[type=submit]', timeout)
  await page.click('button[type=submit]')

  // Esperar a que redirija a la nueva pagina
  await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 9999 });

  // Cerrar ventana modal "Confirmacion de datos"
  await page.waitForSelector(selectors.modalConfDatos, timeout);
  await page.click(selectors.modalConfDatos)

  // Clickear en boton "Programar"
  await page.waitForSelector(selectors.programarBtn, timeout);
  await page.click(selectors.programarBtn);

  await sleep(7)

  // Esperar a que redirija a la nueva pagina
  //await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 9999 });


  // Cerrar modal "Si la oficina..."
  await page.waitForSelector(selectors.modal3, timeout);
  await page.click(selectors.modal3)

  // Seleccionar oficina consular
  // Clickear en selector de paises
  const inputPais = '#vs4__combobox';
  await page.waitForSelector(inputPais, timeout);
  await page.click(inputPais)

  // Ingresar pais
  await page.waitForSelector(selectors.inputPais, timeout);
  await page.type(selectors.inputPais, PAIS)

  // Clickear opcion en dropdown
  await page.waitForSelector('#vs4__listbox', timeout);
  await page.click('#vs4__listbox')

  await sleep(3)

  // Cerrar modal "Si la oficina..."
  await page.waitForSelector(selectors.modal4, timeout);
  await page.click(selectors.modal4)

  // Clickear en selector de estados
  await page.waitForSelector(selectors.selectEstado, timeout);
  await page.click(selectors.selectEstado)

  // Ingresar estado
  await page.waitForSelector(selectors.inputEstado, timeout);
  await page.type(selectors.inputEstado, CIUDAD)

  // Clickear opcion en dropdown
  await page.waitForSelector('#vs2__listbox', timeout);
  await page.click('#vs2__listbox')

  // Clickear en selector de oficinas
  await page.waitForSelector(selectors.selectOficina, timeout);
  await page.click(selectors.selectOficina)

  // Ingresar oficina
  await page.waitForSelector(selectors.inputOficina, timeout);
  await page.type(selectors.inputOficina, CIUDAD)

  // Clickear opcion en dropdown
  await page.waitForSelector('#vs3__listbox', timeout);
  await page.click('#vs3__listbox')

  // Clickear boton Seleccionar
  await page.waitForSelector(selectors.seleccionarBtn, timeout);
  await page.click(selectors.seleccionarBtn);

  // Cerrar modal "Confirmacion de oficina"
  await page.waitForSelector(selectors.modal5, timeout);
  await page.click(selectors.modal5);

  // Clickear en link "Agergar manualmente"
  await page.waitForSelector(selectors.agregarLink, timeout);
  await page.click(selectors.agregarLink)

  // Input nombre
  await page.waitForSelector(selectors.inputNombre, timeout);
  await page.click(selectors.inputNombre);
  await page.type(selectors.inputNombre, NOMBRE, delay);

  // Input apellido
  await page.waitForSelector(selectors.inputApellido, timeout);
  await page.click(selectors.inputApellido);
  await page.type(selectors.inputApellido, APELLIDO, delay);

  // Input fecha de nacimiento
  // #dp1747603282365
  // selector por atributo HTML: element[attribute]
  const inputFechaId = '#dp1747502611741';

  // Deshabilitar readonly en el input de fecha
  const disableReadonly = await page.evaluate( () => {
    // Buscar elemento input de fecha
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
    await page.waitForSelector(inputFechaId, timeout);
    await page.click(inputFechaId);
    await page.type(inputFechaId, FECHANAC, delay);
  } else {
    console.log({disableReadonly})
  }


  // Input sexo
  const inputSexo = '#vs5__combobox';
  await page.waitForSelector(inputSexo, timeout);
  await page.click(inputSexo);
  await page.type(inputSexo, SEXO);

  // Clickear opcion del select
  await page.waitForSelector('#vs5__listbox', timeout);
  await page.click('#vs5__listbox');

  // Input nacionalidad
  const inputNac = '#vs6__combobox';
  await page.waitForSelector(inputNac, timeout);
  await page.click(inputNac);
  await page.type(inputNac, PAIS);
  
  // Clickear opcion del select
  await page.waitForSelector('#vs6__listbox', timeout);
  await page.click('#vs6__listbox');

  // Input estado civil
  const inputEstadoCivil = '#vs7__combobox';
  await page.waitForSelector(inputEstadoCivil, timeout);
  await page.click(inputEstadoCivil);
  await page.type(inputEstadoCivil, ESTADO_CIVIL);

  // Clickear opcion del select
  await page.waitForSelector('#vs7__listbox', timeout);
  await page.click('#vs7__listbox');

  // Input Lugar de nacimiento PAIS
  const inputLugarNacPais = '#vs8__combobox';
  await page.waitForSelector(inputLugarNacPais, timeout);
  await page.click(inputLugarNacPais);
  await page.type(inputLugarNacPais, PAIS);
  
  // Clickear opcion del select
  await page.waitForSelector('#vs8__listbox', timeout);
  await page.click('#vs8__listbox');


  // Input Lugar de nacimiento ESTADO not found
  const inputLugarNacEstado = '#vs9__combobox';
  await page.waitForSelector(inputLugarNacEstado, timeout);
  await page.click(inputLugarNacEstado);
  await page.type(inputLugarNacEstado, ESTADO);

  // Clickear opcion del select
  await page.waitForSelector('#vs9__listbox', timeout);
  await page.click('#vs9__listbox');


  // Input Lugar de nacimiento LOCALIDAD
  await page.waitForSelector(selectors.inputLugarNacLocalidad, timeout);
  await page.click(selectors.inputLugarNacLocalidad);
  await page.type(selectors.inputLugarNacLocalidad, CIUDAD, delay)


  // Clickear en boton "Verificar"
  await page.waitForSelector(selectors.verificarBtn, timeout);
  await page.click(selectors.verificarBtn);

  // Clickear en boton radio NO
  await page.waitForSelector(selectors.opcionSiNo, timeout);
  await page.click(selectors.opcionSiNo);

  // Clickear en boton Continuar
  await page.waitForSelector(selectors.continuarBtn, timeout);
  await page.click(selectors.continuarBtn);

   // Esperar a que redirija a la nueva pagina
  await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 9999 });

  // Cerrar modal "Antes de presentarse..."
  await page.waitForSelector(selectors.modalAntesPresentarse, timeout);
  await page.click(selectors.modalAntesPresentarse)
  
  // Clickear en checkbox Visas
  await page.waitForSelector(selectors.checkboxVisas, timeout);
  await page.click(selectors.checkboxVisas)

  // Clickear en boton Agregar
  await page.waitForSelector(selectors.agregarBtn, timeout);
  await page.click(selectors.agregarBtn)





} catch (error) {
  console.log(error)
}



