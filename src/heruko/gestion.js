import { createBrowser } from "../config/browser.js";
import { WEB } from "../config/env.js";
import Accion from "../models/Accion.js";
import { HOME } from "../constants/selectores.js";

export async function gestionarNavegacion() {
    const browser = await createBrowser();
    const page = await browser.newPage();
    let currentSelector = null;

    const logAction = async (tipo_accion, url, selector, status, detalles) => {
        await Accion.create({ tipo_accion, url, selector, status, detalles });
    };

    try {
        currentSelector = null;
        await page.goto(WEB);
        await logAction(
            'navigate',
            WEB,
            null,
            'success',
            'Navegación inicial a la página principal'
        );

        await page.waitForSelector(HOME.LIST);

        currentSelector = HOME.TITLE;
        const textoH1 = await page.$eval(HOME.TITLE, el => el.textContent);
        await logAction(
            'get_text',
            page.url(),
            HOME.TITLE,
            'success',
            `Texto obtenido: ${textoH1}`
        );

        currentSelector = HOME.SUBTITLE;
        const textoH2 = await page.$eval(HOME.SUBTITLE, el => el.textContent);
        await logAction(
            'get_text',
            page.url(),
            HOME.SUBTITLE,
            'success',
            `Texto obtenido: ${textoH2}`
        );

        currentSelector = HOME.LIST;
        const listadoEnlaces = await page.$$eval(HOME.LINKS, enlaces =>
            enlaces.map(enlace => ({
                texto: enlace.textContent.trim(),
                url: enlace.href
            }))
        );

        for (let indexx = 0; indexx < listadoEnlaces.length; indexx++) {
            const enlace = listadoEnlaces[indexx];
            await logAction(
                'extract_link',
                page.url(),
                HOME.LINKS,
                'success',
                `Enlace ${indexx + 1}: ${enlace.texto} -> ${enlace.url}`
            );
        }

        

    } catch (error) {
        await logAction(
            'error',
            page.url(),
            currentSelector,
            'error',
            error.message
        );
        throw error;
    } finally {
        await browser.close();
    }
}
