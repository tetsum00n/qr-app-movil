import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Registro } from '../models/registro.model';

// import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class DataLocalService {
	constructor(
		private navCtrl: NavController // private storageService: StorageService
	) {}

	abrirRegistro(registro: Registro) {
		// this.addToHistory(registro);
		this.navCtrl.navigateForward('/tabs/tab2');
		console.log(registro);
		switch (registro.type) {
			case 'http':
				window.open(registro.text, '_blank');
				console.log('aqui va la tarea, abir en el navegador');
				break;
			case 'geo':
				this.navCtrl.navigateForward(`/tabs/tab2/map/${registro.text}`);
				break;
		}
	}

	// async addToHistory(registro: Registro) {
	// 	await this.storageService.saveArticle(registro);
	// }
}
