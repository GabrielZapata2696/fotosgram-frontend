import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { UiServiceService } from './ui-service.service';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  token: string = null;
  private usuario: Usuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) {
    this.storage.create();
  }


  login(email: string, password: string) {
    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data).subscribe(resp => {

        if (resp['ok']) {
          this.guardadToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  registro(usuario: Usuario) {

    return new Promise(resolve => {
      this.http.post(`${URL}/user/crear`, usuario).subscribe(resp => {

        if (resp['ok']) {
          this.guardadToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }


  actualizar(usuario: Usuario) {

    const headers = new HttpHeaders({
      'z-token': this.token
    });

    return new Promise(resolve => {

      this.http.put(`${URL}/user/actualizar`, usuario, { headers }).subscribe((res: any) => {

        if (res['ok']) {
          this.guardadToken(res['token']);
          resolve(true);
        } else {
          this.uiService.alertaInformativa(`${res['mensaje']}`);
          resolve(false);
        }
      });
    });
  }

  getUsuario() {
    if (!this.usuario._id) {
      this.verificarToken();
    }
    return { ...this.usuario };
  }

  async guardadToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  async verificarToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve: any) => {

      const headers = new HttpHeaders({
        'z-token': this.token
      });

      this.http.get(`${URL}/user/informacion`, { headers }).subscribe(res => {
        if (res['ok']) {
          this.usuario = res['usuario'];
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });

    });
  }

}
