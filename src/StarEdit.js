import React, { Component } from 'react';
import {Button, ButtonGroup, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter} from 'react-router-dom';

class StarEdit extends Component {
    emptyStar = {
        star_name: '',
        longitude: '',
        latitude: '',
        color: '',
        astronomer_name: '',
        astronomer_id: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyStar
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const stars = await (await fetch(`/api/star/${this.props.match.params.id}`)).json();
            this.setState({item: stars});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch((item.id) ? '/star/' + (item.id)  : '/star/new', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Update' : 'Insert Star'}</h2>;
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Star Name</Label>
                        <Input type="text" name="name" id="name" value={item.star_name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Longitude</Label>
                        <Input type="text" name="longitude" id="description" value={item.longitude || ''}
                               onChange={this.handleChange} autoComplete="longitude"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cost">Latitude</Label>
                        <Input type="text" name="latitude" id="cost" value={item.latitude || ''}
                               onChange={this.handleChange} autoComplete="latitude"/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="color">Color</Label>
                            <select className="custom-select" name="color" id="color" onChange={this.handleChange}>
                                <option selected type="text" autoComplete="color">{item.color || ''}</option>
                                <option value="blue">blue</option>
                                <option value="white-blue">white-blue</option>
                                <option value="white">white</option>
                                <option value="yellow-white">yellow-white</option>
                                <option value="yellow">yellow</option>
                                <option value="orange">orange</option>
                                <option value="red">red</option>
                            </select>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="type">Astronomer Name</Label>
                            <select className="custom-select" name="astronomer_name" id="astronomer_name" onChange={this.handleChange} >
                                <option selected type="text" autoComplete="astronomer_name">{item.astronomer_name || ''}</option>
                                <option value={item.astronomer_id}></option>
                            </select>
                        </FormGroup>
                        <div>
                            <p><br/></p>
                            <Button size="sm" color="primary" tag={Link}
                                    to={"/astronom/" + ''}>Update</Button>
                        </div>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save changes</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(StarEdit);