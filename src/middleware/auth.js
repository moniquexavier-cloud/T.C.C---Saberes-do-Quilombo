import jwt from 'jsonwebtoken';

const getJwtSecret = () => {

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error('JWT_SECRET must be set and contain at least 32 characters.');
  }
  return jwtSecret;
};

export const criarToken = usuario => {
  const jwtSecret = getJwtSecret();

  return jwt.sign(
    {
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      quilombo_id: usuario.quilombo_id
    },
    jwtSecret,
    {
      algorithm: 'HS256',
      subject: String(usuario.id),
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
      !payload.sub ||
      !['ADMIN', 'LIDER'].includes(payload.role) ||
      typeof payload.nome !== 'string' ||
      typeof payload.email !== 'string' ||
      (payload.role === 'LIDER' && !Number.isInteger(payload.quilombo_id))
    ) {
      return res.status(401).json({
        mensagem: 'Token inválido ou expirado.'
      });
    }

    req.usuario = {
      id: Number(payload.sub),
      nome: payload.nome,
      email: payload.email,
      role: payload.role,
      quilombo_id: payload.quilombo_id
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