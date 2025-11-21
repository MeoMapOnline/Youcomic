export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface Chapter {
  id: string;
  storyId: string;
  number: number;
  title: string;
  content: string; // For demo, just text
  isLocked: boolean;
  price: number; // 0 if free
}

export interface Story {
  id: string;
  title: string;
  author: string;
  cover: string;
  genres: string[];
  description: string;
  views: number;
  likes: number;
  status: 'ongoing' | 'completed';
  chapters: number;
  chapterList?: Chapter[]; // Mock data inclusion
  comments?: Comment[];
}

export const GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life"
];

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    userId: 'u2',
    userName: 'Độc Giả 1',
    userAvatar: 'https://ui-avatars.com/api/?name=DG1&background=random',
    content: 'Truyện hay quá! Hóng chap mới.',
    createdAt: '2023-10-20T10:00:00Z'
  },
  {
    id: 'c2',
    userId: 'u3',
    userName: 'Fan Cứng',
    userAvatar: 'https://ui-avatars.com/api/?name=FC&background=random',
    content: 'Main bá đạo thực sự.',
    createdAt: '2023-10-21T15:30:00Z'
  }
];

const generateChapters = (storyId: string, count: number): Chapter[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${storyId}_ch${i + 1}`,
    storyId,
    number: i + 1,
    title: `Chương ${i + 1}: Khởi đầu mới`,
    content: `Đây là nội dung của chương ${i + 1}. \n\nTruyện diễn biến kịch tính... (Nội dung demo)`,
    isLocked: i > 5, // Lock from chapter 6 onwards
    price: i > 5 ? 5000 : 0
  }));
};

export const MOCK_STORIES: Story[] = [
  {
    id: "1",
    title: "The Beginning After The End",
    author: "TurtleMe",
    cover: "https://images.unsplash.com/photo-1612151855475-877969f4a6cc?w=400&q=80",
    genres: ["Action", "Adventure", "Fantasy"],
    description: "King Grey has unrivaled strength, wealth, and prestige in a world governed by martial ability. However, solitude lingers closely behind those with great power.",
    views: 12500,
    likes: 850,
    status: "ongoing",
    chapters: 175,
    chapterList: generateChapters("1", 20),
    comments: MOCK_COMMENTS
  },
  {
    id: "2",
    title: "Solo Leveling",
    author: "Chugong",
    cover: "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=400&q=80",
    genres: ["Action", "Fantasy"],
    description: "In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race from certain annihilation.",
    views: 54000,
    likes: 3200,
    status: "completed",
    chapters: 200,
    chapterList: generateChapters("2", 20),
    comments: MOCK_COMMENTS
  },
  {
    id: "3",
    title: "Omniscient Reader's Viewpoint",
    author: "Sing Shong",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80",
    genres: ["Adventure", "Fantasy", "Sci-Fi"],
    description: "Kim Dokja does not consider himself the protagonist of his own life. Befitting the name his parents gave him, he is a solitary person.",
    views: 28000,
    likes: 1500,
    status: "ongoing",
    chapters: 120,
    chapterList: generateChapters("3", 20),
    comments: MOCK_COMMENTS
  },
  {
    id: "4",
    title: "Tower of God",
    author: "SIU",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    genres: ["Action", "Adventure", "Fantasy"],
    description: "Reach the top, and everything will be yours. At the top of the tower exists everything in this world.",
    views: 45000,
    likes: 2100,
    status: "ongoing",
    chapters: 550,
    chapterList: generateChapters("4", 20),
    comments: MOCK_COMMENTS
  },
  {
    id: "5",
    title: "Lore Olympus",
    author: "Rachel Smythe",
    cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400&q=80",
    genres: ["Romance", "Drama", "Fantasy"],
    description: "Witness what the gods do…after dark. The friendships and the lies, the gossip and the wild parties.",
    views: 32000,
    likes: 4500,
    status: "ongoing",
    chapters: 230,
    chapterList: generateChapters("5", 20),
    comments: MOCK_COMMENTS
  }
];
