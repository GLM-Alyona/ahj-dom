export default class TaskThree {
  constructor(element) {
    this.element = element;
    this.responce = [
      {
        id: 26,
        title: 'Побег из Шоушенка',
        imdb: 9.30,
        year: 1994,
      },
      {
        id: 25,
        title: 'Крёстный отец',
        imdb: 9.20,
        year: 1972,
      },
      {
        id: 27,
        title: 'Крёстный отец 2',
        imdb: 9.00,
        year: 1974,
      },
      {
        id: 1047,
        title: 'Тёмный рыцарь',
        imdb: 9.00,
        year: 2008,
      },
      {
        id: 223,
        title: 'Криминальное чтиво',
        imdb: 8.90,
        year: 1994,
      },
    ];

    // индикаторы переключения состояния на 0 или 1
    this.sortingID = 0;
    this.sortingTitle = 0;
    this.sortingYear = 0;
    this.sortingImdb = 0;
    this.buttonCondition = 0;

    // индикатор состояния интервальной сортировки от 0 до 7
    this.intervalCount = 0;
  }

  // инициализация класса
  init() {
    this.createHtml(this.element); // создаём html
    this.eventButton(); // добавляем события на кнопки

    // запускам интервал
    this.timerID = setInterval(this.intervalSorting.bind(this), 2000);
  }

  // создание html
  createHtml(element) {
    // добавляем заголовок задачи
    const h2 = `
        <H2>
          Задача № 3<br>
          In-Memory Sorting (задача со звёздочкой)
        </H2>
      `;
    element.insertAdjacentHTML('afterBegin', h2);

    // создаём тэг таблицы
    this.table = document.createElement('table');
    element.appendChild(this.table);

    // добавляем кнопку для интервала
    const button = '<button>Остановить интервал</button>';
    element.insertAdjacentHTML('beforeEnd', button);

    // создаём заголовки для таблицы
    this.header = document.createElement('tr');
    this.header.innerHTML = `
        <th>id</th>
        <th>title</th>
        <th>year</th>
        <th>imdb</th>
      `;
    this.th = Array.from(this.header.querySelectorAll('th'));

    // отрисовка строк таблицы
    this.addTableRows();
  }

  // отрисовка строк таблицы
  addTableRows() {
    const { responce } = this;

    this.table.innerHTML = ''; // очищение таблицы полностью
    this.table.appendChild(this.header); // вставка заглавной строчки

    // вставка остальных строк
    for (let i = 0; i < responce.length; i += 1) {
      const {
        id, title, year, imdb,
      } = responce[i];
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td>${id}</td>
          <td>${title}</td>
          <td>(${year})</td>
          <td>imdb: ${imdb.toFixed(2)}</td>
        `;
      this.table.appendChild(tr);
    }
  }

  sortFunc(sortingState, sortEl) {
    this.headerClear(); // удаляет стрелочки с заголовков

    // ищем индекс ячейки загаловка таблицы
    const index = this.th.findIndex((i) => i.textContent === sortEl);
    let condition = 'number'; // условие сортировки по умолчанию для number

    // если в строке есть хотя бы один string, то условие сортировки string
    for (let i = 0; i < this.responce.length; i += 1) {
      if (typeof this.responce[i][sortEl] === 'string') {
        condition = 'string';
      }
    }

    // сортировка для number
    if (condition === 'number') {
      if (sortingState === 0) {
        this.responce.sort((a, b) => a[sortEl] - b[sortEl]);
        this.th[index].textContent += ' \u{2191}';
      }

      if (sortingState === 1) {
        this.responce.sort((a, b) => b[sortEl] - a[sortEl]);
        this.th[index].textContent += ' \u{2193}';
      }
    }

    // сортировка для string
    if (condition === 'string') {
      if (sortingState === 0) {
        this.responce.sort((a, b) => {
          if (a[sortEl] > b[sortEl]) { return 1; }
          if (a[sortEl] < b[sortEl]) { return -1; }
          return 0;
        });
        this.th[index].textContent += ' \u{2191}';
      }

      if (sortingState === 1) {
        this.responce.sort((a, b) => {
          if (a[sortEl] > b[sortEl]) { return -1; }
          if (a[sortEl] < b[sortEl]) { return 1; }
          return 0;
        });
        this.th[index].textContent += ' \u{2193}';
      }
    }

    return sortingState === 0 ? 1 : 0; // переключает индикатор сортировки
  }

  // сортировка по ID
  sortID() {
    // сортировка и переключения индикатора сортировки
    this.sortingID = this.sortFunc(this.sortingID, 'id');
    this.addTableRows(); // удаление и вставка строк таблицы
  }

  // сортировка по Title
  sortTitle() {
    // сортировка и переключения индикатора сортировки
    this.sortingTitle = this.sortFunc(this.sortingTitle, 'title');
    this.addTableRows(); // удаление и вставка строк таблицы
  }

  // сортировка по Year
  sortYear() {
    // сортировка и переключения индикатора сортировки
    this.sortingYear = this.sortFunc(this.sortingYear, 'year');
    this.addTableRows(); // удаление и вставка строк таблицы
  }

  // сортировка по Imdb
  sortImdb() {
    // сортировка и переключения индикатора сортировки
    this.sortingImdb = this.sortFunc(this.sortingImdb, 'imdb');
    this.addTableRows(); // удаление и вставка строк таблицы
  }

  // события клик на заголовки и кнопку
  eventButton() {
    this.th[0].addEventListener('click', (evt) => {
      evt.preventDefault();
      this.sortID();
    });
    this.th[1].addEventListener('click', (evt) => {
      evt.preventDefault();
      this.sortTitle();
    });
    this.th[2].addEventListener('click', (evt) => {
      evt.preventDefault();
      this.sortYear();
    });
    this.th[3].addEventListener('click', (evt) => {
      evt.preventDefault();
      this.sortImdb();
    });
    this.button = this.element.querySelector('button');
    this.button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.buttonSetInterval();
    });
  }

  // очищение загаловков от стрелочек
  headerClear() {
    this.th[0].textContent = 'id';
    this.th[1].textContent = 'title';
    this.th[2].textContent = 'year';
    this.th[3].textContent = 'imdb';
  }

  // метод поочерёдной сортировки
  intervalSorting() {
    if (this.intervalCount > 7) { this.intervalCount = 0; }
    if (this.intervalCount === 0) { this.sortID(); }
    if (this.intervalCount === 1) { this.sortID(); }
    if (this.intervalCount === 2) { this.sortTitle(); }
    if (this.intervalCount === 3) { this.sortTitle(); }
    if (this.intervalCount === 4) { this.sortYear(); }
    if (this.intervalCount === 5) { this.sortYear(); }
    if (this.intervalCount === 6) { this.sortImdb(); }
    if (this.intervalCount === 7) { this.sortImdb(); }
    this.intervalCount += 1;
  }

  // кнопка для интервального запуска методов сортировки
  buttonSetInterval() {
    if (this.buttonCondition === 0) {
      clearInterval(this.timerID);
      this.button.textContent = 'Запустить интервал';
    }
    if (this.buttonCondition === 1) {
      this.intervalCount = 0;
      this.timerID = setInterval(this.intervalSorting, 2000);
      this.button.textContent = 'Остановить интервал';
    }

    this.buttonCondition = this.buttonCondition === 0 ? 1 : 0;
  }
}
