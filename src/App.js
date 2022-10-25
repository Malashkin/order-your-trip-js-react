import { useState } from "react";
import "./App.css";
import BaracodeScaner from "./BaracodeScaner";

function App() {
  const [adultTicketsQuantity, setAdultTicketsQuantity] = useState(0);
  const [kidTicketsQuantity, setKidTicketsQuantity] = useState(0);
  const adultTicketPrice = 1000;
  const kidTicketPrice = 500;
  const [id, setId] = useState(0);
  const [eventId, setEventId] = useState(477);
  const [timeOfCreation, setTimeOfCreation] = useState(null);
  const [phpMyAdmin, setPhpMyAdmin] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  let ticketsArray = [];

  // функция создает дату и время начала создания заказа
  function eventDate() {
    if (adultTicketsQuantity > 0 || kidTicketsQuantity > 0) {
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
      return setTimeOfCreation(date + " " + time);
    }
  }

  // функция создает дату и время отправки заказа
  function createdTime() {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    return date + " " + time;
  }

  //считывание данных о количество из inputs
  const handelChangeAdult = (e) => {
    setAdultTicketsQuantity(e.target.value);
  };

  const handelChangeKid = (e) => {
    setKidTicketsQuantity(e.target.value);
  };

  // функция для создания заказа
  const createOrder = () => {
    let order = {};
    setId(id + 1);
    order.id = id;
    setEventId(eventId + 1);
    order.event_id = eventId;
    order.event_date = createdTime();
    order.tickets_adult_quantity = adultTicketsQuantity;
    order.tickets_kid_quantity = kidTicketsQuantity;
    order.ticket_adult_price = adultTicketPrice;
    order.ticket_kid_price = kidTicketPrice;
    order.created = timeOfCreation;
    setPhpMyAdmin([...phpMyAdmin, order]);
  };

  // фунция сборщик каждого взрослого билета
  const createAdultTickets = (data) => {
    for (let i = 1; i <= data.tickets_adult_quantity; i++) {
      let ticket = {};
      ticket.parentId = data.event_id;
      ticket.id = data.event_id + i;
      ticket.type = "Adult";
      ticket.price = data.ticket_adult_price;
      ticketsArray.push(ticket);
    }
    return setAllTickets(ticketsArray);
    // логическое завершение должно быть отправка на API данных билетов и очистка стейтов
    // и потом получать с API необходимые данные
  };

  // фунция сборщик каждого детского билета
  const createKidTickets = (data) => {
    if (data.tickets_kid_quantity > 0) {
      for (let i = 1; i <= data.tickets_kid_quantity; i++) {
        let ticket = [];
        ticket.parentId = data.event_id;
        ticket.id = data.event_id + i + 300;
        ticket.type = "Kids";
        ticket.price = data.ticket_kid_price;
        ticketsArray.push(ticket);
      }
    }
    return setAllTickets(ticketsArray);
    // логическое завершение должно быть отправка на API данных билетов и очистка стейтов
    // и потом получать с API необходимые данные
  };

  return (
    <div className="App">
      <form className="form">
        <h3>Выберите необходимое количество и вид билетов</h3>
        <div className="form__category">
          <div className="form__category-info">
            <p>Количество билетов для Взрослых</p>
            <p>Стоимость 1 билета: {adultTicketPrice} руб</p>
          </div>
          <input
            type="number"
            min="0"
            defaultValue="0"
            placeholder="Введите количество"
            onChange={handelChangeAdult}
            onClick={eventDate}
          ></input>
        </div>
        <div className="form__category">
          <div className="form__category-info">
            <p>Количество билетов для Детей</p>
            <p>Стоимость 1 билета: {kidTicketPrice} руб</p>
          </div>
          <input
            type="number"
            min="0"
            defaultValue="0"
            placeholder="Введите количество"
            onChange={handelChangeKid}
            onClick={eventDate}
          ></input>
        </div>
        <button type="button" className="form__button" onClick={createOrder}>
          Оформить заказ
        </button>
      </form>
      <div>
        <p>Блок для отображения заказа</p>
        <ul className="result">
          <p className="result__item">id</p>
          <p className="result__item">event_id</p>
          <p className="result__item">event_date</p>
          <p className="result__item">ticket_adult_quantity</p>
          <p className="result__item">ticket_kid_price</p>
          <p className="result__item">ticket_kid_quantity</p>
          <p className="result__item">ticket_adult_price</p>
          <p className="result__item">QRcode</p>
          <p className="result__item">created</p>
        </ul>
        {/* Далее блок, который показывает наглядно что и в каком количестве создается
        через запросы к API всё было бы гораздо симпотичнее */}
        {phpMyAdmin.length > 0
          ? phpMyAdmin.map((item) => {
              return (
                <div key={item.id}>
                  <ul className="result">
                    <li className="result__item">{item.id}</li>
                    <li className="result__item">{item.event_id}</li>
                    <li className="result__item">{item.event_date}</li>
                    <li className="result__item">
                      {item.tickets_adult_quantity}
                    </li>

                    <li className="result__item">{item.ticket_adult_price}</li>
                    <li className="result__item">
                      {item.tickets_kid_quantity}
                    </li>

                    <li className="result__item">{item.ticket_kid_price}</li>
                    <li className="result__item">
                      <BaracodeScaner />
                    </li>
                    <li className="result__item">{item.created}</li>
                  </ul>
                  <p>
                    Блок для отображения частей, из которых состоит заказ, так
                    как заказ состоит из нескольких билетов и каждый из них
                    должен иметь id на случай редактирования
                  </p>
                  <button
                    type="button"
                    onClick={() => createAdultTickets(item)}
                  >
                    Развернуть билеты для взрослых
                  </button>
                  <button type="button" onClick={() => createKidTickets(item)}>
                    Развернуть билеты для детей
                  </button>
                  <ul className="result result__ticket">
                    <li className="result__item">parentId</li>
                    <li className="result__item">id</li>
                    <li className="result__item">type</li>
                    <li className="result__item">price</li>
                    <li className="result__item">QRCode</li>
                  </ul>

                  {allTickets.map((element) => {
                    return (
                      <ul className="result result__ticket" key={element.id}>
                        <li className="result__item">{element.parentId}</li>
                        <li className="result__item">{element.id}</li>
                        <li className="result__item">{element.type}</li>
                        <li className="result__item">{element.price}</li>
                        <li className="result__item">
                          <BaracodeScaner />
                        </li>
                      </ul>
                    );
                  })}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default App;
