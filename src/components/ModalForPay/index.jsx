import { useState } from 'react';
import './style.css'

const ModalForPay = () => {
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');
  const [input3Value, setInput3Value] = useState('');
  const [input4Value, setInput4Value] = useState('');

  const handleSubmit =(event) => {
    event.preventDefault();
    setInput1Value('');
    setInput2Value('');
    setInput3Value('');
    setInput4Value('');
  }

  return (
    
    <form className='pay_form' onSubmit={handleSubmit} >
      <img src='https://223104.selcdn.ru/hc_bank_amio_prod/uf/03c/03c5707d85ef6a33827ef39471f5df72/HC_PlzCC_GPVBM_fl+_1_.png'/>
      <input type="text" placeholder='ФИО' className="input1" value={input1Value} onChange={(event) => setInput1Value(event.target.value)} /><br /><br />
      
      <input type="date" placeholder='date' className="input2" value={input2Value} onChange={(event) => setInput2Value(event.target.value)} /><br /><br />

      <input type="number" placeholder='card number' className="input3" value={input3Value} onChange={(event) => setInput3Value(event.target.value)} /><br /><br />
      
      <input type="password" placeholder='pincode' className="input4" value={input4Value} onChange={(event) => setInput4Value(event.target.value)} /><br /><br />
      <button type="submit">Оплатить</button>
    </form>
  );
}

export default ModalForPay
