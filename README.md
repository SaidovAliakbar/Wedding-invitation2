# Aziza & Ravshan — Wedding Invitation

Статическая свадебная страница для Cloudflare Pages. RSVP сохраняется в Cloudflare D1 через Pages Function; Telegram и отдельный сервер не нужны.

## Деплой на Cloudflare Pages

В настройках Pages укажите:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/`
- **Deploy command:** оставить пустым

Не указывайте `npx wrangler deploy`: это команда для Cloudflare Worker, а не для Pages. При подключении репозитория Pages сам выполняет публикацию после успешной сборки.

В Cloudflare создайте D1 database, например `wedding-rsvp`, затем выполните локально:

```bash
npx wrangler d1 execute wedding-rsvp --remote --file=./schema.sql
```

В **Settings -> Functions -> D1 database bindings** добавьте binding:

- **Variable name:** `RSVP_DB`
- **D1 database:** `wedding-rsvp`

В **Settings -> Variables and Secrets** добавьте для **Production** только один secret:

- `ADMIN_KEY` — придуманный длинный пароль для страницы `/admin.html`

После этого нажмите **Save and Deploy**. Cloudflare сам подключит файл `functions/api/rsvp.js` к адресу `/api/rsvp`.

Для ручного деплоя с локального компьютера:

```bash
npm install
npm run pages:deploy
```

Важно: в Cloudflare Pages в поле **Build command** нужно указать именно `npm run build`, а не `npm run pages:deploy`. Команда `pages:deploy` вызывает Cloudflare API и предназначена только для ручного запуска вне Cloudflare.

Откройте `/admin.html`, введите `ADMIN_KEY` и увидите все ответы гостей.

## Локальная проверка

Для проверки Pages Function локально создайте файл `.dev.vars` (он игнорируется Git):

```text
ADMIN_KEY=локальный-пароль
```

Для локального D1 используйте `.wrangler/state` или подключите удалённую базу через Pages binding.

Запустите:

```bash
npm run dev:pages
```

Откройте адрес, который напечатает Wrangler. Не открывайте `index.html` через `file://`.

## Хранение ответов

Данные хранятся в D1, а не в браузере и не в файлах сборки. Публичная форма умеет только добавлять ответы. Список доступен только на `/admin.html` при наличии `ADMIN_KEY`; ключ не хранится в HTML.

## Данные свадьбы

- Азиза & Равшан
- 04.10.2026
- Omad, Ургенч
- начало: 18:00 (Asia/Tashkent)

Время countdown меняется в `script.js`:
`new Date("2026-10-04T18:00:00+05:00")`

## Дизайн

Основная композиция намеренно не заполняет страницу "карточками ради карточек": каждая секция работает как отдельный разворот приглашения — hero, бумажное письмо, стеклянный блок деталей, countdown и RSVP-card.

## V3 inspiration
Визуальный апгрейд опирается на актуальные свадебные stationery-приёмы: navy/ivory botanical crest, декоративные wreath/monogram, blind-embossing и плотные орнаментальные рамки. Для первой страницы сохранён крупный floral hero, а тёмные страницы теперь получили кремовые свадебные орнаменты и герб.

## V4
- Убран набор SaaS-похожих карточек из секции важного дня.
- Вместо них — центральная королевская plaque-композиция с гербом, датой, местом и временем.
- Вторая страница вокруг бумажного листа получила дополнительные орнаменты и рамки.
- Подпись `Ravshanbek & Aziza` переведена на декоративный свадебный script-шрифт.
- Для desktop добавлена лёгкая pointer-tilt анимация главной royal plaque.

## V5
- Шрифтовая система стала более свадебной: DM Serif Display для крупных титулов и Great Vibes/Ballet для рукописных акцентов.
- Месяц в датах локализуется: OKTYABR / ОКТЯБРЯ / OCTOBER.
- Дата отображается как `4 OKTYABR 2026`, без тяжёлого цифрового `04.10`.
- Reveal-анимации перестроены на последовательное появление родителя и декора, чтобы элементы не выезжали друг на друга.
- На мобильных декоративные элементы уменьшены и разведены от центральной royal plaque.

## V6
- Groom name is now `Ravshanbek` everywhere.
- Hero uses Bodoni Moda for a stronger couture/royal serif appearance.
- Month is no longer rendered in an oversized script: `OKTYABR / ОКТЯБРЯ / OCTOBER` is a compact high-contrast serif italic.
- Date layout was separated into number / month / year to prevent overlap with the stationery mockup.

## V7
- На первую страницу добавлена объёмная embossed vintage-frame композиция по четырём углам и по периметру.
- Добавлен внутренний glow-ring и двойной рельефный слой рамки.
- Для каллиграфических акцентов вместо Ballet/Great Vibes используется Parisienne; основные имена остаются на Cormorant Garamond.
- Декоративные элементы первой страницы усилены тенями и бликами для ощущения тиснения.

## V8
- Русский режим теперь показывает имена кириллицей: `Равшанбек & Азиза`.
- Имена в русском режиме становятся курсивными.
- Плавающие инициалы `R & A` возле hero-текста удалены.
- Английский/узбекский режим сохраняют латиницу.

## V9
- Используется приложенный пользователем `Runethia.otf` для латинского декоративного текста.
- Runethia не содержит кириллицу, поэтому для русской версии используется близкий по характеру `Marck Script` с кириллицей; при этом все декоративные роли получают один и тот же типографический treatment.
- На первой странице убраны боковые цветочные узоры; оставлена и усилена только объёмная винтажная рамка по краям.
- Русский режим: `Равшанбек & Азиза`.
- Узбекский/английский режим: `Ravshanbek & Aziza`.
