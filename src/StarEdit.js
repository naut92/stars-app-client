import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter} from 'react-router-dom';

class StarEdit extends Component {
    emptyItem = {
        name: '',
        size: '',
        cost: '',
        color: '',
        type: '',
        description: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const store = await (await fetch(`/api/store/${this.props.match.params.id}`)).json();
            this.setState({item: store});
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

        await fetch((item.id) ? '/api/store/'+(item.id)  : '/api/store', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/store');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Внести изменения' : 'Добавить одежду'}</h2>;
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Наименование</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Описание</Label>
                        <Input type="text" name="description" id="description" value={item.description || ''}
                               onChange={this.handleChange} autoComplete="description"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cost">Цена</Label><Input type="text" name="cost" id="cost" value={item.cost || ''}
                                                             onChange={this.handleChange} autoComplete="cost"/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="color">Цвет</Label>
                            <select className="custom-select" name="color" id="color" onChange={this.handleChange}>
                                <option selected type="text" autoComplete="color">{item.color || ''}</option>
                                <option value="white">white</option>
                                <option value="blue">blue</option>
                                <option value="red">red</option>
                                <option value="green">green</option>
                                <option value="black">black</option>
                            </select>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="type">Вид одежды</Label>
                            <select className="custom-select" name="type" id="type" onChange={this.handleChange} >
                                <option selected type="text" autoComplete="type">{item.type || ''}</option>
                                <option value="dress">dress</option>
                                <option value="pants">pants</option>
                                <option value="skirt">skirt</option>
                                <option value="vest">vest</option>
                                <option value="shirt">shirt</option>
                            </select>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="size">Размер</Label>
                            <select className="custom-select" name="size" id="size" onChange={this.handleChange}>
                                <option selected type="text" autoComplete="type">{item.size || ''}</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                                <option value="44">44</option>
                                <option value="45">45</option>
                                <option value="46">46</option>
                                <option value="47">47</option>
                                <option value="48">48</option>
                                <option value="50">50</option>
                                <option value="50">52</option>
                            </select>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Сохранить</Button>{' '}
                        <Button color="secondary" tag={Link} to="/store">Отмена</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(StarEdit);