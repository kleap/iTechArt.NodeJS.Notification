import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import classNames from 'classnames';

const mapStateToProps = (state) => ({ error: state.common.error });

class Error extends Component {
    static propTypes = {
        error: PropTypes.string
    }

    render() {
        return (
            <div
                className={classNames({
                    'alert alert-danger': true,
                    'invisible': !this.props.error
                })}
                role="alert">
                <strong>Oh no!</strong>
                {this.props.error}
            </div>
        )
    }
}
export default connect(mapStateToProps)(Error);
