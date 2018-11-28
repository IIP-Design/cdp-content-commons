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

const supportFilesConfig = {
  srt: {
    headline: 'SRT Files',
    fileType: 'srt',
    popupMsg: 'Some info about what SRT files are.'
  },
  thumbnail: {
    headline: 'Thumbnail Files',
    fileType: 'thumbnail',
    popupMsg: 'Thumbnail to be used when a video is unable to be played or when audio only audio is used.',
    checkBoxLabel: 'Disable right-click to protect your images',
    checkBoxName: 'protectImages',
    iconMsg: 'Checking this prevents people from downloading and using your images. Useful if your images are licensed.',
    iconSize: 'small',
    iconType: 'info circle'
  },
  other: {
    headline: 'Additional Files',
    fileType: 'other',
    popupMsg: 'Additional files that can be used with this video, e.g., audio file, pdf.'
  }
};

const projects = [
  {
    projectType: 'video',
    projectId: 'made-in-america',
    protectImages: false,
    updated: '2018-06-27T00:00:00Z',
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
        { lang: 'Chinese (Simplified)', file: 'madeinamerica_chinese_ljhlkjhl_kjhlkjh_aslkfja;lskjfweoij.srt' },
        { lang: 'English', file: 'madeinamerica_english.srt' },
        { lang: 'French', file: 'madeinamerica_french.srt' }
      ],
      thumbnail: [
        { lang: 'Arabic', file: 'madeinamerica_arabic.jpg' },
        { lang: 'Chinese (Simplified)', file: 'madeinamerica_chinese.jpg' },
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
        language: {
          language_code: 'en',
          locale: 'en-us',
          display_name: 'English',
          native_name: 'English',
          text_direction: 'ltr'
        },
        other: [
          {
            fileName: 'madeinamerica_english.mp3',
            fileType: 'mp3',
            md5: '',
            srcUrl: 'https://other-download-url.com'
          }
        ],
        source: [
          {
            burnedInCaptions: 'false',
            downloadUrl: 'https://video-download-url.com',
            duration: '9:16',
            filetype: '',
            md5: '',
            fileName: 'madeinamerica_english.mp4',
            size: {
              bitrate: 9832917,
              filesize: 662595174,
              height: '1080',
              width: '1920'
            },
            stream: {
              link: '',
              site: '',
              thumbnail: null,
              uid: '',
              url: ''
            },
            streamUrl: [
              {
                site: 'youtube',
                url: 'https://youtu.be/1evw4fRu3bo'
              }
            ],
            video_quality: 'web'
          }
        ],
        srt: {
          md5: '',
          srcUrl: 'https://srt-download-url.com'
        },
        transcript: {
          md5: '',
          srcUrl: ''
        },
        fileName: 'madeinamerica_english_asdkjaf_al;kdflkeori_erpoiuzx,mnvz.mp4',
        uploaded: '2018-04-13T15:45:00Z',
        desc: 'The value and meaning of the words “Made in America” come from a rich history of innovation and perseverance. Stay for a brief history of manufacturing in the USA and hear some of the positive impacts it has brought to the world and how its benefits are felt today.'
      },
      {
        title: 'Fabriqué en Amérique',
        thumbnail: 'https://staticcdp.s3.amazonaws.com/2018/05/courses.america.gov_1481/b3b38d194ff80d06dd837f57a41fe16f.jpg',
        alt: '',
        language: {
          language_code: 'fr',
          locale: 'fr-fr',
          display_name: 'French',
          native_name: 'Français',
          text_direction: 'ltr'
        },
        other: [
          {
            fileName: '',
            fileType: '',
            md5: '',
            srcUrl: ''
          }
        ],
        source: [
          {
            burnedInCaptions: 'false',
            downloadUrl: 'https://video-download-url.com',
            duration: '9:16',
            filetype: '',
            md5: '',
            fileName: 'madeinamerica_french.mp4',
            size: {
              bitrate: 9832917,
              filesize: 662595174,
              height: '1080',
              width: '1920'
            },
            stream: {
              link: '',
              site: '',
              thumbnail: null,
              uid: '',
              url: ''
            },
            streamUrl: [
              {
                site: 'youtube',
                url: 'https://youtu.be/1evw4fRu3bo'
              }
            ],
            video_quality: 'web'
          }
        ],
        srt: {
          md5: '',
          srcUrl: 'https://srt-download-url.com'
        },
        transcript: {},
        fileName: 'madeinamerica_french.mp4',
        uploaded: '2018-04-13T15:45:00Z',
        desc: 'La valeur et le sens de l’expression Fabriqué en Amérique, ont leur origine dans un passé riche d’innovation et de persévérance. Découvrez une partie de l’histoire de l’industrie manufacturière aux États-Unis et l’influence positive qu’elle a eue sur le monde, dans le passé et encore aujourd’hui.',
        additionalKeywords: [
          'la valeur', 'innovation', 'ipsum'
        ]
      },
      {
        title: 'عنوان: امریکی ساختہ',
        thumbnail: 'https://staticcdp.s3.amazonaws.com/2018/05/courses.america.gov_1481/b3b38d194ff80d06dd837f57a41fe16f.jpg',
        alt: '',
        language: {
          language_code: 'ar',
          locale: 'ar',
          display_name: 'Arabic',
          native_name: 'العربية',
          text_direction: 'rtl'
        },
        other: [
          {
            fileName: '',
            fileType: '',
            md5: '',
            srcUrl: ''
          }
        ],
        source: [
          {
            burnedInCaptions: 'false',
            downloadUrl: 'https://video-download-url.com',
            duration: '9:16',
            filetype: '',
            md5: '',
            fileName: 'madeinamerica_arabic.mp4',
            size: {
              bitrate: 9832917,
              filesize: 662595174,
              height: '1080',
              width: '1920'
            },
            stream: {
              link: '',
              site: '',
              thumbnail: null,
              uid: '',
              url: ''
            },
            streamUrl: [
              {
                site: 'youtube',
                url: 'https://youtu.be/1evw4fRu3bo'
              }
            ],
            video_quality: 'web'
          }
        ],
        srt: {
          md5: '',
          srcUrl: 'https://srt-download-url.com'
        },
        transcript: {},
        fileName: 'madeinamerica_arabic.mp4',
        uploaded: '2018-04-13T15:45:00Z',
        desc: 'امریکی ساختہ کی قدر اور مفہوم نے جدت طرازی اور استقامت کی شاندار تاریخ سے جنم لیا ہے۔ امریکہ میں مصنوعات سازی کی مختصر تاریخ سے آگہی حاصل کریں اور دنیا پر مرتب ہونے والے اس کے مثبت اثرات میں سے چند ایک کا احوال سنیں اور دیکھیں کہ آج اس کے فوائد کس طرح محسوس کیے جا رہے ہیں۔',
        additionalKeywords: ['ساختہ']
      }
    ]
  }
];

export {
  categoryData,
  privacyOptions,
  supportFilesConfig,
  projects
};
