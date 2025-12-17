import { createBrowser } from "../config/browser.js"
import { WEB } from "../config/env.js"
import Accion from "../models/Accion.js"
import { wait } from "../utils/wait.js"

export async function gestionarNavegacion() {
    const browser = await createBrowser();
    const page = await browser.newPage();

    // Función helper para registrar acciones de forma limpia
    const logAction = async (tipo_accion, url, selector, status, detalles) => {
        await Accion.create({ tipo_accion, url, selector, status, detalles });
    };

    try {
        //!Navegar a la página
        await page.goto(WEB);
        await logAction('navigate', WEB, null, 'success', 'Navegación inicial a la página principal');

        await wait(2000); 

        //!Esperar y obtener el texto del selector proporcionado
        await page.waitForSelector('#content > h1');
        const textoH1 = await page.evaluate(() => document.querySelector('#content > h1').textContent);
        await logAction('get_text', page.url(), '#content > h1', 'success', `Texto obtenido: ${textoH1}`);
        console.log('Texto del h1:', textoH1);

        //! crear PDF
        await page.pdf({
            path: "src/pdf/archivoPrincipal.pdf",
            format: "A4",
            printBackground: true,
            margin: {top: "40px", bottom: "40px"}
        });
        await logAction('create_pdf', page.url(), null, 'success', 'PDF creado: archivoPrincipal.pdf');
        console.log("Creado PDF");

        //! obtener el subtitulo
        await page.waitForSelector("#content > h2");
        const tetx2 = await page.evaluate(() => document.querySelector("#content > h2").textContent)
        await logAction("get_text", page.url(), "#content > h2", "success", `Texto obtenido: ${tetx2}`)
        console.log('Texto del h2:', tetx2);
        

        
        await wait(1000);

    } catch (error) {
        console.error('Error durante la navegación:', error);
        await logAction('error', page.url(), '#content > h1', 'error', error.message);
    } finally {
        await browser.close();
    }
}

