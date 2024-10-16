import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
    // Leer el cuerpo de la solicitud
    const { userMessage } = await request.json(); // Obtiene el mensaje enviado desde el cliente
  
    // Hacer la llamada a la API de Chatbase
    try {
      const response = await fetch(`${process.env.CHATBASE_API_URL}`, {
        method: 'POST', // Indicamos que es una solicitud POST
        headers: {
          'Content-Type': 'application/json', // Indicamos el tipo de contenido
          'Authorization': `Bearer ${process.env.CHATBASE_API_KEY}`, // Autenticación con la API key
        },
        body: JSON.stringify({
          message: userMessage, // El mensaje que enviamos a Chatbase
          userId: 'usuario123', // Un ID para identificar al usuario
        })
      });
  
      // Manejar la respuesta de Chatbase
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API de Chatbase');
      }
  
      const data = await response.json(); // Parsear la respuesta de la API a JSON
      return NextResponse.json({ respuesta: data.response }); // Enviar la respuesta al cliente
    } catch (error) {
      // Si hay un error, enviamos un mensaje de error
      console.error('Error al llamar a la API de Chatbase:', error);
      return NextResponse.json({ error: 'Error al comunicarse con la API' }, { status: 500 });
    }
  }  