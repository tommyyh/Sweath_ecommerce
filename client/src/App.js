import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import Home from './containers/Home/Home';
import Products from './containers/Products/Products';
import Show from './containers/Show/Show';
import Cart from './containers/Cart/Cart';
import Shipping from './containers/Shipping/Shipping';
import Payment from './containers/Payment/Payment';
import Finish from './containers/Finish/Finish';
import Favorite from './containers/Favorite/Favorite';
import Account from './containers/Account/Accocunt';
import Admin from './containers/Admin/Admin';
import ProductReviews from './containers/ProductReviews/ProductReviews';
import Contact from './containers/Contact/Contact';
import Orders from './containers/Orders/Orders';
import Order from './containers/Order/Order';
import NotFound from './containers/NotFound/NotFound';
import Sale from './containers/Sale/Sale';
import AdminEdit from './containers/AdminEdit/AdminEdit';
import LoginPrompt from './containers/LoginPrompt/LoginPrompt';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  // Protected route
  const ProtectedRoute = ({ component, exact, path }) => {
    const isLogged = useSelector((state) => state.isLogged);

    return (
      <>
        {isLogged ? (
          <Route path={path} exact={exact} component={component} />
        ) : (
          <Route path={path} exact={exact} component={LoginPrompt} />
        )}
      </>
    );
  };

  // Admin route
  const AdminRoute = ({ component, exact, path }) => {
    const isLogged = useSelector((state) => state.isLogged);
    const userRole = useSelector((state) => state.userRole);

    return (
      <>
        {isLogged && userRole === 'ADMIN' ? (
          <Route path={path} exact={exact} component={component} />
        ) : (
          <Route path={path} exact={exact} component={NotFound} />
        )}
      </>
    );
  };

  // Checkout route
  const CheckoutRoute = ({ component, exact, path }) => {
    const allowCheckout = useSelector((state) => state.allowCheckout);

    return (
      <>
        {allowCheckout ? (
          <Route path={path} exact={exact} component={component} />
        ) : (
          <NotFound />
        )}
      </>
    );
  };

  // Payment route
  const PaymentRoute = ({ component, exact, path }) => {
    const allowPayment = useSelector((state) => state.allowPayment);

    return (
      <>
        {allowPayment ? (
          <Route path={path} exact={exact} component={component} />
        ) : (
          <NotFound />
        )}
      </>
    );
  };

  // Finish route
  const FinishRoute = ({ component, exact, path }) => {
    const allowFinish = useSelector((state) => state.allowFinish);

    return (
      <>
        {allowFinish ? (
          <Route path={path} exact={exact} component={component} />
        ) : (
          <NotFound />
        )}
      </>
    );
  };

  return (
    <Router>
      <Header />
      <Switch>
        <AdminRoute path='/admin' exact={true} component={Admin} />
        <AdminRoute path='/edit/:product' exact={true} component={AdminEdit} />
        <ProtectedRoute path='/my-account' exact={true} component={Account} />
        <ProtectedRoute path='/favorite' exact={true} component={Favorite} />
        <ProtectedRoute
          path='/my-account/orders'
          exact={true}
          component={Orders}
        />
        <ProtectedRoute
          path='/my-account/order/:id'
          exact={true}
          component={Order}
        />
        <CheckoutRoute
          path='/checkout/shipping-information'
          exact={true}
          component={Shipping}
        />
        <PaymentRoute
          path='/checkout/order-payment'
          exact={true}
          component={Payment}
        />
        <FinishRoute path='/finish-order' exact={true} component={Finish} />
        <Route path='/' exact component={Home} />
        <Route path='/category/:category' exact component={Products} />
        <Route path='/product/:title' exact component={Show} />
        <Route path='/cart' component={Cart} />
        <Route
          path='/products/phones/:title/reviews'
          component={ProductReviews}
        />
        <Route path='/contact-us' component={Contact} />
        <Route path='/sale/:title' exact component={Sale} />
        <Route path='*' component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
