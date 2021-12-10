import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {


  usuario: Usuario = {};

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {


    this.usuario = this.usuarioService.getUsuario();

  }


  async actualizar(fActualizar: NgForm) {

    console.log(this.usuario)

    if (fActualizar.invalid) { return; }

    const actualizado = await this.usuarioService.actualizar(this.usuario);

    if (actualizado) {
      this.uiService.presentToast('Usuario actualizado satisfactoriamente');
    } else {
      this.uiService.presentToast('No ha sido posible actualizar el usuario');
    }

  }


  logout() {

  }

}
