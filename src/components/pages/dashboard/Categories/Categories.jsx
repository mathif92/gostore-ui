import React, {PropTypes, Component} from 'react';
import {Link} from "react-router";
import {Jumbotron} from 'react-bootstrap';
import $ from "jquery";
import {Button, Icon, Image as ImageComponent, Dimmer, Loader, Item, Label} from 'semantic-ui-react'
import history from "../../../../app";


var Blank = React.createClass({

    constructor() {
        this.state = {categories: []};
    },

    componentDidMount() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/categories',
            data: data
        }).done(function (result) {
            this.setState({categories: result.json()});
            console.log('Categories : ' + result.json());
        }).fail(function (jqXHR, status) {
            console.log('failed to load the categories');
            return false;
        });
    },

    render: function () {
        var categoryList = this.state.categories.map(function (category) {
            return (
                <Item>
                    <Item.Image src={category.imageURL}/>

                    <Item.Content>
                        <Item.Header as='a'>{category.name}</Item.Header>
                        <Item.Meta>
                            <span className='cinema'>IFC Cinema</span>
                        </Item.Meta>
                        <Item.Description>{category.description}</Item.Description>
                        <Item.Extra>
                            <Button primary floated='right' onClick={this.handleCategorySelection}>
                                Ver Productos
                                <Icon name='right chevron'/>
                            </Button>
                            {/*<Label>Limited</Label>*/}
                        </Item.Extra>
                    </Item.Content>
                </Item>
            );
        });
        return (
            <div className="overview-page" key="overview">
                <Link to="/dashboard/reports"
                      className="pull-right btn btn-primary btn-outline btn-rounded">Reports</Link>
                <h2>Categorías
                    <small>Selecciona "Ver Productos" para ver los productos de una categoría</small>
                </h2>
                <Jumbotron>
                    <p><a className="btn btn-primary btn-lg btn-outline btn-rounded">{categoryList}</a></p>
                </Jumbotron>
            </div>


        );
    },

    handleCategorySelection: function () {

    }

});

export default Blank;
