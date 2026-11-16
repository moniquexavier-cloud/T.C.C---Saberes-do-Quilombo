import jwt from 'jsonwebtoken';

const getJwtSecret = () => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error('JWT_SECRET must be set and contain at least 32 characters.');
  }

  return jwtSecret;
};

export const criarToken = (usuario) => {
  const id = usuario._id ?? usuario.id;
  const quilomboId = usuario.id_quilombo?._id ?? usuario.id_quilombo;

  if (!id) {
    throw new Error('Não foi possível gerar o token: ID do usuário ausente.');
  }

  return jwt.sign(
    {
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      id_quilombo: quilomboId ? String(quilomboId) : null
    },
    getJwtSecret(),
    {
      algorithm: 'HS256',
      subject: String(id),
      expiresIn: '1h'
    }
  );
};

export const autenticar = (req, res, next) => {
  const authorization = req.get('authorization');
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : '';

  try {
    const payload = jwt.verify(token, getJwtSecret(), {
      algorithms: ['HS256']
    });

    if (
      typeof payload === 'string' ||
      typeof payload.sub !== 'string' ||
      !payload.sub ||
      !['ADMIN', 'LIDER'].includes(payload.role) ||
      typeof payload.nome !== 'string' ||
      typeof payload.email !== 'string' ||
      (payload.role === 'LIDER' &&
        (typeof payload.id_quilombo !== 'string' ||
          !/^[a-f\d]{24}$/i.test(payload.id_quilombo)))
    ) {
      return res.status(401).json({
        mensagem: 'Token inválido ou expirado.'
      });
    }

    req.usuario = {
      id: payload.sub,
      nome: payload.nome,
      email: payload.email,
      role: payload.role,
      id_quilombo: payload.id_quilombo
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        mensagem: 'Token inválido ou expirado.'
      });
    }

    next(error);
  }
};

export const exigirAdmin = (req, res, next) => {
  if (req.usuario?.role !== 'ADMIN') {
    return res.status(403).json({
      mensagem: 'Acesso permitido somente para administradores.'
    });
  }

  next();
};