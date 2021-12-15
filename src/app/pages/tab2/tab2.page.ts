import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { PostsService } from 'src/app/services/posts.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';


declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  tempImages: string[] = [];

  post = {
    mensaje: '',
    coordenadas: null,
    posicion: false
  };

  cargandoGeo: boolean = false;

  constructor(
    private postService: PostsService,
    private uiService: UiServiceService,
    private route: Router,
    private geolocation: Geolocation,
    private camera: Camera
  ) { }

  ngOnInit(): void {

  }

  async crearPost() {
    console.log(this.post);
    const creado = await this.postService.crearPost(this.post);

    if (creado) {
      this.post = {
        mensaje: '',
        coordenadas: null,
        posicion: false
      };

      this.tempImages = [];

      this.uiService.presentToast(`Creado!`);
      this.route.navigateByUrl('/main/tabs/tab1');
    } else {
      this.uiService.presentToast(`Ha ocurrido un error al crear la publicación`);
      return;
    }
  }

  obtenerGeo() {
    if (!this.post.posicion) {
      this.post.coordenadas = null;
      return;
    }

    this.cargandoGeo = true;


    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      const coordenadas = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coordenadas);
      this.cargandoGeo = false;
      this.post.coordenadas = coordenadas;
    }).catch((error) => {
      console.log('Error obteniendo localización: --- ', error);
      this.uiService.presentToast(`No se puede obtener su localización`);
      this.cargandoGeo = false;
    });

    console.log(this.post);
  }


  tomarFoto() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.procesarImg(options);


  }

  libreria() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.procesarImg(options);
  }

  procesarImg(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //let base64Image = 'data:image/jpeg;base64,' + imageData;

      const imgPath = window.Ionic.WebView.convertFileSrc(imageData);
      this.postService.subirImagen(imageData);
      console.log(imgPath);
      this.tempImages.push(imgPath);

    }, (err) => {
      // Handle error
    });
  }




}
