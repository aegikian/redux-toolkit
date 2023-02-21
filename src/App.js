import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { fetchCustomers } from './asyncAction/customers';
import { useEffect } from 'react';
import { asyncDecrementCreator, asyncIncrementCreator, decrementCreator } from './store/counterReducer';
import { fetchUsers } from './store/userReducer';

function App() {
  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)
  const count = useSelector(state => state.count.count)
  const users = useSelector(state => state.users.users)

  const addCash = (sum) => {
    dispatch({ type: 'ADD_CASH', payload: sum })
  }

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  const getCash = (sum) => {
    dispatch({ type: 'GET_CASH', payload: sum })
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App">
      <h3>Баланс</h3>
      <button onClick={() => addCash(Number(prompt()))}>Пополнить</button>
      <button onClick={() => getCash(Number(prompt()))}>Снять</button>
      <h1 style={{ marginBottom: '5%' }}>{cash}</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>
        <button onClick={() => dispatch(fetchCustomers())}>Получить клиентов из базы</button>
      </div>
      {
        customers.length > 0 ?
          <div style={{ marginTop: '5%' }}>
            <h3>Список клиентов</h3>
            {customers.map(customer =>
              <div className='customers_map_div' key={customers.id}>
                <h5 className='customer_name' key={customers.id} onClick={() => removeCustomer(customer)}>{customer.name}
                </h5>
                <button onClick={() => removeCustomer(customer)}>Удалить клиента</button>
              </div>
            )}
          </div>
          :
          <div>
            Клиенты отсутствуют
          </div>
      }
      <div>
        <h2>Счетчик</h2>
        <button onClick={() => dispatch(asyncIncrementCreator())} >++</button>
        <button onClick={() => dispatch(asyncDecrementCreator())}>--</button>
        <h2>{count}</h2>
      </div>
      <button onClick={() => dispatch(fetchUsers())}>Получить юзеров</button>
      {
        users.length > 0 ?
          <div style={{ marginTop: '5%' }}>
            <h3>Список юзеров</h3>
            {users.map(user =>
              <div className='customers_map_div'>
                <h5 className='customer_name' key={user.id}>
                  {user.name}
                </h5>
                {/* <button onClick={() => removeCustomer(customer)}>Удалить клиента</button> */}
              </div>
            )}
          </div>
          :
          <div>
            Клиенты отсутствуют
          </div>
      }
    </div>
  );
}

export default App;
