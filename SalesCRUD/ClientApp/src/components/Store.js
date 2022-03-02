import React, { Component } from 'react';
import axios from "axios";
import { Container } from 'semantic-ui-react';
import { CreateStore } from './CreateStore';
import { FetchStore } from './FetchStore';



export class Store extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddStore: false,
            error: null,
            response: {},
            stores: {},
            isEditStore: false,
            modalOpen: false
        };
    }


    handleCancel = () => {
        this.setState({
            isAddStore: false,
            isEditStore: false
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
        this.setState({ isAddStore: true });
    }

    onFormSubmit = data => {
        this.handleClose()
        let apiUrl;
        if (this.state.isEditStore) {

            apiUrl = '/api/Stores/' + data.id;

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
                        isAddStore: false,
                        isEditStore: false

                    })



                },

                    (error) => {
                        this.setState({ error: error })

                    }
                )
        }

        else {
            apiUrl = '/api/Stores';

            const res = axios.post(apiUrl, data);

            this.setState({
                response: res,
                isAddStore: false,
                isEditStore: false
            })
        }
        this.setState({ stores: {} });
    }
    storeEdit = storeId => {

        this.handleOpen()
        fetch('/api/Stores/' + storeId)
            .then(res =>
                res.json()
            )
            .then((result) => {

                this.setState({
                    stores: result,
                    isAddStore: true,
                    isEditStore: true
                });

            },
                (error) => {
                    this.setState({ error: error })

                })

    }

    render() {

        let storeForm, pageTitle, buttonContent;
        if (this.state.isEditStore) {
            pageTitle = 'Edit Store';
            buttonContent = 'edit'
        }
        else if (this.state.isAddStore) {
            pageTitle = 'Add Store';
            buttonContent = 'create'
            this.state.stores = this.initialState;
        }

        if (this.state.isAddStore || this.state.isEditStore) {
            storeForm = <CreateStore pageTitle={pageTitle} buttonContent={buttonContent} isOpen={this.state.modalOpen} onFormSubmit={this.onFormSubmit} stores={this.state.stores} handleCancel={this.handleCancel} />
        }
        return (

            <div>
                <Container>
                    {!this.state.isAddStore && <FetchStore storeEdit={this.storeEdit} onCreate={this.onCreate} />}
                    {storeForm}
                    

                    {this.state.error && <div>Error: {this.state.error.message}</div>}
                </Container>
            </div>

        );


    }
}
