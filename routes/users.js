var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Token = require('../models/Token')
var jwt = require('jsonwebtoken')

const auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await User.find({});//{role: 'Admin'}
  
  let result = (users.length > 0) ? users : [{message: "No hay usuarios que mostrar."}];
  res.json(result)
});

router.post('/register', async (req, res, next) => {

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  // Valido los datos recibidos. Si son incorrectos, devuelvo ko
  // Valido que el correo no existe
  const userExists = await User.findOne({ email: email});
  if (userExists !== null) { return res.status(401).json({message: 'email incorrecto'}); }

  // Valido que el password tiene el formato correcto (minlength: 6)
  if (password.length < 6 ) return res.status(401).json({message: 'password incorrecto. Debe tener almenos 6 caracteres.'});
    
  // Guardo los datos
  const user = await User.create({name: name, email: email, password: password})
  
  // Respondo ok o ko
  if ( user === null) return res.status(500).json({message: 'Internal error. Please, contact with the administrator'});

  res.json({message: 'User registered!!!!'}).status(204);
  //res.status(501).json({});
});

router.post('/login', async(req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findOne({email: email, password: password})
    if (!user) {
       return res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }
    // const token = await user.generateAuthToken();
    const tokenCreated = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET)
    await Token.create({ token: tokenCreated, userId: user._id })
    res.json({user, token: tokenCreated})

    // user.tokens = user.tokens.concat({token: tokenCreated})
    // await user.save()
    // res.json(tokenCreated)
  } catch (error) {
     res.status(400).json(error)
  }

})

router.delete('/logout', auth, async (req, res, next) => {
  try {
    const tokenRemoved = await Token.remove({token: req.token})

    if(tokenRemoved.deletedCount !== 1) return res.json('Algo salió mal')
    return res.json('LogOut completed')
  } catch (error) {
    res.json(error)
  }
});


router.get('/profile', auth, async function(req, res, next) {
  res.json(req.user)
});

router.get('/tokens', async (req, res) => {
  Token.find({})
    .then(response => res.json(response))
    .catch(err => console.log(err))
})

module.exports = router;
