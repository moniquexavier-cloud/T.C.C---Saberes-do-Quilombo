import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// ===== Schema para cadastro =====

const cadastroSchema = z.object({
    nome: z
        .string()
        .min(1, "Nome é obrigatório"),

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

    id_quilombo: z
       .string()
       .regex(objectIdRegex, "ID de quilombo inválido.")
       .optional()
       .nullable(),
    }) 
  .refine((data) => {
  if (data.role === 'LIDER') {
    return typeof data.id_quilombo === 'string' && objectIdRegex.test(data.id_quilombo);
  }
  return true;
}, {
  message: "Líderes devem informar um id_quilombo válido.",
  path: ["id_quilombo"]
});


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
    cadastroSchema,
    loginSchema,
    validate
};


