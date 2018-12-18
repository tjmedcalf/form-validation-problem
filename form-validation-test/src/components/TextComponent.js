import React, { Component } from 'react';
import Message from './Message';

class TextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {isValid: "", elementLoaded: false}
		this.checkRules = this.checkRules.bind(this);
	}

	componentDidMount = () => {
		//Add blank field to global formData
		if(this.inputElement) {
			this.bindData(this.inputElement, true);
		}
	}
	
	componentDidUpdate = (prevProps) => {
		//Add blank field to global formData
		if(typeof this.props.condition === "function") {
			if(this.props.condition()) {
				if(!this.state.elementLoaded) {
					this.bindData(this.inputElement, true);
				}
			} else {
				if(this.state.elementLoaded) {
					this.unbindData();
				}
			}
		}
	}

	//Method to pass data from Child to Parent
	bindData = (element, sendElement = false) => {
		const {handleData} = this.props;
		const {id} = this.props;
		let isValid = this.state.isValid;

		if(this.props.handleData) {
			if(sendElement) {
				handleData(id, element, isValid);
				this.setState({elementLoaded: true})
			} else {
				handleData(id, element.value, isValid);
			}
		}
	}

	//Method to remove data from Parent if condition is no longer met
	unbindData = () => {
		this.props.handleData(this.props.id, "", "", true);
		this.setState({elementLoaded: false});
	}
	
	checkRules(e) {
		let result = false;
		let {rule} = this.props;
		
		if(rule) {
			if(rule.message) {
				this.setState({useCustomMessage: true});
			}

			if(rule.regex) {
				result = rule.regex.test( String(e.target.value).toLowerCase() );
			}
			if(rule.minLength) {
				result = (e.target.value.length >= rule.minLength);
			}
			if(rule.required) {
				result = e.target.value.length > 0;
			}

			this.setState({isValid: result});
		}

		this.bindData(e.target);
	}

	checkCondition(condition) {
		let result = false;

		if(condition == undefined) {
			result = true;
		} else {
			result = condition();
		}

		return result;
	}
	
	render() {
		const {label} = this.props;
		const {id} = this.props;
		const {placeholder} = this.props;
		let message;
		let type = this.props.type != undefined ? this.props.type: "text";
		let condition = this.props.condition;

		if(this.state.isValid === false) {
			if(this.state.useCustomMessage) {
				message = <Message custom={this.props.rule.message} />
			} else {
				message = <Message />
			}
		}
		
		if( this.checkCondition(condition) ) {
			return(
				<p className={"c-field " + (this.state.isValid === false ? "error": "")}>
					<label className="c-field__label" htmlFor={id}> {label}</label>

					<input ref={input => this.inputElement = input} 
						   onChange={this.checkRules.bind(this)} 
						   onBlur={this.checkRules}
						   placeholder={placeholder} type={type} name={id} id={id} />
					{message}
				</p>
			)
		} else {
			return null
		}
	}
}

export default TextInput;