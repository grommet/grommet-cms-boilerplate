import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import DateTime from 'grommet/components/DateTime';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';
import FileUpload from '../DashboardFileUpload';
import DashboardContentBlocks from '../DashboardContentBlocks';
import { formatDate } from '../../../utils';

export class PressReleaseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      title: '',
      postType: 'Press Release',
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
        postType: this.props.post.postType || 'Press Release',
        image: this.props.post.image,
        contentBlocks: this.props.post.contentBlocks,
        id: this.props.post._id,
        link: this.props.post.link,
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
    const { title, postType, date } = state;
    return (title && postType && date) ? true : false;
  }

  _onSubmit(event) {
    event.preventDefault();

    let dataToSubmit = Object.assign({}, this.state);
    dataToSubmit.contentBlocks = this.props.contentBlocks;

    // Remove any extreneous form data.
    if (dataToSubmit.postType === 'Press Release')
      delete dataToSubmit.link;
    else
      delete dataToSubmit.contentBlocks;

    this.props.onSubmit(dataToSubmit);
  }

  render() {
    const onSubmitClick = (this._validatePost(this.state))
      ? this._onSubmit
      : null;

    const { postType, image, title, link } = this.state;
    const date = formatDate(this.state.date);

    const linkBlock = (postType === 'Related Article')
      ? <FormField label="External Link" htmlFor={"link"}>
          <input id="link" name="link" type="text"
            value={link} onChange={this._onChange} />
        </FormField>
      : undefined;

    const blocks = (postType === 'Press Release')
      ? <Box>
          <Heading>
            Content Blocks
          </Heading>
          <DashboardContentBlocks blocks={this.state.contentBlocks} />
        </Box>
      : undefined;

    return (
      <span>
        <Heading>
          Press Release
        </Heading>
        <Form onSubmit={onSubmitClick}>
          <FormFields>
            <fieldset>
              <FormField label="Post Type" htmlFor="postType">
                <Select
                  id="postType"
                  inline={false}
                  options={["Press Release", "Related Article"]}
                  value={postType}
                  onChange={this._onChange}
                />
              </FormField>
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
              {linkBlock}
            </fieldset>
          </FormFields>
        </Form>
        <FileUpload />
        {blocks}
        <Box pad="small" />
        <Button label="submit" onClick={onSubmitClick} primary={true}
          type="submit" />
      </span>
    );
  }
};

PressReleaseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  post: PropTypes.object,
  title: PropTypes.string
};

function mapStateToProps(state, props) {
  const { url } = state.fileUpload;
  const { contentBlocks } = state;
  return { url, contentBlocks };
}

export default connect(mapStateToProps)(PressReleaseForm);
