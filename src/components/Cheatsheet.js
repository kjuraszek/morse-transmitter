import React from 'react';

class Cheatsheet extends React.Component {
    render() {
        return (
            <React.Fragment>
            <div>
                <p className="h2 white-text my-2">Cheatsheet:</p>
                <div className="p-1 brown lighten-4 z-depth-3">
                    <p>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/International_Morse_Code.svg/800px-International_Morse_Code.svg.png" width='60%' alt=''/>
                    </p>
                    <p>
                        <em>Source: <a href="https://en.wikipedia.org/wiki/Morse_code" >https://en.wikipedia.org/wiki/Morse_code</a></em>
                    </p>
                </div>
            </div>
        
        </React.Fragment>);
    }
  }

export default Cheatsheet;