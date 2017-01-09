import PressRelease from '../models/PressRelease';
import colors from 'colors/safe';

const PRESS = [
  {
    title: 'HPE’s Journey, Progress, and Future',
    slug: 'hpes-journey-progress-and-future',
    link: 'https://www.hpe.com/us/en/newsroom/news-archive/featured-article/2016/10/HPEs-Journey-Progress-and-Future.html',
    postType: 'Related Article',
    image: '/img/press/meg.jpeg',
    date: '01/01/2017'
  },{
    title: 'Discover Lodon 2016',
    slug: 'discover-london-2016',
    link: 'https://www.hpe.com/us/en/newsroom/news-archive/press-kits/2016/11/Discover-London-2016.html',
    postType: 'Related Article',
    image: '/img/press/discover-2016.jpeg',
    date: '01/02/2017'
  },{
    title: 'HP Enterprise Unveils Prototype of Next-Generation Computer ‘The Machine’',
    slug: 'hp-enterprise-unveils-protoype',
    link: 'http://www.wsj.com/articles/hp-enterprise-unveils-prototype-of-next-generation-computer-the-machine-1480361777',
    postType: 'Related Article',
    image: '',
    date: '01/03/2017'
  },{
    title: 'The Newsroom: The Machine',
    slug: 'the-newsroom-the-machine',
    link: 'https://www.hpe.com/us/en/newsroom/news-archive/feature/2016/06/The-Machine-Discover.html',
    postType: 'Related Article',
    image: '/img/press/the-machine.jpeg',
    date: '01/04/2017'
  }
];

export default function buildPressCollection() {
  PressRelease.find().exec(function(err, doc) {
    if (err) console.log(colors.red('error: ', err));

    if (doc.length === 0) {
      PressRelease.collection.insert(
        PRESS, 
        function(err, small) {
          if (err) 
            console.log(colors.red('error creating PressRelease collection', err));
          console.log(colors.green(`Created PressRelease collection`));
        }
      );
    }
  });
};
