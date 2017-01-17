import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { dashboardSetLeftNavAnchor } from 'grommet-cms/containers/Dashboard/DashboardContainer/actions';
import { getPost, submitPost, setPost } from 'grommet-cms/containers/Posts/PostPage/actions';
// import PostForm from './form';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Animate from 'grommet/components/Animate';
import { PageHeader, PostPreview, ErrorNotification, PostList, PostListItemDetail } from 'grommet-cms/components';

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
    this.state = {
      selectedSection: null
    };
  }

  componentWillMount() {
    const { id } = this.props.params;
    if (id && id !== 'create')
      this.props.dispatch(getPost(id));
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

  componentWillReceiveProps({ contentBlocks }) {
    if (contentBlocks !== this.props.contentBlocks) {
      const post = {
        ...this.props.post,
        contentBlocks
      };
      this.props.dispatch(setPost(post));
    }
  }

  _onSubmit() {
    if(!this.props.request)
      this.props.dispatch(submitPost(this.props.post));
  }

  _onClearError() {
    // placeholder
  }

  _onSectionMenuItemClick(name, i) {
    // placeholder
  }

  _onAddSection() {
    // placeholder
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
      selectedSection: null
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
      selectedSection: i
    });
  }

  _onCreatePost(post) {
    this.props.dispatch(setPost(post));
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

  render() {
    const { post, error } = this.props;
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
                  sections={post.sections.sort((a, b) => a.order - b.order)}
                />
              }
            </Animate>
            <Animate 
              keep
              enter={{ animation: 'slide-left', duration: 1000, delay: 50 }}
              leave={{ animation: 'slide-left', duration: 1000, delay: 50 }}
              visible={typeof selectedSection === 'number'}
            >
              {post && selectedSection &&
                <PostListItemDetail
                  item={post.sections[selectedSection]}
                /> 
              }
            </Animate>
          </Box>
          <Box>
            <PageHeader title="Preview" />
            <PostPreview selectedSection={selectedSection} post={post} />
          </Box>
        </Split>
        {error && <ErrorNotification errors={[{ message: error }]} onClose={this._onClearError} />}
      </Box>
    );
  }
};

DashboardPostPage.propTypes = {
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
  return {
    post,
    error,
    request
  };
};

export default connect(mapStateToProps)(DashboardPostPage);
