import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchesGroup extends React.Component {
  state = {
    gender: false,
    country: false,
  };

  componentWillMount(){
    this.props.handleChange(this.state)
  }

  handleChange = name => event => {
      this.setState({ [name]: event.target.checked})
  };

  render() {
    return (
      <FormControl component="fieldset">
        <FormGroup row={true}>
          <FormControlLabel
            control={
              <Switch
                checked={this.props.gender}
                onChange={this.props.handleChange('gender')}
                value="gender"
                disabled={true}
              />
            }
            label="Seperate By Gender"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.props.country}
                onChange={this.props.handleChange('country')}
                value="country"
              />
            }
            label="Seperate By Country"
          />
        </FormGroup>
      </FormControl>
    );
  }
}

export default SwitchesGroup;