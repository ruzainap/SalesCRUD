﻿
import React, { Component } from 'react'
import { Icon, Menu, Table, Button } from 'semantic-ui-react'
import { DeleteModal } from './DeleteModal';



export class FetchCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            customers: [],
            postPerPage: 5,
            currentPage: 1,
            pageNumbers: [],
            totalPosts: 0,
            lastPageNum: 0,
            modalOpen: false,
            deleteId: 0
        }
    }


    handleDeleteOpen = (e) => {
        this.setState({ modalOpen: true });
        this.setState({ deleteId: e });
    }
    handleDeleteClose = () => {
        this.setState({ modalOpen: false });
    }
    
    componentDidMount() {

        fetch('/api/Customers')
            .then(res => res.json())
            .then(result => {

                this.setState({ customers: result });
                this.setState({ totalPosts: result.length })
                this.pageNumbering(this.state.totalPosts)
            },

                (error) => { this.setState({ error }); })


    }

    pageNumbering = totalPosts => {
        let i;
        let num = [];
        for (i = 1; i <= Math.ceil(totalPosts / this.state.postPerPage); i++) {

            num.push(i);
        }
        this.setState({ pageNumbers: num })
        this.setState({ lastPageNum: i - 1 })

    }

    customerDelete = customerId => {

        this.handleDeleteClose();
        const { customers } = this.state;
        let apiUrl = '/api/Customers/' + customerId;
        fetch(apiUrl, { method: 'DELETE' })
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        response: result,
                        customers: customers.filter(customer => customer.id !== customerId)
                    });
                    this.setState({ totalPosts: this.state.customers.length })

                    this.pageNumbering(this.state.totalPosts)
                    this.setState({ currentPage: this.state.lastPageNum })
                },
                (error) => {
                    this.setState({ error });

                })

    }
    paginate = pageNum => {
        this.setState({ currentPage: pageNum });
    }
    leftPaginate = () => {
        if (this.state.currentPage > 1) { this.setState({ currentPage: this.state.currentPage - 1 }) }
    }
    rightPaginate = () => {
        if (this.state.currentPage < this.state.lastPageNum) {
            this.setState({ currentPage: this.state.currentPage + 1 })
        }
    }
    render() {

        
        const { error, customers, postPerPage, currentPage, pageNumbers } = this.state;

        const indexOfLastPost = currentPage * postPerPage;
        const indexofFirstPost = indexOfLastPost - postPerPage;
        const currentPost = customers.slice(indexofFirstPost, indexOfLastPost);
        let text = 'customer';

        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        }

        else {

            return (

                <>
                    {this.state.modalOpen && <DeleteModal text={text} deleteItem={this.customerDelete} deleteId={this.state.deleteId} handleDeleteClose={this.handleDeleteClose} />}
                    <div>
                        <Button color='blue' onClick={() => this.props.onCreate()}>New Customer</Button>
                    </div>

                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        
                        <Table.Body>
                            {
                                currentPost.map(customer => (
                                    <Table.Row key={customer.id}>
                                        <Table.Cell>{customer.name}</Table.Cell>
                                        <Table.Cell>{customer.address}</Table.Cell>
                                        <Table.Cell>

                                            <Button color="yellow" onClick={() => this.props.customerEdit(customer.id)}>
                                                <i aria-hidden="true" className="edit  icon" />
                                                EDIT
                                            </Button>

                                        </Table.Cell>
                                        <Table.Cell><Button color="red" onClick={() => this.handleDeleteOpen(customer.id)}>
                                            <i aria-hidden="true" className="trash icon" />
                                            DELETE
                                        </Button></Table.Cell>
                                    </Table.Row>


                                )
                                )

                            }

                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <Menu floated='right' >
                                        <Menu.Item as='a' icon onClick={() => this.leftPaginate()}>
                                            <Icon name='chevron left' />
                                        </Menu.Item>

                                        {pageNumbers.map(number =>
                                        (<Menu.Item key={number} as='a' onClick={() => this.paginate(number)}>{number}</Menu.Item>
                                        ))}
                                        
                                        <Menu.Item as='a' icon onClick={() => this.rightPaginate()}>
                                            <Icon name='chevron right' />
                                        </Menu.Item>
                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </>
            )
        }

    }
}