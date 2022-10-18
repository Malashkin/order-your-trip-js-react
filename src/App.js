import { useState } from "react";
import "./App.css";

function App() {
  const adultTicketPrice = 1000;
  const kidsTicketPrice = 500;
  const [createdOrder, setCreatedOrder] = useState(false);
  const resultClassName = !createdOrder ? "result-hidden" : "result-visible";

  function handleSubmit() {
    setCreatedOrder(true);
    console.log(createdOrder);
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
          <input type="number" placeholder="Введите количество"></input>
        </div>
        <div className="form__category">
          <div className="form__category-info">
            <p>Количество билетов для Детей</p>
            <p>Стоимость 1 билета: {kidsTicketPrice} руб</p>
          </div>
          <input type="number" placeholder="Введите количество"></input>
        </div>
        <button type="button" onClick={handleSubmit} className="form__button">
          Оформить заказ
        </button>
      </form>
      <div className={resultClassName}>Ваш заказ оформлен. Спасибо!</div>
      <div className={resultClassName}>Поступил новый заказ</div>
    </div>
  );
}

export default App;
