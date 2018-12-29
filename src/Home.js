import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    state = {
        isLoading: true,
        stars: []
    };

    async componentDidMount() {
        const response = await fetch('/stars');
        const body = await response.json();
        this.setState({ stars: body, isLoading: false });
    }

    render() {
        const {stars, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {/*<Button color="link"><Link to="/customers">Manage animals</Link></Button>*/}
                    <h2>Звезды:</h2>
                    {stars.map(star =>
                            <div key={star.id}>
                                <Button color="link"><Link to={"/star/" + star.id}>{star.star_name}</Link></Button>
                            </div>
                            )}
                </Container>

            </div>
        );
    }
}

export default Home;