import React, { Component } from 'react'
import { Icon, Menu, Table, Button } from 'semantic-ui-react'
import { DeleteModal } from './DeleteModal';

export class FetchSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            sales: [],
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

        fetch('/api/Sales')
            .then(res =>res.json())
            .then(result => {
                this.setState({ sales: result });
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

    saleDelete =saleId => {

        this.handleDeleteClose();
        const { sales } = this.state;
        let apiUrl = '/api/Sales/' + saleId;
        fetch(apiUrl, { method: 'DELETE' })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        response: result,
                        sales: sales.filter(sale => sale.id !== saleId)
                    });
                    this.setState({ totalPosts: this.state.sales.length })
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


        const { error, sales, postPerPage, currentPage, pageNumbers } = this.state;
        const indexOfLastPost = currentPage * postPerPage;
        const indexofFirstPost = indexOfLastPost - postPerPage;
        const currentPost = sales.slice(indexofFirstPost, indexOfLastPost);
        let text = 'sale';
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        }
        else {
            return (
                <>
                    {this.state.modalOpen && <DeleteModal text={text} deleteItem={this.saleDelete} deleteId={this.state.deleteId} handleDeleteClose={this.handleDeleteClose} />}
                    <div>
                        <Button color='blue' onClick={() => this.props.onCreate()}>New Sale</Button>
                    </div>

                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                
                                <Table.HeaderCell>Customer</Table.HeaderCell>
                                <Table.HeaderCell>Product</Table.HeaderCell>
                                <Table.HeaderCell>Store</Table.HeaderCell>
                                <Table.HeaderCell>DateSold</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                currentPost.map(sale => (
                                    <Table.Row key={sale.Id}>
                                        
                                        <Table.Cell >{sale.customer.name}</Table.Cell>
                                        <Table.Cell >{sale.product.name}</Table.Cell>
                                        <Table.Cell>{sale.store.name}</Table.Cell>
                                        <Table.Cell>{sale.dateSold}</Table.Cell>
                                        <Table.Cell>

                                            <Button color="yellow" onClick={() => this.props.saleEdit(sale)}>
                                                <i aria-hidden="true" className="edit  icon" />
                                                EDIT
                                            </Button>

                                        </Table.Cell>
                                        <Table.Cell><Button color="red" onClick={() => this.handleDeleteOpen(sale.id)}>
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
                                <Table.HeaderCell colSpan='6'>
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