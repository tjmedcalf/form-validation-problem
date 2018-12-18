import React, { Component } from 'react';
import Message from './Message';

class SelectField extends Component {
	constructor(props) {
		super(props);
		this.state = {isValid: ""}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount = () => {
		//Add blank field to global formData
		this.props.handleData(this.props.label.toLowerCase(), this.inputElement, this.state.isValid);
	}
	
	renderSelectOptions = options => (
		options.map( option => {
			let label = option;
			let inputId = option.toLowerCase();

			return (<option value={inputId}>{label}</option>)
		})
	)
	
	handleChange = e => {
		const {handleData} = this.props;
		const optionValue = e.target.value;
		
		if(this.props.required === true) {
			this.setState({ isValid: (optionValue != "") }, () => {
				handleData(this.props.label.toLowerCase(), optionValue, this.state.isValid);
			});
		}
	}

	render() {
		let options = this.props.options;
		let {label} = this.props;
		let id = this.props.label.toLowerCase();
		let {defaultValue} = this.props;
		let message;

		if(this.state.isValid === false) {
			message = <Message />;
		}
		
		return(
			<p className={"c-field " + (this.state.isValid === false ? "error": "")}>
			
				<label className="c-field__label" htmlFor={id}>{label}</label>

				<select name={id} id={id} onChange={ this.handleChange } onBlur={ this.handleChange } ref={input => this.inputElement = input} >
					<option value="">{defaultValue}</option>
					{ this.renderSelectOptions(options) }
				</select>

				{message}
			</p>
		)
	}
}

export default SelectField;