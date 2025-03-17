import type { BlogPost, User } from "./types"

// Mock users
const mockUsers: User[] = [
  {
    id: "user-1",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    username: "janesmith",
    role: "author",
    profile_pic: "/placeholder.svg?height=40&width=40",
    created_at: "2022-01-15T08:00:00Z",
    updated_at: "2022-01-15T08:00:00Z",
  },
  {
    id: "user-2",
    first_name: "David",
    last_name: "Chen",
    email: "david.chen@example.com",
    username: "davidchen",
    role: "author",
    profile_pic: "/placeholder.svg?height=40&width=40",
    created_at: "2022-02-10T10:30:00Z",
    updated_at: "2022-02-10T10:30:00Z",
  },
  {
    id: "user-3",
    first_name: "Michael",
    last_name: "Brown",
    email: "michael.brown@example.com",
    username: "michaelbrown",
    role: "author",
    profile_pic: "/placeholder.svg?height=40&width=40",
    created_at: "2022-03-05T09:15:00Z",
    updated_at: "2022-03-05T09:15:00Z",
  },
  {
    id: "user-4",
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.johnson@example.com",
    username: "sarahjohnson",
    role: "author",
    profile_pic: "/placeholder.svg?height=40&width=40",
    created_at: "2022-04-20T11:45:00Z",
    updated_at: "2022-04-20T11:45:00Z",
  },
  {
    id: "user-5",
    first_name: "Alex",
    last_name: "Johnson",
    email: "alex.johnson@example.com",
    username: "alexjohnson",
    role: "reader",
    profile_pic: "/placeholder.svg?height=40&width=40",
    created_at: "2022-05-16T14:23:00Z",
    updated_at: "2022-05-16T14:23:00Z",
  },
  {
    id: "user-6",
    first_name: "Maria",
    last_name: "Garcia",
    email: "maria.garcia@example.com",
    username: "mariagarcia",
    role: "reader",
    profile_pic: "/placeholder.svg?height=40&width=40",
    created_at: "2022-05-17T09:45:00Z",
    updated_at: "2022-05-17T09:45:00Z",
  },
]

// Create mock blog posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    user_id: "user-1",
    title: "Getting Started with Next.js: A Comprehensive Guide",
    subtitle: "The React Framework for Production",
    summary: "Learn how to build modern web applications with Next.js, the React framework for production.",
    category: "Web Development",
    featured_image: "/placeholder.svg?height=600&width=1200",
    main_content: `
      Next.js is a powerful React framework that enables you to build fast, SEO-friendly web applications with server-side rendering and static site generation capabilities.

      In this guide, we'll explore the key features of Next.js and how to get started with your first project. Next.js provides an excellent developer experience with features like fast refresh, file-system based routing, and built-in CSS support.

      One of the biggest advantages of Next.js is its flexibility in rendering methods. You can choose between Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), or Client-Side Rendering depending on your specific use case.

      To create a new Next.js project, you can use the create-next-app command, which sets up everything automatically for you. This includes a project structure with pages, components, and public directories.

      Next.js 13 introduced the App Router, a new paradigm for building Next.js applications with enhanced features like nested layouts, server components, and more intuitive data fetching patterns.

      As you continue your journey with Next.js, you'll discover its rich ecosystem of plugins and integrations that make it easier to build complex applications with features like authentication, content management, and more.
    `,
    created_at: "2023-09-15T08:00:00Z",
    updated_at: "2023-09-15T08:00:00Z",
    user: mockUsers[0],
    tags: [
      {
        id: "tag-1",
        blog_post_id: "post-1",
        name: "Web Development",
        created_at: "2023-09-15T08:00:00Z",
        updated_at: "2023-09-15T08:00:00Z",
      },
      {
        id: "tag-2",
        blog_post_id: "post-1",
        name: "React",
        created_at: "2023-09-15T08:00:00Z",
        updated_at: "2023-09-15T08:00:00Z",
      },
      {
        id: "tag-3",
        blog_post_id: "post-1",
        name: "Next.js",
        created_at: "2023-09-15T08:00:00Z",
        updated_at: "2023-09-15T08:00:00Z",
      },
    ],
    comments: [
      {
        id: "comment-1",
        user_id: "user-5",
        post_id: "post-1",
        content:
          "This was incredibly helpful! I've been trying to understand the differences between SSR and SSG for a while now.",
        created_at: "2023-09-16T14:23:00Z",
        updated_at: "2023-09-16T14:23:00Z",
        user: mockUsers[4],
      },
      {
        id: "comment-2",
        user_id: "user-6",
        post_id: "post-1",
        content:
          "Great introduction to Next.js! Would love to see a follow-up on more advanced topics like middleware and internationalization.",
        created_at: "2023-09-17T09:45:00Z",
        updated_at: "2023-09-17T09:45:00Z",
        user: mockUsers[5],
      },
    ],
  },
  {
    id: "post-2",
    user_id: "user-2",
    title: "Mastering Tailwind CSS: From Basics to Advanced Techniques",
    subtitle: "Building Beautiful UIs with Utility Classes",
    summary:
      "Discover how to leverage Tailwind CSS to build beautiful, responsive user interfaces with minimal effort.",
    category: "CSS",
    featured_image: "/placeholder.svg?height=600&width=1200",
    main_content: `
      Tailwind CSS has revolutionized the way developers approach styling in web applications. Unlike traditional CSS frameworks, Tailwind provides low-level utility classes that let you build completely custom designs without leaving your HTML.

      In this comprehensive guide, we'll explore everything from Tailwind basics to advanced techniques that will help you become more productive and create stunning user interfaces.

      We'll cover the utility-first workflow, responsive design, dark mode, customization, and performance optimization techniques like PurgeCSS to ensure your production builds are as small as possible.
    `,
    created_at: "2023-08-22T10:30:00Z",
    updated_at: "2023-08-22T10:30:00Z",
    user: mockUsers[1],
    tags: [
      {
        id: "tag-4",
        blog_post_id: "post-2",
        name: "CSS",
        created_at: "2023-08-22T10:30:00Z",
        updated_at: "2023-08-22T10:30:00Z",
      },
      {
        id: "tag-5",
        blog_post_id: "post-2",
        name: "Web Design",
        created_at: "2023-08-22T10:30:00Z",
        updated_at: "2023-08-22T10:30:00Z",
      },
      {
        id: "tag-6",
        blog_post_id: "post-2",
        name: "Tailwind",
        created_at: "2023-08-22T10:30:00Z",
        updated_at: "2023-08-22T10:30:00Z",
      },
    ],
    comments: [
      {
        id: "comment-3",
        user_id: "user-5",
        post_id: "post-2",
        content:
          "I've been using Bootstrap for years but this article convinced me to give Tailwind a try. The utility-first approach makes so much sense!",
        created_at: "2023-08-23T11:05:00Z",
        updated_at: "2023-08-23T11:05:00Z",
        user: mockUsers[4],
      },
    ],
  },
  {
    id: "post-3",
    user_id: "user-3",
    title: "TypeScript Best Practices for Large-Scale Applications",
    subtitle: "Building Maintainable Code with Static Types",
    summary: "Learn how to effectively use TypeScript to build maintainable, scalable applications with fewer bugs.",
    category: "TypeScript",
    featured_image: "/placeholder.svg?height=600&width=1200",
    main_content: `
      TypeScript has become the language of choice for many developers building large-scale applications. Its static typing system helps catch errors during development rather than at runtime, leading to more robust code.

      In this article, we'll explore best practices for using TypeScript in large projects, including type organization, effective use of generics, and strategies for gradually adopting TypeScript in existing JavaScript codebases.

      We'll also discuss advanced TypeScript features like conditional types, mapped types, and the TypeScript compiler API that can help you build more sophisticated type systems for your applications.
    `,
    created_at: "2023-07-10T09:15:00Z",
    updated_at: "2023-07-10T09:15:00Z",
    user: mockUsers[2],
    tags: [
      {
        id: "tag-7",
        blog_post_id: "post-3",
        name: "TypeScript",
        created_at: "2023-07-10T09:15:00Z",
        updated_at: "2023-07-10T09:15:00Z",
      },
      {
        id: "tag-8",
        blog_post_id: "post-3",
        name: "JavaScript",
        created_at: "2023-07-10T09:15:00Z",
        updated_at: "2023-07-10T09:15:00Z",
      },
      {
        id: "tag-9",
        blog_post_id: "post-3",
        name: "Programming",
        created_at: "2023-07-10T09:15:00Z",
        updated_at: "2023-07-10T09:15:00Z",
      },
    ],
    comments: [
      {
        id: "comment-4",
        user_id: "user-6",
        post_id: "post-3",
        content:
          "This article helped me convince my team to adopt TypeScript. The section on gradual migration was particularly useful!",
        created_at: "2023-07-11T14:20:00Z",
        updated_at: "2023-07-11T14:20:00Z",
        user: mockUsers[5],
      },
    ],
  },
  {
    id: "post-4",
    user_id: "user-4",
    title: "Understanding React Server Components",
    subtitle: "The Future of React Performance",
    summary:
      "Explore the future of React with Server Components and learn how they can improve your application's performance.",
    category: "React",
    featured_image: "/placeholder.svg?height=600&width=1200",
    main_content: `
      React Server Components represent a paradigm shift in how we build React applications. They allow components to run on the server, reducing the JavaScript bundle size and improving performance for end users.

      In this deep dive, we'll explore how Server Components work, their benefits and limitations, and how they integrate with existing React applications. We'll also look at practical examples using Next.js 13's App Router, which has built-in support for React Server Components.

      By the end of this article, you'll understand when to use Server Components versus Client Components, and how to structure your application to get the most benefit from this new React feature.
    `,
    created_at: "2023-06-05T11:45:00Z",
    updated_at: "2023-06-05T11:45:00Z",
    user: mockUsers[3],
    tags: [
      {
        id: "tag-10",
        blog_post_id: "post-4",
        name: "React",
        created_at: "2023-06-05T11:45:00Z",
        updated_at: "2023-06-05T11:45:00Z",
      },
      {
        id: "tag-11",
        blog_post_id: "post-4",
        name: "Performance",
        created_at: "2023-06-05T11:45:00Z",
        updated_at: "2023-06-05T11:45:00Z",
      },
      {
        id: "tag-12",
        blog_post_id: "post-4",
        name: "Server Components",
        created_at: "2023-06-05T11:45:00Z",
        updated_at: "2023-06-05T11:45:00Z",
      },
    ],
    comments: [
      {
        id: "comment-5",
        user_id: "user-5",
        post_id: "post-4",
        content:
          "This is the clearest explanation of Server Components I've read so far. The comparison with SSR really helped me understand the difference.",
        created_at: "2023-06-06T09:30:00Z",
        updated_at: "2023-06-06T09:30:00Z",
        user: mockUsers[4],
      },
    ],
  },
  {
    id: "post-5",
    user_id: "user-1",
    title: "RESTful API Design Principles for Modern Applications",
    subtitle: "Building Intuitive and Efficient APIs",
    summary: "Learn how to design clean, intuitive, and efficient APIs that developers will love to use.",
    category: "API",
    featured_image: "/placeholder.svg?height=600&width=1200",
    main_content: `
      Well-designed APIs are crucial for building modern applications. They serve as the contract between different parts of your system and can significantly impact developer experience and productivity.

      In this comprehensive guide, we'll explore RESTful API design principles, best practices for naming conventions, error handling, versioning, and authentication. We'll also discuss when to use alternatives like GraphQL or gRPC.

      By following these principles, you'll be able to create APIs that are not only functional but also intuitive, consistent, and a pleasure to work with for other developers.
    `,
    created_at: "2023-05-18T13:20:00Z",
    updated_at: "2023-05-18T13:20:00Z",
    user: mockUsers[0],
    tags: [
      {
        id: "tag-13",
        blog_post_id: "post-5",
        name: "API",
        created_at: "2023-05-18T13:20:00Z",
        updated_at: "2023-05-18T13:20:00Z",
      },
      {
        id: "tag-14",
        blog_post_id: "post-5",
        name: "Backend",
        created_at: "2023-05-18T13:20:00Z",
        updated_at: "2023-05-18T13:20:00Z",
      },
      {
        id: "tag-15",
        blog_post_id: "post-5",
        name: "REST",
        created_at: "2023-05-18T13:20:00Z",
        updated_at: "2023-05-18T13:20:00Z",
      },
    ],
    comments: [
      {
        id: "comment-6",
        user_id: "user-6",
        post_id: "post-5",
        content:
          "This article came at the perfect time as we're redesigning our API. The section on versioning strategies was particularly helpful!",
        created_at: "2023-05-19T10:05:00Z",
        updated_at: "2023-05-19T10:05:00Z",
        user: mockUsers[5],
      },
    ],
  },
  {
    id: "post-6",
    user_id: "user-2",
    title: "State Management in 2023: Beyond Redux",
    subtitle: "Modern Approaches to React State",
    summary: "Explore modern approaches to state management in React applications and when to use each one.",
    category: "React",
    featured_image: "/placeholder.svg?height=600&width=1200",
    main_content: `
      State management has evolved significantly in the React ecosystem. While Redux dominated for years, newer solutions like React Query, Zustand, Jotai, and React's built-in Context API with hooks have changed how we approach state in our applications.

      In this article, we'll compare different state management solutions available in 2023, discussing their strengths, weaknesses, and ideal use cases. We'll also explore patterns for organizing your state logic regardless of which library you choose.

      By the end, you'll have a clear understanding of the state management landscape and be able to make informed decisions about which solution is right for your next project.
    `,
    created_at: "2023-04-12T09:30:00Z",
    updated_at: "2023-04-12T09:30:00Z",
    user: mockUsers[1],
    tags: [
      {
        id: "tag-16",
        blog_post_id: "post-6",
        name: "React",
        created_at: "2023-04-12T09:30:00Z",
        updated_at: "2023-04-12T09:30:00Z",
      },
      {
        id: "tag-17",
        blog_post_id: "post-6",
        name: "State Management",
        created_at: "2023-04-12T09:30:00Z",
        updated_at: "2023-04-12T09:30:00Z",
      },
      {
        id: "tag-18",
        blog_post_id: "post-6",
        name: "Redux",
        created_at: "2023-04-12T09:30:00Z",
        updated_at: "2023-04-12T09:30:00Z",
      },
    ],
    comments: [
      {
        id: "comment-7",
        user_id: "user-5",
        post_id: "post-6",
        content: "Great overview! I've been using Zustand lately and loving its simplicity compared to Redux.",
        created_at: "2023-04-13T11:20:00Z",
        updated_at: "2023-04-13T11:20:00Z",
        user: mockUsers[4],
      },
    ],
  },
  {
    id: "post-7",
    user_id: "user-3",
    title: "Complete Guide to Web Accessibility in 2023",
    subtitle: "Building Inclusive Web Experiences",
    summary: "Learn how to make your websites accessible to everyone, including people with disabilities.",
    category: "Accessibility",
    featured_image: "/placeholder.svg?height=600&width=1200",
    main_content: `
      Web accessibility is about making websites usable for everyone, including people with disabilities. It's not just a nice-to-have feature—it's a legal requirement in many countries and the right thing to do.

      In this comprehensive guide, we'll cover everything from basic accessibility principles to advanced techniques for creating inclusive web experiences. We'll discuss semantic HTML, ARIA attributes, keyboard navigation, and more.

      We'll also explore tools and testing methodologies to ensure your websites meet accessibility standards like WCAG 2.1. By the end of this article, you'll have a solid understanding of how to build accessible websites from the ground up.
    `,
    created_at: "2023-03-20T14:30:00Z",
    updated_at: "2023-03-20T14:30:00Z",
    user: mockUsers[2],
    tags: [
      {
        id: "tag-19",
        blog_post_id: "post-7",
        name: "Accessibility",
        created_at: "2023-03-20T14:30:00Z",
        updated_at: "2023-03-20T14:30:00Z",
      },
      {
        id: "tag-20",
        blog_post_id: "post-7",
        name: "Web Development",
        created_at: "2023-03-20T14:30:00Z",
        updated_at: "2023-03-20T14:30:00Z",
      },
      {
        id: "tag-21",
        blog_post_id: "post-7",
        name: "WCAG",
        created_at: "2023-03-20T14:30:00Z",
        updated_at: "2023-03-20T14:30:00Z",
      },
    ],
    comments: [
      {
        id: "comment-8",
        user_id: "user-6",
        post_id: "post-7",
        content:
          "This is such an important topic that doesn't get enough attention. Thanks for the comprehensive guide!",
        created_at: "2023-03-21T09:15:00Z",
        updated_at: "2023-03-21T09:15:00Z",
        user: mockUsers[5],
      },
    ],
  },
  {
    id: "post-8",
    user_id: "user-4",
    title: "Microservices Architecture: Patterns and Best Practices",
    subtitle: "Designing Distributed Systems",
    summary: "Explore the world of microservices and learn how to design, implement, and maintain distributed systems.",
    category: "Architecture",
    featured_image: "/placeholder.svg?height=600&width=1200",
    main_content: `
      Microservices architecture has become the standard approach for building large, complex applications that need to scale. By breaking down monolithic applications into smaller, independent services, teams can develop, deploy, and scale their systems more effectively.

      In this in-depth guide, we'll explore microservices patterns, communication strategies, data management approaches, and deployment techniques. We'll also discuss the challenges of distributed systems and how to overcome them.

      Whether you're considering migrating from a monolith to microservices or starting a new project, this article will provide you with the knowledge you need to make informed architectural decisions.
    `,
    created_at: "2023-02-15T10:45:00Z",
    updated_at: "2023-02-15T10:45:00Z",
    user: mockUsers[3],
    tags: [
      {
        id: "tag-22",
        blog_post_id: "post-8",
        name: "Architecture",
        created_at: "2023-02-15T10:45:00Z",
        updated_at: "2023-02-15T10:45:00Z",
      },
      {
        id: "tag-23",
        blog_post_id: "post-8",
        name: "Microservices",
        created_at: "2023-02-15T10:45:00Z",
        updated_at: "2023-02-15T10:45:00Z",
      },
      {
        id: "tag-24",
        blog_post_id: "post-8",
        name: "Backend",
        created_at: "2023-02-15T10:45:00Z",
        updated_at: "2023-02-15T10:45:00Z",
      },
    ],
    comments: [
      {
        id: "comment-9",
        user_id: "user-5",
        post_id: "post-8",
        content:
          "We're in the process of breaking up our monolith and this article couldn't have come at a better time. The section on service boundaries was particularly helpful.",
        created_at: "2023-02-16T13:20:00Z",
        updated_at: "2023-02-16T13:20:00Z",
        user: mockUsers[4],
      },
    ],
  },
  {
    id: "post-9",
    user_id: "user-1",
    title: "Machine Learning for Web Developers: A Practical Introduction",
    subtitle: "Adding AI Capabilities to Your Web Apps",
    summary:
      "Discover how to integrate machine learning capabilities into your web applications without a PhD in data science.",
    category: "Machine Learning",
    featured_image: "/placeholder.svg?height=600&width=1200",
    main_content: `
      Machine learning is no longer just for data scientists and researchers. With modern tools and libraries, web developers can now integrate powerful ML capabilities into their applications with relatively little effort.

      In this practical guide, we'll explore how to use TensorFlow.js, ML5.js, and other browser-based ML libraries to add features like image recognition, natural language processing, and recommendation systems to your web applications.

      We'll walk through real-world examples with code samples, showing you how to train models, make predictions, and deploy ML-powered features in production. By the end of this article, you'll have the knowledge to start experimenting with ML in your own projects.
    `,
    created_at: "2023-01-25T09:15:00Z",
    updated_at: "2023-01-25T09:15:00Z",
    user: mockUsers[0],
    tags: [
      {
        id: "tag-25",
        blog_post_id: "post-9",
        name: "Machine Learning",
        created_at: "2023-01-25T09:15:00Z",
        updated_at: "2023-01-25T09:15:00Z",
      },
      {
        id: "tag-26",
        blog_post_id: "post-9",
        name: "JavaScript",
        created_at: "2023-01-25T09:15:00Z",
        updated_at: "2023-01-25T09:15:00Z",
      },
      {
        id: "tag-27",
        blog_post_id: "post-9",
        name: "AI",
        created_at: "2023-01-25T09:15:00Z",
        updated_at: "2023-01-25T09:15:00Z",
      },
    ],
    comments: [
      {
        id: "comment-10",
        user_id: "user-6",
        post_id: "post-9",
        content:
          "I've always thought ML was out of reach for me as a frontend developer. This article changed my perspective completely!",
        created_at: "2023-01-26T14:30:00Z",
        updated_at: "2023-01-26T14:30:00Z",
        user: mockUsers[5],
      },
    ],
  },
  {
    id: "post-10",
    user_id: "user-2",
    title: "CSS Grid Mastery: Building Complex Layouts with Ease",
    subtitle: "Modern Layout Techniques",
    summary:
      "Learn how to harness the full power of CSS Grid to create responsive, complex layouts without the headaches.",
    category: "CSS",
    featured_image: "/placeholder.svg?height=600&width=1200",
    main_content: `
      CSS Grid has revolutionized web layout, making it possible to create complex, responsive designs with clean, semantic HTML and minimal CSS. Yet many developers still aren't using Grid to its full potential.

      In this comprehensive guide, we'll explore advanced CSS Grid techniques, from basic grid definitions to complex, asymmetrical layouts. We'll cover grid template areas, auto-placement algorithms, and responsive grid strategies without media queries.

      Through practical examples and interactive demos, you'll learn how to solve real-world layout challenges using CSS Grid. By the end of this article, you'll have the confidence to implement even the most complex designs with clean, maintainable code.
    `,
    created_at: "2022-12-10T11:30:00Z",
    updated_at: "2022-12-10T11:30:00Z",
    user: mockUsers[1],
    tags: [
      {
        id: "tag-28",
        blog_post_id: "post-10",
        name: "CSS",
        created_at: "2022-12-10T11:30:00Z",
        updated_at: "2022-12-10T11:30:00Z",
      },
      {
        id: "tag-29",
        blog_post_id: "post-10",
        name: "Web Design",
        created_at: "2022-12-10T11:30:00Z",
        updated_at: "2022-12-10T11:30:00Z",
      },
      {
        id: "tag-30",
        blog_post_id: "post-10",
        name: "CSS Grid",
        created_at: "2022-12-10T11:30:00Z",
        updated_at: "2022-12-10T11:30:00Z",
      },
    ],
    comments: [
      {
        id: "comment-11",
        user_id: "user-5",
        post_id: "post-10",
        content:
          "This is the best explanation of CSS Grid I've ever read. The visual examples really helped me understand how it works.",
        created_at: "2022-12-11T09:45:00Z",
        updated_at: "2022-12-11T09:45:00Z",
        user: mockUsers[4],
      },
    ],
  },
]

// Helper function to get all unique categories from posts
export function getAllCategories(): string[] {
  const categories = mockBlogPosts.map((post) => post.category)
  return Array.from(new Set(categories)).sort()
}

// Helper function to get all unique tags from posts
export function getAllTags(): string[] {
  const tags = mockBlogPosts.flatMap((post) => post.tags.map((tag) => tag.name))
  return Array.from(new Set(tags)).sort()
}

// Helper function to get a post by ID
export function getPostById(id: string): BlogPost | undefined {
  return mockBlogPosts.find((post) => post.id === id)
}

// Helper function to get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return mockBlogPosts.filter((post) => post.category === category)
}

// Helper function to get posts by tag
export function getPostsByTag(tagName: string): BlogPost[] {
  return mockBlogPosts.filter((post) => post.tags.some((tag) => tag.name === tagName))
}

// Helper function to search posts
export function searchPosts(query: string): BlogPost[] {
  const searchLower = query.toLowerCase()
  return mockBlogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchLower) ||
      post.subtitle.toLowerCase().includes(searchLower) ||
      post.summary.toLowerCase().includes(searchLower) ||
      post.main_content.toLowerCase().includes(searchLower),
  )
}

