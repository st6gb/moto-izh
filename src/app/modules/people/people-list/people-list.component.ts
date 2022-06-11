import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  public cards = [1, 2, 3];
  @ViewChildren('element') items: QueryList<ElementRef>;
  constructor(
    private activatedRoute: ActivatedRoute,
    ) { }
  isMove = false;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
    });
  }

  goNext(element: HTMLElement) {
    console.log(this.items);
    this.items.first.nativeElement.classList.add('card-move');
    this.items.get(1).nativeElement.classList.add('card-up');
    // element.classList.add('card-move');
    setTimeout(() => {
      this.items.first.nativeElement.classList.remove('card-move');
      this.items.get(1).nativeElement.classList.remove('card-up');
      const e = this.cards.shift();
      this.cards.push(e);
    }, 300);
  }

}
