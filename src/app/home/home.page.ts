import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

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
    public alertController: AlertController
  ) { }

  async ionViewWillEnter() {
    const usuarioLogado = await this.usuarioService.buscarUsuarioLogado();
    if (!usuarioLogado) {
      this.router.navigateByUrl('/login');
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Logout efetuado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  async exibirAlertLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmação!',
      message: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Sim, desejo sair!',
          handler: () => {
            this.usuarioService.removerUsuarioLogado();
            this.presentToast();
            this.router.navigateByUrl('/login');
          }
        }
      ]
    });

    await alert.present();
  }

}
