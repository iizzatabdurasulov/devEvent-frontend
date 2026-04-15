import { IEvent, IMenuLink } from "@/types/index.types";

export const menuLink: IMenuLink[] = [
    {
        id: 1,
        title: "Home",
        path: "/",
    },
    {
        id: 2,
        title: "Events",
        path: "/events",
    },
    {
        id: 3,
        title: "Create Event",
        path: "/createEvent",
    },
];

export const events: IEvent[] = [
    {
        id: 1,
        title: "GitHub Universe 2025",
        bookedSpots: 12,
        bookedEmails: [],

        location: "San Francisco, CA",
        date: "28th October 2025",
        time: "9:30 AM – 5:00 PM",
        images: [
            "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format",
        ],
        desc: "GitHub's two-day developer event celebrating innovation, collaboration, and the boundless potential of AI-powered development.",
        overview:
            "GitHub Universe 2025 is back, bringing together developers, innovators, and industry leaders from around the world. This flagship event dives deep into the future of software, open source, and AI-driven development.",
        eventDetails: [
            { id: 1, value: "Date: 28th October 2025 – 29th October 2025" },
            { id: 2, value: "Time: 9:30 AM – 5:00 PM (PDT)" },
            {
                id: 3,
                value: "Venue: Yerba Buena Center for the Arts, San Francisco, CA",
            },
            { id: 4, value: "Mode: Hybrid (In-person + Online Streaming)" },
        ],
        agenda: [
            {
                id: 1,
                time: "09:30 AM – 10:30 AM",
                title: "Opening Keynote: The Future of AI & Open Source",
            },
            {
                id: 2,
                time: "10:45 AM – 12:00 PM",
                title: "Breakout Sessions (Security, DevOps, Cloud, AI)",
            },
            { id: 3, time: "12:00 PM – 01:00 PM", title: "Lunch & Networking" },
            {
                id: 4,
                time: "01:00 PM – 02:15 PM",
                title: "Panel Discussion: Scaling Open Source Communities",
            },
            {
                id: 5,
                time: "02:30 PM – 04:00 PM",
                title: "Expert Workshops & Demos",
            },
            {
                id: 6,
                time: "04:15 PM – 05:00 PM",
                title: "Closing Fireside Chat",
            },
        ],
        aboutOrganizer:
            "GitHub is the world's leading platform for developers to build, share, and maintain code. From open source to enterprise, GitHub empowers millions of developers and organizations to innovate faster.",
        tags: ["Frontend", "Backend", "AI", "Open Source"],
    },
    {
        id:2,
        title: "React Summit 2025",
        bookedSpots: 100,
        bookedEmails: [],

        location: "Amsterdam, Netherlands",
        date: "13th June 2025",
        time: "9:00 AM – 6:00 PM",
        images: [
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop&auto=format",
        ],
        desc: "The biggest React conference in the world, gathering top React developers and library authors for two days of learning.",
        overview:
            "React Summit brings together the global React community to share knowledge, best practices, and the latest innovations in the React ecosystem. Featuring world-class speakers and hands-on workshops.",
        eventDetails: [
            { id: 1, value: "Date: 13th June 2025 – 14th June 2025" },
            { id: 2, value: "Time: 9:00 AM – 6:00 PM (CEST)" },
            { id: 3, value: "Venue: TOBACCO Theater, Amsterdam" },
            { id: 4, value: "Mode: Hybrid (In-person + Online)" },
        ],
        agenda: [
            {
                id: 1,
                time: "09:00 AM – 10:00 AM",
                title: "Keynote: State of React 2025",
            },
            {
                id: 2,
                time: "10:15 AM – 11:30 AM",
                title: "React Server Components Deep Dive",
            },
            {
                id: 3,
                time: "11:45 AM – 01:00 PM",
                title: "Performance Optimization Masterclass",
            },
            {
                id: 4,
                time: "01:00 PM – 02:00 PM",
                title: "Lunch & Community Meetup",
            },
            {
                id: 5,
                time: "02:00 PM – 03:30 PM",
                title: "Workshop: Next.js 15 & App Router",
            },
            {
                id: 6,
                time: "03:45 PM – 05:00 PM",
                title: "Lightning Talks & Q&A",
            },
            {
                id: 7,
                time: "05:00 PM – 06:00 PM",
                title: "Closing Panel & Networking",
            },
        ],
        aboutOrganizer:
            "GitNation is the organizer behind React Summit, the world's largest React conference. They also run Vue.js Amsterdam, Node Congress, and many other developer events globally.",
        tags: ["React", "Frontend", "JavaScript", "Next.js"],
    },
    {
        id: 3,
        title: "Node.js Global Summit 2025",
        bookedSpots: 124,
        bookedEmails: [],

        location: "Berlin, Germany",
        date: "5th September 2025",
        time: "10:00 AM – 5:30 PM",
        images: [
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=600&fit=crop&auto=format",
        ],
        desc: "A global conference dedicated to Node.js, backend development, and the evolving server-side JavaScript ecosystem.",
        overview:
            "Node.js Global Summit unites backend engineers, architects, and open-source contributors. Dive into advanced Node.js patterns, microservices, performance tuning, and the future of server-side JavaScript.",
        eventDetails: [
            { id: 1, value: "Date: 5th September 2025" },
            { id: 2, value: "Time: 10:00 AM – 5:30 PM (CET)" },
            { id: 3, value: "Venue: Station Berlin, Berlin" },
            { id: 4, value: "Mode: In-person only" },
        ],
        agenda: [
            {
                id: 1,
                time: "10:00 AM – 11:00 AM",
                title: "Keynote: Node.js in 2025 – What's New?",
            },
            {
                id: 2,
                time: "11:15 AM – 12:30 PM",
                title: "Microservices with Node.js & Docker",
            },
            { id: 3, time: "12:30 PM – 01:30 PM", title: "Lunch Break" },
            {
                id: 4,
                time: "01:30 PM – 02:45 PM",
                title: "Building REST & GraphQL APIs at Scale",
            },
            {
                id: 5,
                time: "03:00 PM – 04:00 PM",
                title: "Workshop: Fastify vs Express Benchmarks",
            },
            {
                id: 6,
                time: "04:15 PM – 05:30 PM",
                title: "Closing Keynote & Community Awards",
            },
        ],
        aboutOrganizer:
            "OpenJS Foundation supports the Node.js project and hosts global events to grow the Node.js ecosystem. They are committed to fostering innovation in server-side JavaScript.",
        tags: ["Backend", "Node.js", "JavaScript", "Microservices"],
    },
    {
        id: 4,
        title: "AI & ML World Conference 2025",
        bookedSpots: 30,
        bookedEmails: [],

        location: "London, UK",
        date: "22nd October 2025",
        time: "8:30 AM – 6:00 PM",
        images: [
            "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&h=600&fit=crop&auto=format",
        ],
        desc: "Europe's premier AI and Machine Learning conference, connecting researchers, engineers, and business leaders shaping the future of intelligent systems.",
        overview:
            "AI & ML World Conference 2025 brings together over 5,000 AI practitioners, data scientists, and technology executives. With 100+ speakers across 6 stages, explore cutting-edge research, real-world AI deployments, and ethical AI frameworks.",
        eventDetails: [
            { id: 1, value: "Date: 22nd October 2025 – 23rd October 2025" },
            { id: 2, value: "Time: 8:30 AM – 6:00 PM (BST)" },
            { id: 3, value: "Venue: ExCeL London, Royal Docks" },
            { id: 4, value: "Mode: In-person + Live Stream" },
        ],
        agenda: [
            {
                id: 1,
                time: "08:30 AM – 09:30 AM",
                title: "Registration & Welcome Coffee",
            },
            {
                id: 2,
                time: "09:30 AM – 10:30 AM",
                title: "Keynote: Generative AI – Beyond the Hype",
            },
            {
                id: 3,
                time: "10:45 AM – 12:00 PM",
                title: "Track Sessions: LLMs, Computer Vision, MLOps",
            },
            { id: 4, time: "12:00 PM – 01:00 PM", title: "Networking Lunch" },
            {
                id: 5,
                time: "01:00 PM – 02:30 PM",
                title: "Workshop: Building Production-Ready AI Systems",
            },
            {
                id: 6,
                time: "02:45 PM – 04:00 PM",
                title: "Panel: Ethics & Regulation in AI",
            },
            {
                id: 7,
                time: "04:15 PM – 05:30 PM",
                title: "Startup Showcase & Demo Stage",
            },
            {
                id: 8,
                time: "05:30 PM – 06:00 PM",
                title: "Closing Remarks & Awards",
            },
        ],
        aboutOrganizer:
            "AI & ML World is organized by CloserStill Media, one of the UK's fastest-growing event companies. They specialize in technology conferences across Europe and North America.",
        tags: ["AI", "Machine Learning", "Data Science", "LLM"],
    },
    {
        id: 5,
        title: "DevOps Days Tashkent 2025",
        bookedSpots: 55,
        bookedEmails: [],

        location: "Tashkent, Uzbekistan",
        date: "15th November 2025",
        time: "9:00 AM – 5:00 PM",
        images: [
            "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop&auto=format",
        ],
        desc: "O'zbekistonning birinchi DevOps konferensiyasi — CI/CD, bulutli infratuzilma va DevSecOps mavzularida.",
        overview:
            "DevOps Days Tashkent 2025 mahalliy va xalqaro mutaxassislarni bir joyga to'playdi. Docker, Kubernetes, GitLab CI, va AWS bo'yicha amaliy workshoplar va sertifikatlar beriladi.",
        eventDetails: [
            { id: 1, value: "Sana: 15-noyabr 2025" },
            { id: 2, value: "Vaqt: 9:00 – 17:00 (UZT)" },
            { id: 3, value: "Manzil: IT Park, Toshkent" },
            { id: 4, value: "Format: Offline" },
        ],
        agenda: [
            {
                id: 1,
                time: "09:00 – 10:00",
                title: "Ro'yxatdan o'tish va ochilish",
            },
            {
                id: 2,
                time: "10:00 – 11:15",
                title: "Keynote: DevOps O'zbekistonda",
            },
            {
                id: 3,
                time: "11:30 – 12:45",
                title: "Workshop: Docker & Kubernetes asoslari",
            },
            { id: 4, time: "12:45 – 13:45", title: "Tushlik va networking" },
            {
                id: 5,
                time: "13:45 – 15:00",
                title: "CI/CD: GitLab va GitHub Actions",
            },
            { id: 6, time: "15:15 – 16:30", title: "AWS Cloud infratuzilmasi" },
            {
                id: 7,
                time: "16:30 – 17:00",
                title: "Yopilish va sertifikat topshirish",
            },
        ],
        aboutOrganizer:
            "IT Park O'zbekiston — mamlakatdagi texnologiya ekotizimini rivojlantiruvchi davlat tashkiloti. 2019-yildan buyon 1000+ IT kompaniyasiga uy bo'lib kelmoqda.",
        tags: ["DevOps", "Cloud", "Docker", "Kubernetes"],
    },
    {
        id: 6,
        title: "GraphQL Conf 2025",
        bookedSpots: 210,
        bookedEmails: [],

        location: "San Jose, CA",
        date: "10th September 2025",
        time: "9:00 AM – 5:30 PM",
        images: [
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&auto=format",
        ],
        desc: "The official GraphQL Foundation conference for developers building APIs with GraphQL.",
        overview:
            "GraphQL Conf 2025 is the premier gathering for the GraphQL community. Learn from creators, contributors, and adopters about schema design, federation, performance, and the future of the GraphQL specification.",
        eventDetails: [
            { id: 1, value: "Date: 10th September 2025 – 11th September 2025" },
            { id: 2, value: "Time: 9:00 AM – 5:30 PM (PDT)" },
            { id: 3, value: "Venue: San Jose Convention Center, CA" },
            { id: 4, value: "Mode: Hybrid" },
        ],
        agenda: [
            {
                id: 1,
                time: "09:00 AM – 10:00 AM",
                title: "Opening Keynote: GraphQL Spec Update 2025",
            },
            {
                id: 2,
                time: "10:15 AM – 11:30 AM",
                title: "Federation & Supergraph Architecture",
            },
            {
                id: 3,
                time: "11:45 AM – 01:00 PM",
                title: "Real-time GraphQL with Subscriptions",
            },
            { id: 4, time: "01:00 PM – 02:00 PM", title: "Lunch Break" },
            {
                id: 5,
                time: "02:00 PM – 03:15 PM",
                title: "Workshop: Schema Design Best Practices",
            },
            {
                id: 6,
                time: "03:30 PM – 04:30 PM",
                title: "GraphQL Security & Performance Tuning",
            },
            {
                id: 7,
                time: "04:30 PM – 05:30 PM",
                title: "Community Lightning Talks",
            },
        ],
        aboutOrganizer:
            "The GraphQL Foundation, hosted under the Linux Foundation, stewards the GraphQL specification and supports the global GraphQL community through events, education, and open governance.",
        tags: ["GraphQL", "API", "Backend", "Open Source"],
    },
];
