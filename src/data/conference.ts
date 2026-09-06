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

export interface CommitteeMember {
  name: string;
  role?: string;
  designation?: string;
  department?: string;
  institution?: string;
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
    { label: 'OUR TEAM', path: '/our-team' },
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
      id: 'cial',
      title: 'Cochin International Airport',
      description: "Cochin International Airport (CIAL) is the world's first airport fully powered by solar energy, making it a globally recognised model of sustainable infrastructure. Its large-scale solar power plant generates clean energy to meet the airport's electricity needs, significantly reducing carbon emissions and dependence on conventional energy sources. The airport has demonstrated that renewable energy can be successfully integrated into large-scale public infrastructure without compromising efficiency. CIAL continues to strengthen its commitment to sustainability through initiatives such as rainwater harvesting, waste management, and the planned introduction of hydrogen-powered buses for passenger transport.",
      imageUrl: '/images/cochin_international_airport_cial.jpg',
    },
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
    {
      id: 'mangalavanam',
      title: 'Mangalavanam Bird Sanctuary',
      description: 'It is a peaceful green oasis located in the heart of Kochi, behind the Kerala High Court. Popularly known as the "Green Lung of Kochi," it is home to mangrove forests, migratory birds, butterflies, and many other species. It is an ideal picnic destination for nature lovers, bird watchers, and students who want to enjoy a calm environment while learning about biodiversity. The sanctuary plays an important role in conserving urban wildlife and maintaining ecological balance.',
      imageUrl: '/images/mangalavanam_bird_sanctuary.jpg',
    },
    {
      id: 'paniyeli-poru',
      title: 'Paniyeli Poru Eco Tourism Centre, Perumbavoor',
      description: "Paniyeli Poru Eco Tourism Centre is an ecotourism destination located on the banks of the Periyar River near Ezhattumugham in Ernakulam district. Surrounded by forests and scenic river rapids, it attracts visitors for nature walks, trekking, and wildlife observation. The centre promotes sustainable development by encouraging responsible tourism while conserving the area's rich biodiversity and natural ecosystem. It also supports local livelihoods by creating employment opportunities and fostering community participation in environmental conservation.",
      imageUrl: '/images/paniyeli_poru_eco_tourism.jpg',
    },
    {
      id: 'chellanam',
      title: 'Chellanam Beach',
      description: 'Chellanam Beach is a popular coastal destination in Kochi, known for its peaceful surroundings, fresh sea breeze, and beautiful sunset views. One of its main attractions is the tetrapods—large four-legged concrete structures placed along the shoreline. These tetrapods are designed to reduce the force of sea waves, prevent coastal erosion, and protect nearby houses and roads from damage during high tides and storms. The beach is an ideal place for picnics, photography, and enjoying the natural beauty of the Arabian Sea.',
      imageUrl: '/images/chellanam_beach.jpg',
    },
    {
      id: 'kochi-water-metro',
      title: 'Kochi Water Metro: A Step Towards Sustainable Urban Mobility',
      description: "The Kochi Water Metro is India's first integrated water-based public transport system, connecting Kochi with its surrounding islands through a network of modern electric ferries and terminals. It was introduced to provide a safe, affordable, and sustainable mode of transportation while improving connectivity for island communities and reducing traffic congestion on the city's roads. By promoting clean energy, innovative infrastructure, accessible public transport, and environmentally responsible travel, the Water Metro contributes to a more inclusive and sustainable Kochi. It is a remarkable example of how a single initiative can support multiple Sustainable Development Goals (SDGs) while improving the everyday lives of people.",
      imageUrl: '/images/kochi_water_metro.jpg',
    },
    {
      id: 'kumbalangi',
      title: 'Kumbalangi Integrated Model Tourism Village',
      description: "Kumbalangi is a beautiful backwater village located about 15 km from Kochi. It is India's first model tourism village and is well known for its scenic beauty, Chinese fishing nets, mangrove forests, and traditional village life. Visitors can enjoy boating, fresh seafood, coir making, crab farming, and local cultural experiences. The village promotes eco-friendly tourism and supports the livelihood of local communities, making it a perfect place for a relaxing picnic and nature exploration.",
      imageUrl: '/images/kumbalangi_village.jpg',
    },
    {
      id: 'mangrove-park-malipuram',
      title: 'Mangrove Park, Malipuram: Conserving Nature Through Sustainable Development',
      description: "Located in Malipuram, Vypin, the Mangrove Park is an eco-tourism destination that showcases the importance of conserving Kerala's mangrove ecosystems. The park allows visitors to explore the rich biodiversity of mangrove forests through boardwalks and nature trails while creating awareness about the need to protect these fragile coastal habitats. It promotes environmental conservation, sustainable tourism, biodiversity protection, and climate resilience, making it a great example of how local initiatives can contribute to the Sustainable Development Goals (SDGs) while preserving nature for future generations.",
      imageUrl: '/images/mangrove_park_malipuram.jpg',
    },
    {
      id: 'abhayaranyam-kaprikkad',
      title: 'Abhayaranyam, Kaprikkad',
      description: 'Abhayaranyam at Kaprikkad is an eco-tourism destination located in a natural forest setting near Perumbavoor, Ernakulam. It is known for wildlife conservation and provides a safe environment for animals, including elephants and other rescued wildlife. Visitors can explore the natural surroundings and learn about wildlife protection, conservation, and the importance of preserving natural habitats. By combining wildlife conservation, environmental education, and responsible tourism, Abhayaranyam provides an opportunity to understand SDG 15 – Life on Land and the importance of protecting biodiversity.',
      imageUrl: '/images/abhayaranyam_kaprikkad.jpg',
    },
  ] as AttractionItem[],

  gallery: [
    // DYUTI 2026
    { id: '2026-1', title: 'Panel Dialogue: Global to Local Impact in Social Work & Public Health', year: '2026', category: 'Panels', imageUrl: '/images/gallery/dyuti2026_panel_discussion.jpg' },
    { id: '2026-2', title: 'Keynote Address: Shared Pathways in Public Health & Social Work Disciplines', year: '2026', category: 'Plenary', imageUrl: '/images/gallery/dyuti2026_keynote_address.jpg' },
    { id: '2026-3', title: 'DYUTI 2026 Cultural Night & Classical Dance Performance', year: '2026', category: 'Cultural', imageUrl: '/images/gallery/dyuti2026_cultural_night.jpg' },

    // DYUTI 2025
    { id: '2025-1', title: 'Distinguished Speaker Address & Memento Presentation', year: '2025', category: 'Honours', imageUrl: '/images/gallery/dyuti2025_felicitation.jpg' },
    { id: '2025-2', title: 'International & National Delegates Academic Deliberations', year: '2025', category: 'Sessions', imageUrl: '/images/gallery/dyuti2025_international_delegates.jpg' },
    { id: '2025-3', title: 'DYUTI 2025 Cultural Night & Candle Dance Ceremony', year: '2025', category: 'Cultural', imageUrl: '/images/gallery/dyuti2025_cultural_night.jpg' },

    // DYUTI 2024
    { id: '2024-1', title: 'DYUTI 2024 Thematic Dance & Cultural Performance', year: '2024', category: 'Cultural', imageUrl: '/images/gallery/dyuti2024_cultural_performance.jpg' },
    { id: '2024-2', title: 'International Delegates & Research Scholars in Plenary Hall', year: '2024', category: 'Sessions', imageUrl: '/images/gallery/dyuti2024_delegates_auditorium.jpg' },
    { id: '2024-3', title: 'DYUTI 2024 Inaugural Ceremony & Global Partnership Summit', year: '2024', category: 'Inauguration', imageUrl: '/images/gallery/dyuti2024_inaugural_ceremony.jpg' },

    // DYUTI 2023
    { id: '2023-1', title: 'Academic Workshop & Interactive Presentation Session', year: '2023', category: 'Workshops', imageUrl: '/images/gallery/dyuti2023_academic_workshop.jpg' },
    { id: '2023-2', title: 'Distinguished Keynote Address at Rajagiri Podium', year: '2023', category: 'Plenary', imageUrl: '/images/gallery/dyuti2023_speaker_address.jpg' },

    // DYUTI 2022
    { id: '2022-1', title: 'Keynote Address at Rajagiri Main Stage', year: '2022', category: 'Plenary', imageUrl: '/images/gallery/dyuti2022_keynote_address.jpg' },
    { id: '2022-2', title: 'Auditorium Academic Deliberations & Delegate Gathering', year: '2022', category: 'Sessions', imageUrl: '/images/gallery/dyuti2022_auditorium_delegates.jpg' },
    { id: '2022-3', title: 'Distinguished Dignitaries & Faculty Gathering', year: '2022', category: 'Honours', imageUrl: '/images/gallery/dyuti2022_dignitaries_frontrow.jpg' },
    { id: '2022-4', title: 'Expert Panel Session & Presentation Evaluation', year: '2022', category: 'Panels', imageUrl: '/images/gallery/dyuti2022_panel_evaluation.jpg' },

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

  committee: {
    executiveCommittee: {
      chiefPatron: {
        name: 'Dr. Fr. Saju MD CMI',
        role: 'Chief Patron',
        designation: 'Principal',
        institution: 'Rajagiri College of Social Sciences (Autonomous)',
      },
      patron: {
        name: 'Dr. Kiran Thampi',
        role: 'Patron',
        designation: 'Head, Department of Social Work',
        department: 'Department of Social Work',
        institution: 'Rajagiri College of Social Sciences (Autonomous)',
      },
    },
    conveners: [
      {
        name: 'Dr. V. Kalyani',
        role: 'Convener',
        designation: 'Assistant Professor',
        department: 'Department of Social Work',
        institution: 'Rajagiri College of Social Sciences (Autonomous)',
        email: 'dyuti@rajagiri.edu',
      },
      {
        name: 'Dr. Sr. Bincy C.C.',
        role: 'Convener',
        designation: 'Assistant Professor',
        department: 'Department of Social Work',
        institution: 'Rajagiri College of Social Sciences (Autonomous)',
        email: 'dyuti@rajagiri.edu',
      },
    ] as CommitteeMember[],
    organizingCommittee: [
      { name: 'Dr. Anish K.R.', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Dr. Sunirose I.P.', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Dr. Rajeev S.P.', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Dr. Deepa Rasheed', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Dr. Reena Merin Cherian', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Dr. Lorane Scaria', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Dr. Nycil Romis Thomas', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Dr. Josephine Nongmaithem', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Dr. Danishwar Rasool Dar', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Dr. Shinto Thomas CMI', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Dr. Anil John', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Dr. Giji George', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Mr. Mathew T. John', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
      { name: 'Sr. Shyba S Babu', designation: 'Organizing Committee Member', department: 'Department of Social Work', institution: 'Rajagiri College of Social Sciences (Autonomous)' },
    ] as CommitteeMember[],
    administrativeCommittee: {
      name: 'Jessymol K J',
      role: 'Administrative Committee',
      email: 'msw@rajagiri.edu',
      department: 'Department of Social Work',
      institution: 'Rajagiri College of Social Sciences (Autonomous)',
      location: 'Kalamassery-683104, Kerala, India.',
      conferenceEmail: 'dyuti@rajagiri.edu',
    },
  },
};
