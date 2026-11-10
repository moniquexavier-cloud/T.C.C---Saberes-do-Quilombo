import { z } from 'zod';

// ===== Schema para GET quilomboFontes =====

const quilomboFontesSchema = z.object({

    cartao_referencial_1: z
        .string({
            required_error: "A referência é obrigatória",
            invalid_type_error: "A referência deve ser um texto"
        })
        .min(10, "O texto deve ter no mínimo 10 caracteres")
        .max(2000, "O texto deve ter no máximo 2000 caracteres"),

    cartao_referencial_2: z
        .string({
            required_error: "A referência é obrigatória",
            invalid_type_error: "A referência deve ser um texto"
        })
        .min(10, "O texto deve ter no mínimo 10 caracteres")
        .max(2000, "O texto deve ter no máximo 2000 caracteres"),

    cartao_referencial_3: z
        .string({
            required_error: "A referência é obrigatória",
            invalid_type_error: "A referência deve ser um texto"
        })
        .min(10, "O texto deve ter no mínimo 10 caracteres")
        .max(2000, "O texto deve ter no máximo 2000 caracteres")

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