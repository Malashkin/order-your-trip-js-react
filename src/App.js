import { useState } from "react";
import "./App.css";

function App() {
  const [createdOrder, setCreatedOrder] = useState(false);
  const [adultTicketsQuantity, setAdultTicketsQuantity] = useState(0);
  const adultTicketPrice = 1000;
  const [kidTicketsQuantity, setKidTicketsQuantity] = useState(0);
  const kidTicketPrice = 500;
  const [id, setId] = useState(0);
  const [eventId, setEventId] = useState(477);
  const [newOrder, setNewOrder] = useState(null);
  const [timeOfCreation, setTimeOfCreation] = useState(null);
  const [phpMyAdmin, setPhpMyAdmin] = useState([]);
  const resultClassName = !createdOrder ? "result-hidden" : "result-visible";

  // функция считыватель количества билетов
  function eventDate() {
    if (adultTicketsQuantity > 0 || kidTicketsQuantity > 0) {
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
      return setTimeOfCreation(date + " " + time);
    }
  }

  function createdTime() {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    return date + " " + time;
  }

  // фунция сборщик одного билета
  function createTicket() {
    let ticket = {};

    return ticket;
  }

  const handelChangeAdult = (e) => {
    setAdultTicketsQuantity(e.target.value);
  };

  const handelChangeKid = (e) => {
    setKidTicketsQuantity(e.target.value);
  };

  // функция добавления заказа в базу
  const createOrder = () => {
    let order = {};
    setId(id + 1);
    order.id = id;
    setEventId(eventId + 1);
    order.event_id = eventId;
    order.event_date = createdTime();
    order.ticket_adult_quantity = adultTicketsQuantity;
    order.ticket_kid_quantity = kidTicketsQuantity;
    order.ticket_adult_price = adultTicketPrice;
    order.ticket_kid_price = kidTicketPrice;
    order.created = timeOfCreation;
    setNewOrder(order);
    setPhpMyAdmin([...phpMyAdmin, order]);
  };

  function handleSubmit(e) {}

  function show() {
    console.log(phpMyAdmin);
  }

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
            placeholder="Введите количество"
            onChange={handelChangeKid}
            onClick={eventDate}
          ></input>
        </div>
        <button type="button" className="form__button" onClick={createOrder}>
          Оформить заказ
        </button>
      </form>
      <div className={resultClassName}>Ваш заказ оформлен. Спасибо!</div>
      <div className={resultClassName}>Поступил новый заказ</div>
      <button type="button" onClick={show}></button>
      <div>
        <h3>Результат</h3>
        <div>
          <div>
            <p>id</p>
            <p></p>
          </div>
          <div>
            <p>event_id</p>
          </div>
          <div>
            <p>ticket_adult_quantity</p>
          </div>
          <div>
            <p>ticket_kid_quantity</p>
          </div>
          <div>
            <p>ticket_adult_price</p>
          </div>
          <div>
            <p>baracode</p>
          </div>
          <div>
            <p>created</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
