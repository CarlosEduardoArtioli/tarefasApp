import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private usuarioService: UsuariosService,
    private router: Router,
    public toastController: ToastController,
  ) { }

  public logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Logout efetuado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

}
