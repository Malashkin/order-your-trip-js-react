# Проект: `Order your trip JS`

### `Описание проекта`
Здесь нет особого UI, сверстал для нечто для наглядности. Ставил себе цель сделать форму для создания заказа билетов готовую к работе в API.

После выбора количества билетов создается запрос для оправки на сервер: 

`Составляющие заказа:`
1. event_id - уникальный id заказа
2. event_date - дата оформления заказа - момент нажития "Оформить заказ"
3. tickets_adult_quantity - количество билетов для взрослых
4. ticket_adult_price - стоимость билета для взрослых
5. tickets_kid_quantity - количество билетов для детей
6. ticket_kid_price - стоимость билета для детей
7. equal_price - итоговая стоимость заказа
8. created - дата и время создания заказа - отсчёт начинается с момента изменения количества билетов в input с дефолтного значения
9. baracode - отрисовывается QRCode без логики, можно изменить на штрих-код, идея в том, чтобы клиенту не нужно было называть номер заказа и документ по билету, а показывать QRCode/штрих-код

Каждый заказ состоит из отдельных билетов, для реализации возможности частичного редактирования заказа.

`Составляющие билета:`
1. parentId - id заказа
2. id - id билета
3. type - тип Взрослый/Детский
4. price - стоимость этого билета
5. baracode - тот же принцип, что и у заказа

По итогу сейчас ниже формы отрисовывается заказ и ниже блок с Взрослыми/Детскими билетами - можно переключать.

Верстка рассчитана на корректное отображение 1 заказа и его билетов, далее данные должны отправляться на API, стэйты очищаться и инпуты сбрасываются для формирования нового заказа


#### `Стек: React + CSS`
React functional component, useState, new Date, QRCode. 

#### `Deploy`:
Проект можно запустить скопировав репозиторий и далее: `npm start`

