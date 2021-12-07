import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  token: string = null;

  constructor(
    private http: HttpClient,
    private storage: Storage
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
        console.log(resp)
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

  async guardadToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

}
