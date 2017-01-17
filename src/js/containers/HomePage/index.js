import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Headline from 'grommet/components/Headline';
import Animate from 'grommet/components/Animate';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import { GrommetHero } from 'grommet-cms/components';

class HomePage extends Component {
  // Server checks for this to perform universal rendering.
  /*static fetchData() {
    return undefined;
  }*/

  constructor(props) {
    super(props);
    this.state = {
      heroVisible: false,
      paragraphVisible: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        heroVisible: true
      });
    }, 1500);
    setTimeout(() => {
      this.setState({
        paragraphVisible: true
      });
    }, 3000);
  }

  render() {
    return (
      <Box align="center" colorIndex="light-1" full>
        <Helmet title="Home" />
        <Section
          pad="large" 
          align="center"
          justify="center"
          style={{ height: '45rem' }}
        >
          <Animate
            visible={this.state.heroVisible}
            keep
            enter={{ animation: "fade", duration: 1000, delay: 100 }}
          >
            <GrommetHero />
          </Animate>
          <Animate
            visible={this.state.paragraphVisible}
            keep
            enter={{ animation: "fade", duration: 1000, delay: 100 }}
          >
            <Paragraph size="large" align="center" margin="none">
              Focus on the essential experience
            </Paragraph>
          </Animate>
        </Section>
        <Section colorIndex="light-2" full="horizontal" pad="large" align="center">
          <Animate
            visible="scroll"
            keep
            enter={{ animation: "fade", duration: 1000, delay: 100 }}
          >
            <Box style={{ marginTop: 60 }}>
              <Headline strong align="center">
                Grommet CMS
              </Headline>
            </Box>
            <Box align="center">
              <Heading tag="h3" align="center">
                {`A content management system 
                  with World Class UX`}
              </Heading>
            </Box>
            <Box pad="large" align="center">
              <Paragraph size="large" align="center" margin="none">
                Grommet CMS combines a fully featured content management system
                with the world's most advanced UX framework to provide you with all the
                <Anchor path="https://grommet.github.io/docs/learn">{' guidance'}</Anchor>,
                <Anchor path="https://grommet.github.io/docs/components">
                  {' components'}
                </Anchor>, and <Anchor path="https://grommet.github.io/docs/resources">
                  design resources
                </Anchor> you need
                to take your ideas from concept to a real application.
              </Paragraph>
            </Box>
            <Footer justify="center" pad="medium">
              <Button label="Start" href="/dashboard" />
            </Footer>
          </Animate>
        </Section>
      </Box>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {};
};

export default connect(mapStateToProps)(HomePage);
