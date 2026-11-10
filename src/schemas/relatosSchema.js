import { z } from 'zod';

// ===== Schema para POST relato =====

const criarRelatoSchema = z.object({

    quilombo_id: z
        .number()
        .int()
        .positive(),

    texto: z
        .string()
        .min(10, "O texto deve ter no mínimo 10 caracteres")
        .max(2000, "O texto deve ter no máximo 2000 caracteres")

});

// ===== Schema para PATCH relato =====

const editarRelatoSchema = z.object({

    texto: z
        .string()
        .min(10, "O texto deve ter no mínimo 10 caracteres")
        .max(2000, "O texto deve ter no máximo 2000 caracteres")

});

// ===== Schema para ID do relato =====

const idRelatoSchema = z.object({

    id: z
        .coerce
        .number()
        .int()
        .positive()

});

// ===== Schema para nome do quilombo na rota =====

const nomeQuilomboSchema = z.object({
    nome: z.string().trim().min(1, 'O nome do quilombo é obrigatório.')
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
    criarRelatoSchema,
    editarRelatoSchema,
    idRelatoSchema,
    nomeQuilomboSchema,
    validate
};