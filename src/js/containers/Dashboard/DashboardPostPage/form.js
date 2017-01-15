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
import Menu from 'grommet/components/Menu';
import { blockAdd } from 'grommet-cms/containers/Dashboard/DashboardContentBlocks/actions';
import { DashboardFileUpload, DashboardContentBlocks } from 'grommet-cms/containers';
import { formatDate } from 'grommet-cms/utils';

export class PostForm extends Component {
  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
    this._validatePost = this._validatePost.bind(this);
    this._setHeroImage = this._setHeroImage.bind(this);
    this._onCreateBlockClick = this._onCreateBlockClick.bind(this);
    this._setShouldUpdateHero = this._setShouldUpdateHero.bind(this);
    this.state = {
      shouldUpdateHero: false
    };
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
    if (url !== this.props.url && this.state.shouldUpdateHero) {
      this.setState({
        shouldUpdateHero: false
      });
      this._setHeroImage(url);
    }
  }

  _setHeroImage(url) {
    this.props.onChange({
      target: {
        id: 'image',
        value: url
      }
    });
  }

  _setShouldUpdateHero() {
    this.setState({
      shouldUpdateHero: true
    });
  }

  _onCreateBlockClick() {
    this.props.dispatch(blockAdd());
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
    const formattedDate = formatDate(date);
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
                    value={title || ''}
                    onChange={onChange}
                  />
                </FormField>
                <FormField label="Subheading" htmlFor="title">
                  <input
                    id="subtitle"
                    name="subtitle"
                    type="text"
                    value={subtitle || ''}
                    onChange={onChange}
                  />
                </FormField>
                <FormField label="Date" htmlFor="date">
                  <FormField>
                    <DateTime
                      id="date"
                      name="date"
                      format="M/D/YYYY"
                      value={formattedDate || ''}
                      onChange={(dataString) =>
                        onChange({
                          target: {
                            id: 'date',
                            value: new Date(dataString)
                          }
                        })
                      }
                    />
                  </FormField>
                </FormField>
                <FormField label="Background Image" htmlFor="image">
                  <input
                    id="image"
                    name="image"
                    type="text"
                    value={image || ''}
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
              <DashboardFileUpload
                onImgPost={this._setShouldUpdateHero} 
              />
            </Box>
          </Footer>
        </Section>
        <Section pad="medium">
          <Box pad="small">
            <DashboardContentBlocks blocks={contentBlocks} />
            <Footer align="center" justify="center" pad="large">
              <Menu
                className="dashboard--content-blocks__button-footer"
                direction="row"
                inline
                responsive={false}
              >
                <Button
                  label="submit"
                  onClick={this._onSubmit}
                  primary={true}
                  type="submit"
                />
                <Button
                  label="add block"
                  onClick={this._onCreateBlockClick}
                  primary={false}
                />
              </Menu>
            </Footer>
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
  url: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  const { url } = state.fileUpload;
  return { url };
}

export default connect(mapStateToProps)(PostForm);
