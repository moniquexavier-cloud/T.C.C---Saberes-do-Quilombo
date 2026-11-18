import jwt from 'jsonwebtoken';


const objectIdRegex = /^[0-9a-fA-F]{24}$/;


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
      id_quilombo: usuario.id_quilombo ? String(usuario.id_quilombo) : null
    },
    jwtSecret,
    {
      algorithm: 'HS256',
      subject: String(usuario._id || usuario.id),
      expiresIn: '1h'
    }
  );
};


export const autenticar = (req, res, next) => {
  const authorization = req.get('authorization');
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length).trim()
    : '';


  try {
    const payload = jwt.verify(token, getJwtSecret(), {
      algorithms: ['HS256']
    });


    if (
      typeof payload === 'string' ||
      !payload.sub ||
      !objectIdRegex.test(payload.sub) ||
      !['ADMIN', 'LIDER'].includes(payload.role) ||
      typeof payload.nome !== 'string' ||
      typeof payload.email !== 'string' ||
      (payload.role === 'LIDER' && (typeof payload.id_quilombo !== 'string' || !objectIdRegex.test(payload.id_quilombo)))
    ) {
      return res.status(401).json({
        mensagem: 'Token inválido ou expirado.'
      });
    }


    req.usuario = {
      _id: payload.sub,
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