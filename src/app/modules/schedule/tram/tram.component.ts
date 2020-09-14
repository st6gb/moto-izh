import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface IRoute {
  name: string;
  value: number;
}

const routes: IRoute[] = [
  {
    name: 'Все маршруты',
    value: 0,
  },
  {
    name: '1 - Трамвай',
    value: 1,
  },
  {
    name: '10 - Трамвай',
    value: 10,
  },
  {
    name: '10k - Трамвай',
    value: 310,
  },
  {
    name: '11 - Трамвай',
    value: 11,
  },
  {
    name: '12 - Трамвай',
    value: 12,
  },
  {
    name: '2 - Трамвай',
    value: 2,
  },
  {
    name: '2й кольцевой трамвай',
    value: 22,
  },
  {
    name: '3 - трамвай',
    value: 3,
  },
  {
    name: '4 - трамвай',
    value: 4,
  },
  {
    name: '5 - трамвай',
    value: 5,
  },
  {
    name: '5й кольцевой трамвай',
    value: 55,
  },
  {
    name: '7 - Трамвай',
    value: 7,
  },
  {
    name: '7й короткий трамвай',
    value: 37,
  },
  {
    name: '8 - Трамвай',
    value: 8,
  },
  {
    name: '9 - Трамвай',
    value: 9,
  },
];

const stations: IRoute[] = [
  {
    name: 'Банк Зенит',
    value: 40,
  },
  {
    name: 'Больница',
    value: 37,
  },
  {
    name: 'Буммаш',
    value: 26,
  },
  {
    name: 'Воткинская линия',
    value: 9,
  },
  {
    name: 'Дом Дружбы народов',
    value: 50,
  },
  {
    name: 'Железнодорожный вокзал',
    value: 2,
  },
  {
    name: 'Завод мин.вод',
    value: 3,
  },
  {
    name: 'Зоопарк',
    value: 21,
  },
  {
    name: 'Италмас',
    value: 67,
  },
  {
    name: 'Карлутская набережная',
    value: 68,
  },
  {
    name: 'Кинотеатр «Аврора»',
    value: 25,
  },
  {
    name: 'Магазин «Белая ворона»',
    value: 24,
  },
  {
    name: 'Магазин «Океан»',
    value: 17,
  },
  {
    name: 'Международный университет',
    value: 52,
  },
  {
    name: 'Монтажный техникум',
    value: 18,
  },
  {
    name: 'Парк им.Кирова',
    value: 20,
  },
  {
    name: 'Пер. Воткинский',
    value: 33,
  },
  {
    name: 'Пер. Октябрьский',
    value: 10,
  },
  {
    name: 'Пер. Профсоюзный',
    value: 34,
  },
  {
    name: 'Пер. Уральский',
    value: 32,
  },
  {
    name: 'Пер. Широкий',
    value: 16,
  },
  {
    name: 'ПО «Редуктор»',
    value: 53,
  },
  {
    name: 'Подшипниковый завод',
    value: 54,
  },
  {
    name: 'Покровская церковь',
    value: 29,
  },
  {
    name: 'Проспект Калашникова',
    value: 61,
  },
  {
    name: 'Речка Карлутка',
    value: 38,
  },
  {
    name: 'Свято-Михайловский собор',
    value: 14,
  },
  {
    name: 'Северный рынок',
    value: 27,
  },
  {
    name: 'Сельхозакадемия',
    value: 19,
  },
  {
    name: 'Трамвайное депо',
    value: 8,
  },
  {
    name: 'Ул. Промышленная',
    value: 58,
  },
  {
    name: 'Ул. Халтурина. Санаторий «Строитель»',
    value: 36,
  },
  {
    name: 'Ул. 30 лет Победы',
    value: 22,
  },
  {
    name: 'Ул. 40 лет Победы',
    value: 63,
  },
  {
    name: 'Ул. 6-я Подлесная',
    value: 23,
  },
  {
    name: 'Ул. Авангардная',
    value: 55,
  },
  {
    name: 'Ул. Бабушкина',
    value: 64,
  },
  {
    name: 'Ул. Братская',
    value: 43,
  },
  {
    name: 'Ул. 40 лет Победы',
    value: 63,
  },
  {
    name: 'Ул. Воровского',
    value: 39,
  },
  {
    name: 'Ул. Ворошилова',
    value: 59,
  },
  {
    name: 'Ул. Гагарина',
    value: 4,
  },
  {
    name: 'Ул. Герцена',
    value: 35,
  },
  {
    name: 'Ул. Загородная',
    value: 46,
  },
  {
    name: 'Ул. К.Либкнехта',
    value: 11,
  },
  {
    name: 'Ул. Кирпичная',
    value: 45,
  },
  {
    name: 'Ул. Краева',
    value: 51,
  },
  {
    name: 'Ул. Красноармейская',
    value: 41,
  },
  {
    name: 'Ул. Л.Толстого',
    value: 56,
  },
  {
    name: 'Ул. Магистральная',
    value: 7,
  },
  {
    name: 'Ул. Можарова',
    value: 47,
  },
  {
    name: 'Ул. Молдавская',
    value: 62,
  },
  {
    name: 'Ул. Московская',
    value: 1,
  },
  {
    name: 'Ул. Огнеупорная',
    value: 48,
  },
  {
    name: 'Ул. Орджоникидзе',
    value: 65,
  },
  {
    name: 'Ул. Т.Барамзиной',
    value: 60,
  },
  {
    name: 'Ул. Тимирязева',
    value: 30,
  },
  {
    name: 'Ул. Шишкина',
    value: 57,
  },
  {
    name: 'Хозяйственная база',
    value: 5,
  },
  {
    name: 'Центр',
    value: 66,
  },
  {
    name: 'Центральная мечеть',
    value: 12,
  },
  {
    name: 'Центральный универмаг',
    value: 15,
  },
  {
    name: 'Школа № 64',
    value: 31,
  },
  {
    name: 'Школа № 79',
    value: 28,
  },
  {
    name: 'Южная автостанция',
    value: 6,
  },
  {
    name: 'Южный рынок',
    value: 44,
  },
]

@Component({
  selector: 'app-tram',
  templateUrl: './tram.component.html',
  styleUrls: ['./tram.component.sass']
})
export class TramComponent implements OnInit {

  routes: IRoute[] = [];
  scheduleTramForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.createScheduleTramForm();
  }

  ngOnInit() {
    this.routes = routes;
    console.log(stations);
  }

  private createScheduleTramForm(): void {
    this.scheduleTramForm = this.fb.group({
      tramRoute: [0, [Validators.required]],
    });
  }
}
