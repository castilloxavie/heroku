import { createBrowser } from "../config/browser.js"
import { WEB } from "../config/env.js"
import Accion from "../models/Accion.js"
import { wait } from "../utils/wait.js"

export async function gestionarNavegacion() {
    const browser = await createBrowser();
    const page = await browser.newPage();
    let currentSelector = null; // Variable para rastrear el selector actual

    // Función helper para registrar acciones de forma limpia
    const logAction = async (tipo_accion, url, selector, status, detalles) => {
        await Accion.create({ tipo_accion, url, selector, status, detalles });
    };

    try {
        //!Navegar a la página
        currentSelector = null;
        await page.goto(WEB);
        await logAction('navigate', WEB, null, 'success', 'Navegación inicial a la página principal');

        await wait(2000);

        //!Esperar y obtener el texto del selector proporcionado
        currentSelector = '#content > h1';
        await page.waitForSelector('#content > h1');
        const textoH1 = await page.evaluate(() => document.querySelector('#content > h1').textContent);
        await logAction('get_text', page.url(), '#content > h1', 'success', `Texto obtenido: ${textoH1}`);
        console.log('Texto del h1:', textoH1);

        //!Obtener el segundo texto del selector proporcionado
        currentSelector = '#content > h2';
        await page.waitForSelector('#content > h2');
        const tetx2 = await page.evaluate(() => document.querySelector('#content > h2').textContent);
        await logAction("get_text", page.url(), "#content > h2", "success", `Texto obtenido: ${tetx2}`)
        console.log('Texto del h2:', tetx2);

        //!Obtener un listado de todos los enlaces que hay
        currentSelector = '#content > ul';
        await page.waitForSelector("#content > ul")
        const listadoEnlaces = await page.evaluate(()  => {
            const lista = document.querySelectorAll("#content > ul a")
            return Array.from(lista).map(enlace => ({
                texto: enlace.textContent.trim(),
                url: enlace.href
            }))
        })
        console.log("Listado de enlaces:", listadoEnlaces);
        listadoEnlaces.forEach( async(enlace, index) => {
            console.log(`${index + 1}. ${enlace.texto} -> ${enlace.url}`);
            await logAction('extract_link', page.url(), '#content > ul a', 'success', `Enlace ${index + 1}: ${enlace.texto} -> ${enlace.url}`);
        })
        
        

    } catch (error) {
        console.error('Error durante la navegación:', error);
        await logAction('error', page.url(), currentSelector, 'error', error.message);
    } finally {
        await browser.close();
    }
}

