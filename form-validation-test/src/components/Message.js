import React, { Component } from 'react';

class Message extends Component {
	render() {
		let customMessage = this.props.custom;
		
		return (
			<small className="c-field__error">
				{(!customMessage ? "This field is required": customMessage)}
			</small>
		)
	}
}

export default Message;