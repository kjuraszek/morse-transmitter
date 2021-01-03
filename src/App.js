import React from 'react';

import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav,  MDBNavItem, MDBPopover, MDBPopoverBody, MDBPopoverHeader } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, } from 'react-toastify';
import {Transmitter} from './components/';

import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import 'react-toastify/dist/ReactToastify.css';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.defaultSettings = {
			duration: 100,
			extendedAlphabet: false
		};
		this.state = {
		  navbarIsOpen: false,
		  settingsModal: false,
		  helpModal: false,
		  appSettings:{
			duration: this.defaultSettings.duration,
		  	extendedAlphabet: this.defaultSettings.extendedAlphabet
		  },
		  duration: this.defaultSettings.duration,
		  extendedAlphabet: this.defaultSettings.extendedAlphabet,
		  errors:
		  {
			  duration: ""
		  }
		};
		

	}
	handleCheckbox = () => {
		let settings = this.state.appSettings;
		settings.extendedAlphabet = !this.state.extendedAlphabet;
		this.setState({ appSettings: settings, extendedAlphabet: !this.state.extendedAlphabet});
	}
	  handleNumberInput = (event) => {
		let value = event.target.value.trim();
		let errors = this.state.errors;
		 
		if(isNaN(parseInt(value)) || value.length === 0 || parseInt(value) < 1){
			errors.duration = 'Value must be a positive number and cannot be empty!';
		} else {
			errors.duration = '';
			value = parseInt(value);
		}

		this.setState({errors, duration: value});
		if(errors.duration.length === 0){
			let settings = this.state.appSettings;
			settings.duration = parseInt(value);
			this.setState({appSettings: settings});
		}
	}

	toggleNavbarCollapse = () => {
	  this.setState({ navbarIsOpen: !this.state.navbarIsOpen });
	}
	toggleSettingsModal = () => {
		if(this.state.settingsModal && this.state.errors.duration.length > 0){
			// reset all settings on close
			this.restoreSettings();
		}
	  this.setState({
		settingsModal: !this.state.settingsModal
	  });
	}
	resetSettings = () => {
		this.setState({
			duration: this.defaultSettings.duration,
			extendedAlphabet: this.defaultSettings.extendedAlphabet,
			appSettings:{
				duration: this.defaultSettings.duration,
				extendedAlphabet: this.defaultSettings.extendedAlphabet
			  },
			errors:{
				duration: ""
			}
		  });
	}
	restoreSettings = () => {
		this.setState({
			duration: this.state.appSettings.duration,
			extendedAlphabet: this.state.appSettings.extendedAlphabet,
			errors:{
				duration: ""
			}
		  });
	}
	toggleHelpModal = () => {
	  this.setState({
		helpModal: !this.state.helpModal
	  });
	}
  render() {
    return (
	<React.Fragment>
       <Router>
          <header>
            <MDBNavbar color="black" dark expand="md">
              <MDBContainer>
                <MDBNavbarBrand href="/">
                  <strong>Morse Transmitter</strong>
                </MDBNavbarBrand>
				<MDBNavbarToggler onClick={this.toggleNavbarCollapse} />
				<MDBCollapse id="navbar-collapse" isOpen={this.state.navbarIsOpen} navbar>
                  <MDBNavbarNav right>
                    <MDBNavItem active>
						<MDBBtn color="brown" onClick={this.toggleSettingsModal}><MDBIcon icon="cog" className="mr-1"/>Settings</MDBBtn>
                    </MDBNavItem>
                    <MDBNavItem active>
						<MDBBtn color="pink accent-2" onClick={this.toggleHelpModal}><MDBIcon icon="ambulance" className="mr-1" />Help</MDBBtn>
                    </MDBNavItem>
                  </MDBNavbarNav>
				  </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
			</header>
          </Router>
        <main>
          <MDBContainer className="flex-center flex-column text-center">
            <Transmitter duration = {this.state.appSettings.duration}/>
			</MDBContainer>
		</main>
		
		  <MDBModal isOpen={this.state.settingsModal} toggle={this.toggleSettingsModal}>
			<MDBModalHeader toggle={this.toggleSettingsModal}>Settings</MDBModalHeader>
			<MDBModalBody>
			  <div >
			  <div className="custom-control custom-switch">
				<input
				type="checkbox"
				className="form-control custom-control-input"
				id="customSwitches"
				name="extendedAlphabet"
				disabled={true}
				checked={this.state.extendedAlphabet}
				onChange={this.handleCheckbox} 
				/>
				<label className="custom-control-label" htmlFor="customSwitches">
				Extended Alphabet
				</label>
				<MDBPopover
				placement="top"
				domElement
				popover
				clickable
				id="popper1"
				>
				<span>
					<MDBBadge pill color="green" className="mx-2">
						<MDBIcon fas icon="info" size="1x" />
					</MDBBadge>
				</span>
				<div>
					<MDBPopoverHeader>Info</MDBPopoverHeader>
					<MDBPopoverBody>
					Not implemented yet.
					</MDBPopoverBody>
				</div>
				</MDBPopover>
			</div>
			  <MDBInput 
			  type="text" 
			  className="number-input  duration" 
			  name="duration" 
			  label="duration"
			  value={this.state.duration} 
			  onChange={this.handleNumberInput} />
			  {this.state.errors.duration.length > 0 && 
                <span className='error deep-orange-text'>{this.state.errors.duration}</span>}
			  </div>
			</MDBModalBody>
			<MDBModalFooter>
			  <MDBBtn color="secondary" onClick={this.toggleSettingsModal}>Close</MDBBtn>
			  <MDBBtn color="primary" onClick={this.resetSettings}>Reset settings</MDBBtn>
			</MDBModalFooter>
		  </MDBModal>
		  
		  <MDBModal isOpen={this.state.helpModal} toggle={this.toggleHelpModal}>
			<MDBModalHeader toggle={this.toggleHelpModal}>Help</MDBModalHeader>
			<MDBModalBody>
			  <p>This application helps you to practice transmitting messages with a Morse code signal. You can simulate transmission using SPACEBAR key on your keyboard (touch screens not supported yet) by tapping it with certain duration.</p>
			  <p>To begin click <strong>Start transmission</strong> button. Tap SPACEBAR key with certain durations and breaks (based on Cheatsheet) to create letters, words and sentences. To stop transmission click <strong>Stop transmission</strong> button. You can copy created message with <strong>Copy message</strong> button. If you type unrecognizable sequence, it will be printed as <strong>#</strong> sign in your message.</p>
			  <p>Cheatsheet contains specific information about time delays between signals. Basic duration can be adjusted via settings.</p>
			  <p>For more informations you can visit: <a href="https://en.wikipedia.org/wiki/Morse_code" >https://en.wikipedia.org/wiki/Morse_code</a></p>
			</MDBModalBody>
			<MDBModalFooter>
			  <MDBBtn color="pink accent-2" onClick={this.toggleHelpModal}>Close</MDBBtn>
			</MDBModalFooter>
		  </MDBModal>
		  <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={1500}
      />
      </React.Fragment>
    );
  }
}

export default App;
