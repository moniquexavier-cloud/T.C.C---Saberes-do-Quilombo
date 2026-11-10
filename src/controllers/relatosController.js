
const relatos = [];
const nomesQuilombos = {
    1: 'Cordoaria',
    2: 'Quingoma'
};

let proximoId = 1;

export const getRelatos = (req, res) => {
    return res.status(200).json(relatos);
};

export const createRelato = (req, res) => {
    if (req.usuario.role !== 'LIDER') {
        return res.status(403).json({
            mensagem: 'Apenas líderes podem criar relatos.'
        });
    }

    const { quilombo_id, texto } = req.body;
    const quilombo = nomesQuilombos[quilombo_id];

    if (!quilombo) {
        return res.status(404).json({
            mensagem: 'Quilombo não encontrado.'
        });
    }

    if (req.usuario.quilombo_id !== quilombo_id) {
        return res.status(403).json({
            mensagem: 'Você só pode criar relatos para o seu quilombo.'
        });
    }

    const relato = {
        id: proximoId++,
        quilombo_id,
        quilombo,
        lider_id: req.usuario.id,
        lider: req.usuario.nome,
        data: new Date().toISOString(),
        texto
    };

    relatos.push(relato);

    return res.status(201).json({
        mensagem: "Relato cadastrado com sucesso (Mock)!",
        relatoCriado: relato
    });
};

export const patchRelato = (req, res) => {
    const id = Number(req.params.id);
    const relato = relatos.find(item => item.id === id);

    if (!relato) {
        return res.status(404).json({
            mensagem: "Relato não encontrado."
        });
    }

    if (req.usuario.role !== 'LIDER' || relato.lider_id !== req.usuario.id) {
        return res.status(403).json({
            mensagem: 'Você não pode editar este relato.'
        });
    }

    relato.texto = req.body.texto;

    return res.status(200).json({
        mensagem: "Relato atualizado com sucesso (Mock)!",
        relatoAtualizado: relato
    });
};

export const deleteRelato = (req, res) => {
    const id = Number(req.params.id);
    const indice = relatos.findIndex(item => item.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Relato não encontrado."
        });
    }

    if (
        req.usuario.role !== 'ADMIN' &&
        (req.usuario.role !== 'LIDER' || relatos[indice].lider_id !== req.usuario.id)
    ) {
        return res.status(403).json({
            mensagem: 'Você não pode excluir este relato.'
        });
    }

    const relatoExcluido = relatos.splice(indice, 1);

    return res.status(200).json({
        mensagem: "Relato excluído com sucesso (Mock)!",
        relatoExcluido: relatoExcluido[0]
    });
};