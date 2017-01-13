import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import DateTime from 'grommet/components/DateTime';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import { DashboardFileUpload, DashboardContentBlocks } from 'grommet-cms/containers';
import { formatDate } from 'grommet-cms/utils';

export class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      title: '',
      subtitle: '',
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
    else {
      const today = new Date();
      const date = `${today.getDate}/${today.getMonth() + 1}/${today.getFullYear()}`;
      this.setState({
        date
      });
    }
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

    const { image, title, subtitle } = this.state;
    const date = formatDate(this.state.date);

    return (
      <Box>
        <Section pad="medium" align="center">
          <Form onSubmit={onSubmitClick} pad="medium">
            <FormFields>
              <fieldset>
                <FormField label="Headline" htmlFor="title">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={this._onChange}
                  />
                </FormField>
                <FormField label="Subheading" htmlFor="title">
                  <input
                    id="subtitle"
                    name="subtitle"
                    type="text"
                    value={subtitle}
                    onChange={this._onChange}
                  />
                </FormField>
                <FormField label="Date" htmlFor="date">
                  <FormField>
                    <DateTime
                      id="date"
                      name="date"
                      format="M/D/YYYY"
                      onChange={this._onDateChange}
                      value={date}
                    />
                  </FormField>
                </FormField>
                <FormField label="Background Image" htmlFor="image">
                  <input
                    id="image"
                    name="image"
                    type="text"
                    value={image}
                    onChange={this._onChange}
                  />
                </FormField>
              </fieldset>
            </FormFields>
          </Form>
          <Footer
            className="dashboard__post-form__button-row"
            align="center"
            pad={{ horizontal: 'medium' }}
          >
            <Box align="start">
              <DashboardFileUpload />
            </Box>
          </Footer>
        </Section>
        <Section pad="large">
          <Box pad="large">
            <DashboardContentBlocks blocks={this.state.contentBlocks} />
            <Box pad="small" />
            <Button
              label="submit"
              onClick={onSubmitClick}
              primary={true}
              type="submit"
            />
          </Box>
        </Section>
      </Box>
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
