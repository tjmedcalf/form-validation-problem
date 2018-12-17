import React, { Component } from 'react';
import './App.css';

class App extends Component {
  	render() {
		return (
			<FormComponent />
    	);
  	}
}

class CheckboxGroup extends Component {
	
	
	renderCheckboxes = fields => (
		fields.map( field => {
			return (<CheckboxInput label={field} />)
		})
	)
	
	render() {
		let options = this.props.options;

		return(
			<ul class="e-ulist">
				{this.renderCheckboxes(options)}
			</ul>
		)
	}
}

class FormComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {isFormValid: false}
	}

	renderSelectOptions = options => (
		options.map( option => {
			return (<SelectOption label={option} />)
		})
	)

	render() {
		const rules = {
			email: {
				regex: "",
				messgae: "Please enter a valid email address - hint: must include @ and .",
			}
		};

		const options = {
			animals: ["Tiger", "Bear", "Snake", "Donkey"],
			colours: ["Blue", "Green", "Red", "Black", "Brown"],
		}

		return(
			<form method='post' action=''>
				<h1>Fill out this awesome form</h1>
				
				<fieldset>
					<legend>Your details</legend>

					<p class="c-field">
						<label class='label c-field__label' for='email'>
							Email
						</label>

						<input type='text' id='email' name='email' />
					</p>

					<p>
						<label class='label' for='password'>Password</label>

						<input class='error' type='password' id='password' name='username' />
					</p>
				</fieldset>

				<fieldset>
					<legend>Your animal</legend>

					<p>
						<label class='label' for='colour'>
							Colour
						</label>

						<select name='colour' id='colour'>
							<option value="">Please select a colour</option>
							{this.renderSelectOptions(options.colours)}
						</select>
					</p>
					
					<div>
						<span class="label">
							Animal
						</span>
						
						<CheckboxGroup options={options.animals} />
					</div>

					

					<TextInput condition="" label="Type of tiger" id="tiger_type" />
				</fieldset>

				<input type='submit' value='Create account' />
			</form>
		)
	}
}

class TextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {isValid: true};
	}
	
	checkRule() {
		let result = false;

		return result;
	}
	checkCondition(condition) {
		let result = false;

		return result;
	}
	
	render() {
		let isValid = this.state.isValid;
		let message;
		let {label} = this.props;
		let {id} = this.props;
		let type = this.props.type != undefined ? this.props.type: "text";
		let condition = this.props.condition;

		if(!isValid) {
			message = <Message />
		}

		if( this.checkCondition(condition) ) {
			return(
				<div class="c-field">
					<label className="c-field label" htmlFor={label}> </label>
					<input type={type} name={id} id={id} />
					{message}
				</div>
			)
		} else {
			return null
		}
	}
}

class CheckboxInput extends Component {
	constructor(props) {
		super(props);
		this.state = {selected: null}
	}

	toggleSelected() {
		
	}
	
	render() {
		let {label} = this.props;
		let inputId = label.toLowerCase();
		
		return(
			<li class="e-ulist__item">
				<input type='checkbox' name='animal' value={inputId} id={inputId} onChange={this.toggleSelected} />
				<label for='donkey'>
					{label}
				</label>
			</li>
		)
	}
}

class SelectOption extends Component {
	render() {
		let label = this.props.label;
		let inputId = label.toLowerCase();
		
		return(
			<option value={inputId}>{label}</option>
		)
	}
}

class Message extends Component {
	render() {
		return <span>This field is required</span>
	}
}

export default App;