import React, { Component } from 'react';
import axios from "axios";
import { Container } from 'semantic-ui-react';
import { CreateProduct } from './CreateProduct';
import { FetchProduct } from './FetchProduct';

export class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddProduct: false,
            error: null,
            response: {},
            products: {},
            isEditProduct: false,
            modalOpen: false
        };
    }


    handleCancel = () => {
        this.setState({
            isAddProduct: false,
            isEditProduct: false
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
        this.setState({ isAddProduct: true });
    }


    onFormSubmit = data => {
        this.handleClose()
        let apiUrl;
        if (this.state.isEditProduct) {

            apiUrl = '/api/Products/' + data.id;

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
                        isAddProduct: false,
                        isEditProduct: false

                    })
                },
                    (error) => {
                        this.setState({ error: error })
                    }
                )
        }
        else {

            apiUrl = '/api/Products';
            const res = axios.post(apiUrl, data);

            this.setState({
                response: res,
                isAddProduct: false,
                isEditProduct: false
            })
        }
        this.setState({ products: {} });

    }
    productEdit = productId => {

        this.handleOpen()
        fetch('/api/Products/' + productId)
            .then(res =>
                res.json()
            )
            .then((result) => {

                this.setState({
                    products: result,
                    isAddProduct: true,
                    isEditProduct: true
                });

            },
                (error) => {
                    this.setState({ error: error })
                })
    }

    render() {

        let productForm, pageTitle, buttonContent;
        if (this.state.isEditProduct) {
            pageTitle = 'Edit Product';
            buttonContent = 'edit'
        }
        else if (this.state.isAddProduct) {
            pageTitle = 'Add Product';
            buttonContent = 'create'
            this.state.products = this.initialState;
        }

        if (this.state.isAddProduct || this.state.isEditProduct) {
            productForm = <CreateProduct pageTitle={pageTitle} buttonContent={buttonContent} isOpen={this.state.modalOpen} onFormSubmit={this.onFormSubmit} products={this.state.products} handleCancel={this.handleCancel} />
        }
        return (

            <div>
                <Container>
                    {!this.state.isAddProduct && <FetchProduct productEdit={this.productEdit} onCreate={this.onCreate} />}
                    {productForm}
                    {this.state.error && <div>Error: {this.state.error.message}</div>}
                </Container>
            </div>

        );
    }
}