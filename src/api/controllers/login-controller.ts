import * as express from 'express'
import { Request, Response } from 'express'
import sessionFalseMiddleware from '../middlewares/session-false'
import IControllerBase from '../interfaces/controller-base'
import { loadCss, loadJs } from '../helpers/view'
import { constants } from '../../configs/constants'

class LoginController implements IControllerBase {
  public path = '/login'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', sessionFalseMiddleware ,this.index)
    this.router.post('/access', sessionFalseMiddleware ,this.access)
    this.router.get('/reset_password', sessionFalseMiddleware ,this.reset_password)
    this.router.get('/signac_in', sessionFalseMiddleware ,this.register)
    this.router.get('/reset', sessionFalseMiddleware ,this.reset)
  }

  index = (req: Request, res: Response) => {
    let locals = {
      title: 'Bienvenido',
      constants: constants,
      message_color: '',
      message: '',
      csss: loadCss([
        'assets/css/styles',
        'assets/css/login',
      ]), 
      jss: loadJs([]), 
    }
    res.status(200).render('login/index', locals)
  }

  register = (req: Request, res: Response) => {
    let locals = {
      title: 'Bienvenido',
      constants: constants,
      message_color: '',
      message: '',
      csss: loadCss([
        'assets/css/styles',
        'assets/css/login',
      ]), 
      jss: loadJs([]), 
    }
    res.status(200).render('login/register', locals)
  }

  reset_password = (req: Request, res: Response) => {
    let locals = {
      title: 'CORREO',
      constants: constants,
      message_color: '',
      message: '',
      csss: loadCss([
        'assets/css/styles',
        'assets/css/login',
      ]), 
      jss: loadJs([]), 
    }
    res.status(200).render('login/reset_password', locals)
  }

  access = (req: Request, res: Response) => {
    let user = req.body.user
    let password = req.body.password
    if(user == 'admin' && password == 'ulima'){
      res.redirect('/')
    }else{
      let locals = {
        title: 'Bienvenido',
        constants: constants,
        message_color: 'text-danger',
        message: 'Usuario y/o contraseña no válidos',
        csss: loadCss([
          'assets/css/styles',
          'assets/css/login',
        ]), 
        jss: loadJs([]), 
      }
      res.status(200).render('login/index', locals)
    }
  }

  reset = (req: Request, res: Response) => {
    let mail = req.body.mail
    let mails = [
      'pepe@ulima.edu.pe',
      'hernan@ulima.edu.pe',
      'jorge@ulima.edu.pe',
      'lenin@ulima.edu.pe'
    ]
    let exist:boolean = false
    mails.forEach(function (temp){
      if(temp == mail){
        exist = true
      }
    });


    if(exist){
      let locals = {
        title: 'Bienvenido',
        constants: constants,
        message_color: 'text-succes',
        message: 'Se ha enviado un correo pra cambiar su contraseña',
        csss: loadCss([
          'assets/css/styles',
          'assets/css/login',
        ]), 
        jss: loadJs([]), 
      }
    }else{
      let locals = {
        title: 'Bienvenido',
        constants: constants,
        message_color: 'text-danger',
        message: 'Correo no registrado',
        csss: loadCss([
          'assets/css/styles',
          'assets/css/login',
        ]), 
        jss: loadJs([]), 
      }
      res.status(200).render('login/index', locals)
    }
  }
}


export default LoginController