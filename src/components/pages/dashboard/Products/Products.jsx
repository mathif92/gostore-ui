import React, {PropTypes, Component} from 'react';
import {Link} from "react-router";
import {Jumbotron} from 'react-bootstrap';
import $ from "jquery";
import {Button, Icon, Image as ImageComponent, Dimmer, Loader, Item, Label} from 'semantic-ui-react'

import history from "../../../../app";


var Blank = React.createClass({

    componentWillMount() {
        var FIRST_PAGE = 1;
        this.state = {categoryId: 1, productList : []};
        console.log(JSON.stringify(this.state));
        console.log('Constructing the Products class');
        console.log('about to get the category products');
        $.get('http://localhost:8080/products/category/' + this.state.categoryId + "/" + FIRST_PAGE).done(function (result) {
            var productsJSON = $.parseJSON(result)['products'];
            var productList = productsJSON.map(function (product) {
                return (
                        <Item key={product['productId']}>
                            <Item.Image src={product['imageUrl']}/>

                            <Item.Content>
                                <Item.Header as='a'>{product['name']}</Item.Header>
                                <Item.Description>{product['description']}</Item.Description>
                                <Item.Extra>
                                    <Button primary floated='right' onClick={this.addToCart(product)}>
                                        Añadir al Carrito
                                    </Button>
                                    {/*<Label>Limited</Label>*/}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                );
            }, this);
            this.setState({
                    categoryId : this.state.categoryId,
                    productList: productList
                });
        }.bind(this));
    },

    render: function () {
        if (this.state.productList.length > 0) {
            return (
                <div className="overview-page" key="categories">
                    <h2>Productos</h2>
                    <Jumbotron>
                        <div>
                            <Item.Group divided>
                                {this.state.productList}
                            </Item.Group>
                        </div>
                    </Jumbotron>
                </div>


            );
        }
        return (<div></div>)
    },

    addToCart: function (product) {

    }

});

export default Blank;
