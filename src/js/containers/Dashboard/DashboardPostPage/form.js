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
  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
    this._validatePost = this._validatePost.bind(this);
  }

  componentWillMount() {
    const { onCreatePost } = this.props;
    if (!this.props.post.hasOwnProperty('title')) {
      if (typeof onCreatePost === 'function') {
        const contentBlocks = [];
        const date = new Date();
        onCreatePost({
          date,
          contentBlocks,
          id: '',
          title: '',
          subtitle: '',
          image: ''
        });
      }
    }
  }

  componentWillReceiveProps({ url }) {
    if (url !== this.props.url) {
      this.props.onChange({
        target: {
          id: 'image',
          value: url
        }
      });
    }
  }

  _validatePost() {
    const { title, date } = this.props.post;
    return (title && date) ? true : false;
  }

  _onSubmit() {
    if (this._validatePost()) {
      this.props.onSubmit();
    }
  }

  render() {
    const { onChange, post } = this.props;
    const { image, title, subtitle, contentBlocks, date } = post;
    const date = formatDate(date);
    return (
      <Box>
        <Section pad="medium" align="center">
          <Form pad="medium">
            <FormFields>
              <fieldset>
                <FormField label="Headline" htmlFor="title">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={onChange}
                  />
                </FormField>
                <FormField label="Subheading" htmlFor="title">
                  <input
                    id="subtitle"
                    name="subtitle"
                    type="text"
                    value={subtitle}
                    onChange={onChange}
                  />
                </FormField>
                <FormField label="Date" htmlFor="date">
                  <FormField>
                    <DateTime
                      id="date"
                      name="date"
                      format="M/D/YYYY"
                      onChange={(dataString) => onChange({ target: { id: 'date', value: new Date(dataString) } })}
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
                    onChange={onChange}
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
            <DashboardContentBlocks blocks={contentBlocks} />
            <Box pad="small" />
            <Button
              label="submit"
              onClick={this._onSubmit}
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
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onCreatePost: PropTypes.func,
  url: PropTypes.string
};

function mapStateToProps(state, props) {
  const { url } = state.fileUpload;
  return { url };
}

export default connect(mapStateToProps)(PostForm);
