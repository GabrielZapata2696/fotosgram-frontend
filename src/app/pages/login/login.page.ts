import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;


  loginUser = {
    email: 'sr.gabrielzm@gmail.com',
    password: '123456'
  };

  registroUser: Usuario = {
    email: 'test5@gmail.com',
    password: '123456',
    nombre: 'Test 5',
    avatar: 'av-1.png'
  };


  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) { return; }

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if (valido) {
      //navegar a tabs
      this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
    } else {
      this.uiService.alertaInformativa('Usuario/Contraseña no son correctos.');
      return;
    }

  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) { return; }

    const valido = await this.usuarioService.registro(this.registroUser);

    if (valido) {
      //navegar a tabs
      this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
    } else {
      this.uiService.alertaInformativa('El correo ya se encuentra registrado');
    }

  }


  mostrarInicio() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
