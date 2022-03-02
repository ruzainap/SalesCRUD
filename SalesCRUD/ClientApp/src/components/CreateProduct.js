import React, { Component } from 'react';
import { Form, Modal, Button } from "semantic-ui-react";

export class CreateProduct extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
            name: "", price: 0.00
        };
        if (props.products) {
            this.state = props.products;
        }
        else {
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
    formatInput=()=> {
        const price = this.state.price
        this.setState({
            price: parseFloat(price)
        })
       
    }

    render() {
        return (
            <div>
                <Modal centered={true} size='tiny' open={this.props.isOpen}>
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
                                <label>Price</label>
                                <input
                                    placeholder='Price'
                                    name='price'
                                    value={this.state.price}
                                    onChange={e => this.handleChange(e)}
                                    onBlur={() => this.formatInput()}
                                    
                                       
                                />
                            </Form.Field>

                            {/*//enabling button when all fields are not filled*/}

                            <Button.Group>
                                <Form.Button color='black' content='cancel' onClick={() => this.props.handleCancel()} />
                                <Form.Button content='Submit' positive icon labelPosition='right'
                                    disabled={!this.state.name ||
                                        !this.state.price}
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
