/**
 * Official DYUTI 2027 Conference Data Model
 * Extracted accurately from official conference records and institutional documentation
 */

export interface NavItem {
  label: string;
  path: string;
  isExternal?: boolean;
  isCta?: boolean;
}

export interface SubTheme {
  id: string;
  number: string;
  title: string;
  topics: string[];
}

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface RegistrationFee {
  category: string;
  amount: string;
  deadline?: string;
}

export interface AttractionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  year: string;
  category: string;
  imageUrl: string;
}

export interface ContactPerson {
  name: string;
  role: string;
  department: string;
  email?: string;
}

export const CONFERENCE_DATA = {
  name: 'DYUTI 2027',
  edition: '26th Edition (Founded 1998)',
  fullName: 'Developmental Yearnings for a United and Transformed India',
  acronymMeaning: 'Spark of Life',
  hostInstitution: 'Rajagiri College of Social Sciences (Autonomous)',
  location: 'Kalamassery, Kochi, Kerala, India',
  theme: 'Social Work for Sustainable Development: Empowering Communities through Innovation, Inclusion, and Partnership',
  announcement: 'Registration begins from 10th August 2026 at Rajagiri College of Social Sciences (Autonomous), Kalamassery.',
  overview: `The 2027 DYUTI National Conference, themed "Social Work for Sustainable Development: Empowering Communities through Innovation, Inclusion, and Partnership," brings together academicians, researchers, practitioners, policymakers, students, and development professionals to deliberate on innovative and collaborative approaches for sustainable development. Aligned with the 2030 Agenda for Sustainable Development and its vision of "Leaving No One Behind," the conference highlights the vital role of social work in promoting social justice, inclusive development, community empowerment, and sustainable solutions. Through scholarly dialogue and knowledge exchange, DYUTI 2027 aims to strengthen partnerships and advance resilient, equitable, and sustainable communities.`,
  background: `The adoption of the 2030 Agenda for Sustainable Development by the United Nations marked a global commitment to achieving the 17 Sustainable Development Goals (SDGs) through integrated social, economic, and environmental action. However, recent global reports indicate that progress has slowed due to climate change, widening inequalities, economic uncertainties, conflicts, and public health challenges, emphasizing the need for renewed collaboration and innovative, community-driven solutions.\n\nIn India, while notable progress has been made towards several SDGs, challenges such as poverty, inequality, unemployment, climate vulnerability, gender disparities, environmental degradation, and unequal access to quality education, healthcare, and social protection continue to hinder inclusive development. Addressing these complex issues requires coordinated efforts among governments, academia, civil society, communities, industry, development professionals and social entrepreneurs.\n\nSocial work plays a pivotal role in advancing sustainable development through advocacy, community engagement, policy action, interdisciplinary collaboration, and evidence-based practice. DYUTI 2027 seeks to provide a platform for sharing innovative practices, indigenous knowledge, research, and partnerships that contribute to achieving the Sustainable Development Goals while strengthening resilient, inclusive, and sustainable communities.`,
  
  links: {
    registrationForm: 'https://forms.gle/XTZZmXS1tjkvfm9u6',
    cmtSubmission: 'https://cmt3.research.microsoft.com/DYUTI2026/Submission/Manage',
    brochurePdf: 'https://dyuti.in/pdf/Dyuti%202026%20International%20Conference%20Brochure_V8.pdf',
    accommodationPdf: 'https://dyuti.in/pdf/listofstaynear.pdf',
    rajagiriPortal: 'http://rcss.rajagiri.edu/',
  },

  socials: {
    facebook: 'https://www.facebook.com/DYUTI.in/',
    instagram: 'https://www.instagram.com/rcss.live/?hl=en',
    linkedin: 'https://in.linkedin.com/school/rajagiri-college-of-social-sciences-autonomous/',
    twitter: 'https://twitter.com/search?src=hash&q=%23Rajagiri',
  },

  navItems: [
    { label: 'HOME', path: '/' },
    { label: 'RAJAGIRI', path: '/rajagiri' },
    { label: 'CALL FOR PAPERS', path: '/call_for_papers' },
    { label: 'ACCOMMODATION', path: '/accomodation' },
    { label: 'ATTRACTIONS', path: '/attractions' },
    { label: 'TRAVEL', path: '/travel' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'CONTACT', path: '/contactus' },
  ] as NavItem[],

  stats: [
    { value: '26th', label: 'Annual Conference', description: 'Continuous legacy since 1998' },
    { value: 'NIRF #12', label: 'College in India', description: 'National Institutional Ranking (2025)' },
    { value: 'KIRF #1', label: 'College in Kerala', description: 'State Institutional Ranking (2025)' },
    { value: 'NAAC A++', label: 'Highest Grade', description: 'Accredited with 3.83 CGPA' },
    { value: '60+', label: 'Global Partner Universities', description: 'Across 30+ countries worldwide' },
    { value: 'Scopus', label: 'Publication Proceeding', description: 'Peer-reviewed book chapters' },
  ] as StatItem[],

  subThemes: [
    {
      id: 'sdgs',
      number: '01',
      title: 'Social Work and the Sustainable Development Goals',
      topics: [
        'Social Work and the 2030 Agenda for Sustainable Development',
        'Localizing the SDGs through Community Practice',
        'Human Rights, Social Justice, and Sustainable Development',
        'Measuring Social Impact and Sustainable Outcomes',
      ],
    },
    {
      id: 'equity',
      number: '02',
      title: 'Inclusive Communities and Social Equity',
      topics: [
        'Poverty Reduction and Sustainable Livelihoods',
        "Gender Equality and Women's Empowerment",
        'Child Rights and Protection',
        'Disability Inclusion and Universal Accessibility',
        'Age-friendly Communities and Healthy Ageing',
        'Indigenous Communities and Marginalized Populations',
        'Migration and Social Inclusion',
      ],
    },
    {
      id: 'innovation',
      number: '03',
      title: 'Innovation for Community Development',
      topics: [
        'Digital Social Work and Artificial Intelligence',
        'Social Innovation and Community Entrepreneurship',
        'Technology-enabled Social Services',
        'Digital Inclusion and Smart Communities',
        'Innovation in Social Welfare Delivery',
        'Social Enterprises and Sustainable Livelihoods',
      ],
    },
    {
      id: 'climate',
      number: '04',
      title: 'Climate Action, Environmental Sustainability and Disaster Resilience',
      topics: [
        'Climate Change and Community Resilience',
        'Disaster Risk Reduction and Humanitarian Social Work',
        'Environmental Justice',
        'Sustainable Resource Management',
        'Green Social Work',
        'Circular Economy and Community Sustainability',
      ],
    },
    {
      id: 'health',
      number: '05',
      title: 'Health, Well-being and Sustainable Societies',
      topics: [
        'Public Health and Community Well-being',
        'Mental Health Promotion',
        'Community-Based Rehabilitation',
        'Healthy Ageing and Geriatric Care',
        'Nutrition, Food Security, and Social Protection',
        'One Health and Community Health Approaches',
      ],
    },
    {
      id: 'youth',
      number: '06',
      title: 'Education, Youth and Future Leadership',
      topics: [
        'Education for Sustainable Development',
        'Youth Participation and Civic Engagement',
        'Life Skills and Employability',
        'Digital Literacy and Lifelong Learning',
        'Student Leadership for Sustainable Communities',
        'Social Work Education for Future Practice',
      ],
    },
    {
      id: 'governance',
      number: '07',
      title: 'Governance, Policy and Collaborative Partnerships',
      topics: [
        'Public Policy and Sustainable Governance',
        'Corporate Social Responsibility and ESG Practices',
        'Public–Private–Community Partnerships',
        'Community Participation and Local Self-Governance',
        'Sustainable Financing for Social Development',
        'Multi-sectoral Collaboration for Community Transformation',
      ],
    },
    {
      id: 'indigenous',
      number: '08',
      title: 'Indigenous Knowledge, Culture and Global Perspectives',
      topics: [
        'Indian Knowledge Systems and Sustainable Development',
        'Traditional Ecological Knowledge',
        'Cultural Sustainability and Heritage Preservation',
        'Global Best Practices in Community Development',
        'Cross-cultural Learning and International Collaboration',
        'Evidence-based Models for Sustainable Social Work Practice',
      ],
    },
  ] as SubTheme[],

  importantDates: [
    { event: 'Last Date of Abstract Submission', date: '25 September 2026' },
    { event: 'Notification of Acceptance', date: 'Communicated via CMT Portal' },
    { event: 'Conference Registration Commencement', date: '10 August 2026' },
    { event: 'Conference Days', date: 'Rajagiri College, Kalamassery' },
  ],

  fees: [
    { category: 'Students / Research Scholars', amount: '₹ 750', deadline: 'Includes lunch & sessions on both days' },
    { category: 'Academicians / Faculty Members', amount: '₹ 1,000', deadline: 'Includes lunch & sessions on both days' },
    { category: 'NGO & CSR Delegates', amount: '₹ 1,500', deadline: 'Includes lunch & sessions on both days' },
  ] as RegistrationFee[],

  bankDetails: {
    accountName: 'Rajagiri College of Social Sciences, Kalamassery',
    accountNumber: '0224053000005056',
    bank: 'South Indian Bank',
    ifsc: 'SIBL0000224',
  },

  contacts: [
    {
      name: 'Dr. Sr. Bincy C.C',
      role: 'Assistant Professor',
      department: 'Department of Social Work',
      email: 'dyuti@rajagiri.edu',
    },
    {
      name: 'Dr. V. Kalyani',
      role: 'Assistant Professor',
      department: 'Department of Social Work',
      email: 'dyuti@rajagiri.edu',
    },
  ] as ContactPerson[],

  attractions: [
    {
      id: 'cherai',
      title: 'Cherai Beach',
      description: 'Located in Kochi Taluk, Cherai boasts the longest beach in Kochi with shallow waters, serene backwaters, and pristine coconut groves, situated about 25 km from High Court Junction.',
      imageUrl: 'https://dyuti.in/uploads/attractions/4.png',
    },
    {
      id: 'fort-kochi',
      title: 'Fort Kochi',
      description: 'A historic water-bound enclave retaining colonial Portuguese, Dutch, and British architectural heritage, Chinese fishing nets, and vibrant art spaces.',
      imageUrl: 'https://dyuti.in/uploads/attractions/3.png',
    },
    {
      id: 'marine-drive',
      title: 'Marine Drive Promenade',
      description: 'A picturesque pedestrian promenade in the heart of Kochi facing the scenic backwaters of Vembanad Lake, renowned for evening breeze and sunset vistas.',
      imageUrl: 'https://dyuti.in/uploads/attractions/2.png',
    },
    {
      id: 'mattancherry',
      title: 'Mattancherry & Jew Town',
      description: 'Home to the historic Mattancherry Palace (Dutch Palace) and Paradesi Synagogue (built in 1568), reflecting the rich multicultural tapestry of ancient Cochin.',
      imageUrl: 'https://dyuti.in/uploads/attractions/1.png',
    },
  ] as AttractionItem[],

  gallery: [
    // DYUTI 2019
    { id: '1', title: 'DYUTI 2019 Inaugural Ceremony', year: '2019', category: 'Inauguration', imageUrl: '/images/gallery/IMG_9887.JPG' },
    { id: '2', title: 'DYUTI 2019 Academic Dialogue & Valedictory', year: '2019', category: 'Conferences', imageUrl: '/images/gallery/IMG_4438.JPG' },

    // DYUTI 2018
    { id: '3', title: 'DYUTI 2018 Logo Launch Ceremony', year: '2018', category: 'Milestones', imageUrl: '/images/gallery/DSC_02071.jpg' },

    // DYUTI 2017
    { id: '4', title: 'Shri Rajamanikkam IAS Releasing DYUTI 2017 Brochure', year: '2017', category: 'Milestones', imageUrl: '/images/gallery/dyuti_brochure_release.jpg' },
    { id: '5', title: 'Flash Mob — A Step Towards Healthy Ageing', year: '2017', category: 'Events', imageUrl: '/images/gallery/IMG_1460.JPG' },
    { id: '6', title: '"The Losing Memories" — Conference Countdown', year: '2017', category: 'Events', imageUrl: '/images/gallery/dyuti_countdown.jpg' },
    { id: '7', title: 'DYUTI 2017 Countdown Launch', year: '2017', category: 'Events', imageUrl: '/images/gallery/ddd.jpg' },
    { id: '8', title: "DYUTI '17 Pre-Conference Inauguration", year: '2017', category: 'Inauguration', imageUrl: '/images/gallery/15168818.jpg' },
    { id: '9', title: "DYUTI '17 Pre-Conference Dignitary Welcome", year: '2017', category: 'Inauguration', imageUrl: '/images/gallery/15137561.jpg' },
    { id: '10', title: 'Student Research Presentations & Creative Deliberations', year: '2017', category: 'Student Sessions', imageUrl: '/images/gallery/15129491.jpg' },
    { id: '11', title: 'Inauguration of DYUTI International Conference 2017', year: '2017', category: 'Inauguration', imageUrl: '/images/gallery/fb1_ina.jpg' },
    { id: '12', title: 'Book Publishing Ceremony', year: '2017', category: 'Conferences', imageUrl: '/images/gallery/6L6A6365.JPG' },
    { id: '13', title: 'DYUTI 2K17 Cultural Night & Celebrations', year: '2017', category: 'Cultural', imageUrl: '/images/gallery/IMG_7414_fina_edtng.jpg' },
    { id: '14', title: 'Plenary Sessions: Dr. Lynette Joubert, Dr. Tina Wu & Dr. Illango Ponnusamy', year: '2017', category: 'Plenary', imageUrl: '/images/gallery/IMG_9963.JPG' },
    { id: '15', title: 'Plenary Academic Session Address', year: '2017', category: 'Plenary', imageUrl: '/images/gallery/IMG_0030.JPG' },
    { id: '16', title: 'DYUTI 2017 International Panel Dialogue', year: '2017', category: 'Conferences', imageUrl: '/images/gallery/IMG_9985.JPG' },
    { id: '17', title: 'Research Paper Presentations & Scholarly Debate', year: '2017', category: 'Presentations', imageUrl: '/images/gallery/IMG_0061.JPG' },
    { id: '18', title: 'DYUTI 2017 International Delegates Gathering', year: '2017', category: 'Conferences', imageUrl: '/images/gallery/IMG_8177.JPG' },
    { id: '19', title: 'Official Conference Theme Book Release', year: '2017', category: 'Milestones', imageUrl: '/images/gallery/IMG_8174.JPG' },
    { id: '20', title: 'DYUTI Commemorative Scrap Book Release', year: '2017', category: 'Milestones', imageUrl: '/images/gallery/IMG_8358.JPG' },
    { id: '21', title: 'Workshop: Research on Healthy Ageing', year: '2017', category: 'Workshops', imageUrl: '/images/gallery/IMG_8374.JPG' },
    { id: '22', title: 'Theme Book Presentation with Dr. Lynette Joubert', year: '2017', category: 'Milestones', imageUrl: '/images/gallery/IMG_1548.JPG' },
    { id: '23', title: 'Valedictory Function — Day 3 Proceedings', year: '2017', category: 'Valedictory', imageUrl: '/images/gallery/6L6A7359.JPG' },
    { id: '24', title: 'Valedictory Function Address to Delegates', year: '2017', category: 'Valedictory', imageUrl: '/images/gallery/6L6A7349.JPG' },
    { id: '25', title: 'Valedictory Session Dignitaries on Dais', year: '2017', category: 'Valedictory', imageUrl: '/images/gallery/6L6A7412.JPG' },
    { id: '26', title: 'Valedictory Concluding Remarks & Felicitations', year: '2017', category: 'Valedictory', imageUrl: '/images/gallery/6L6A7495.JPG' },
    { id: '27', title: 'DYUTI 2017 Awareness Flash Mob Performance', year: '2017', category: 'Events', imageUrl: '/images/gallery/6L6A7541.JPG' },

    // DYUTI 2015
    { id: '28', title: 'Keynote Address & Plenary Deliberations', year: '2015', category: 'Sessions', imageUrl: '/images/gallery/1.jpg' },
    { id: '29', title: 'International Delegates Panel Discussion', year: '2015', category: 'Panels', imageUrl: '/images/gallery/2.jpg' },
    { id: '30', title: 'Interactive Academic Workshop', year: '2015', category: 'Workshops', imageUrl: '/images/gallery/3.jpg' },
    { id: '31', title: 'Research Paper Presentation Session', year: '2015', category: 'Presentations', imageUrl: '/images/gallery/4.jpg' },
    { id: '32', title: 'Faculty & Scholar Collaborative Exchange', year: '2015', category: 'Sessions', imageUrl: '/images/gallery/5.jpg' },
    { id: '33', title: 'Academic Discourse on Contemporary Social Issues', year: '2015', category: 'Panels', imageUrl: '/images/gallery/6.jpg' },
    { id: '34', title: 'Valedictory Reflections & Summary', year: '2015', category: 'Sessions', imageUrl: '/images/gallery/7.jpg' },
    { id: '35', title: 'Distinguished Delegate Felicitation', year: '2015', category: 'Honours', imageUrl: '/images/gallery/8.jpg' },
    { id: '36', title: 'Student Delegate Academic Interactions', year: '2015', category: 'Sessions', imageUrl: '/images/gallery/9.jpg' },
    { id: '37', title: 'Conference Proceedings & Thematic Synthesis', year: '2015', category: 'Sessions', imageUrl: '/images/gallery/10.jpg' },

    // DYUTI 2013
    { id: '38', title: 'Inaugural Lamp Lighting Ceremony', year: '2013', category: 'Inauguration', imageUrl: '/images/gallery/11.jpg' },
    { id: '39', title: 'Plenary Session & Academic Discourse', year: '2013', category: 'Conferences', imageUrl: '/images/gallery/21.jpg' },

    // DYUTI 2010
    { id: '40', title: 'Raju Varghese Honouring Ceremony', year: '2010', category: 'Honours', imageUrl: '/images/gallery/12.jpg' },
    { id: '41', title: 'Civil Society & NGO Roundtable Consultation', year: '2010', category: 'Roundtables', imageUrl: '/images/gallery/22.jpg' },
  ] as GalleryItem[],
};
