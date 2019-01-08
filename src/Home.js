import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';


class Home extends Component {
    emptyStar = {
        star_name: '',
        longitude: '',
        latitude: '',
        color: '',
        astronomer_name: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            stars: this.emptyStar
        };
        this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const stars = await (await fetch(`/stars`)).json();
            this.setState({stars: stars});
        }
    }

    async remove(id) {
        const starId = this.props.match.params.id;
        await fetch(`/stars/${starId}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedStars = [...this.state.stars].filter(i => i.id !== id);
            this.setState({stars: updatedStars});
        });
    }

    render() {
        const {stars, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }

        //const starId = this.props.match.params.id;
        const starsList = Object.keys(stars).map(star => {
            return <tr key={stars[star].id}>
                <td style={{whiteSpace: 'nowrap'}}><p key={stars[star].id}>
                    {stars[star].star_name}</p>
                </td>
                <td>{stars[star].astronomer_name}</td>
                <td>
                    <div key={stars[star].id}>
                        {'longitude: ' + stars[star].longitude + ', '}<br/>
                        {'latitude: ' + stars[star].latitude + ', '}<br/>
                        {'color: ' + stars[star].color + ', '}<br/>
                    </div>
                </td>

                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link}
                                to={"/star/" + stars[star].id}>Update</Button>
                        <Button size="sm" color="danger"
                                onClick={() => this.remove(stars[star].id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to={"/star/new/"}>Insert Star</Button>
                    </div>
                    <h3>Stars:</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Star name</th>
                            <th width="20%">Astronomer name</th>
                            <th width="20%">Options</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {starsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Home;