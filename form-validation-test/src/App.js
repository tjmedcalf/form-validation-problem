import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  /* renderField(type) {
    return (
      <Field></Field>
    );
  } */
  
  render() {
    return (
		<FormComponent></FormComponent>
    );
  }


}

class FormComponent extends Component {
	render() {
		return(
			<form method='post' action=''>
				<h1>Fill out this awesome form</h1>
				
				<fieldset>
					<legend>Your details</legend>

					<p>
						<label class='label' for='email'>
							Email
						</label>
						<input type='text' id='email' name='email' />
					</p>
					<p>
						<label class='label' for='password'>
							Password
						</label>
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
							<option value=''>Choose colour</option>
							<option value='blue'>Blue</option>
							<option value='green'>Green</option>
							<option value='red'>Red</option>
							<option value='black'>Black</option>
							<option value='brown'>Brown</option>
						</select>
					</p>

					<p>
						<span class="label">
							Animal
						</span>

						<input type='checkbox' name='animal' value='bear' id='bear' />
						<label for='bear'>
							Bear
						</label>

						<input type='checkbox' name='animal' value='tiger' id='tiger' />
						<label for='tiger'>
							Tiger
						</label>

						<input type='checkbox' name='animal' value='snake' id='snake' />
						<label for='snake'>
							Snake
						</label>

						<input type='checkbox' name='animal' value='donkey' id='donkey' />
						<label for='donkey'>
							Donkey
						</label>
					</p>

					<p>
						<label class='label' for='tiger_type'>
							Type of tiger
						</label>
						<input type='text' name='tiger_type' id='tiger_type' />
					</p>
				</fieldset>

				<fieldset>
					<p>
						<input type='submit' value='Create account' />
					</p>
				</fieldset>
			</form>
		)
	}
}

class TextInput extends FormComponent {

}

export default App;