const categories = [
  {
    value: 'about-america',
    text: 'About America'
  },
  {
    value: 'arts-and-culture',
    text: 'Arts & Culture'
  },
  {
    value: 'democracy-and-civil-society',
    text: 'Democracy & Civil Society'
  },
  {
    value: 'economic-issues',
    text: 'Economic Issues'
  },
  {
    value: 'education',
    text: 'Education'
  },
  {
    value: 'environment',
    text: 'Environment'
  },
  {
    value: 'geography',
    text: 'Geography'
  },
  {
    value: 'global-issues',
    text: 'Global Issues'
  },
  {
    value: 'good-governance',
    text: 'Good Governance'
  },
  {
    value: 'health',
    text: 'Health'
  },
  {
    value: 'human-rights',
    text: 'Human Rights'
  },
  {
    value: 'press-and-journalism',
    text: 'Press & Journalism'
  },
  {
    value: 'religion-and-values',
    text: 'Religion & Values'
  },
  {
    value: 'science-and-technology',
    text: 'Science & Technology'
  },
  {
    value: 'sports',
    text: 'Sports'
  }
];

const privacyOptions = [
  {
    value: 'anyone',
    text: 'Anyone can see this project'
  },
  {
    value: 'embargoed',
    text: 'Embargoed'
  }
];

const supportFiles = {
  arabic: {
    srt: 'madeinamerica_arabic.srt',
    thumbnail: 'madeinamerica_arabic.jpg'
  },
  chinese: {
    srt: 'madeinamerica_chinese.srt',
    thumbnail: 'madeinamerica_chinese.jpg'
  },
  english: {
    srt: 'madeinamerica_english.srt',
    thumbnail: 'madeinamerica_english.jpg'
  },
  french: {
    srt: 'madeinamerica_french.srt',
    thumbnail: 'madeinamerica_french.jpg'
  }
};

const additionalVideos = [
  {
    title: 'Made in America',
    lang: 'english',
    ltr: true,
    thumbnail: {
      url: 'https://via.placeholder.com/350x200',
      alt: 'some alt text'
    }
  },
  {
    title: 'عنوان: امریکی ساختہ',
    lang: 'arabic',
    ltr: false,
    thumbnail: {
      url: 'https://via.placeholder.com/350x200',
      alt: 'some alt text'
    }
  },
  {
    title: '« Made in America » French',
    lang: 'french',
    ltr: true,
    thumbnail: {
      url: 'https://via.placeholder.com/350x200',
      alt: 'some alt text'
    }
  }
];

export {
  categories,
  privacyOptions,
  supportFiles,
  additionalVideos
};
