import { useState } from "react";
import "./App.css";

function App() {
  const adultTicketPrice = 1000;
  const kidsTicketPrice = 500;
  const [createdOrder, setCreatedOrder] = useState(false);
  const [adultTickets, setAdultTickets] = useState(0);
  const [kidsTickets, setKidsTickets] = useState(0);
  const resultClassName = !createdOrder ? "result-hidden" : "result-visible";
  let resultAdmin = [];
  let resultClient = [];
  // фунция сборщик заказа

  console.log(`Adults ${adultTickets}`);
  console.log(`Kids ${kidsTickets}`);

  function addOrder(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    setCreatedOrder(true);
    addOrder(e);
  }

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Выберите необходимое количество и вид билетов</h3>
        <div className="form__category">
          <div className="form__category-info">
            <p>Количество билетов для Взрослых</p>
            <p>Стоимость 1 билета: {adultTicketPrice} руб</p>
          </div>
          <input
            type="number"
            min="0"
            placeholder="Введите количество"
            onChange={({ target: { value } }) => setAdultTickets(value)}
          ></input>
        </div>
        <div className="form__category">
          <div className="form__category-info">
            <p>Количество билетов для Детей</p>
            <p>Стоимость 1 билета: {kidsTicketPrice} руб</p>
          </div>
          <input
            type="number"
            min="0"
            placeholder="Введите количество"
            onChange={({ target: { value } }) => setKidsTickets(value)}
          ></input>
        </div>
        <button type="submit" className="form__button">
          Оформить заказ
        </button>
      </form>
      <div className={resultClassName}>Ваш заказ оформлен. Спасибо!</div>
      <div className={resultClassName}>Поступил новый заказ</div>
    </div>
  );
}

export default App;
