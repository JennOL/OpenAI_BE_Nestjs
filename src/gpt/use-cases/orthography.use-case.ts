import OpenAI from 'openai';

interface Options{
    prompt: string;
}

export const orthographyCheckUseCase = async (openai: OpenAI, {prompt}: Options) => {

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
            { 
                role: "system", 
                content: `
                    Te serán proveídos textos con posibles errores ortográficos y gramaticales,
                    Debes de responder en formato JSON con los errores encontrados,
                    tu tarea es corregirlos y retornar información soluciones,
                    tambien debes de dar un porcentaje de acierto por el usuario,

                    Si no hay errores, debes de retornar un mensaje de felicitaciones.

                    Ejemplo de salida:
                    {
                        userScore: number, // 80
                        errors: string, // ['error': solucion]
                        message: string, // Usa emojis y texto para felicitar al usuario
                    }
                ` 
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    const content = completion.choices[0].message.content;
    return JSON.parse(content);
}