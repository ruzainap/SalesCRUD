import React, { Component } from 'react';
import { Form, Modal, Button  } from "semantic-ui-react";
import DatePicker from 'react-datepicker';


export class CreateSale extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dateSold: "",
            customerId: 0,
            productId:0,
            storeId: 0
        };

        this.initialState = {
            dateSold:"",
            customerId: 0,
            productId: 0,
            storeId: 0
        };
        
        if (props.sales != null) {

            this.state = props.sales
        }
        
    }


    handleChange = (e) => {
       
        this.setState({ [e.target.name]: e.target.value });
        
    };



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);
        
    }
    formatDate = (e) => {
         
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    formatInput = (e) => {
        const id = e.target.value
        this.setState({
            [e.target.name]: parseInt(id)
        })

    }

    render() {
      
   
        return (
            <div>
                <Modal
                    centered={true}
                    size='tiny'
                    open={this.props.isOpen}>
                    <Modal.Header>{this.props.pageTitle}</Modal.Header>
                    <Modal.Content>
                        <Form >
                          
                            <Form.Field>
                                <label>Date sold</label>

                                <DatePicker name='dateSold' selected={Date.parse(this.state.dateSold)} onChange={(date) => { this.setState({ dateSold: date }) }} onBlur = {(e) => this.formatDate(e)} />
                                    
                                
                            </Form.Field>

                            <Form.Field>
                                <label>Customer</label>
                                
                                <select defaultValue={this.state.customerId} name='customerId' onChange={(e) => this.handleChange(e)} onBlur={(e) => this.formatInput(e)}>
                                    <option value={0}></option>
                                   
                                    {this.props.customers.map((customer) =>  < option key={customer.id} value={customer.id} > {customer.name}</option>)}
                                </select>
                            </Form.Field>

                            <Form.Field>
                                <label>Product</label>
                                <select defaultValue={this.state.productId} name='productId' onChange={(e) => this.handleChange(e)} onBlur={(e) => this.formatInput(e)}>
                                    <option value={0}></option>
                                    {this.props.products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
                                </select>
                            </Form.Field>

                            <Form.Field>
                                <label>Store</label>
                                <select defaultValue={this.state.storeId} name='storeId' onChange={(e) => this.handleChange(e)} onBlur={(e) => this.formatInput(e)}>
                                    <option value={0}></option>
                                    {this.props.stores.map((store) => <option key={store.id} value={store.id}>{store.name}</option>)}
                                </select>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    {/*//enabling button when all fields are not filled*/}
                    <Modal.Actions>
                            
                                <Button color='black' content='cancel' onClick={() => this.props.handleCancel()} />
                        <Button 
                            onClick={e => this.handleSubmit(e)}
                            positive
                            icon
                            labelPosition='right'
                            disabled={!this.state.dateSold || !this.state.customerId || !this.state.productId || !this.state.storeId}>
                            {this.props.buttonContent}
                                    <i className="check icon"></i>
                                </Button>

                    </Modal.Actions>

                </Modal>
            </div>
        )
    }

}