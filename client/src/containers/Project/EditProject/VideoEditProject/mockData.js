const categoryData = [
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

const projects = [
  {
    projectType: 'video',
    projectId: 'made-in-america',
    protectImages: false,
    updated: '2018-27-06T00:00:00Z',
    projectData: {
      title: 'Made in America',
      author: 'Jane Doe',
      owner: 'IIP Video Production',
      privacySetting: 'Anyone can see this project',
      categories: ['Science & Technology'],
      tags: ['economy', 'manufacturing'],
      publicDesc: 'The value and meaning of the words “Made in America” come from a rich history of innovation and perseverance. Stay for a brief history of manufacturing in the USA and hear some of the positive impacts it has brought to the world and how its benefits are felt today.',
      internalDesc: 'Use this video on social media and embed on web pages to engage audiences in the importance of Economic Prosperity.'
    },
    supportFiles: {
      srt: [
        { lang: 'Arabic', file: 'madeinamerica_arabic.srt' },
        { lang: 'Chinese', file: 'madeinamerica_chinese.srt' },
        { lang: 'English', file: 'madeinamerica_english.srt' },
        { lang: 'French', file: 'madeinamerica_french.srt' }
      ],
      thumbnail: [
        { lang: 'Arabic', file: 'madeinamerica_arabic.jpg' },
        { lang: 'Chinese', file: 'madeinamerica_chinese.jpg' },
        { lang: 'English', file: 'madeinamerica_english.jpg' },
        { lang: 'French', file: 'madeinamerica_french.jpg' }
      ],
      other: [
        { lang: 'English', file: 'madeinamerica_english.mp3' }
      ]
    },
    videos: [
      {
        title: 'Made in America',
        thumbnail: 'https://staticcdp.s3.amazonaws.com/2018/05/courses.america.gov_1481/b3b38d194ff80d06dd837f57a41fe16f.jpg',
        alt: 'Man walking through factory (State Dept.)',
        fileName: 'madeinamerica_english.mp4',
        fileSize: '631.9MB',
        dimensions: '1920 x 1080',
        uploaded: '2018-13-04T15:45:00Z',
        duration: '9:16',
        language: 'English',
        textDirection: 'ltr',
        subtitlesCaptions: 'Clean - No Captions',
        videoType: 'Full Video',
        quality: 'For Web',
        publicDesc: 'The value and meaning of the words “Made in America” come from a rich history of innovation and perseverance. Stay for a brief history of manufacturing in the USA and hear some of the positive impacts it has brought to the world and how its benefits are felt today.',
        youTubeUrl: 'https://www.youtube.com/watch?v=1evw4fRu3bo'
      },
      {
        title: 'Fabriqué en Amérique',
        thumbnail: 'https://staticcdp.s3.amazonaws.com/2018/05/courses.america.gov_1481/b3b38d194ff80d06dd837f57a41fe16f.jpg',
        alt: '',
        fileName: 'madeinamerica_french.mp4',
        fileSize: '631.9MB',
        dimensions: '1920 x 1080',
        uploaded: '2018-13-04T15:45:00Z',
        duration: '9:16',
        language: 'French',
        textDirection: 'ltr',
        subtitlesCaptions: 'Clean - No Captions',
        videoType: 'Full Video',
        quality: 'For Web',
        publicDesc: 'La valeur et le sens de l’expression Fabriqué en Amérique, ont leur origine dans un passé riche d’innovation et de persévérance. Découvrez une partie de l’histoire de l’industrie manufacturière aux États-Unis et l’influence positive qu’elle a eue sur le monde, dans le passé et encore aujourd’hui.',
        additionalKeywords: ['la valeur', 'innovation', 'ipsum'],
        youTubeUrl: 'https://www.youtube.com/watch?v=1evw4fRu3bo'
      },
      {
        title: 'عنوان: امریکی ساختہ',
        thumbnail: 'https://staticcdp.s3.amazonaws.com/2018/05/courses.america.gov_1481/b3b38d194ff80d06dd837f57a41fe16f.jpg',
        alt: '',
        fileName: 'madeinamerica_arabic.mp4',
        fileSize: '631.9MB',
        dimensions: '1920 x 1080',
        uploaded: '2018-13-04T15:45:00Z',
        duration: '9:16',
        language: 'Arabic',
        textDirection: 'rtl',
        subtitlesCaptions: 'Clean - No Captions',
        videoType: 'Full Video',
        quality: 'For Web',
        publicDesc: 'امریکی ساختہ کی قدر اور مفہوم نے جدت طرازی اور استقامت کی شاندار تاریخ سے جنم لیا ہے۔ امریکہ میں مصنوعات سازی کی مختصر تاریخ سے آگہی حاصل کریں اور دنیا پر مرتب ہونے والے اس کے مثبت اثرات میں سے چند ایک کا احوال سنیں اور دیکھیں کہ آج اس کے فوائد کس طرح محسوس کیے جا رہے ہیں۔',
        additionalKeywords: ['ساختہ'],
        youTubeUrl: 'https://www.youtube.com/watch?v=1evw4fRu3bo'
      }
    ]
  }
];

export {
  categoryData,
  privacyOptions,
  projects
};
