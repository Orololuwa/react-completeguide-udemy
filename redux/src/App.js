import Counter from './components/Counter';
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

import Auth from "./components/Auth";

import { useSelector, useDispatch} from "react-redux";

import {authActions} from "./store/auth"


function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

  const loginHandler = () => {
    dispatch(authActions.login())
  }
  return (
    <>
    <Header />
    {isAuthenticated && <UserProfile />}
    {!isAuthenticated && <Auth login={loginHandler} />}
    <Counter />
    </>
  );
}

export default App;
