import React, { Component } from 'react';
import { Button,Header, Modal, ModalActions } from "semantic-ui-react";

export class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {modal:true}
    }

    render() {


        return (
            <div>
                <Modal
                    size='tiny'
                    open={this.state.modal} >

                    <Modal.Header>Delete {this.props.text}</Modal.Header>
                    <Modal.Content>

                        <h4>Are you sure?</h4>

                    </Modal.Content>
                    <ModalActions>
                        <Button color='black' content='cancel' onClick={() => this.props.handleDeleteClose()}></Button>
                        <Button color='red' content='delete' labelPosition='right' icon='times' onClick={() => this.props.deleteItem(this.props.deleteId)}></Button>

                    </ModalActions>


                </Modal>

            </div>
            
            )
    }

}
