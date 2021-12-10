import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate, CanLoad {

  constructor(
    private usuarioService: UsuarioService
  ) {

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.verificarToken();
  }
}
