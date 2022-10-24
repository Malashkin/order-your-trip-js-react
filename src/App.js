import { useState } from "react";
import "./App.css";
import BaracodeScaner from "./BaracodeScaner";

function App() {
  const [adultTicketsQuantity, setAdultTicketsQuantity] = useState(0);
  const adultTicketPrice = 1000;
  const [kidTicketsQuantity, setKidTicketsQuantity] = useState(0);
  const kidTicketPrice = 500;
  const [id, setId] = useState(0);
  const [eventId, setEventId] = useState(477);
  const [timeOfCreation, setTimeOfCreation] = useState(null);
  const [phpMyAdmin, setPhpMyAdmin] = useState([]);
  const [adultsTicketsArray, setAdultsTicketArray] = useState([]);
  const [kidsTicketsArray, setKidsTicketArray] = useState([]);
  const first = [];
  const second = [];

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
    if (data.tickets_adult_quantity > 0) {
      for (let i = 1; i <= data.tickets_adult_quantity; i++) {
        let ticket = [];
        ticket.ticket_id = data.event_id + i;
        ticket.type = "Adult";
        ticket.price = data.ticket_adult_price;
        return ticket;
      }
    }
  };

  // фунция сборщик каждого взрослого билета
  const createKidTickets = (data) => {
    if (data.tickets_kid_quantity > 0) {
      for (let i = 1; i <= data.tickets_kid_quantity; i++) {
        let ticket = [];
        ticket.ticket_id = data.event_id + i;
        ticket.type = "Kids";
        ticket.price = data.ticket_kid_price;
      }
    }
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
        <h3>Результат</h3>
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
        {phpMyAdmin.length > 0
          ? phpMyAdmin.map((item) => {
              return (
                <ul key={item.id} className="result">
                  <li className="result__item">{item.id}</li>
                  <li className="result__item">{item.event_id}</li>
                  <li className="result__item">{item.event_date}</li>
                  <li
                    className="result__item"
                    onClick={() => createAdultTickets(item)}
                  >
                    {item.tickets_adult_quantity}
                  </li>
                  {createAdultTickets(item).map((i) => {
                    return <p>{i.ticket.type}</p>;
                  })}
                  <li className="result__item">{item.ticket_adult_price}</li>
                  <li
                    className="result__item"
                    onClick={() => createKidTickets(item)}
                  >
                    {item.tickets_kid_quantity}
                  </li>
                  <li className="result__item">{item.ticket_kid_price}</li>
                  <li className="result__item">
                    <BaracodeScaner />
                  </li>
                  <li className="result__item">{item.created}</li>
                </ul>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default App;
