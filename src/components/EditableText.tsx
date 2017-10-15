import * as React from "react";

interface OwnProps {
  value: string;
  // What to display when value is empty.
  placeholder?: string;
  setValue(value: string): void;
}

interface State {
  isEditing: boolean;
  currentValue: string;
}

// A text label that when clicked on becomes editable.
export default class EditableText extends React.Component<OwnProps, State> {
  // A ref to the input field so we can set the selection range on it when we start editing.
  input: HTMLInputElement | null;

  constructor(props: OwnProps) {
    super(props);
    this.state = {
      isEditing: false,
      currentValue: "",
    };
  }

  startEditing = () => {
    this.setState({ isEditing: true, currentValue: this.props.value });
    setTimeout(() => {
      if (!this.input) {
        return;
      }
      this.input.setSelectionRange(0, -1);
    }, 0);
  };

  finishEditing = () => {
    this.setState({ isEditing: false });
    this.props.setValue(this.state.currentValue);
  };

  cancelEditing = () => {
    this.setState({ isEditing: false });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ currentValue: event.target.value });
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      this.finishEditing();
    }
  };

  handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 27) {
      this.cancelEditing();
    }
  };

  render() {
    return this.state.isEditing ? (
      <input
        className="input"
        ref={value => (this.input = value)}
        autoFocus={true}
        type="text"
        value={this.state.currentValue}
        onChange={this.handleChange}
        onKeyPress={event => this.handleKeyPress(event)}
        onKeyUp={event => this.handleKeyUp(event)}
      />
    ) : (
      <span onClick={this.startEditing}>
        {this.props.value || this.props.placeholder}
      </span>
    );
  }
}
