import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

class Panel extends Component {
    render() {
        return (
            <Container className={'bg-faded m-4 rounded p-2 ' + (this.props.wide? 'col-9' : 'col-6') }>
                <div className='text-center'>
                    <h2>{this.props.header}</h2>
                </div>
                <div className='p-4'>
                    {this.props.children}
                </div>
            </Container>
        );
    }
}

export default Panel;