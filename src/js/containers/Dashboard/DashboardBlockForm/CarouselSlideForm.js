import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import { DashboardFileUpload } from 'grommet-cms/containers';

export class CarouselSlideForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.data
        && props.data.image || ''
    };

    this._onChange = this._onChange.bind(this);
    this._propsToState = this._propsToState.bind(this);
  }

  componentDidMount() {
    this._propsToState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._propsToState(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({
        image: `${this.props.url}`
      });
    }

    // Shallow compare state to propagate to parent container.
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      this.props.onChange(this.state);
    }
  }

  _propsToState(props) {
    this.setState({
      image: props.data
        && props.data.image || ''
    });
  }

  _onChange(event) {
    const key = event.target.id;
    let val = event.target.value;

    let obj  = {};
    obj[key] = val;

    this.setState(obj);
  }

  _validate(data) {
    if (!data || !data.image) {
      return false;
    }

    return true;
  }

  render() {
    const onSubmit = (this._validate(this.state))
      ? this.props.onSubmit
      : undefined;
    const { image } = this.state;

    return (
      <Form compact={false} onSubmit={onSubmit}>
        <FormFields>
          <fieldset>
            <FormField label="Image" htmlFor="image">
              <input id="image" name="image" type="text"
                value={image} onChange={this._onChange} />
            </FormField>
            <DashboardFileUpload title='upload image' />
          </fieldset>
          <Button label="submit" primary={true} onClick={onSubmit} />
        </FormFields>
    </Form>
    );
  }
};

CarouselSlideForm.propTypes = {
  data: PropTypes.object
};

function mapStateToProps(state, props) {
  const { url } = state.fileUpload;
  return { url };
}

export default connect(mapStateToProps)(CarouselSlideForm);
