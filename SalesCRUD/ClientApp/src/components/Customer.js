import React, { Component } from 'react';
import axios from "axios";
import { Container} from 'semantic-ui-react';
import { CreateCustomer } from './CreateCustomer';
import { FetchCustomer } from './FetchCustomer';



export class Customer extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
            isAddCustomer: false,
            error: null,
            response: {},
            customers: {},
            isEditCustomer: false,
            modalOpen: false
        };
    }

    
    handleCancel = () => {
        this.setState({
            isAddCustomer: false,
            isEditCustomer: false
        })
        this.handleClose()
    }

    handleOpen = () => { this.setState({ modalOpen: true }) }

    handleClose = () => { this.setState({ modalOpen: false}) }

    handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }); };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onFormSubmit(this.state);
    }

    onCreate = () => {
        this.handleOpen()
        this.setState({ isAddCustomer: true });
    }

    onFormSubmit = data => {
        this.handleClose()
        let apiUrl;
        if (this.state.isEditCustomer) {

            apiUrl = '/api/Customers/' + data.id;

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
                        isAddCustomer: false,
                        isEditCustomer: false

                    })



                },

                    (error) => {
                        this.setState({ error: error })

                    }
                )
        }

        else {
            apiUrl = '/api/Customers';

            const res = axios.post(apiUrl, data);

            this.setState({
                response: res,
                isAddCustomer: false,
                isEditCustomer: false
            })
        }
        this.setState({ customers: {} });
    }
    customerEdit = customerId => {

        this.handleOpen()
        fetch('/api/Customers/' + customerId)
            .then(res =>
                res.json()
            )
            .then((result) => {

                this.setState({
                    customers: result,
                    isAddCustomer: true,
                    isEditCustomer: true
                });

            },
                (error) => {
                    this.setState({ error: error })

                })

    }

    render() {

        let customerForm, pageTitle,buttonContent;
        if (this.state.isEditCustomer) {
            pageTitle = 'Edit Customer';
            buttonContent='edit'
        }
        else if (this.state.isAddCustomer) {
            pageTitle = 'Add Customer';
            buttonContent = 'create'
            this.state.customers = this.initialState;
        }

        if (this.state.isAddCustomer || this.state.isEditCustomer) {
            console.log(this.state.customers)
            customerForm = <CreateCustomer pageTitle={pageTitle} buttonContent={buttonContent} isOpen={this.state.modalOpen} onFormSubmit={this.onFormSubmit} customers={this.state.customers} handleCancel={this.handleCancel} />
        }
        return (

            <div>
                <Container>
                    {!this.state.isAddCustomer && <FetchCustomer customerEdit={this.customerEdit} onCreate={this.onCreate} />}
                    {customerForm}
                    {/*<Modal*/}
                    {/*    open={this.state.modalOpen}*/}
                    {/*    onClose={() => this.handleClose} closeIcon>*/}
                    {/*    <Modal.Header>{pageTitle}</Modal.Header>*/}
                    {/*    <Modal.Content>*/}
                    {/*        {customerForm}*/}
                    {/*    </Modal.Content>*/}
                    {/*</Modal>*/}

                    {this.state.error && <div>Error: {this.state.error.message}</div>}
                </Container>
            </div>

        );


    }
}
