import React, {PropTypes, Component} from 'react';
import {Link} from "react-router";
import {Jumbotron} from 'react-bootstrap';
import $ from "jquery";
import {Button, Icon, Image as ImageComponent, Dimmer, Loader, Item, Label} from 'semantic-ui-react'

import history from "../../../../app";
import Products from "../Products/Products";


var Blank = React.createClass({

    componentWillMount() {
        this.state = {categories: []};
        console.log('Constructing the Categories class');
        console.log('about to get the categories');
        $.get('http://localhost:8080/categories').done(function (result) {
            var categoriesJSON = $.parseJSON(result)['categories'];
            console.log('Categories : ' + JSON.stringify(categoriesJSON));
            var categoryList = categoriesJSON.map(function (category) {
                return (
                        <Item key={category['categoryId']}>
                            <Item.Image src={category['imageUrl']}/>

                            <Item.Content>
                                <Item.Header as='a'>{category['name']}</Item.Header>
                                <Item.Description>{category['description']}</Item.Description>
                                <Item.Extra>
                                    <Button primary floated='right' onClick={() => this.handleCategorySelection(category['categoryId'])}>
                                        Ver Productos
                                    </Button>
                                    {/*<Label>Limited</Label>*/}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                );
            }, this);
            this.setState({categories: categoryList});
        }.bind(this));
    },

    render: function () {
        if (this.state.categories.length > 0) {
            return (
                <div className="overview-page" key="categories">
                    <h2>Categorías</h2>
                    <Jumbotron>
                        <div>
                            <Item.Group divided>
                                {this.state.categories}
                            </Item.Group>
                        </div>
                    </Jumbotron>
                </div>


            );
        }
        return (<div></div>)
    },

    handleCategorySelection: function (categoryId) {
        history.push({
            pathname: '/dashboard/products',
            state: {
                categoryId : categoryId, productList : []
            }
        });
    }

});

export default Blank;
