import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Animate from 'grommet/components/Animate';
import Toast from 'grommet/components/Toast';
import {
  dashboardSetLeftNavAnchor
} from 'grommet-cms/containers/Dashboard/DashboardContainer/actions';
import {
  blockAdd,
  blockCancel
} from 'grommet-cms/containers/Dashboard/DashboardContentBlocks/actions';
import {
  getPost,
  submitPost,
  setPost,
  postDeleteSection,
  postEditOrAddSection,
  postMoveSectionUp,
  postMoveSectionDown,
  postClearError,
  postSetContentBlocks,
  postRemoveUnusedContentBlocksFromSection
} from 'grommet-cms/containers/Posts/PostPage/actions';
import {
  PageHeader,
  PostPreview,
  ErrorNotification,
  PostList,
  PostListItemDetail,
  SectionLayoutForm,
  MarqueeForm,
  BoxLayoutForm
} from 'grommet-cms/components';
import {
  toggleSectionForm,
  postSectionFormInput,
  postSectionFormReset,
  postSectionSetToastMessage,
  postSectionClearToastMessage,
  postBoxLayoutFormReset,
  postBoxLayoutFormInput,
  toggleBoxLayoutForm
} from './actions';
import { debounce } from 'grommet-cms/utils';
import { selectPostSectionFormSubmission } from './selectors';

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
    this._onSubmitSectionForm = this._onSubmitSectionForm.bind(this);
    this._onSubmitContentBlocks = this._onSubmitContentBlocks.bind(this);
    this._onCreateBlock = this._onCreateBlock.bind(this);
    this._onSubmitMarquee = this._onSubmitMarquee.bind(this);
    this._loadPost = this._loadPost.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onChangeSectionForm = this._onChangeSectionForm.bind(this);
    this._onSetSectionFormValues = this._onSetSectionFormValues.bind(this);
    this._onUpdateContentBlocks = this._onUpdateContentBlocks.bind(this);
    this._removeUnusedContentBlocks = this._removeUnusedContentBlocks.bind(this);
    this._checkForUnusedContentBlocks = this._checkForUnusedContentBlocks.bind(this);
    this._onCloseToast = this._onCloseToast.bind(this);
    this._onChangeBoxLayoutForm = this._onChangeBoxLayoutForm.bind(this);
    this._onSetBoxLayoutFormValues = this._onSetBoxLayoutFormValues.bind(this);
    this._onSubmitBoxLayoutForm = this._onSubmitBoxLayoutForm.bind(this);
    this.state = {
      selectedSection: null,
      isEditingMarquee: false,
      shouldAnimate: false
    };
  }

  componentWillMount() {
    this._loadPost();
    this._setDefaultLeftAnchor();
  }

  componentDidMount() {
    if (this.state.shouldAnimate === false) {
      setTimeout(() => {
        this.setState({
          shouldAnimate: true
        });
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(
      dashboardSetLeftNavAnchor({
        label: null,
        onClick: null
      })
    );
  }

  componentWillReceiveProps({ post, contentBlocks }) {
    if (post !== this.props.post && !this.props.request) {
      if (!this.state.isEditingMarquee) {
        debounce(
          this._onSubmit(post),
          1000,
          true
        );
      }
    }
    if (contentBlocks !== this.props.contentBlocks) {
      if (post && this.state.selectedSection) {
        if (contentBlocks.length) {
          this._onUpdateContentBlocks(contentBlocks);
        }
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

  _onUpdateContentBlocks(contentBlocks = this.props.contentBlocks) {
    const i = this.state.selectedSection;
    this.props.dispatch(postSetContentBlocks(contentBlocks, i));
  }

  _onSubmitContentBlocks() {
    if (!this._checkForUnusedContentBlocks()) {
      this._onClickBackAnchor();
    } else {
      const message = 'Please remove unused content blocks before submitting.';
      this.props.dispatch(postSectionSetToastMessage(message));
    }
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
      case 'EDIT_SECTION':
        this._onSetSectionFormValues(i);
        this.props.dispatch(toggleSectionForm(i));
        break;
      case 'EDIT_CONTENT':
        this._onSelectSection(i);
        break;
      default: break;
    };
  }

  _onAddSection() {
    this.props.dispatch(toggleSectionForm(null));
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
    this._onCancel();
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

  _onSetSectionFormValues(index = null) {
    if (index != null) {
      const section = this.props.post.sections[index];
      this._onChangeSectionForm({ name: 'name', value: section.name });
      section.layout.forEach((item, i) => {
        this._onChangeSectionForm({ name: item.name, value: item.value });
      });
    } else {
      this.props.dispatch(toggleSectionForm(null));
      this.props.dispatch(postSectionFormReset());
    }
  }

  _onChangeSectionForm({ name, value }) {
    this.props.dispatch(postSectionFormInput(name, value));
  }

  _onSubmitSectionForm() {
    postEditOrAddSection(postSectionLayoutSubmission)(this.props.dispatch);
    this._onSetSectionFormValues();
  }

  _onSetBoxLayoutFormValues(index = null) {
    if (index != null) {
      // todo, handle setting the values
    } else {
      this.props.dispatch(toggleBoxLayoutForm(null));
      this.props.dispatch(postBoxLayoutFormReset());
    }
  }

  _onChangeBoxLayoutForm({ name, value }) {
    this.props.dispatch(postBoxLayoutFormInput(name, value));
  }

  _onSubmitBoxLayoutForm() {
    // TODO: parse box form to submit it.
    this._onSetSectionFormValues();
  }

  _onSubmitMarquee() {
    this._onSubmit();
    this._setDefaultLeftAnchor();
    this.setState({
      selectedSection: null,
      isEditingMarquee: false
    });
  }

  _onCancel() {
    this.props.dispatch(blockCancel());
    this._removeUnusedContentBlocks();
    this._setDefaultLeftAnchor();
    this.setState({
      selectedSection: null,
      isEditingMarquee: false
    });
  }

  _onCloseToast() {
    this.props.dispatch(postSectionClearToastMessage());
  }

  _removeUnusedContentBlocks() {
    this.props.dispatch(
      postRemoveUnusedContentBlocksFromSection(this.state.selectedSection)
    );
  }

  _checkForUnusedContentBlocks() {
    if (this.state.selectedSection) {
      if (this.props.post) {
        const section = this.props.post.sections[this.state.selectedSection];
        if (section.contentBlocks && section.contentBlocks.length) {
          return section.contentBlocks
            .filter((item) => item.edit === true).length > 0;
        }
      }
    }
    return false;
  }

  render() {
    const {
      post,
      error,
      sectionLayoutForm,
      boxLayoutForm,
      url,
      toastMessage,
      request
    } = this.props;
    const { selectedSection, shouldAnimate } = this.state;
    return (
      <Box primary pad="none">
        <Split
          separator
          priority="left"
          showOnResponsive="priority"
        >
          <Box>
            <Animate
              keep
              enter={{
                animation: 'slide-right',
                duration: shouldAnimate ? 500 : 0,
                delay: 0
              }}
              leave={{ animation: 'slide-left', duration: 500, delay: 0 }}
              visible={selectedSection == null}
            >
              {post && selectedSection == null &&
                <PostList
                  disabled={request}
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
              enter={{ animation: 'slide-left', duration: 500, delay: 0 }}
              leave={{ animation: 'slide-left', duration: 500, delay: 0 }}
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
        <SectionLayoutForm
          {...sectionLayoutForm}
          onChange={this._onChangeSectionForm}
          isEditing={sectionLayoutForm.selectedSection !== null}
          onClose={() => this._onSetSectionFormValues(null)}
          onSubmit={this._onSubmitSectionForm}
        />
        <BoxLayoutForm
          {...boxLayoutForm}
          onChange={this._onChangeBoxLayoutForm}
          onClose={() => this._onSetBoxLayoutFormValues(null)}
          onSubmit={this._onSubmitBoxLayoutForm}
        />
        {toastMessage && 
          <Toast
            onClose={this._onCloseToast}
            status="warning"
          >
            {toastMessage}
          </Toast>
        }
      </Box>
    );
  }
};

DashboardPostPage.propTypes = {
  url: PropTypes.string,
  sectionLayoutForm: PropTypes.object,
  boxLayoutForm: PropTypes.object,
  contentBlocks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string
  }),
  postSectionLayoutSubmission: PropTypes.object,
  request: PropTypes.bool.isRequired,
  error: PropTypes.string,
  toastMessage: PropTypes.string,
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
  const { sectionLayoutForm, boxLayoutForm, toastMessage } = state.dashboardPost;
  const { contentBlocks } = state;
  const { url } = state.fileUpload;
  return {
    post,
    error,
    request,
    url,
    sectionLayoutForm,
    boxLayoutForm,
    contentBlocks,
    toastMessage,
    postSectionLayoutSubmission: selectPostSectionFormSubmission(state)
  };
};

export default connect(mapStateToProps)(DashboardPostPage);
