export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  category: 'media' | 'pdf' | 'seo' | 'dev' | 'calculator';
  icon: string;
  badge?: string;
  popular?: boolean;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  faqs: ToolFAQ[];
}

export const CATEGORIES = [
  { id: 'all', name: 'All Tools', icon: 'Grid' },
  { id: 'media', name: 'Image & Media', icon: 'Image' },
  { id: 'pdf', name: 'PDF Suite', icon: 'FileText' },
  { id: 'seo', name: 'SEO & Marketing', icon: 'Search' },
  { id: 'dev', name: 'Developer Utilities', icon: 'Code' },
  { id: 'calculator', name: 'Calculators', icon: 'Calculator' },
];

export const TOOLS: ToolDefinition[] = [
  {
    id: 'image-converter',
    name: 'Image Format Converter',
    shortDesc: 'Convert PNG, JPG, WebP, AVIF & GIF instantly with quality controls. 100% Free.',
    fullDesc: 'Free online batch image converter. Easily convert WebP to PNG, JPG to WebP, PNG to JPG, AVIF, and GIF directly in your browser without uploading to any external server. 100% private and free forever.',
    category: 'media',
    icon: 'Image',
    badge: '100% Free',
    popular: true,
    seoTitle: '100% Free Online Image Converter - Convert PNG, JPG, WebP & AVIF',
    seoDescription: 'Convert images to PNG, JPG, WebP, AVIF, and GIF for free. Fast, client-side, 100% private image conversion without quality loss.',
    keywords: ['image converter', 'webp to png', 'jpg to webp', 'png to jpg', 'free image converter online', 'avif converter'],
    faqs: [
      {
        question: 'Are my images uploaded to any server?',
        answer: 'No! All conversions happen 100% inside your web browser using HTML5 Canvas & Web APIs. Your images never leave your device.'
      },
      {
        question: 'Is this tool completely free?',
        answer: 'Yes! ConverterHub is 100% free forever with no registration, subscription fees, or hidden limits.'
      }
    ]
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor & Resizer',
    shortDesc: 'Compress and resize WebP, PNG, & JPG up to 90% without losing quality.',
    fullDesc: 'Reduce image file sizes instantly for faster website loading speed and better Google PageSpeed Insights ranking. Adjust compression quality percentage and pixel dimensions.',
    category: 'media',
    icon: 'Minimize2',
    badge: 'Free Tool',
    popular: true,
    seoTitle: 'Free Image Compressor Online - Compress PNG, JPG, & WebP Images',
    seoDescription: 'Compress WebP, PNG, and JPG images online without losing quality. Shrink image file size for faster websites and better SEO.',
    keywords: ['image compressor', 'compress png online', 'compress jpg', 'webp compressor', 'reduce image size', 'optimize images for web'],
    faqs: [
      {
        question: 'How much can I reduce my image size?',
        answer: 'You can typically compress PNG and JPG images by 50% to 90% when converting or shrinking quality to WebP.'
      }
    ]
  },
  {
    id: 'pdf-suite',
    name: 'Image to PDF Converter',
    shortDesc: 'Convert multiple images into a clean single PDF file instantly.',
    fullDesc: 'Combine multiple PNG, JPG, or WebP images into a single high-quality PDF document. Customize page orientation, margin spacing, and image layout.',
    category: 'pdf',
    icon: 'FileText',
    badge: 'Free',
    popular: true,
    seoTitle: 'Free Image to PDF Converter - Convert PNG & JPG to PDF Online',
    seoDescription: 'Convert PNG, JPG, and WebP images into a single downloadable PDF document for free. No signup or watermark.',
    keywords: ['jpg to pdf', 'image to pdf', 'png to pdf converter', 'combine images into pdf', 'free online pdf maker'],
    faqs: [
      {
        question: 'Can I combine multiple pictures into one PDF?',
        answer: 'Yes! Simply select multiple images, reorder them as needed, and download a single merged PDF.'
      }
    ]
  },
  {
    id: 'meta-tag-generator',
    name: 'SEO Meta Tag & SERP Generator',
    shortDesc: 'Generate Meta Title, Description, OpenGraph & Twitter tags with live preview.',
    fullDesc: 'Create search engine optimized meta tags for your website. Preview exactly how your page will look on Google search results, Facebook, Twitter, and LinkedIn.',
    category: 'seo',
    icon: 'Search',
    badge: 'Free SEO',
    popular: true,
    seoTitle: 'Free SEO Meta Tag Generator & Live SERP Preview Tool',
    seoDescription: 'Generate HTML Meta tags, OpenGraph tags, and Twitter Cards with live Google SERP snippet previews to boost click-through rates (CTR).',
    keywords: ['meta tag generator', 'seo meta description preview', 'serp simulator', 'opengraph generator', 'twitter card generator', 'google snippet preview'],
    faqs: [
      {
        question: 'Why are Meta Tags important for SEO?',
        answer: 'Meta titles and descriptions tell Google and users what your web page is about. High CTR snippets increase organic rankings.'
      }
    ]
  },
  {
    id: 'keyword-density',
    name: 'SEO Keyword Density Counter',
    shortDesc: 'Analyze word count, reading time, and keyword frequency for SEO content.',
    fullDesc: 'Analyze your article or blog post for keyword density percentage, top 1-word, 2-word, and 3-word phrases, word counts, and estimated reading time.',
    category: 'seo',
    icon: 'BarChart3',
    popular: false,
    seoTitle: 'Free Keyword Density Checker & Word Counter Online',
    seoDescription: 'Check keyword density percentage and word frequency in your blog posts to avoid Google keyword stuffing penalties.',
    keywords: ['keyword density checker', 'word count tool', 'seo phrase frequency', 'avoid keyword stuffing', 'article analyzer'],
    faqs: [
      {
        question: 'What is a good keyword density percentage for Google SEO?',
        answer: 'An ideal keyword density is generally between 1% and 2%. Anything above 3% may trigger Google keyword stuffing flags.'
      }
    ]
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortDesc: 'Format, validate, minify, and convert JSON to CSV or YAML effortlessly.',
    fullDesc: 'Prettify messy JSON strings, validate syntax errors with detailed line highlights, collapse JSON nodes, minify payload sizes, and convert to CSV format.',
    category: 'dev',
    icon: 'Code',
    badge: 'Dev Utility',
    popular: true,
    seoTitle: 'Free Online JSON Formatter, Validator & Minifier',
    seoDescription: 'Format, validate, prettify, and convert JSON online. Free developer utility with syntax error detection and CSV export.',
    keywords: ['json formatter', 'json validator', 'prettify json', 'minify json', 'json to csv converter', 'json online viewer'],
    faqs: [
      {
        question: 'Is my JSON data kept private?',
        answer: 'Yes! All parsing and formatting occur client-side in Javascript inside your browser. No data is logged or sent over API.'
      }
    ]
  },
  {
    id: 'base64-tool',
    name: 'Base64 Encoder & Decoder',
    shortDesc: 'Encode or decode text and image files to Base64 strings quickly.',
    fullDesc: 'Convert plain text, URLs, or image files into Base64 encoded strings or decode Base64 data URIs back into raw text or downloadable media files.',
    category: 'dev',
    icon: 'Binary',
    popular: false,
    seoTitle: 'Free Base64 Encoder & Decoder - Text & Image Base64 Tool',
    seoDescription: 'Encode text and images to Base64 or decode Base64 strings online. Supports Data URIs, UTF-8 strings, and file downloads.',
    keywords: ['base64 encoder', 'base64 decoder', 'image to base64', 'base64 to image', 'decode base64 online'],
    faqs: [
      {
        question: 'How do I convert an image to Base64?',
        answer: 'Upload your image file, and our tool will generate a data:image/... Base64 string that you can embed directly in HTML/CSS.'
      }
    ]
  },
  {
    id: 'unit-converter',
    name: 'Universal Unit Converter',
    shortDesc: 'Convert Length, Weight, Area, Temperature, Volume & Data units.',
    fullDesc: 'Quick and accurate unit converter for metric and imperial measurements. Instantly convert meters to feet, kilograms to pounds, Celsius to Fahrenheit, and more.',
    category: 'calculator',
    icon: 'Calculator',
    popular: false,
    seoTitle: 'Universal Unit Converter - Length, Weight, Area & Temp',
    seoDescription: 'Free universal unit converter online. Convert meters, feet, kg, lbs, Celsius, Fahrenheit, and digital storage units in real-time.',
    keywords: ['unit converter', 'meters to feet', 'kg to lbs', 'celsius to fahrenheit', 'metric conversion calculator'],
    faqs: [
      {
        question: 'Are conversions updated in real time?',
        answer: 'Yes! As soon as you type any numerical value, all unit conversions update instantly across all scale units.'
      }
    ]
  },
  {
    id: 'emi-calculator',
    name: 'Loan & Financial EMI Calculator',
    shortDesc: 'Calculate monthly loan EMI, total interest payable, and breakdown graph.',
    fullDesc: 'Plan your home loan, car loan, or personal loan repayments. Get exact monthly EMI figures, total interest payable, and interactive payment charts.',
    category: 'calculator',
    icon: 'DollarSign',
    badge: 'Finance',
    popular: true,
    seoTitle: 'Free Online Loan & EMI Calculator with Interest Breakdown',
    seoDescription: 'Calculate monthly EMI for home loans, car loans, and personal loans. See total interest payable and amortization breakdown.',
    keywords: ['emi calculator', 'loan calculator', 'home loan emi', 'monthly repayment calculator', 'interest rate breakdown'],
    faqs: [
      {
        question: 'What is the formula for calculating loan EMI?',
        answer: 'EMI is calculated using: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is principal amount, R is monthly interest rate, and N is tenure in months.'
      }
    ]
  }
];
