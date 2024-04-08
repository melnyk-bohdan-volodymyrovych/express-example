# TypeScript, Node.js, Express та Prisma ORM

### Умови тестового завдання

Створіть REST API для керування списком книг, де доступ до ендпойнтів обмежений за допомогою токенів доступу, які видаються на 2 години.

#### Вимоги:
* Отримання токена доступу (запит без авторизації):
* GET /auth/token: запит на отримання токена доступу, який буде дійсний протягом 2 годин.
* API ендпойнти для книг:
  * GET /books: отримати список усіх книг.
  * POST /books: створити нову книгу (вимагає токен доступу).
  * PUT /books/:id: оновити інформацію про книгу за ID (вимагає токен доступу).
  * DELETE /books/:id: видалити книгу за ID (вимагає токен доступу).

#### Аутентифікація та авторизація:
  * Використовуйте JWT для генерації та перевірки токенів доступу.
  * Перевіряйте токен доступу у заголовку Authorization для захищених ендпойнтів.
#### Валідація:
  * Переконайтеся, що всі запити на створення та оновлення книг містять необхідні поля.
  * Використовуйте відповідні HTTP статус коди для інформування клієнта про результат операції. 
#### Вимоги до здачі:
  * Код повинен бути опублікований на GitHub.
  * Надайте інструкції для запуску та тестування вашого проекту у файлі README.md.

### Запуск
#### Розгортання інфраструктури
Для локального запуску достатньо переіменувати [.env.template](.env.template) на .env

Увага: необхідно встановити docker і docker-compose. Мануали є [тут](https://docs.docker.com/compose/install/).
```bash
yarn && yarn setup
```
#### Запуск в режимі розробки
```bash
yarn start:dev
```
#### Запуск у прод-режимі
```bash
yarn start:prod
```

### Тестування та автодокументація
Додаток використовує автодокументацію Swagger 2.0, див. логи аппки. 
Цього буде більш ніж достатньо для ручного тестування/