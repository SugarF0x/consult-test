# Кастомный контроллер

Описание предметной области - делаем простой телефонный справочник.

### Карточка пользователя состоит из:
- фамилии (обязательно)
- имени (обязательно)
- отчества
- телефонов (от 0 до бесконечности)

Телефоны должны валидироваться, для простоты, пусть состоят только из цифр.

Требуется реализовать добавление/удаление/редактирование новых пользователей.

---

Функционал реализован через **Strapi**. Вместо коллекций и связей, телефонные номера хранятся в массиве
данных внутри коллекции карточки.

### Поля валидируются следующим образом:
- Имя и Фамилия — обязательные поля
- Отчество — опциональное поле
- Телефонные номера принимаются только в числовом формате

Код контроллера можно посмотреть [здесь](https://github.com/SugarF0x/consult-test/tree/master/backend/api/card/controllers/card.js)

Ниже предоставлены интерактивные карточки пользователя, которые можно редактировать/добавлять/создавать.
