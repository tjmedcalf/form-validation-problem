import React, { Component } from 'react';
import './App.css';

class App extends Component {
  	render() {
		return (
			<FormComponent />
    	);
  	}
}

class FormComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {isFormValid: false, animals: []};
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("valid: ", this )
	}

	render() {
		const rules = {
			email: {
				regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: "Please enter a valid email address - hint: must include @ and .",
			},
			password: {
				minLength: 8,
				message: "Password must be at least 8 characters"
			},
			animals: {
				min: 2,
				message: "You must choose at least 2 options"
			},
			typeOfTiger: {
				required: true,
			}
		};

		const options = {
			animals: ["Tiger", "Bear", "Snake", "Donkey"],
			colours: ["Blue", "Green", "Red", "Black", "Brown"],
		}

		return(
			<form method='post' action='' onSubmit={this.handleSubmit}>
				<h1>Fill out this awesome form</h1>
				
				<fieldset>
					<legend>Your details</legend>

					<TextInput rule={rules.email} label="Email" id="email" type="email" placeholder="john.doe@example.com" />
					<TextInput rule={rules.password} label="Password" id="password" type="password" placeholder="Minmum 8 characters" />
				</fieldset>

				<fieldset>
					<legend>Your animal</legend>

					<SelectField defaultValue="Please select a colour" 
								 label="Colour" 
								 options={options.colours}
								 required={true} />

					<CheckboxGroup label="Animals" 
								   binding={this.state.animals}
								   options={options.animals}
								   rule={rules.animals} />

					<TextInput rule={rules.typeOfTiger} condition={ (this.state.animals.indexOf("Tiger") > -1 ) } label="Type of tiger" id="tiger_type" />
				</fieldset>

				<input type='submit' value='Create account' />
			</form>
		)
	}
}

class TextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {isValid: ""}
		this.checkRules = this.checkRules.bind(this);
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
	}

	checkCondition(condition) {
		let result = false;

		if(condition == undefined) {
			result = true;
		} else {
			result = condition;
		}

		return result;
	}
	
	render() {
		let message;
		let {label} = this.props;
		let {id} = this.props;
		let {placeholder} = this.props;
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

					<input type={type} name={id} id={id} onChange={this.checkRules} onBlur={this.checkRules} placeholder={placeholder} />
					{message}
				</p>
			)
		} else {
			return null
		}
	}
}

class SelectField extends Component {
	constructor(props) {
		super(props);
		this.state = {isValid: ""}
		this.handleChange = this.handleChange.bind(this);
	}
	
	renderSelectOptions = options => (
		options.map( option => {
			let label = option;
			let inputId = option.toLowerCase();

			return (<option value={inputId}>{label}</option>)
		})
	)
	
	handleChange(e) {
		if(this.props.required === true) {
			if(e.target.value == "") {
				this.setState({isValid: false});
			} else {
				this.setState({isValid: true});
			}
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
			<p className="c-field">
				<label className="c-field__label" htmlFor={id}>{label}</label>

				<select name={id} id={id} onChange={this.handleChange}>
					<option value="">{defaultValue}</option>
					{ this.renderSelectOptions(options) }
				</select>

				{message}
			</p>
		)
	}
}

class CheckboxGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {isValid: ""}
	}

	componentWillMount = () => {
		this.selectedCheckboxes = new Set();
	}

	toggleCheckbox = label => {
		if (this.selectedCheckboxes.has(label)) {
			this.selectedCheckboxes.delete(label);
		} else {
			this.selectedCheckboxes.add(label);
		}

		//Validation
		if(this.props.rule) {
			this.checkRule()
		}
	}

	checkRule = () => {
		let result = true;
		let {rule} = this.props;

		if(rule.min != undefined) {
			if(rule.message) {
				this.setState({useCustomMessage: true});
			}

			if(this.selectedCheckboxes.size >= rule.min) {
				result = true;
			} else if(this.state.isValid !== "") {
				result = false;
			}
		}
		
		this.setState({isValid: result});
	}
	
	renderCheckboxes = fields => (
		fields.map( field => {
			return (<CheckboxInput handleCheckboxChange={this.toggleCheckbox} label={field} />)
		})
	)
	
	render() {
		let options = this.props.options;
		let {label} = this.props;
		let message;

		if(this.state.isValid === false) {
			if(this.state.useCustomMessage) {
				message = <Message custom={this.props.rule.message} />
			} else {
				message = <Message />
			}
		}

		return(
			<div className="c-field c-field--checkboxes">
				<span className="c-field__label">{label}</span>

				<ul className="e-ulist">
					{this.renderCheckboxes(options)}
				</ul>

				{message}
			</div>
		)
	}
}

class CheckboxInput extends Component {
	constructor(props) {
		super(props);
		this.state = {isChecked: false}
	}

	toggleSelected = () => {
		let {label, handleCheckboxChange} = this.props;
		
		this.setState(({ isChecked }) => (
			{
			  isChecked: !isChecked,
			}
		));

		handleCheckboxChange(label);
	}
	
	render() {
		let {label} = this.props;
		let inputId = label.toLowerCase();
		let isChecked = this.state.isChecked;
		
		return(
			<li className="e-ulist__item">
				<div className="c-checkbox">
					<input type='checkbox' name='animal'
					 	   checked={isChecked}
						   value={inputId} 
						   id={inputId} 
						   onChange={this.toggleSelected} />

					<label className="c-checkbox__label" htmlFor={inputId}>
						{label}
					</label>
				</div>
			</li>
		)
	}
}

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

export default App;