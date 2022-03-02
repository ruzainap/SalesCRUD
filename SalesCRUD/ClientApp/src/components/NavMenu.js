import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
//import './NavMenu.css';
import { Menu,Segment,Header } from 'semantic-ui-react'

export class NavMenu extends Component {
  static displayName = NavMenu.name;


    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Header as='h3'>
                <Segment inverted>
                    <Menu inverted secondary>
                        <Menu.Item
                            name='react'
                            active={activeItem === 'react'}
                            onClick={this.handleItemClick}
                        >
                            React
                        </Menu.Item>

                        <Menu.Item
                            as={Link}
                            name='customers'
                            to="/fetch-customer"
                            active={activeItem === 'customers'}
                            onClick={this.handleItemClick}
                        >
                            Customers
                        </Menu.Item>

                        <Menu.Item
                            as={Link}
                            name='products'
                            to="/fetch-product"
                            active={activeItem === 'products'}
                            onClick={this.handleItemClick}
                        >
                            Products
                        </Menu.Item>

                        <Menu.Item
                            as={Link}
                            to="/fetch-store"
                            name='stores'
                            active={activeItem === 'stores'}
                            onClick={this.handleItemClick}
                        >
                            Stores
                        </Menu.Item>
                        <Menu.Item
                            as={Link}
                            to="/fetch-sale"
                            name='sales'
                            active={activeItem === 'sales'}
                            onClick={this.handleItemClick}
                        >
                            Sales
                        </Menu.Item>
                    </Menu>
                </Segment>
            </Header>
        )
    }
  //constructor (props) {
  //  super(props);

  //  this.toggleNavbar = this.toggleNavbar.bind(this);
  //  this.state = {
  //    collapsed: true
  //  };
  //}

  //toggleNavbar () {
  //  this.setState({
  //    collapsed: !this.state.collapsed
  //  });
  //}

  //render () {
  //  return (
  //    <header>
  //      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
  //        <Container>
  //          <NavbarBrand tag={Link} to="/">SalesCRUD</NavbarBrand>
  //          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
  //          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
  //            <ul className="navbar-nav flex-grow">
  //              <NavItem>
  //                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
  //              </NavItem>
  //              <NavItem>
  //                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
  //              </NavItem>
  //              <NavItem>
  //                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
  //              </NavItem>
  //            </ul>
  //          </Collapse>
  //        </Container>
  //      </Navbar>
  //    </header>
  //  );
  //}
}
