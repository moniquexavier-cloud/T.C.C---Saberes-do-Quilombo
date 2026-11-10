import { z } from 'zod';

// ===== Schema para GET quilomboCards =====

const quilomboCardSchema = z.object({

    foto: z
        .string()
        .url("A foto deve ser uma URL válida"),

    nome: z
        .string()
        .min(3, {
            message: "O nome deve ter pelo menos 3 caracteres"
        }),

    descricao: z
        .string({
            required_error: "A descrição é obrigatória",
            invalid_type_error: "A descrição deve ser um texto"
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
    quilomboCardSchema,
    validate
};