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
import SocialSlackIcon from 'grommet/components/icons/base/SocialSlack';
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub';
import GlobeIcon from 'grommet/components/icons/base/Globe';
import { GrommetHero, HomePageIntro } from 'grommet-cms/components';
import Features from './features';
import * as messages from './messages';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      heroVisible: false,
      paragraphVisible: false,
      linksVisible: false
    };
  }

  componentDidMount() {
    this.setState({
      heroVisible: true,
      paragraphVisible: true,
      linksVisible: true
    });
  }

  render() {
    return (
      <Box align="center" colorIndex="light-1" full>
        <Helmet title="Home" />
        <Section
          pad="large"
          align="center"
          justify="start"
          style={{ height: 'calc(80vh - 96px)', marginTop: 100 }}
        >
          <Animate
            visible={this.state.heroVisible}
            keep
            enter={{ animation: "fade", duration: 1000, delay: 300 }}
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
              <Heading tag="h1">{messages.MOBILE_LOGO_TEXT}</Heading>
            </Box>
          </Animate>
          <Animate
            visible={this.state.paragraphVisible}
            keep
            enter={{ animation: "fade", duration: 1000, delay: 300 }}
          >
            <Paragraph size="large" align="center" margin="none">
              {messages.LOGO_TAGLINE}
            </Paragraph>
          </Animate>
          <Animate
            visible={this.state.linksVisible}
            keep
            enter={{ animation: "fade", duration: 1000, delay: 300 }}
          >
            <Footer
              justify="center"
              align="center"
              responsive={false}
              pad="large"
            >
              <Anchor
                href="https://github.com/grommet/grommet"
                icon={<SocialGithubIcon size="small" />}
              />
              <Anchor
                href="http://slackin.grommet.io"
                icon={<SocialSlackIcon colorIndex="plain" size="small" />}
              />
            </Footer>
          </Animate>
        </Section>
        <Animate
          visible="scroll"
          keep
          enter={{ animation: "fade", duration: 1000, delay: 100 }}
        >
          <Section
            align="center"
            pad="large"
            full="horizontal"
            colorIndex="light-2"
            style={{ minHeight: '60vh' }}
          >
            <Box pad="large" align="center">
              <HomePageIntro />
            </Box>
            <Heading align="center" strong>
              {messages.SECTION_TWO_HEADLINE}
            </Heading>
            <Paragraph size="large" align="center" pad="medium">
              {messages.SECTION_TWO_PARAGRAPH}
            </Paragraph>
          </Section>
        </Animate>
        <Animate
          visible="scroll"
          keep
          enter={{ animation: "fade", duration: 1000, delay: 100 }}
        >
          <Section
            colorIndex="neutral-1"
            full="horizontal"
            pad="large"
            align="center"
          >
            <Box align="center" pad="medium">
              <GlobeIcon size="xlarge" />
            </Box>
            <Box pad="medium">
              <Headline strong align="center">
                {messages.SECTION_THREE_HEADLINE}
              </Headline>
            </Box>
            <Box pad="medium" align="center">
              <Paragraph size="large" align="center">
                {messages.SECTION_THREE_P1}
                {messages.SECTION_THREE_P2}
                <Anchor href="https://grommet.github.io/docs/learn">
                  {messages.SECTION_THREE_GUIDANCE}
                </Anchor>,
                <Anchor href="https://grommet.github.io/docs/components">
                  {messages.SECTION_THREE_COMPONENTS}
                </Anchor>
                {messages.SECTION_THREE_AND}
                <Anchor href="https://grommet.github.io/docs/resources">
                  {messages.SECTION_THREE_RESOURCES}
                </Anchor>
                {messages.SECTION_THREE_P3}
              </Paragraph>
            </Box>
          </Section>
        </Animate>
        <Animate
          visible="scroll"
          keep
          enter={{ animation: "fade", duration: 1000, delay: 100 }}
        >
          <Section
            colorIndex="light-1"
            full="horizontal"
            pad="large"
            align="center"
          >
            <Box align="center" pad="medium">
              <Headline strong align="center">
                {messages.SECTION_FOUR_HEADLINE}
              </Headline>
              <Paragraph size="large" align="center">
                {messages.SECTION_FOUR_PARAGRAPH}
              </Paragraph>
            </Box>
            <Features />
            <Footer justify="center" pad="medium">
              <Button label={messages.BUTTON_TEXT} path="/dashboard" />
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
