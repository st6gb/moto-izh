import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  public cards = [1, 2, 3];
  public banners = [
    {
      id: 1,
      header: 'Кредит «Без бумаг | Оборотный»',
      body: 'Вам одобрен кредит на 10 000 000 ₽. Без залога и поручителей! Элементарно! ',
      img: 'some',
      background: '#273EB8',
      color: '#ffffff'
    },
    {
      id: 2,
      header: 'Кредит «Без бумаг | Оборотный»',
      body: 'Вам одобрен кредит на 10 000 000 ₽. Без залога и поручителей! Элементарно! Вам одобрен кредит на 10 000 000 ₽. Без залога и поручителей! Элементарно!',
      img: 'some',
      background: 'linear-gradient(270deg, #57E6AB 0%, #4EA3CD 101.99%)',
      color: '#ffffff'
    },
    {
      id: 3,
      header: 'Кредит «Без бумаг | Оборотный»',
      body: 'Вам одобрен кредит на 10 000 000 ₽. Без залога и поручителей! Элементарно! Вам одобрен кредит на 10 000 000 ₽. Без залога и поручителей! Элементарно!',
      img: 'some',
      background: '#4EA3CD',
      color: '#ffffff'
    }
  ];
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
      const e = this.banners.shift();
      this.banners.push(e);
    }, 300);
  }

}
