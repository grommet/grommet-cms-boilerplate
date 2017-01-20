import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  dashboardSetLeftNavAnchor
} from 'grommet-cms/containers/Dashboard/DashboardContainer/actions';
import {
  blockAdd
} from 'grommet-cms/containers/Dashboard/DashboardContentBlocks/actions';
import {
  getPost,
  submitPost,
  setPost,
  postDeleteSection,
  postAddSection,
  postMoveSectionUp,
  postMoveSectionDown,
  postClearError,
  postEditSection
} from 'grommet-cms/containers/Posts/PostPage/actions';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Animate from 'grommet/components/Animate';
import {
  PageHeader,
  PostPreview,
  ErrorNotification,
  PostList,
  PostListItemDetail,
  SectionForm,
  MarqueeForm
} from 'grommet-cms/components';
import { toggleSectionForm, postSectionFormInput } from './actions';

export class DashboardPostPage extends Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
    this._onPostChange = this._onPostChange.bind(this);
    this._onCreatePost = this._onCreatePost.bind(this);
    this._onClearError = this._onClearError.bind(this);
    this._onSectionMenuItemClick = this._onSectionMenuItemClick.bind(this);
    this._onAddSection = this._onAddSection.bind(this);
    this._onSelectSection = this._onSelectSection.bind(this);
    this._onClickBackAnchor = this._onClickBackAnchor.bind(this);
    this._setDefaultLeftAnchor = this._setDefaultLeftAnchor.bind(this);
    this._onClearSectionForm = this._onClearSectionForm.bind(this);
    this._onSubmitSectionForm = this._onSubmitSectionForm.bind(this);
    this._onSubmitContentBlocks = this._onSubmitContentBlocks.bind(this);
    this._onCreateBlock = this._onCreateBlock.bind(this);
    this._onSubmitMarquee = this._onSubmitMarquee.bind(this);
    this._loadPost = this._loadPost.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onChangeSectionForm = this._onChangeSectionForm.bind(this);
    this.state = {
      selectedSection: null,
      isEditingMarquee: false
    };
  }

  componentWillMount() {
    this._loadPost();
    this._setDefaultLeftAnchor();
  }

  componentWillUnmount() {
    this.props.dispatch(
      dashboardSetLeftNavAnchor({
        label: null,
        onClick: null
      })
    );
  }

  componentWillReceiveProps({ sectionForm, contentBlocks, post }) {
    const { selectedSection, id, name } = sectionForm;
    if (selectedSection !== null && this.props.post) {
      if (id === '' && name === '') {
        const { sections } = this.props.post;
        const postSection = sections[selectedSection];
        if (postSection) {
          this.props.dispatch(
            postSectionFormInput(postSection.name, postSection.id)
          );
        }
      }
    }
    if (post !== this.props.post && !this.props.request) {
      if (!this.state.isEditingMarquee) {
        this._onSubmit(post);
      }
    }
  }

  _loadPost() {
    const { id } = this.props.params;
    if (id && id !== 'create') {
      this.props.dispatch(getPost(id));
    }
  }

  _onSubmit(post = this.props.post) {
    if (!this.props.request) {
      this.props.dispatch(submitPost(post));
    }
  }

  _onSubmitContentBlocks() {
    const i = this.state.selectedSection;
    const post = {
      ...this.props.post,
      sections: [
        ...this.props.post.sections.slice(0, i),
        {
          ...this.props.post.sections[i],
          contentBlocks: this.props.contentBlocks
        },
        ...this.props.post.sections.slice(i + 1)
      ]
    };
    this.props.dispatch(setPost(post));
    this._onClickBackAnchor();
  }

  _onClearError() {
    this.props.dispatch(postClearError());
  }

  _onSectionMenuItemClick(name, i) {
    switch (name) {
      case 'DELETE':
        this.props.dispatch(postDeleteSection(i));
        break;
      case 'MOVE_UP':
        this.props.dispatch(postMoveSectionUp(i));
        break;
      case 'MOVE_DOWN':
        this.props.dispatch(postMoveSectionDown(i));
        break;
      case 'EDIT':
        this.props.dispatch(toggleSectionForm(i));
      default: break;
    };
  }

  _onAddSection() {
    this.props.dispatch(toggleSectionForm(null));
  }

  _onChangeSectionForm({ name, value }) {
    this.props.dispatch(postSectionFormInput(name, value));
  }

  _setDefaultLeftAnchor() {
    this.props.dispatch(
      dashboardSetLeftNavAnchor({
        label: 'All Posts',
        onClick: () => this.context.router.goBack()
      })
    );
  }

  _onClickBackAnchor() {
    this._setDefaultLeftAnchor();
    this.setState({
      selectedSection: null,
      isEditingMarquee: false
    });
  }

  _onSelectSection(i) {
    this.props.dispatch(
      dashboardSetLeftNavAnchor({
        label: this.props.post.title,
        onClick: this._onClickBackAnchor
      })
    );
    this.setState({
      selectedSection: i,
      isEditingMarquee: i === 0
    });
  }

  _onCreatePost(post) {
    this.props.dispatch(setPost(post));
  }

  _onCreateBlock() {
    this.props.dispatch(blockAdd());
  }

  _onPostChange({ target, option }) {
    const { post } = this.props;
    const key = target.id;
    const val = option || target.value;
    let newPost;
    if (post) {
      newPost = {
        ...post,
        [key]: post.key != null ? `${post[key]}${val}` : val
      };
    } else {
      newPost = {
        [key]: val
      };
    }
    this.props.dispatch(setPost(newPost));
  }

  _onClearSectionForm() {
    this.props.dispatch(toggleSectionForm(null));
    this.props.dispatch(postSectionFormInput('', ''));
  }

  _onSubmitSectionForm() {
    if (this.props.sectionForm.selectedSection !== null) {
      this.props.dispatch(postEditSection({
        ...this.props.sectionForm
      }));
    } else {
      this.props.dispatch(postAddSection({
        ...this.props.sectionForm
      }));
    }
    this._onClearSectionForm();
  }

  _onSubmitMarquee() {
    this._onSubmit();
    this._onClickBackAnchor();
    this._loadPost();
  }

  _onCancel() {
    this._loadPost();
    this._onClickBackAnchor();
  }

  render() {
    const { post, error, sectionForm, url } = this.props;
    const { selectedSection } = this.state;
    return (
      <Box>
        <Split
          separator
          priority="left"
          showOnResponsive="priority"
        >
          <Box>
            <Animate
              keep
              enter={{ animation: 'slide-right', duration: 1000, delay: 0 }}
              leave={{ animation: 'slide-left', duration: 1000, delay: 0 }}
              visible={selectedSection == null}
            >
              {post && selectedSection == null &&
                <PostList
                  onSelectSection={this._onSelectSection}
                  onMenuItemClick={this._onSectionMenuItemClick}
                  onAddSection={this._onAddSection}
                  sections={post.sections
                    ? post.sections.sort((a, b) => a.order - b.order)
                    : null
                  }
                />
              }
            </Animate>
            <Animate
              keep
              enter={{ animation: 'slide-left', duration: 1000, delay: 50 }}
              leave={{ animation: 'slide-left', duration: 1000, delay: 50 }}
              visible={typeof selectedSection === 'number'}
            >
              {post && selectedSection > 0 &&
                <PostListItemDetail
                  onCancel={this._onCancel}
                  onSubmit={this._onSubmitContentBlocks}
                  onCreateBlockClick={this._onCreateBlock}
                  item={post.sections[selectedSection]}
                />
              }
              {post && selectedSection === 0 &&
                <Box>
                  <PageHeader title="Edit Marquee" />
                  <MarqueeForm
                    onSubmit={this._onSubmitMarquee}
                    post={post}
                    onChange={this._onPostChange}
                    onCancel={this._onCancel}
                    url={url}
                  />
                </Box>
              }
            </Animate>
          </Box>
          <Box>
            <PageHeader title="Preview" />
            <PostPreview selectedSection={selectedSection} post={post} />
          </Box>
        </Split>
        {error &&
          <ErrorNotification
            errors={[{ message: error }]}
            onClose={this._onClearError}
          />
        }
        <SectionForm
          {...sectionForm}
          onChange={this._onChangeSectionForm}
          isEditing={sectionForm.selectedSection !== null}
          onClose={this._onClearSectionForm}
          onSubmit={this._onSubmitSectionForm}
        />
      </Box>
    );
  }
};

DashboardPostPage.propTypes = {
  url: PropTypes.string,
  sectionForm: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    padding: PropTypes.shape({
      value: PropTypes.string,
      options: PropTypes.array
    }),
    basis: PropTypes.shape({
      value: PropTypes.string,
      options: PropTypes.array
    }),
    wrap: PropTypes.shape({
      value: PropTypes.string
    })
  }).isRequired,
  contentBlocks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string
  }),
  request: PropTypes.bool.isRequired,
  error: PropTypes.string,
  post: PropTypes.shape({
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        order: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      })
    )
  })
};

DashboardPostPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  const { post, error, request } = state.posts;
  const { sectionForm } = state.dashboardPost;
  const { contentBlocks } = state;
  const { url } = state.fileUpload;
  return {
    post,
    error,
    request,
    url,
    sectionForm,
    contentBlocks
  };
};

export default connect(mapStateToProps)(DashboardPostPage);
