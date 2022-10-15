import { AfterViewInit, Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, Platform } from '@ionic/angular';
import { Registro } from 'src/app/models/registro.model';
import { DataLocalService } from 'src/app/services/data-local.service';
import { StorageService } from '../../services/storage.service';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: [ 'tab1.page.scss' ]
})
export class Tab1Page implements AfterViewInit {
	scanActivo = false;
	constructor(
		private platform: Platform,
		private alertCtrl: AlertController,
		private dataLocalService: DataLocalService,
		private storageService: StorageService
	) {}

	ngAfterViewInit() {
		if (this.platform.is('capacitor')) {
			BarcodeScanner.prepare();
		}
	}

	async scan() {
		if (this.platform.is('capacitor')) {
			const permitido = this.checkPermisos();
			if (permitido) {
				this.scanActivo = true;
				const result = await BarcodeScanner.startScan();
				if (result.hasContent) {
					const registro: Registro = new Registro(result.format, result.content);
					this.storageService.saveArticle(registro);
					this.dataLocalService.abrirRegistro(registro);
					this.scanActivo = false;
				}
			}
		} else {
			console.log('estamos en la web');
			const registro: Registro = new Registro('QR_CODE', 'geo:40.712977455433304,-74.00598594937378');
			this.storageService.saveArticle(registro);
			this.dataLocalService.abrirRegistro(registro);
			this.scanActivo = false;
		}
	}

	async checkPermisos() {
		return new Promise(async (resolve, rejects) => {
			const status = await BarcodeScanner.checkPermission({ force: true });
			if (status.granted) {
				resolve(true);
			} else if (status.denied) {
				const alert = await this.alertCtrl.create({
					header: 'sin permisos',
					message: 'por favor permita el acceso a la camara',
					buttons: [
						{
							text: 'no',
							role: 'cancel'
						},
						{
							text: 'abrir prefencias',
							handler: () => {
								BarcodeScanner.openAppSettings();
								resolve(false);
							}
						}
					]
				});
				await alert.present();
			} else {
				resolve(rejects);
			}
		});
	}
}
