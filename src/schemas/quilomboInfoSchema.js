import { z } from 'zod';

// ===== Schema para GET quilomboInformações =====

const questaoItemSchema = z.object({
    titulo: z.string(),
    descricao: z.string()
});

const quilomboInfoSchema = z.object({

    // Seção História
    historia: z.object({
        titulo: z.string().refine(
            val => val === "História",
            "Título incorreto"
        ),

        imagem: z
            .string()
            .url("A foto deve ser uma URL válida"),

        texto: z
            .string()
            .min(50, "O texto histórico precisa ser mais descritivo.")
    }),

    // Seção Modo de Vida
    modoDeVida: z.object({
        titulo: z.string().refine(
            val => val === "Modo de Vida",
            "Título incorreto"
        ),

        imagem: z
            .string()
            .url("Caminho da imagem inválido ou mal formatado"),

        texto: z
            .string()
            .min(50, "O texto sobre o modo de vida precisa de mais detalhes.")
    }),

    // Seção Cultura
    cultura: z.object({
        titulo: z.string().refine(
            val => val === "Cultura",
            "Título incorreto"
        ),

        imagem: z
            .string()
            .url("Caminho da imagem inválido ou mal formatado"),

        texto: z
            .string()
            .min(50, "O texto cultural precisa de mais detalhes.")
    }),

    // Seção Questões Enfrentadas
    questoesEnfrentadas: z.object({
        titulo: z.string(),
        introducao: z.string(),

        itens: z.array(questaoItemSchema)
            .min(1, "É necessário listar pelo menos uma questão enfrentada.")
    })

});

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


// ===== Exportação dos Schemas e Middleware =====

export {
    quilomboInfoSchema,
    nomeQuilomboSchema,
    questaoItemSchema,
    validate
};