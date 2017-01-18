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
import GrommetLogo from 'grommet/components/icons/Grommet';
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
    }, 1000);
    setTimeout(() => {
      this.setState({
        paragraphVisible: true
      });
    }, 2000);
  }

  render() {
    return (
      <Box align="center" colorIndex="light-1" full>
        <Helmet title="Home" />
        <Section
          pad="large"
          align="center"
          justify="start"
          style={{ height: 'calc(100vh - 96px)', marginTop: 100 }}
        >
          <Animate
            visible={this.state.heroVisible}
            keep
            enter={{ animation: "fade", duration: 1000, delay: 100 }}
          >
            <Box className="home-desktop">
              <GrommetHero />
            </Box>
            <Box className="home-mobile" align="center">
              <GrommetLogo
                size="large"
                a11yTitle="Grommet Logo"
                a11yTitleId="hero_logo" 
              />
              <Heading tag="h1">grommet</Heading>
            </Box>
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
          <Animate
            visible="scroll"
            keep
            enter={{ animation: "fade", duration: 1000, delay: 100 }}
          >
          <Section colorIndex="light-2" full="horizontal" pad="large" align="center">
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
            <Box pad="medium" align="center">
              <Paragraph size="medium" align="center">
                Grommet CMS combines a fully featured content management system
                with the world's most advanced UX framework to provide you with all the
                <Anchor href="https://grommet.github.io/docs/learn">{' guidance'}</Anchor>,
                <Anchor href="https://grommet.github.io/docs/components">
                  {' components'}
                </Anchor>, and <Anchor href="https://grommet.github.io/docs/resources">
                  design resources
                </Anchor> you need
                to take your ideas from concept to a real application.
              </Paragraph>
            </Box>
            <Footer justify="center" pad="medium">
              <Button label="Start" path="/dashboard" />
            </Footer>
          </Section>
        </Animate>
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
