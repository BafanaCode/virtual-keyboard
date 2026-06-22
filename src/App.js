import React, { Component } from "react"; 
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class App extends Component {
  state = {
    layoutName: "default",
    input: "",
    capsLockActive: false, 
    numLockActive: true     
  };

  commonKeyboardOptions = {
    onChange: input => this.onChange(input),
    onKeyPress: button => this.onKeyPress(button),
    theme: "simple-keyboard hg-theme-default hg-layout-default",
    physicalKeyboardHighlight: true,
    syncInstanceInputs: true,
    mergeDisplay: true,
    debug: true
  };

  keyboardOptions = {
    ...this.commonKeyboardOptions,
    layout: {
      default: [
        "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
        "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
        "{tab} q w e r t y u i o p [ ] \\",
        "{capslock} a s d f g h j k l ; ' {enter}",
        "{shiftleft} z x c v b n m , . / {shiftright}",
        "{controlleft} {altleft} {metaleft} {space} {metaright} {altright}"
      ],
      shift: [
        "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
        "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
        "{tab} Q W E R T Y U I O P { } |",
        '{capslock} A S D F G H J K L : " {enter}',
        "{shiftleft} Z X C V B N M < > ? {shiftright}",
        "{controlleft} {altleft} {metaleft} {space} {metaright} {altright}"
      ]
    },
    display: {
      "{escape}": "esc ⎋",
      "{tab}": "tab ⇥",
      "{backspace}": "backspace ⌫",
      "{enter}": "enter ↵",
      "{capslock}": "caps lock ⇪",
      "{shiftleft}": "shift ⇧",
      "{shiftright}": "shift ⇧",
      "{controlleft}": "ctrl",
      "{controlright}": "ctrl",
      "{altleft}": "alt",
      "{altright}": "alt",
      "{metaleft}": "ctrl",
      "{metaright}": "ctrl"
    }
  };

  keyboardControlPadOptions = {
    ...this.commonKeyboardOptions,
    layout: {
      default: [
        "{prtscr} {scrolllock} {pause}",
        "{insert} {home} {pageup}",
        "{delete} {end} {pagedown}"
      ]
    }
  };

  keyboardArrowsOptions = {
    ...this.commonKeyboardOptions,
    layout: {
      default: ["{arrowup}", "{arrowleft} {arrowdown} {arrowright}"]
    }
  };

  keyboardNumPadOptions = {
    ...this.commonKeyboardOptions,
    layout: {
      default: this.state.numLockActive ? 
      [
        "{numlock} {numpaddivide} {numpadmultiply}",
        "{numpad7} {numpad8} {numpad9}",
        "{numpad4} {numpad5} {numpad6}",
        "{numpad1} {numpad2} {numpad3}",
        "{numpad0} {numpaddecimal}"
      ] : 
      [
        "{numlock} {numpaddivide} {numpadmultiply}",
        "{arrowup} {arrowup} {arrowup}",  
        "{arrowleft} {numpad5} {arrowright}",  
        "{arrowdown} {arrowdown} {arrowdown}",
        "{numpad0} {numpaddecimal}"
      ]
    }
  };

  keyboardNumPadEndOptions = {
    ...this.commonKeyboardOptions,
    layout: {
      default: ["{numpadsubtract}", "{numpadadd}", "{numpadenter}"]
    }
  };

  onChange = input => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    if (button === "{enter}") {
      this.setState(prevState => ({
        input: prevState.input + "\n"
      }), () => {
        this.keyboard.setInput(this.state.input);
      });
    }

    if (button === "{shift}" || button === "{shiftleft}" || button === "{shiftright}" || button === "{capslock}") {
      this.handleShiftOrCapsLock(button);
    }

    if (button === "{numlock}") {
      this.toggleNumLock();
    }
  };

  handleShiftOrCapsLock = button => {
    let { layoutName, capsLockActive } = this.state;

    if (button === "{shift}" || button === "{shiftleft}" || button === "{shiftright}") {
      this.setState({
        layoutName: layoutName === "default" ? "shift" : "default"
      });
    }

    if (button === "{capslock}") {
      this.setState({
        capsLockActive: !capsLockActive,
        layoutName: !capsLockActive ? "shift" : "default"
      });
    }
  };

  toggleNumLock = () => {
    this.setState(prevState => ({
      numLockActive: !prevState.numLockActive
    }));
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboard.setInput(input);
      }
    );
  };

  render() {
    return (
      <div>
        <textarea
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={e => this.onChangeInput(e)}
          rows={5}
          style={{ width: "100%", resize: "none" }}
        />
        <div className={"keyboardContainer"}>
          <Keyboard
            baseClass={"simple-keyboard-main"}
            keyboardRef={r => (this.keyboard = r)}
            layoutName={this.state.layoutName}
            {...this.keyboardOptions}
          />

          <div className="controlArrows">
            <Keyboard
              baseClass={"simple-keyboard-control"}
              {...this.keyboardControlPadOptions}
            />
            <Keyboard
              baseClass={"simple-keyboard-arrows"}
              {...this.keyboardArrowsOptions}
            />
          </div>

          <div className="numPad">
            <Keyboard
              baseClass={"simple-keyboard-numpad"}
              {...this.keyboardNumPadOptions}
            />
            <Keyboard
              baseClass={"simple-keyboard-numpadEnd"}
              {...this.keyboardNumPadEndOptions}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
