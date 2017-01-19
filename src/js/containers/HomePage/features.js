import React from 'react';
import DatabaseIcon from 'grommet/components/icons/base/Database';
import ResourcesIcon from 'grommet/components/icons/base/Resources';
import CodeIcon from 'grommet/components/icons/base/Code';
import AccessAccessibilityIcon from 'grommet/components/icons/base/AccessAccessibility';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';

const featureData = [
  {
    heading: 'Best Practices',
    paragraph: `Grommet CMS was built using best-practices for scaling of React
    applications.  Using the Grommet-CLI, you can get started with a template
    content management system for your next project with one command.`,
    icon: <CodeIcon size="large" colorIndex="brand" />
  },
  {
    heading: 'Full Stack',
    paragraph: `Grommet CMS is a platform from which you can build your application.
    It's backed by an industry leading database, MongoDB.`,
    icon: <DatabaseIcon size="large" colorIndex="brand" />
  },
  {
    heading: 'Component Architecture',
    paragraph: `Grommet CMS is built on top of component architecture, which means
      assembling your application is much like snapping together lego pieces`,
    icon: <ResourcesIcon size="large" colorIndex="brand" />
  },
  {
    heading: 'Accessible',
    paragraph: `All users matter.  Grommet CMS provides a robust foundation of accessibility
    features to meet web standards.`,
    icon: <AccessAccessibilityIcon size="large" colorIndex="brand" />
  }
];

export default function Features() {
  return (
    <Box direction="row" wrap pad="medium">
      {featureData.map((item, i) =>
        <Box key={i} align="center" size="small" basis="1/2">
          <Box margin="small" pad="small" flex align="center">
            <Box pad="medium">
              {item.icon}
            </Box>
            <Heading tag="h2">
              {item.heading}
            </Heading>
            <Paragraph size="medium">
              {item.paragraph}
            </Paragraph>
          </Box>
        </Box>
      )}
    </Box>
  );
}
