import { Component, Input, OnInit } from '@angular/core';

import { Registro } from 'src/app/models/registro.model';

@Component({
	selector: 'app-articles',
	templateUrl: './articles.component.html',
	styleUrls: [ './articles.component.scss' ]
})
export class ArticlesComponent implements OnInit {
	@Input() articles: Registro[];
	constructor() {}

	ngOnInit() {}
}
