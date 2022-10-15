import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Registro } from 'src/app/models/registro.model';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: [ './article.component.scss' ]
})
export class ArticleComponent implements OnInit {
	@Input() article: Registro;
	@Input() index: number;

	constructor(private navCtrl: NavController) {}

	ngOnInit() {}

	openArticle() {
		if (this.article.type === 'http') {
			window.open(this.article.text, '_system');
		} else {
			this.navCtrl.navigateForward(`/tabs/tab2/map/${this.article.text}`);
		}
	}
}
