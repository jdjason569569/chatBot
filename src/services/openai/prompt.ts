import fetch from 'node-fetch';

const apiUrl = 'http://localhost:3000/api/statistics/usertime';

let DATE_BASE = undefined;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data: []) => {
    if (data) {
        
        let result = data.map((value: any) =>{
           return  `${value.name}: ${value.cantidad_turnos_completos}`
        });
        DATE_BASE = result

        console.log("result ", DATE_BASE);
    }
  })
  .catch(error => {
    console.error('Error al hacer la solicitud:', error.message);
  });


const PROMPT = `
COnsulta la base de datos que te doy esta en la siguiente linea
------
BASE_DE_DATOS="{context}"
------
NOMBRE_DEL_CLIENTE="{customer_name}"
INTERROGACIÓN_DEL_CLIENTE="{question}"
`

/**
 * 
 * @param name 
 * @returns 
 */
const generatePrompt = (name: string): string => {
    console.log("DATE_BASE en pront ", DATE_BASE)
    return PROMPT.replaceAll('{customer_name}', name).replaceAll('{context}', DATE_BASE)
}

export { generatePrompt }