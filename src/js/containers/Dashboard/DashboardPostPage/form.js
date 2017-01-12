import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import DateTime from 'grommet/components/DateTime';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Heading from 'grommet/components/Heading';
import { DashboardFileUpload } from 'grommet-cms/containers';
import DashboardContentBlocks from 'grommet-cms/containers/Dashboard/DashboardContentBlocks';
import { formatDate } from 'grommet-cms/utils';

export class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      title: '',
      image: '',
      id: '',
      contentBlocks: '',
      link: '',
      date: ''
    };

    this._onChange = this._onChange.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.post.hasOwnProperty('title'))
      this.setState({
        title: this.props.post.title,
        date: formatDate(this.props.post.date),
        post: this.props.post,
        image: this.props.post.image,
        contentBlocks: this.props.post.contentBlocks,
        id: this.props.post._id,
        date: this.props.post.date
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url !== this.props.url && this.props.url !== '') {
      this.setState({
        image: `${this.props.url}`
      });
    }
  }

  _onChange({target, option}) {
    const key = target.id;
    const val = option || target.value;
    let obj  = {};
    obj[key] = val;
    this.setState(obj);
  }

  _onDateChange(date) {
    this.setState({date});
  }

  _validatePost(state) {
    const { title, date } = state;
    return (title && date) ? true : false;
  }

  _onSubmit(event) {
    event.preventDefault();

    let dataToSubmit = Object.assign({}, this.state);
    dataToSubmit.contentBlocks = this.props.contentBlocks;

    this.props.onSubmit(dataToSubmit);
  }

  render() {
    const onSubmitClick = (this._validatePost(this.state))
      ? this._onSubmit
      : null;

    const { image, title } = this.state;
    const date = formatDate(this.state.date);

    return (
      <span>
        <Heading>
          Post
        </Heading>
        <Form onSubmit={onSubmitClick}>
          <FormFields>
            <fieldset>
              <FormField label="Title" htmlFor="title">
                <input id="title" name="title" type="text"
                  value={title} onChange={this._onChange} />
              </FormField>
              <FormField label="Date" htmlFor="date">
                <FormField>
                    <DateTime id="date"
                      name="date"
                      format="M/D/YYYY"
                      onChange={this._onDateChange}
                      value={date} />
                  </FormField>
              </FormField>
              <FormField label="Thumbnail Image File Path" htmlFor="image">
                <input id="image" name="image" type="text"
                  value={image} onChange={this._onChange} />
              </FormField>
            </fieldset>
          </FormFields>
        </Form>
        <DashboardFileUpload />
        <Box>
          <Heading>
            Content Blocks
          </Heading>
          <DashboardContentBlocks blocks={this.state.contentBlocks} />
        </Box>
        <Box pad="small" />
        <Button label="submit" onClick={onSubmitClick} primary={true}
          type="submit" />
      </span>
    );
  }
};

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  post: PropTypes.object,
  title: PropTypes.string
};

function mapStateToProps(state, props) {
  const { url } = state.fileUpload;
  const { contentBlocks } = state;
  return { url, contentBlocks };
}

export default connect(mapStateToProps)(PostForm);
