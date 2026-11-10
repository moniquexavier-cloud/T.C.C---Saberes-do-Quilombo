import { z } from 'zod';

// ===== Schema para login =====

const loginSchema = z.object({

    email: z
        .string()
        .min(1, {
            message: "O e-mail é obrigatório."
        })
        .trim()
        .toLowerCase()
        .email({
            message: "E-mail inválido"
        }),

    senha: z
        .string()
        .min(1, {
            message: "A senha é obrigatória"
        })

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

// ===== Exportação dos Schemas e Middleware =====

export {
    loginSchema,
    validate
};