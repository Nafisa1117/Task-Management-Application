import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{

  searchTerm: string = '';

  @Output() searchEmitter = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onInputChange() {
    this.searchEmitter.emit(this.searchTerm);
  }
}
