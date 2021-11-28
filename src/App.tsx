import React from 'react';
import './App.scss';
import Home from './pages/Home';
import AppDashboard from './pages/App';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch, // for server rendering
    Route,
    Redirect,
} from 'react-router-dom';

function App() {
    return (
        <div className=''>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <Router>
                        <Switch>
                            <Route path='/app'>
                                <AppDashboard />
                            </Route>
                            <Route exact path='/'>
                                <Home />
                            </Route>
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;
