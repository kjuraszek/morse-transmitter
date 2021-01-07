import React from 'react';
import { MDBBtn, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { toast } from 'react-toastify';
import Cheatsheet from './Cheatsheet';

const ALPHABET = {
    "dida" : "A",
    "dadididi" : "B",
    "dadidadi" : "C",
    "dadidi" : "D",
    "di" : "E",
    "dididadi" : "F",
    "dadadi" : "G",
    "didididi" : "H",
    "didi" : "I",
    "didadada" : "J",
    "dadida" : "K",
    "didadidi" : "L",
    "dada" : "M",
    "dadi" : "N",
    "dadada" : "O",
    "didadadi" : "P",
    "dadadida" : "Q",
    "didadi" : "R",
    "dididi" : "S",
    "da" : "T",
    "didida" : "U",
    "dididida" : "V",
    "didada" : "W",
    "dadidida" : "X",
    "dadidada" : "Y",
    "dadadidi" : "Z",
    "didadadada" : "1",
    "dididadada" : "2",
    "didididada" : "3",
    "didididida" : "4",
    "dididididi" : "5",
    "dadidididi" : "6",
    "dadadididi" : "7",
    "dadadadidi" : "8",
    "dadadadadi" : "9",
    "dadadadada" : "0"
}

const BULB_COLORS = {
    "letter": "green-text",
    "word": "blue-text",
    "sentence": "grey-text",
    "di": "green-text",
    "da": "blue-text",
    "none": "grey-text",   
};

class Transmitter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          lastKeyDown: 0,
          lastKeyUp: 0,
          timeKeyDown: 0,
          timeKeyUp: 0,
          transmission: false,
          pressed: false,
          letter: '',
          word: [],
          message: '',
          interval: false,
          currentPart: 'sentence',
          currentUnit: 'none'
      };
      this.duration = this.props.duration;
      this.mainDiv = null;
      this.handleKeyDown = this.handleKeyDown.bind(this); 
      this.handleKeyUp = this.handleKeyUp.bind(this); 
      this.handleTransmission = this.handleTransmission.bind(this); 
      this.copyMessage = this.copyMessage.bind(this); 
      this.checkCurrentPart = this.checkCurrentPart.bind(this); 
    }
    componentDidUpdate( ){
        if(this.duration !== this.props.duration){
            this.duration = this.props.duration;
        }
    }
    handleKeyDown(e) {
        e.preventDefault();
        if(this.state.transmission && e.keyCode === 32 && !this.state.pressed){
            let time = this.state.lastKeyUp === 0 ? 0 : Date.now() - this.state.lastKeyUp;
            let temp_letter = this.state.letter;
            let temp_word = this.state.word;
            let temp_message = this.state.message;
            if(time > this.duration){
                  if(time < 3 * this.duration){
                      temp_word.push(this.getLetter(temp_letter));
                      temp_letter = "";
                  } else {
                      temp_word.push(this.getLetter(temp_letter));
                      temp_message += temp_word.join("") + " ";
                      temp_word = [];
                      temp_letter = "";
                  }
              }
             this.setState({      
                  timeKeyUp: time,
                  lastKeyDown: Date.now(),
                  pressed: true,
                  letter: temp_letter,
                  word: temp_word,
                  message: temp_message,
                  currentPart: 'sentence'
                });
        }  
    }
  
    handleKeyUp(e) {
        if(this.state.transmission && e.keyCode === 32 && this.state.pressed){
            let time = this.state.lastKeyDown === 0 ? 0 : Date.now() - this.state.lastKeyDown;
            let symbol = '';
            if(time > 0){
              if(time < this.duration){
                  symbol = "di";
              } else if(time < 3 * this.duration){
                  symbol = "da";
              } else {
                  symbol = "#";
              }
            }
            
          this.setState({      
          timeKeyDown: time,
          lastKeyUp: Date.now(),
          letter: this.state.letter + symbol,
          pressed: false,
          currentUnit: 'none'
          });
        }
    }
    handleTransmission(){
       if(!this.state.transmission){
           this.setState({
              lastKeyDown: 0,
              lastKeyUp: 0,
              timeKeyDown: 0,
              timeKeyUp: 0,			 
              transmission: !this.state.transmission,
              letter: '',
              word: [],
              message: '',
              interval: setInterval(() => {
                this.checkCurrentPart();
              }, 1)
          });
          toast.info("Transmission started", {
              closeButton: false
            });
       } else {
            let temp_letter = this.state.letter;
            let temp_word = this.state.word;
            let temp_message = this.state.message;
            temp_word.push(this.getLetter(temp_letter));
            temp_message += temp_word.join("") + " ";
            temp_word = [];
            temp_letter = "";
            clearInterval(this.state.interval);
            this.setState({      
                  letter: temp_letter,
                  word: temp_word,
                  message: temp_message,
                  transmission: !this.state.transmission,
                  interval: false,
                  currentPart: 'sentence',
                  currentUnit: 'none'
                });
              toast.info("Transmission stopped", {
              closeButton: false
              });
       }
      this.mainDiv.focus();
    }
    copyMessage(){
        if(this.state.message.trim().length === 0){
          toast.warning("Message is empty", {
              closeButton: false
          });
        } else {
          try {
              navigator.clipboard.writeText(this.state.message.trim());
              toast.success("Message copied!", {
                  closeButton: false
              });
          } catch(e) {
              toast.error("Unable to copy", {
                  closeButton: false
              });
          }
        }
    }
    getLetter(letter){
        if(letter === ''){
            return '';
        }
                
        if(ALPHABET.hasOwnProperty(letter)){
            return ALPHABET[letter];
        } else {
            return '#';
        }
    }
    checkCurrentPart(){
        if(!this.state.pressed){
            let difference = Date.now() - this.state.lastKeyUp;
            let tempPart;
            if(difference < this.duration ){
                tempPart = "letter";
            } else if(difference < this.duration * 3){
                tempPart = "word";
            } else {
                tempPart = "sentence";
                let temp_letter = this.state.letter;
                let temp_word = this.state.word;
                let temp_message = this.state.message;
                temp_word.push(this.getLetter(temp_letter));
                temp_message += temp_word.join("") + " ";
                temp_word = [];
                temp_letter = "";
                this.setState({      
                    letter: temp_letter,
                    word: temp_word,
                    message: temp_message,
                    currentPart: 'sentence',
                    currentUnit: 'none'
                    });
            } 
            if(tempPart !== "sentence" && this.state.currentPart !== tempPart){
                this.setState({
                    currentPart: tempPart
                    }
                );
            }
        } else {
            let pressingDuration = Date.now() - this.state.lastKeyDown;
            let tempUnit;
            if(pressingDuration < this.duration ){
                tempUnit = "di";
            } else if(pressingDuration < this.duration * 3){
                tempUnit = "da";
            } else {
                tempUnit = "none";
            } 
            if(this.state.currentPart !== tempUnit){
                this.setState({
                    currentUnit: tempUnit
                    }
                );
            }
        }
        
    }
  render() {
    return (
  <React.Fragment>
      <MDBRow className="my-2">
          <MDBCol size="12" md="6" className="mb-r d-flex align-items-start  ">
            <div 
            tabIndex="1" 
            className="board" 
            ref={elem => (this.mainDiv = elem)} 
            onKeyDown={this.handleKeyDown} 
            onKeyUp={this.handleKeyUp} >
            <p className="h2 white-text my-2">Current letter:</p>
            <div className="p-1 my-2 brown lighten-4 letter-box z-depth-3">
            <p className="letter">{this.state.letter.replaceAll("di",".").replaceAll("da","_")}</p>
            </div>
            <p className="h2 white-text my-2">Message:</p>
            <div className="p-1 my-2 brown lighten-4 message-box z-depth-3">
            <p className="message">{this.state.message}</p>
            </div>
            <MDBBtn 
            color="brown" 
            onClick={this.handleTransmission}>{this.state.transmission ? 'Stop transmission' : 'Start transmission'}
            </MDBBtn>
            <MDBBtn 
            color="brown" 
            onClick={this.copyMessage} 
            disabled={this.state.transmission}>
                Copy message
                </MDBBtn>
            </div>
            <MDBIcon far icon="lightbulb" size="5x" className={ `${BULB_COLORS[this.state.currentPart]} p-2 ` } />
            <MDBIcon far icon="lightbulb" size="5x" className={ `${BULB_COLORS[this.state.currentUnit]} p-2 ` } />
            </MDBCol>
            <MDBCol size="12" md="6" className="mb-r d-flex align-items-start ">
                <Cheatsheet />
            </MDBCol>
        </MDBRow>
        
    </React.Fragment>);
  }
  }

export default Transmitter;