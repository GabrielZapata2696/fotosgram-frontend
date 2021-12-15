import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private fileTransfer: FileTransfer

  ) { }


  getPosts(pull: boolean = false) {
    if (pull) {
      this.paginaPosts = 0;
    }
    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${URL}/post/?pagina=${this.paginaPosts}`);
  }

  crearPost(post) {
    const headers = new HttpHeaders({
      'z-token': this.usuarioService.token
    });
    return new Promise(resolve => {

      this.http.post(`${URL}/post/`, post, { headers }).subscribe(res => {
        console.log(res);
        if (res['ok']) {
          this.nuevoPost.emit(res['post']);
          resolve(true);
        } else {
          resolve(false);
        }
      });

    });

  }

  subirImagen(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'imagen',
      headers: {
        'z-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, `${URL}/post/subir`, options).then(data => {
      console.log(data)
    }).catch(err => {
      console.log('error en la carga: ', err);
    });

  }


}
