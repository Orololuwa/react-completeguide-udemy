import classes from './Counter.module.css';
import {useSelector, useDispatch} from "react-redux";
import { counterActions } from "../store/counter";

const Counter = () => {

  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter);
  const showCounter = useSelector(state => state.counter.showCounter);

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle())
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase({step: 5}))
  }

  const decreaseHandler = () => {
    dispatch(counterActions.decrease({step: 5}))
  }

  const incrementHandler = () => {
    dispatch(counterActions.increament())
  }

  const decrementHandler = () => {
    dispatch(counterActions.decreament())
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={decrementHandler} >-</button>
        <button onClick={incrementHandler} >+</button>
      </div>
      <div>
        <button onClick={decreaseHandler} >- 5</button>
        <button onClick={increaseHandler} >+ 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
