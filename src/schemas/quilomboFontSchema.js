import { z } from 'zod';

// ===== Schema para GET quilomboFontes =====

const quilomboFontesSchema = z.object({

categoria: z
    .string({ required_error: 'A categoria é obrigatória' })
    .trim()
    .toUpperCase()
    .pipe(
      z.enum(['GERAL', 'CORDOARIA', 'QUINGOMA'], {
        errorMap: () => ({ message: 'A categoria deve ser GERAL, CORDOARIA ou QUINGOMA' })
      })
    ),

  titulo: z
    .string({ required_error: 'O título da referência é obrigatório' })
    .trim()
    .min(3, 'O título deve ter pelo menos 3 caracteres'),

  url: z
    .string({ required_error: 'O link (URL) é obrigatório' })
    .trim()
    .url('Insira uma URL válida (ex: https://...)')
});


// ===== Middleware genérico para aplicar o Zod nas requisições =====

const validate = (schema, campo = "body") => (req, res, next) => {

    const result = schema.safeParse(req[campo]);

    if (!result.success) {
        return res.status(400).json({

            mensagem: "Erro de validação nos dados enviados",

            erros: result.error.issues

        });
    }

    req[campo] = result.data;

    next();

};

export {
    quilomboFontesSchema,
    validate
};