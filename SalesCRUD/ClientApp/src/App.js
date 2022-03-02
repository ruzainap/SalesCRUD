import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Customer } from './components/Customer';
import { Product } from './components/Product';
import { Store } from './components/Store';
import { Sale } from './components/Sale';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { NavMenu } from './components/NavMenu';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          <div>
          <Layout>
                  <Route path='/fetch-customer' component={Customer} />
                  <Route path='/fetch-product' component={Product} />
                  <Route path='/fetch-store' component={Store} />
                  <Route path='/fetch-sale' component={Sale} />
          </Layout>
             
          </div>
    
    );
  }
}
