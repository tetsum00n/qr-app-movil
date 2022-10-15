import { Component } from '@angular/core';
import { Registro } from 'src/app/models/registro.model';
import { StorageService } from './../../services/storage.service';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: [ 'tab2.page.scss' ]
})
export class Tab2Page {
	constructor(private storageService: StorageService) {}

	get articles(): Registro[] {
		return this.storageService.getLocalArticles;
	}
}
