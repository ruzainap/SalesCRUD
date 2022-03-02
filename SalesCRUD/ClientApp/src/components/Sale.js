import React, { Component } from 'react';
import axios from "axios";
import { Container } from 'semantic-ui-react';
import { CreateSale } from './CreateSale';
import { FetchSale } from './FetchSale';

export class Sale extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddSale: false,
            error: null,
            response: {},
            sales: {},
            isEditSale: false,
            modalOpen: false,
            customers:[],
            products: [],
            stores:[]
        };
        this.fetchCustomers();
        this.fetchProducts();
        this.fetchStores();
    }



    fetchProducts = () => {
        fetch('/api/Products')
            .then(res => res.json())
            .then(result => {
                this.setState({ products: result });
            },
                (error) => { this.setState({ error }); })
    }




    fetchCustomers = () => {
        fetch('/api/Customers')
            .then(res => res.json())
            .then(result => {
                this.setState({ customers: result });
            },
                (error) => { this.setState({ error }); })
    }

    fetchStores = () => {
        fetch('/api/Stores')
            .then(res => res.json())
            .then(result => {
                this.setState({ stores: result });
            },
                (error) => { this.setState({ error }); })
    }


    handleCancel = () => {
        this.setState({
            isAddSale: false,
            isEditSale: false
        })
        this.handleClose()
    }


    handleOpen = () => { this.setState({ modalOpen: true }) }

    handleClose = () => { this.setState({ modalOpen: false }) }

    handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }); };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onFormSubmit(this.state);
    }

    onCreate = () => {
        this.handleOpen()
        this.setState({ isAddSale: true });
        this.fetchCustomers();
        this.fetchProducts();
        this.fetchStores();
    }


    onFormSubmit = data => {
        this.handleClose()
        let apiUrl;
        if (this.state.isEditSale) {

            apiUrl = '/api/Sales/' + data.id;

            const options = {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            fetch(apiUrl, options)
                .then(res => res)
                .then((result) => {

                    this.setState({
                        response: result,
                        isAddSale: false,
                        isEditSale: false,
                        products: [],
                        customers: [],
                        stores:[]

                    })
                },
                    (error) => {
                        this.setState({ error: error })
                    }
                )
        }
        else {
            apiUrl = '/api/Sales';
            const res = axios.post(apiUrl, data);
            this.setState({
                response: res,
                isAddSale: false,
                isEditSale: false
            })
        }
        this.setState({ sales: {} });
        this.fetchCustomers();
        this.fetchProducts();
        this.fetchStores();
    }


    saleEdit = sale => {

        this.handleOpen()
        this.setState({
                   sales: sale,
                   isAddSale: true,
                    isEditSale: true
        });
        this.fetchCustomers();
        this.fetchProducts();
        this.fetchStores();
    }

    render() {

        let saleForm, pageTitle, buttonContent;
        if (this.state.isEditSale) {
            pageTitle = 'Edit Sale';
            buttonContent = 'edit'
        }
        else if (this.state.isAddSale) {
            pageTitle = 'Add Sale';
            buttonContent = 'create'
            this.state.sales = this.initialState;
        }

        if (this.state.isAddSale || this.state.isEditSale) {
            saleForm = <CreateSale pageTitle={pageTitle} buttonContent={buttonContent} isOpen={this.state.modalOpen} onFormSubmit={this.onFormSubmit} sales={this.state.sales} handleCancel={this.handleCancel}
                customers={this.state.customers} products={this.state.products} stores={ this.state.stores} />
        }
        return (

            <div>
                <Container>
                    {!this.state.isAddSale && <FetchSale saleEdit={this.saleEdit} onCreate={this.onCreate} />}
                    {saleForm}
                    {this.state.error && <div>Error: {this.state.error.message}</div>}
                </Container>
            </div>

        );
    }
}