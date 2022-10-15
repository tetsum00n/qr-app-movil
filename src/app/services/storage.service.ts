import { Registro } from 'src/app/models/registro.model';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	private istorage: Storage | null = null;
	private iarticles: Registro[] = [];

	get getLocalArticles() {
		return [ ...this.iarticles ];
	}

	// eslint-disable-next-line @typescript-eslint/member-ordering
	constructor(private storage: Storage) {
		this.init();
	}

	async init() {
		const storage = await this.storage.create();
		this.istorage = storage;
		this.loadHistory();
	}

	async saveArticle(article: Registro) {
		console.log('Guardando registro: ', article);
		this.iarticles = [ article, ...this.iarticles ];
	}

	async loadHistory() {
		try {
			const articles = await this.istorage.get('articles');
			this.iarticles = articles || [];
		} catch (error) {
			console.log(error);
		}
	}
}
