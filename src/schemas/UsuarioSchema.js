import { z } from 'zod';

// ===== Schema para cadastro =====

const cadastroSchema = z.object({

    nome: z
    .string().min(1, "Nome é obrigatório"),

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
        .min(6, {
            message: "A senha deve ter pelo menos 6 caracteres"
        }),

    role: z
        .enum(['LIDER', 'ADMIN']),

    quilombo_id:
     z.number()

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
    cadastroSchema,
    validate
};