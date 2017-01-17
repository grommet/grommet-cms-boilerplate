import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPost, submitPost, setPost } from 'grommet-cms/containers/Posts/PostPage/actions';
// import PostForm from './form';
import PostSections from './sections';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import { PageHeader, PostPreview, ErrorNotification } from 'grommet-cms/components';

export class DashboardPostPage extends Component {
  constructor(props) {
    super(props);
    
    this._onSubmit = this._onSubmit.bind(this);
    this._onPostChange = this._onPostChange.bind(this);
    this._onCreatePost = this._onCreatePost.bind(this);
    this._onClearError = this._onClearError.bind(this);
    this._onSectionMenuItemClick = this._onSectionMenuItemClick.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.params;
    if (id && id !== 'create')
      this.props.dispatch(getPost(id));
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

  _onSectionMenuItemClick(i) {
    
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

    return (
      <Box>
        <Split
          separator
          priority="left"
          showOnResponsive="priority"
        >
          <Box>
            {post && 
              <PostSections
                onMenuItemClick={this._onSectionMenuItemClick}
                onAddSection={e => e}
                sections={post.sections.sort((a, b) => a.order - b.order)}
              /> 
            }
          </Box>
          <Box>
            <PageHeader title="Preview" />
            <PostPreview post={post} />
          </Box>
        </Split>
        {error && <ErrorNotification errors={[error]} onClose={this._onClearError} />}
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
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  }),
  post: PropTypes.shape({
    sections: PropTypes.arrayOf(
      PropTypes.shape({

      })
    )
  })
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
