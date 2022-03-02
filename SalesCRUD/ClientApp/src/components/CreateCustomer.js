
import React, { Component } from 'react';
import { Form, Modal } from "semantic-ui-react";
import { Button } from 'semantic-ui-react';



export class CreateCustomer extends Component {



    constructor(props) {
        super(props);
        this.initialState = {
            name: "", address: ""
        };

        if (props.customers) {

            this.state = props.customers;
        }
        else {
            console.log("hii in else")
            this.state = this.initialState;
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

    render() {
       

        return (
            <div>
                <Modal
                   
                    centered={true}
                    size='tiny'
                    open={this.props.isOpen}>
                    <Modal.Header>{this.props.pageTitle}</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Form.Field>
                                <label>Name</label>
                                <input
                                    placeholder='Name'
                                    name='name'
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input
                                    placeholder='Address'
                                    name='address'
                                    value={this.state.address}
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Field>
                            
                                {/*//enabling button when all fields are not filled*/}

                    <Button.Group>
                                <Form.Button color='black' content='cancel' onClick={() => this.props.handleCancel()} />
                                <Form.Button content='Submit' positive icon labelPosition='right'
                            disabled={!this.state.name ||
                                        !this.state.address}
                                >{this.props.buttonContent}
                                    <i className="check icon"></i>
                                    
                                </Form.Button>
                               
                            </Button.Group>
                        </Form>
                    </Modal.Content>

                </Modal>
            </div>
        )
    }
}
