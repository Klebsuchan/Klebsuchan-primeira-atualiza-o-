import { Instagram, LogOut, AlertCircle, Menu, ArrowLeft, Facebook, Twitter, Share2, Search, Sun, Moon, ShoppingBag, Youtube } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { fetchPosts, Post } from './services/api';
import PostComments from './components/PostComments';
import SearchModal from './components/SearchModal';
import Store from './components/Store';
import { supabase } from './supabase';
import { ShareModal } from './components/ShareModal';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inicio');
  const [posts, setPosts] = useState<Post[]>([]);
  const [cachedPosts, setCachedPosts] = useState<Record<string, Post[]>>({});
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<{title: string, categoryIds: number[]} | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [postToShare, setPostToShare] = useState<Post | null>(null);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post');
    if (postId) {
      // Find the post and open it
      setActiveTab('posts');
      // Set to loading or just wait for the other useEffect to load posts, but since posts are loaded dynamically, let's fetch it specifically
      fetchPosts().then(allPosts => {
        const found = allPosts.find(p => p.id.toString() === postId);
        if (found) {
          setSelectedPost(found);
        }
      }).catch(console.error);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.add('light');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.remove('light');
    }
  }, []);

  useEffect(() => {
    if (selectedPost) {
      window.history.pushState({}, '', `${window.location.pathname}?post=${selectedPost.id}`);
      document.title = `Klebsuchan | ${selectedPost.title.rendered.replace(/<[^>]+>/g, '')}`;
    } else {
      window.history.pushState({}, '', window.location.pathname);
      document.title = "Klebsuchan | Hub de Cultura Otaku, Nerd e Geek";
    }
  }, [selectedPost]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookieConsent(false);
  };

  useEffect(() => {
    if (activeTab === 'posts') {
      const isGeneral = !selectedCategoryGroup || selectedCategoryGroup.categoryIds.length === 0;
      const cacheKey = isGeneral ? 'all_posts' : selectedCategoryGroup.categoryIds.join(',');
      
      if (cachedPosts[cacheKey]) {
        setPosts(cachedPosts[cacheKey]);
        setLoadingPosts(false);
        return;
      }

      setLoadingPosts(true);
      fetchPosts(isGeneral ? undefined : selectedCategoryGroup.categoryIds)
        .then(data => {
          setPosts(data);
          setCachedPosts(prev => ({ ...prev, [cacheKey]: data }));
        })
        .catch(err => console.error(err))
        .finally(() => setLoadingPosts(false));
    }
  }, [activeTab, selectedCategoryGroup, cachedPosts]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setAuthError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Erro ao fazer login com o Google:", error);
      if (error.code === 'auth/popup-blocked') {
        setAuthError("O pop-up de login foi bloqueado pelo navegador. Por favor, permita pop-ups para este site ou abra o aplicativo em uma nova guia clicando no ícone no canto superior direito.");
      } else {
        setAuthError("Ocorreu um erro ao tentar fazer login.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const categoryGroups = [
    {
      title: 'Animes & Mangás',
      categoryIds: [101],
      bgImage: 'url("https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/BANNER_SITE_ANIMES_2025.webp")',
      bgSize: 'cover'
    },
    {
      title: 'Games & eSports',
      categoryIds: [103],
      bgImage: 'url("https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/games-esports.jpg")',
      bgSize: 'cover'
    },
    {
      title: 'Cultura Pop & Filmes',
      categoryIds: [105],
      bgImage: 'url("https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/cultura-pop-e-filmes.jpg?v=4")',
      bgSize: 'cover'
    },
    {
      title: 'Tecnologia & Gadgets',
      categoryIds: [107],
      bgImage: 'url("https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_ia.png?v=3")',
      bgSize: 'cover'
    }
  ];

  const handleCategoryClick = (group: {title: string, categoryIds: number[]}) => {
    setSelectedCategoryGroup(group);
    setSelectedPost(null);
    setActiveTab('posts');
  };

  const handleCategoryHover = (group: {title: string, categoryIds: number[]}) => {
    const cacheKey = group.categoryIds.join(',');
    if (!cachedPosts[cacheKey]) {
      fetchPosts(group.categoryIds).then(data => {
        setCachedPosts(prev => ({ ...prev, [cacheKey]: data }));
      }).catch(() => {}); // Ignore errors on prefetch
    }
  };

  const animeImages = [
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573270628.webp",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573271893.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573272900.webp",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573274391.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573275387.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573275920.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573276503.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573277135.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573279074.webp",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573280472.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573281014.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573281646.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573282233.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573282629.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573283580.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573284563.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573284856.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573285242.webp",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573286670.png",
    "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/regenerated_image_1777573287173.png"
  ];

  const gamesImages: Record<number, string> = {
    1020: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/mario.jpg?v=1", // Super Mario Bros
    1021: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/ZELDA.jpg", // The Legend of Zelda
    1022: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/minecraft.jpg?v=1", // Minecraft
    1023: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/GTA5.avif", // Grand Theft Auto V
    1024: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/lol.jpg?v=1", // League of Legends
    1025: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/csgo.webp?v=1", // Counter-Strike (Fallback)
    1026: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/dota2.jpg?v=1", // Dota 2
    1027: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/WARCRAFT.webp", // World of Warcraft
    1028: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/the-witcher.avif?v=1", // The Witcher 3
    1029: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/red-dead-redemption.jpg?v=1", // Red Dead Redemption 2
    1030: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/residentevil4.webp", // Resident Evil 4
    1031: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/FINAL%20FANTASY.webp", // Final Fantasy VII
    1032: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/streetfighter2.jpg", // Street Fighter II
    1033: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/MORTAL%20KOMBAT.jpg", // Mortal Kombat
    1034: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/TETRIS.jpg", // Tetris
    1035: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/pacman.png", // Pac-Man
    1036: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/VALORANT.webp", // Valorant
    1037: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/overwatch.avif", // Overwatch
    1038: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/ELDEN%20RING.jpg", // Elden Ring
    1039: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/CYBERPUNK.jpg", // Cyberpunk 2077
  };

  const popImages: Record<number, string> = {
    1040: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/marvel.jpeg?v=2",
    1041: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/star-wars.webp?v=2",
    1042: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/harry-potter.jpg?v=2",
    1043: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/senhor-dos-aneis.jpg?v=2",
    1044: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/game-of-thrones.jpeg?v=2",
    1045: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/stranger-things.jpg?v=2",
    1046: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/walking-dead.webp?v=2",
    1047: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/breaking-bad.png?v=2",
    1048: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/friends.jpg?v=2",
    1049: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/the-office.jpg?v=2",
    1050: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/matrix.jpg?v=2",
    1051: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/de-volta-para-o-futuro.jpg?v=2",
    1052: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/jurasic-park.webp?v=2",
    1053: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/batman.jpg?v=2",
    1054: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/avatar.jpg?v=2",
    1055: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/vingadores-ultimato.webp?v=2",
    1056: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/indiana.webp?v=2",
    1057: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/kpop.png?v=2"
  };

  const techImages: Record<number, string> = {
    1060: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_ia.png?v=3",
    1061: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_computacao-quantica.webp?v=3",
    1062: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_realidade-virtual.jpg?v=3",
    1063: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_realidade-aumentada.webp?v=3",
    1064: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_blockchain.webp?v=3",
    1065: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_bitcoin.jpg?v=3",
    1066: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_internet-das-coisas.jpg?v=3",
    1067: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_5g.webp?v=3",
    1068: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_carro-autonomo.jpg?v=3",
    1069: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_impressao-3d.png?v=3",
    1070: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_bateria-de-ion.webp?v=3",
    1071: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_microprocessador.jpg?v=4",
    1072: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_sistema-operativo.jpg?v=3",
    1073: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_computacao-em-nuvem.png?v=3",
    1074: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_seguranca-da-informacao.png?v=3",
    1075: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_aprendizado-de-maquina.jpg?v=3",
    1076: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_deep-learning.avif?v=3",
    1077: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_fibra-optica.webp?v=3",
    1078: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_smartphone.jpg?v=3",
    1079: "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tech_robotica.jpg?v=3"
  };

  const defaultImages = [];

  const getPostImage = (post: Post) => {
    if (post.imageUrl) return post.imageUrl;

    if (post.id === 0) {
        return "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/naruto.avif?v=1";
    }
    if (post.id === 2) {
        return "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/one-piece.jpg?v=1";
    }
    if (post.id === 8) {
        return "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/kimetsu-no-yaba.png?v=1";
    }
    // Exception for Tokyo Ghoul post
    if (post.id === 17) {
        return "https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/tokyo-ghoul.jpg?v=1";
    }

    // Check if post is in Anime category (101)
    if (post.categories?.includes(101)) {
        const imageIndex = (post.id) % animeImages.length;
        return animeImages[imageIndex];
    }
    
    // Check if post is in Games category (103)
    if (post.categories?.includes(103) && gamesImages[post.id]) {
        return gamesImages[post.id];
    }

    // Check if post is in Pop Culture category (105)
    if (post.categories?.includes(105) && popImages[post.id]) {
        return popImages[post.id];
    }

    // Check if post is in Tech category (107)
    if (post.categories?.includes(107) && techImages[post.id]) {
        return techImages[post.id];
    }

    if (post.yoast_head_json?.og_image?.[0]?.url) {
      return post.yoast_head_json.og_image[0].url;
    }
    
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }

    // Default fallback images
    let prompt = `Highly detailed aesthetic photograph of ${post.title.rendered.replace(/[^a-zA-Z0-9 ]/g, "").substring(0, 50)}, hyper-realistic, 8k resolution, cinematic lighting`;
    const seed = post.id || Math.floor(Math.random() * 1000);
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&nologo=true&seed=${seed}`;
  };

  // Fetch initial generic posts for homepage news portal if activeTab is 'inicio'
  const [homePosts, setHomePosts] = useState<Post[]>([]);
  useEffect(() => {
    if (activeTab === 'inicio') {
      fetchPosts().then(data => setHomePosts(data.slice(0, 12))).catch(console.error);
    }
  }, [activeTab]);

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlideDetails = [
    { img: '/images/bluelock.webp', title: 'Egoístas, Comemorem! Blue Lock Confirma 3ª Temporada com Visual Insano!' },
    { img: '/images/veronica.jpg', title: 'A Justiça Foi Feita! Resident Evil Veronica é Oficial para 2027!' },
    { img: '/images/spidernoir.jpg', title: 'Nicolas Cage quebra o silêncio sobre a 2ª temporada de Spider-Noir' },
    { img: '/images/mandaloriano.webp', title: 'O Mandaloriano e Grogu nos cinemas com Hideo Kojima!' },
    { img: '/images/myheroacademia.webp', title: 'My Hero Academia consagrado o Anime do Ano no Awards' },
    { img: '/images/theboyshq.jpg', title: 'O final chocante de The Boys nos quadrinhos detalhado' },
    { img: '/images/theboys.webp', title: 'O que esperar do encerramento insano da série The Boys' },
    { img: '/images/animes2026.jpg', title: 'Guia definitivo de lançamentos imperdíveis de animes em 2026' }
  ];

  useEffect(() => {
    if (activeTab === 'inicio') {
      const timer = setInterval(() => {
        setCurrentHeroSlide((prev) => (prev + 1) % heroSlideDetails.length);
      }, 4500);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

  const handleHeroSlideClick = (imgUrl: string) => {
    const searchName = imgUrl.toLowerCase().split('/').pop()?.split('.')[0] || '';
    
    // Find matching post in loaded homePosts
    let matchingPost = homePosts.find(p => {
      const pImg = p.imageUrl?.toLowerCase() || '';
      return pImg.includes(searchName);
    });

    if (!matchingPost && posts.length > 0) {
      matchingPost = posts.find(p => {
        const pImg = p.imageUrl?.toLowerCase() || '';
        return pImg.includes(searchName);
      });
    }

    if (matchingPost) {
      setSelectedPost(matchingPost);
      setActiveTab('posts');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fetch fallback directly
      fetchPosts().then(allPosts => {
        const found = allPosts.find(p => {
          const pImg = p.imageUrl?.toLowerCase() || '';
          return pImg.includes(searchName);
        });
        if (found) {
          setSelectedPost(found);
          setActiveTab('posts');
        } else {
          setActiveTab('posts');
          setSelectedCategoryGroup({title: "Últimos Artigos", categoryIds: []});
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }).catch(() => {
        setActiveTab('posts');
        setSelectedCategoryGroup({title: "Últimos Artigos", categoryIds: []});
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao inscrever-se');
      }

      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (err: any) {
      console.error("Newsletter Subscribe Error:", err);
      setNewsletterStatus('error');
      alert(`Erro ao cadastrar: ${err.message}`);
    }
    setTimeout(() => setNewsletterStatus('idle'), 5000);
  };

  const generateKeywords = (post?: Post | null) => {
    let baseKeywords = "Klebsuchan, blog nerd, cultura pop, geek, tecnologia, animes, doramas, games, jogos, reviews, filmes";
    if (!post) return baseKeywords;
    const title = post.title.rendered.toLowerCase();
    
    if (title.includes('the boys')) {
      baseKeywords += ", Final The Boys, review final the boys, The Boys temporada 5, Capitão Pátria morreu, final em quadrinhos The Boys, HQ vs Série";
    }
    if (title.includes('mandaloriano') || title.includes('star wars') || title.includes('grogu') || title.includes('kojima')) {
      baseKeywords += ", o mandaloriano e grogu, filme do mandaloriano, hideo kojima review mandaloriano, star wars 2026, baby yoda, jon favreau";
    }
    if (title.includes('anime') || title.includes('2026') || title.includes('crunchyroll') || title.includes('my hero academia') || title.includes('charles emmanuel')) {
      baseKeywords += ", animes de 2026, melhores animes do ano, lançamentos animes 2026, crunchyroll anime awards 2026, my hero academia anime do ano, charles emmanuel akaza dublagem, solo leveling, deamon slayer castelo infinito, gachiakuta";
    }
    if (title.includes('rock')) {
       baseKeywords += ", bandas de rock desconhecidas, recomendação musical";
    }
    if (title.includes('mortal kombat')) {
       baseKeywords += ", mortal kombat 2 filme, elenco mortal kombat, vazamento mortal kombat";
    }

    const titleWords = title.replace(/<[^>]+>/g, '').replace(/[^\w\s]/g, '').split(' ').filter(w => w.length > 3).join(', ');
    return `${titleWords}, ${baseKeywords}`;
  };

  const getStructuredData = (post: Post) => {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title.rendered.replace(/<[^>]+>/g, ''),
      "description": post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]+>/g, '') : '',
      "image": getPostImage(post) ? [window.location.origin + getPostImage(post)] : [],
      "datePublished": post.date,
      "dateModified": post.date,
      "author": [{
          "@type": "Person",
          "name": "Kleber"
      }]
    };
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-bg text-accent font-sans relative">
      <Helmet>
        <title>{selectedPost ? `${selectedPost.title.rendered.replace(/<[^>]+>/g, '')} | Klebsuchan` : activeTab === 'quem-somos' ? 'Quem Somos | Klebsuchan' : 'Klebsuchan | Blog de Cultura Otaku, Nerd, Geek e Animes'}</title>
        <meta name="description" content={selectedPost ? selectedPost.excerpt?.rendered.replace(/<[^>]+>/g, '') : "Klebsuchan: O maior hub e blog de cultura nerd, otaku, geek, animes, games e tecnologia. Fique por dentro de todas as novidades."} />
        <meta name="keywords" content={generateKeywords(selectedPost)} />
        <link rel="canonical" href={selectedPost ? `https://klebsuchan.com.br/?post=${selectedPost.id}` : `https://klebsuchan.com.br/`} />
        {selectedPost && (
          <meta property="og:title" content={selectedPost.title.rendered.replace(/<[^>]+>/g, '')} />
        )}
        {selectedPost && selectedPost.excerpt && (
          <meta property="og:description" content={selectedPost.excerpt.rendered.replace(/<[^>]+>/g, '')} />
        )}
        {selectedPost && getPostImage(selectedPost) && (
          <meta property="og:image" content={getPostImage(selectedPost)} />
        )}
        <meta property="og:type" content={selectedPost ? "article" : "website"} />
        <meta property="og:url" content={selectedPost ? `https://klebsuchan.com.br/?post=${selectedPost.id}` : `https://klebsuchan.com.br/`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={selectedPost ? selectedPost.title.rendered.replace(/<[^>]+>/g, '') : 'Klebsuchan | Hub de Cultura Otaku, Nerd e Geek'} />
        <meta name="twitter:description" content={selectedPost ? selectedPost.excerpt?.rendered.replace(/<[^>]+>/g, '') : 'Klebsuchan: O maior hub e blog de cultura nerd, otaku, geek e animes.'} />
        {selectedPost && getPostImage(selectedPost) && (
          <meta name="twitter:image" content={getPostImage(selectedPost)} />
        )}
        {selectedPost && (
          <script type="application/ld+json">
            {JSON.stringify(getStructuredData(selectedPost))}
          </script>
        )}
      </Helmet>

      {authError && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-red-900/90 text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 max-w-md w-[90%] border border-red-700">
          <AlertCircle className="shrink-0" size={20} />
          <p className="text-sm">{authError}</p>
          <button onClick={() => setAuthError(null)} className="ml-auto text-white/70 hover:text-white">✕</button>
        </div>
      )}
      
      <header className="sticky top-0 h-auto min-h-[80px] py-4 lg:py-0 px-5 lg:px-10 flex items-center justify-between border-b border-border shrink-0 gap-4 z-40 bg-bg shadow-md">
        <div className="flex-1 hidden md:block">
          <nav className="flex gap-[15px] lg:gap-[20px] text-[10px] lg:text-[12px] uppercase tracking-[1px] text-muted">
            <span onClick={() => { setActiveTab('inicio'); setSelectedPost(null); setSelectedCategoryGroup(null); }} className={`cursor-pointer pb-1 transition-colors ${activeTab === 'inicio' ? 'text-accent border-b-2 border-highlight' : 'hover:text-accent'}`}>Início</span>
            <span onClick={() => { setActiveTab('posts'); setSelectedPost(null); setSelectedCategoryGroup({title: "Últimos Artigos", categoryIds: []}); }} className={`cursor-pointer pb-1 transition-colors ${activeTab === 'posts' ? 'text-accent border-b-2 border-highlight' : 'hover:text-accent'}`}>Artigos</span>
            <span onClick={() => { setActiveTab('loja'); setSelectedPost(null); setSelectedCategoryGroup(null); }} className={`cursor-pointer pb-1 transition-colors ${activeTab === 'loja' ? 'text-accent border-b-2 border-highlight' : 'hover:text-accent'}`}>Loja</span>
            <span onClick={() => { setActiveTab('servicos'); setSelectedPost(null); setSelectedCategoryGroup(null); }} className={`cursor-pointer pb-1 transition-colors ${activeTab === 'servicos' ? 'text-accent border-b-2 border-highlight' : 'hover:text-accent'}`}>Serviços</span>
            <span onClick={() => { setActiveTab('quem-somos'); setSelectedPost(null); setSelectedCategoryGroup(null); }} className={`cursor-pointer pb-1 transition-colors ${activeTab === 'quem-somos' ? 'text-accent border-b-2 border-highlight' : 'hover:text-accent'}`}>Quem Somos</span>
            <span onClick={() => { setActiveTab('contato'); setSelectedPost(null); setSelectedCategoryGroup(null); }} className={`cursor-pointer pb-1 transition-colors ${activeTab === 'contato' ? 'text-accent border-b-2 border-highlight' : 'hover:text-accent'}`}>Contato</span>
          </nav>
        </div>

        <button 
          onClick={() => {
            setActiveTab('inicio');
            setSelectedPost(null);
            setSelectedCategoryGroup(null);
          }}
          className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-opacity text-center md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          <img src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/logo_klebsuchan_sem_fundo.png?v=1" alt="Logo" fetchPriority="high" width="32" height="32" className="w-6 h-6 lg:w-8 lg:h-8 object-contain" />
          <div className="font-serif font-black text-lg sm:text-xl lg:text-2xl tracking-[-1px] uppercase">
            Klebsuchan
          </div>
        </button>
        
        <div className="flex items-center gap-3 lg:gap-4 flex-1 justify-end">
          <button 
            onClick={toggleTheme}
            className="text-accent hover:text-highlight transition-colors p-2"
            title={isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-accent hover:text-highlight transition-colors p-2"
            title="Pesquisar"
          >
            <Search size={20} />
          </button>

          {loading ? (
            <div className="w-20 h-8 bg-border animate-pulse rounded"></div>
          ) : user ? (
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="flex items-center gap-2">
                {user.photoURL && (
                  <img src={user.photoURL} alt="Avatar" width="32" height="32" className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-border" referrerPolicy="no-referrer" />
                )}
                <span className="text-[10px] lg:text-xs font-bold hidden sm:block">{user.displayName?.split(' ')[0]}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-border text-accent px-2 py-1.5 lg:px-3 lg:py-2 rounded text-[10px] lg:text-xs font-bold uppercase cursor-pointer hover:bg-muted/20 transition-colors flex items-center gap-1.5 lg:gap-2"
                title="Sair"
              >
                <LogOut size={14} />
                <span className="hidden sm:block">Sair</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="bg-highlight text-white px-3 py-2 lg:px-5 lg:py-2.5 rounded text-[10px] lg:text-xs font-bold uppercase cursor-pointer hover:bg-white hover:text-black transition-colors"
            >
              <span className="hidden sm:inline">Entrar com Google</span>
              <span className="sm:hidden">Entrar</span>
            </button>
          )}
          
          <button 
            className="md:hidden text-accent p-1" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[80px] left-0 right-0 bg-bg border-b border-border z-30 flex flex-col p-5 gap-4 shadow-2xl">
          <span onClick={() => { setActiveTab('inicio'); setSelectedPost(null); setSelectedCategoryGroup(null); setMobileMenuOpen(false); }} className={`pb-2 border-b border-border uppercase tracking-[2px] text-xs transition-colors cursor-pointer ${activeTab === 'inicio' ? 'text-accent font-bold' : 'text-muted hover:text-accent'}`}>Início</span>
          <span onClick={() => { setActiveTab('posts'); setSelectedPost(null); setSelectedCategoryGroup({title: 'Últimos Artigos', categoryIds: []}); setMobileMenuOpen(false); }} className={`pb-2 border-b border-border uppercase tracking-[2px] text-xs transition-colors cursor-pointer ${activeTab === 'posts' ? 'text-accent font-bold' : 'text-muted hover:text-accent'}`}>Artigos</span>
          <span onClick={() => { setActiveTab('loja'); setSelectedPost(null); setSelectedCategoryGroup(null); setMobileMenuOpen(false); }} className={`pb-2 border-b border-border uppercase tracking-[2px] text-xs transition-colors cursor-pointer ${activeTab === 'loja' ? 'text-accent font-bold' : 'text-muted hover:text-accent'}`}>Loja</span>
          <span onClick={() => { setActiveTab('servicos'); setSelectedPost(null); setSelectedCategoryGroup(null); setMobileMenuOpen(false); }} className={`pb-2 border-b border-border uppercase tracking-[2px] text-xs transition-colors cursor-pointer ${activeTab === 'servicos' ? 'text-accent font-bold' : 'text-muted hover:text-accent'}`}>Serviços</span>
          <span onClick={() => { setActiveTab('quem-somos'); setSelectedPost(null); setSelectedCategoryGroup(null); setMobileMenuOpen(false); }} className={`pb-2 border-b border-border uppercase tracking-[2px] text-xs transition-colors cursor-pointer ${activeTab === 'quem-somos' ? 'text-accent font-bold' : 'text-muted hover:text-accent'}`}>Quem Somos</span>
          <span onClick={() => { setActiveTab('contato'); setSelectedPost(null); setSelectedCategoryGroup(null); setMobileMenuOpen(false); }} className={`pb-2 uppercase tracking-[2px] text-xs transition-colors cursor-pointer ${activeTab === 'contato' ? 'text-accent font-bold' : 'text-muted hover:text-accent'}`}>Contato</span>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        {activeTab === 'inicio' && (
          <div className="flex flex-col w-full max-w-7xl mx-auto p-6 sm:p-8 lg:p-10 gap-10">
            {/* HERO CTA SECTION */}
            <section className="relative w-full rounded-2xl overflow-hidden border border-border/80 hover:border-highlight/40 group bg-[#070707] flex flex-col md:flex-row items-center justify-between transition-all duration-750 shadow-[0_0_60px_rgba(0,0,0,0.95)] hover:shadow-[0_0_80px_rgba(240,151,11,0.15)]">
              {/* Seamless Cinematic Cross-Fading Blur background using site images */}
              {heroSlideDetails.map((slide, idx) => (
                <div 
                  key={idx}
                  className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out blur-[65px] scale-115 pointer-events-none"
                  style={{
                    backgroundImage: `url("${slide.img}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: idx === currentHeroSlide ? 0.6 : 0,
                  }}
                />
              ))}
              
              {/* Retro-cybernetic grid pattern overlay with dynamic kinetic scroll */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(240,151,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(240,151,11,0.02)_1px,transparent_1px)] [background-size:38px_38px] animate-grid-pan pointer-events-none opacity-85"></div>
              
              {/* Drifting Glowing Ambient Orbs for multi-layered parallax depth */}
              <div className="absolute -top-[10%] -left-[5%] w-[450px] h-[450px] animate-drift-slow pointer-events-none">
                <div className="w-full h-full rounded-full bg-highlight/20 mix-blend-screen animate-glow-pulse" />
              </div>
              <div className="absolute -bottom-[15%] left-[20%] w-[500px] h-[500px] animate-drift-medium pointer-events-none">
                <div className="w-full h-full rounded-full bg-[#f0970b]/15 mix-blend-screen animate-glow-pulse" style={{ animationDelay: '-4s' }} />
              </div>
              <div className="absolute top-[25%] -right-[5%] w-[380px] h-[380px] animate-drift-slow pointer-events-none">
                <div className="w-full h-full rounded-full bg-red-500/10 mix-blend-screen animate-glow-pulse" style={{ animationDelay: '-8s' }} />
              </div>
              
              {/* Subtle CRT Scanlines overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px)] [background-size:100%_4px] pointer-events-none opacity-50"></div>

              {/* Sophisticated dark ambient gradient mask for ultimate caption readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/95 via-black/90 to-[#070707]/95 md:bg-gradient-to-r md:from-[#030303] md:via-black/90 md:to-black/30 pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#070707] to-transparent pointer-events-none md:hidden"></div>
              
              <div className="relative z-10 p-6 sm:p-12 lg:p-16 flex flex-col items-start gap-4 sm:gap-6 max-w-2xl lg:max-w-3xl flex-1">
                <div className="inline-flex items-center gap-2 bg-highlight/20 border border-highlight text-highlight px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-highlight animate-pulse"></span>
                  Loot Drop Disponível
                </div>
                
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-tight uppercase tracking-tighter">
                  O Multiverso <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-highlight to-[#f6c15c]">
                    Nerd e Otaku
                  </span> <br />
                  Em Um Só Lugar.
                </h1>
                
                <p className="text-sm sm:text-lg text-gray-300 max-w-xl leading-relaxed opacity-95">
                  Aperte o start e mergulhe em análises profundas, reviews épicos, novidades do eSports, memes de outro mundo e o melhor da cultura pop. Não jogue sozinho, seja bem-vindo ao Klebsuchan!
                </p>
                
                <button 
                  onClick={() => {
                    const gamesGroup = categoryGroups.find(g => g.title === 'Games & eSports');
                    if(gamesGroup) handleCategoryClick(gamesGroup);
                  }}
                  className="mt-3 sm:mt-4 w-full sm:w-auto justify-center px-6 py-3.5 sm:px-8 sm:py-4 bg-highlight hover:bg-[#77150a] text-white font-bold uppercase tracking-wider text-sm lg:text-base border-b-4 border-[#4d0c04] active:border-b-0 active:translate-y-1 transition-all flex items-center gap-3 shadow-[0_0_25px_rgba(240,151,11,0.45)] select-none cursor-pointer"
                >
                  <span className="animate-bounce font-mono text-lg sm:text-xl">▶</span> PRESS START
                </button>
              </div>

              {/* SLIDESHOW DE IMAGENS COM BLUR E ALTERNÂNCIA (VINCULADAS AOS POSTS) - RENDERIZADO COM EXCELÊNCIA EM TODOS OS TAMANHOS */}
              <div className="flex relative z-10 w-full md:w-[42%] lg:w-[38%] px-6 sm:px-8 md:px-0 md:mr-8 lg:mr-12 xl:mr-16 h-[220px] sm:h-[280px] md:h-[320px] flex-col items-center justify-center p-2 select-none mx-auto max-w-sm md:max-w-none mt-4 md:mt-0 mb-6 md:mb-0">
                <div 
                  onClick={() => handleHeroSlideClick(heroSlideDetails[currentHeroSlide].img)}
                  className="group/slide relative cursor-pointer w-full h-[190px] sm:h-[210px] md:h-[240px] rounded-xl overflow-hidden border-2 border-highlight/40 hover:border-highlight transition-all duration-300 shadow-[0_0_30px_rgba(240,151,11,0.15)] hover:shadow-[0_0_50px_rgba(240,151,11,0.35)] hover:-translate-y-0.5 flex items-center justify-center"
                >
                  {/* Blurry mirror layer inside the card to get exact user-focused blur effect style */}
                  <div 
                    className="absolute inset-0 scale-125 blur-xl opacity-70 transition-all duration-1000 ease-in-out"
                    style={{
                      backgroundImage: `url("${heroSlideDetails[currentHeroSlide].img}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  
                  {/* Crisp image centered as a card */}
                  <img 
                    src={heroSlideDetails[currentHeroSlide].img} 
                    alt={heroSlideDetails[currentHeroSlide].title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out opacity-90 group-hover/slide:opacity-100 group-hover/slide:scale-105"
                  />
                  
                  {/* Dark subtle overlay for titles readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"></div>
                  
                  {/* Badge & Title of context */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex flex-col gap-1 z-10">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-highlight font-bold font-mono inline-flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-sm self-start">
                      Em Destaque 🔥 Clique para Ler
                    </span>
                    <h3 className="text-white font-bold text-xs sm:text-sm lg:text-base leading-tight drop-shadow-md line-clamp-2">
                      {heroSlideDetails[currentHeroSlide].title}
                    </h3>
                  </div>
                </div>
                
                {/* Dots Indicator */}
                <div className="flex gap-2 mt-3 sm:mt-4 items-center justify-center">
                  {heroSlideDetails.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentHeroSlide(idx)}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-350 cursor-pointer ${
                        idx === currentHeroSlide 
                          ? 'w-5 sm:w-6 bg-highlight' 
                          : 'w-1.5 sm:w-2 bg-white/20 hover:bg-highlight/50'
                      }`}
                      aria-label={`Ir para slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
              {/* FEATURED CATEGORIES (BENTO GRID) */}
              <section className="flex flex-col gap-6">
                <h2 className="font-serif text-3xl font-black text-accent uppercase tracking-tight flex items-center gap-2">
                  <span className="w-3 h-8 bg-highlight inline-block"></span> Escolha Sua Classe
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categoryGroups.map((group, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleCategoryClick(group)}
                      className={`group relative overflow-hidden rounded-xl border border-border cursor-pointer h-40 ${idx === 0 ? 'sm:col-span-2 h-56' : ''}`}
                    >
                      <div 
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                        style={{ 
                          backgroundImage: group.bgImage, 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'center', 
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/80 transition-colors"></div>
                      
                      <div className="absolute bottom-0 left-0 p-5 w-full flex justify-between items-end">
                        <div>
                          <h3 className="text-white text-2xl font-serif font-black uppercase tracking-wide group-hover:text-highlight transition-colors">
                            {group.title}
                          </h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-highlight group-hover:text-white group-hover:border-highlight transition-all">
                          <ArrowLeft size={18} className="rotate-180" />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div 
                    className="group relative overflow-hidden rounded-xl border border-highlight/50 bg-gradient-to-br from-[#121214] to-[#202024] cursor-default h-40 flex flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:border-highlight transition-colors"
                  >
                    <div className="shrink-0 bg-white p-1 rounded-xl shadow-lg">
                      <img 
                        src="/images/qrcodepix.jpeg" 
                        alt="QR Code PIX" 
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                      />
                    </div>
                    <div className="flex flex-col flex-1 justify-center z-10 relative">
                      <h3 className="text-highlight text-sm sm:text-base font-serif font-black uppercase tracking-wide mb-1">
                        Apoie nosso Trabalho!
                      </h3>
                      <p className="text-[10px] sm:text-xs text-text-muted mb-2 leading-tight">
                        Qualquer doação é mais um apoio para trazermos conteúdo de qualidade.
                      </p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText('b0f51ae0-be9f-4b87-9da4-0ca63dd8ccbb');
                          alert('Chave PIX copiada: b0f51ae0-be9f-4b87-9da4-0ca63dd8ccbb');
                        }}
                        className="text-[10px] sm:text-xs bg-highlight/10 text-highlight hover:bg-highlight hover:text-black px-2 py-1.5 rounded font-bold uppercase transition-colors self-start border border-highlight/30 flex items-center gap-1"
                        title="Copiar chave PIX"
                      >
                        Copiar Chave
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* LATEST POSTS FEED */}
              <aside className="flex flex-col gap-6">
                 <h2 className="font-serif text-2xl font-black text-accent uppercase tracking-tight flex items-center gap-2">
                  <span className="w-2 h-6 bg-highlight inline-block"></span> Últimos Drops
                </h2>
                
                <div className="flex flex-col gap-4">
                  {homePosts.slice(0, 4).map((post, index) => (
                    <a 
                      key={post.id} 
                      href={`/?post=${post.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, '', `/?post=${post.id}`);
                        setSelectedPost(post);
                        setActiveTab('posts');
                      }}
                      className="group flex gap-4 cursor-pointer bg-card-bg p-3 rounded-lg border border-border hover:border-highlight transition-colors block"
                    >
                      <div className="w-24 h-24 shrink-0 rounded overflow-hidden">
                         <img 
                            src={getPostImage(post)} 
                            alt={post.title?.rendered.replace(/<[^>]+>/g, '') || "Capa do Artigo"}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            fetchPriority={index === 0 ? "high" : "auto"}
                            width="96"
                            height="96"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-highlight text-[10px] font-bold uppercase tracking-wider mb-1">
                          {post.categories.includes(109) ? 'Meme' : 'News'}
                        </span>
                        <h4 
                          className="text-sm font-bold font-serif group-hover:text-highlight transition-colors line-clamp-3 leading-snug"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                      </div>
                    </a>
                  ))}
                </div>
                
                <a 
                  href="https://www.instagram.com/klebsuchan1.0?igsh=a2I0ZnpzajNxNWhx&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 bg-gradient-to-r from-[#f0970b] to-[#77150a] p-[2px] rounded-xl cursor-pointer group"
                >
                  <div className="bg-card-bg rounded-[10px] p-5 h-full flex items-center gap-4 group-hover:bg-transparent transition-colors">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:text-white shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                      <Instagram size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-accent group-hover:text-white">@klebsuchan1.0</span>
                      <span className="text-sm text-muted group-hover:text-white/90">Siga para memes e zoeira</span>
                    </div>
                  </div>
                </a>

                <button 
                  onClick={() => { setActiveTab('loja'); setSelectedPost(null); setSelectedCategoryGroup(null); }}
                  className="mt-4 bg-highlight p-[2px] rounded-xl cursor-pointer group hover:bg-opacity-80 transition-opacity w-full text-left"
                >
                  <div className="bg-card-bg rounded-[10px] p-5 h-full flex items-center gap-4 group-hover:bg-highlight transition-colors">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:text-white shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                      <ShoppingBag size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-accent group-hover:text-white">Klebsuchan Store</span>
                      <span className="text-sm text-muted group-hover:text-white/90">Equipamentos e colecionáveis</span>
                    </div>
                  </div>
                </button>
              </aside>
            </div>

            {/* NEWSLETTER SECTION */}
            <section className="relative w-full rounded-2xl overflow-hidden border border-border group bg-card-bg mt-10">
              <div className="absolute inset-0 bg-gradient-to-r from-highlight/10 to-transparent"></div>
              <div className="relative z-10 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h2 className="font-serif text-3xl sm:text-4xl font-black text-accent mb-4">
                    Entre para a Guilda!
                  </h2>
                  <p className="text-muted text-lg">
                    Receba no seu e-mail as melhores análises, memes e promoções exclusivas da nossa loja. Zero spam, apenas XP pro seu dia.
                  </p>
                </div>
                <div className="w-full md:w-auto flex-1 max-w-md">
                  <form 
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <input 
                      type="email" 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Seu melhor e-mail otaku" 
                      required
                      disabled={newsletterStatus === 'loading'}
                      className="flex-1 bg-bg border border-border rounded-lg p-4 text-accent focus:outline-none focus:border-highlight transition-colors"
                    />
                    <button 
                      type="submit"
                      disabled={newsletterStatus === 'loading'}
                      className="bg-highlight text-white font-bold uppercase tracking-wider px-6 py-4 rounded-lg hover:bg-opacity-80 transition-colors whitespace-nowrap disabled:opacity-50"
                    >
                      {newsletterStatus === 'loading' ? 'Enviando...' : newsletterStatus === 'success' ? 'Inscrito!' : 'Inscrever-se'}
                    </button>
                  </form>
                  {newsletterStatus === 'success' && (
                    <p className="text-sm mt-3 text-highlight font-bold">Inscrito com sucesso! XP em dobro a caminho.</p>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'posts' && (
          <section className="flex-1 p-6 sm:p-8 lg:p-10 w-full max-w-4xl mx-auto">
            {selectedPost ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center gap-2 text-muted hover:text-highlight transition-colors mb-8"
                >
                  <ArrowLeft size={16} />
                  <span className="text-sm font-bold uppercase tracking-wider">Voltar para {selectedCategoryGroup?.title}</span>
                </button>
                
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight"
                  dangerouslySetInnerHTML={{ __html: selectedPost.title.rendered }}
                />
                
                {getPostImage(selectedPost) && (
                  <div className="mb-6">
                    <img 
                      src={getPostImage(selectedPost)} 
                      alt="Featured" 
                      fetchPriority="high"
                      loading="eager"
                      width="800"
                      height="500"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[500px] object-cover object-center border border-border"
                    />
                    <div className="text-right text-[10px] sm:text-[11px] text-muted mt-2 italic">
                      Imagem: Reprodução / Divulgação
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted">Compartilhar:</span>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => { setPostToShare(selectedPost); setIsShareModalOpen(true); }}
                      className="w-10 h-10 rounded-full bg-card-bg border border-border flex items-center justify-center text-accent hover:bg-highlight hover:border-highlight hover:text-white transition-colors cursor-pointer"
                      title="Compartilhar"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div 
                  className={`prose prose-lg max-w-none prose-headings:font-serif prose-img:hidden mt-8`}
                  dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }}
                />

                {/* POSTS RELACIONADOS */}
                <div className="mt-16 pt-10 border-t border-border">
                  <h3 className="font-serif text-2xl font-bold mb-6 text-accent">Posts Relacionados</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {posts
                      .filter(p => p.id !== selectedPost.id && p.categories.some(c => selectedPost.categories.includes(c)))
                      .slice(0, 2)
                      .map(relatedPost => (
                        <a 
                          key={relatedPost.id} 
                          href={`/?post=${relatedPost.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            window.history.pushState({}, '', `/?post=${relatedPost.id}`);
                            setSelectedPost(relatedPost);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-bg border border-border rounded-lg overflow-hidden cursor-pointer group hover:border-highlight transition-colors flex flex-col block"
                        >
                          {getPostImage(relatedPost) && (
                            <div className="w-full h-40 overflow-hidden bg-bg relative">
                              <img 
                                src={getPostImage(relatedPost)} 
                                alt={relatedPost.title?.rendered.replace(/<[^>]+>/g, '') || "Artigo relacionado"} 
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                loading="lazy"
                                decoding="async"
                                width="400"
                                height="160"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          )}
                          <div className="p-4 flex-1 flex flex-col">
                            <h4 
                              className="font-bold text-accent mb-2 group-hover:text-highlight line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                            />
                            <div className="mt-auto pt-4 flex items-center justify-between">
                              <span className="text-highlight text-xs font-bold uppercase tracking-wider">Ler artigo</span>
                              <ArrowLeft size={14} className="text-highlight rotate-180 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </a>
                      ))
                    }
                  </div>
                </div>
                
                <PostComments postId={selectedPost.id} user={user} />
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button 
                  onClick={() => setActiveTab('inicio')}
                  className="flex items-center gap-2 text-muted hover:text-highlight transition-colors mb-8"
                >
                  <ArrowLeft size={16} />
                  <span className="text-sm font-bold uppercase tracking-wider">Voltar para Início</span>
                </button>

                <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-8 pb-4 border-b border-border">
                  {selectedCategoryGroup?.title}
                </h2>

                {loadingPosts ? (
                  <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-2 border-highlight border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post, index) => {
                      return (
                      <a 
                        key={post.id} 
                        href={`/?post=${post.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          window.history.pushState({}, '', `/?post=${post.id}`);
                          setSelectedPost(post);
                        }}
                        className="bg-card-bg border border-border cursor-pointer group hover:border-highlight transition-colors flex flex-col h-full overflow-hidden relative block"
                      >
                        {getPostImage(post) && (
                          <div className="w-full h-56 overflow-hidden bg-bg relative">
                            <div className="absolute top-3 left-3 bg-highlight text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 z-10">
                              {selectedCategoryGroup?.title}
                            </div>
                            <img 
                              src={getPostImage(post)} 
                              alt={post.title?.rendered.replace(/<[^>]+>/g, '') || "Capa do Artigo"} 
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              loading={index < 4 ? "eager" : "lazy"}
                              fetchPriority={index < 2 ? "high" : "auto"}
                              referrerPolicy="no-referrer"
                              width="400"
                              height="224"
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80"></div>
                          </div>
                        )}
                        <div className="p-5 flex flex-col flex-1">
                          <h3 
                            className="text-xl font-serif font-bold mb-3 group-hover:text-highlight transition-colors leading-snug"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                          />
                          <div 
                            className="text-sm text-muted line-clamp-3 mb-5"
                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                          />
                          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                            <span className="text-highlight text-xs font-bold uppercase tracking-wider group-hover:underline">
                              Leia Mais
                            </span>
                            <ArrowLeft size={14} className="text-highlight rotate-180 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </a>
                    )})}
                  </div>
                ) : (
                  <p className="text-muted text-center py-20">Nenhum artigo encontrado nesta categoria.</p>
                )}
              </div>
            )}
          </section>
        )}

        {activeTab === 'quem-somos' && (
          <section className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 p-6 sm:p-10 lg:p-20">
            <div className="shrink-0 relative">
              <div className="absolute inset-0 bg-highlight rounded-full blur-xl opacity-20"></div>
              <img 
                src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/o-criador.png?v=4" 
                alt="Braian Kmdc" 
                fetchPriority="high"
                loading="eager"
                width="320"
                height="320"
                className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-cover rounded-full border-4 border-border relative z-10 shadow-2xl"
              />
            </div>
            <div className="max-w-xl text-center md:text-left">
              <div className="text-highlight text-xs font-bold tracking-[3px] uppercase mb-3">
                O Criador
              </div>
              <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] font-black mb-4 text-accent">
                Braian Kmdc
              </h2>
              <p className="text-[15px] lg:text-[17px] leading-[1.7] text-muted mb-6">
                Sou o idealizador do Klebsuchan, um hub cultural criado para explorar novas ideias e encontrar respostas para as perguntas mais instigantes. Meu objetivo é transformar o engajamento em uma experiência imersiva e enriquecedora, trazendo conteúdos de qualidade sobre o mundo otaku, games, tecnologia e muito mais.
              </p>
              <button 
                onClick={() => setActiveTab('contato')}
                className="bg-highlight text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-opacity-80 transition-colors cursor-pointer"
              >
                Entrar em Contato
              </button>
            </div>
          </section>
        )}

        {activeTab === 'loja' && (
          <Store />
        )}

        {activeTab === 'servicos' && (
          <section className="flex-1 p-6 sm:p-10 lg:p-20 w-full max-w-4xl mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl lg:text-4xl font-serif font-black mb-8 pb-4 border-b border-border uppercase tracking-tight flex items-center gap-3">
                <span className="w-4 h-8 bg-highlight inline-block"></span> Nossa Guilda (Serviços)
              </h2>
              
              <div className="flex flex-col gap-8">
                <div className="bg-card-bg border border-border border-l-4 border-l-highlight p-6 hover:border-highlight transition-colors relative overflow-hidden group">
                  <div className="absolute right-0 top-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-9xl font-black -mt-6 -mr-4">01</div>
                  <h3 className="text-2xl font-black font-serif text-accent mb-4 uppercase tracking-wider">A Taverna do Conhecimento Nerd</h3>
                  <p className="text-muted leading-relaxed mb-4">
                    No <strong>Klebsuchan</strong>, nós não entregamos apenas notícias... nós dropamos XP! Nosso objetivo é masterizar seu conhecimento sobre entretenimento, memes, animes, mangás, games e cultura pop.
                  </p>
                  <p className="text-muted leading-relaxed">
                    Cada post é um easter egg a ser descoberto. Seja um guia pra passar daquele boss impossível, reviews dos animes da temporada ou uma dose diária de memes de alta qualidade (pra curar sua sanidade mental), você tá no lugar certo pra upar de nível.
                  </p>
                </div>

                <div className="bg-card-bg border border-border border-l-4 border-l-highlight p-6 hover:border-highlight transition-colors relative overflow-hidden group">
                  <div className="absolute right-0 top-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-9xl font-black -mt-6 -mr-4">02</div>
                  <h3 className="text-2xl font-black font-serif text-accent mb-4 uppercase tracking-wider">Loot 100% Gratuito (Sem Pay2Win)</h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Aqui você não precisa comprar Passe de Batalha pra ler. Todo nosso conteúdo está desbloqueado desde o nível 1: notícias quentes, críticas polêmicas, resumos de filmes e as builds mais quebradas do momento.
                  </p>
                  <p className="text-muted leading-relaxed">
                    Nossa party de redatores tem um único objetivo: craftar o conteúdo mais atualizado sobre o multiverso geek. Fazemos as quests diárias patrulhando a internet (de fóruns obscuros até os vazamentos oficiais) para te trazer o loot mais valioso.
                  </p>
                </div>

                <div className="bg-card-bg border border-border border-l-4 border-l-highlight p-6 hover:border-highlight transition-colors relative overflow-hidden group">
                  <div className="absolute right-0 top-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-9xl font-black -mt-6 -mr-4">03</div>
                  <h3 className="text-2xl font-black font-serif text-accent mb-4 uppercase tracking-wider">Como Farmar no Nosso Multiverso</h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Explorar o Klebsuchan é tão fácil quanto dar R1+Triângulo. Acesse nossas categorias pelo hub inicial, selecione sua classe favorita (Otaku, Tryhard, Cinéfilo ou Mestre dos Memes) e absorva o conteúdo.
                  </p>
                  <p className="text-muted leading-relaxed">
                    Dê respawn diariamente no site! Afinal, o meta da internet sempre muda. Venha fazer parte dessa comunidade, compartilhe o link com aquele seu duo que carrega as partidas, e continue combando com a gente. GG WP!
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'contato' && (
          <section className="flex-1 p-6 sm:p-10 lg:p-20 w-full max-w-4xl mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-8 pb-4 border-b border-border">Contato</h2>
              
              <div className="bg-card-bg border border-border p-8 max-w-2xl mx-auto">
                <p className="text-muted text-lg mb-8 text-center">
                  Tem alguma dúvida, sugestão ou quer falar com a gente? Envie uma mensagem!
                </p>
                
                <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); alert('Mensagem enviada com sucesso!'); }}>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-muted">Nome</label>
                    <input type="text" required className="w-full bg-bg border border-border p-3 text-accent focus:outline-none focus:border-highlight transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-muted">E-mail</label>
                    <input type="email" required className="w-full bg-bg border border-border p-3 text-accent focus:outline-none focus:border-highlight transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-muted">Mensagem</label>
                    <textarea required rows={5} className="w-full bg-bg border border-border p-3 text-accent focus:outline-none focus:border-highlight transition-colors resize-none"></textarea>
                  </div>
                  <button type="submit" className="bg-highlight text-white font-bold uppercase tracking-wider py-4 mt-2 hover:bg-white hover:text-black transition-colors cursor-pointer">
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'termos' && (
          <section className="flex-1 p-6 sm:p-10 lg:p-20 w-full max-w-4xl mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-card-bg border border-border p-8">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-6 pb-4 border-b border-border">Termos de Uso</h2>
              <div className="text-muted leading-relaxed space-y-4">
                <p>Bem-vindo ao Klebsuchan. Ao acessar e utilizar este site, você concorda em cumprir e estar vinculado a estes termos de uso.</p>
                <p>Este portal tem como objetivo fornecer conteúdo sobre a cultura geek, otaku e nerd, incluindo artigos informativos, tutoriais e links de afiliados da Shopee.</p>
                <p>O conteúdo publicado é para uso informativo e de entretenimento. Os links para a loja da Shopee presentes no site representam a Loja Parceira Klebsuchan, e compras realizadas através desses links podem gerar comissões para manter este projeto no ar.</p>
                <p>É proibido utilizar o site para qualquer finalidade ilegal, violar propriedade intelectual, realizar spam ou tentar invadir nossa infraestrutura.</p>
                <p>Reservamo-nos o direito de alterar os termos de uso a qualquer momento, sendo de responsabilidade do usuário revisar esta página periodicamente.</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'privacidade' && (
          <section className="flex-1 p-6 sm:p-10 lg:p-20 w-full max-w-4xl mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-card-bg border border-border p-8">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-6 pb-4 border-b border-border">Política de Privacidade</h2>
              <div className="text-muted leading-relaxed space-y-4">
                <p>No Klebsuchan, a privacidade dos nossos visitantes é extremamente importante para nós.</p>
                <p>Coletamos dados analíticos básicos essenciais (como páginas visitadas e tempo de permanência) para aprimorar o conteúdo de acordo com as preferências da nossa audiência geek/otaku.</p>
                <p>Caso você se inscreva em nossa newsletter ou acesse mediante login com o Google, coletaremos apenas as informações estritamente necessárias (como e-mail ou nome) para prestar o serviço e permitir comentários nas publicações.</p>
                <p>Não vendemos, trocamos ou transferimos a terceiros suas informações pessoais identificáveis. Isso não inclui terceiros de confiança que nos auxiliam a operar o nosso site, desde que as partes concordem em manter essas informações confidenciais.</p>
                <p><strong>Publicidade de Terceiros e Google AdSense</strong></p>
                <p>O Google, como fornecedor de terceiros, utiliza cookies para exibir anúncios no nosso site. O uso do cookie publicitário pelo Google (incluindo o DART) permite a veiculação de anúncios para os nossos usuários com base na visita a este site e a outros sites na Internet.</p>
                <p>Fornecedores de terceiros, incluindo o Google (Google AdSense), usam cookies para veicular anúncios com base nas visitas anteriores do usuário ao nosso website ou a outros websites. O uso de cookies de publicidade pelo Google permite que ele e seus parceiros veiculem anúncios para os nossos usuários com base em suas visitas aos nossos sites e/ou a outros sites na Internet.</p>
                <p>Os usuários podem desativar a publicidade personalizada acessando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline">Configurações de Anúncios do Google</a>. Como alternativa, nossos leitores podem desativar o uso de cookies de publicidade de terceiros para o fornecimento de publicidade personalizada, acessando o site <a href="http://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline">www.aboutads.info</a>.</p>
                <p>Ao navegar pelo portal e interagir com os botões, você concorda ativamente com essa Política.</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'cookies' && (
          <section className="flex-1 p-6 sm:p-10 lg:p-20 w-full max-w-4xl mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-card-bg border border-border p-8">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-6 pb-4 border-b border-border">Política de Cookies</h2>
              <div className="text-muted leading-relaxed space-y-4">
                <p>Os cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita sites, fundamentais para melhorar a sua navegação e personalizar sua experiência.</p>
                <p>Utilizamos os seguintes tipos de cookies no portal Klebsuchan:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-sm text-muted">
                  <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento correto do site (ex: manter sua sessão ativa para comentários).</li>
                  <li><strong>Cookies Analíticos:</strong> Servem para entender de forma agregada quais postagens e reviews estão fazendo mais sucesso, permitindo melhorar nossa curadoria.</li>
                  <li><strong>Cookies de Publicidade (Google AdSense):</strong> Fornecedores de terceiros, incluindo o Google (Google AdSense), usam cookies para veicular anúncios com base nas visitas anteriores do usuário ao nosso website ou a outros websites, com base em suas visitas aos nossos sites ou a outros sites na Internet.</li>
                </ul>
                <p>Além disso, destacamos o uso de cookies através da integração da Loja da Shopee. Se você clicar e for redirecionado, cookies de parceiros podem rastrear essa origem (Afiliados Shopee).</p>
                <p>Você pode controlar ou desativar o uso de cookies nas configurações do seu próprio navegador ou acessar a página de <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline">Configurações de Anúncios do Google</a> para desativar a publicidade personalizada. Note que algumas funcionalidades da interface podem não responder como o esperado caso você opte por desativá-los.</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'regras' && (
          <section className="flex-1 p-6 sm:p-10 lg:p-20 w-full max-w-4xl mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-card-bg border border-border p-8">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-6 pb-4 border-b border-border">Regras de Comentários</h2>
              <div className="text-muted leading-relaxed space-y-4">
                <p>Nosso sistema de comentários foi idealizado para gerar discussões saudáveis e trocas de conhecimento dentro do nicho da cultura otaku e nerd. Para manter um ambiente agradável, sigam as regras:</p>
                <ul className="list-decimal list-inside ml-4 space-y-2 text-sm text-muted">
                  <li>Seja sempre respeitoso(a) com a opinião alheia. Críticas a personagens/animes são bem-vindas, ofensas aos membros jamais.</li>
                  <li>Evite spoilers (revelação de roteiro de episódios/mangás recentes) sem utilizar o aviso prévio de [Spoiler].</li>
                  <li>Nenhum tipo de discurso de ódio, racismo, difamação ou ataques pessoais (toxicidade gratuita) será tolerado, resultando em banimento do acesso à nossa guilda.</li>
                  <li>Evite publicar links de outros sites (spam), conteúdo irrelevante sob as notícias (flood) ou fazer auto-promoção excessiva.</li>
                </ul>
                <p>A moderação Klebsuchan atuará de forma independente e os comentários passíveis de denúncia poderão ser apagados sem notificação prévia.</p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="w-full bg-card-bg border-t border-border mt-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-col max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <img src="https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/images/logo_klebsuchan_sem_fundo.png?v=1" alt="Logo" width="32" height="32" loading="lazy" decoding="async" className="w-8 h-8 object-contain" />
              <div className="font-serif font-black text-2xl tracking-[-1px] uppercase text-accent">
                Klebsuchan
              </div>
            </div>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              O Klebsuchan é o seu portal definitivo para análises, notícias e curiosidades sobre animes, cultura pop, tecnologia e o universo gamer. Explore o multiverso com a gente.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/klebsuchan1.0?igsh=a2I0ZnpzajNxNWhx&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center text-accent hover:bg-highlight hover:border-highlight hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/BraianKmdc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center text-accent hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.youtube.com/@klebsuchan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center text-accent hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-10 lg:gap-20">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold uppercase tracking-wider text-accent mb-2">Navegação</h4>
              <span onClick={() => { setActiveTab('inicio'); setSelectedPost(null); window.scrollTo(0,0); }} className="text-sm text-muted hover:text-highlight cursor-pointer transition-colors">Início</span>
              <span onClick={() => { setActiveTab('posts'); setSelectedPost(null); setSelectedCategoryGroup({title: "Últimos Artigos", categoryIds: []}); window.scrollTo(0,0); }} className="text-sm text-muted hover:text-highlight cursor-pointer transition-colors">Artigos</span>
              <span onClick={() => { setActiveTab('loja'); window.scrollTo(0,0); }} className="text-sm text-muted hover:text-highlight cursor-pointer transition-colors">Loja</span>
              <span onClick={() => { setActiveTab('quem-somos'); window.scrollTo(0,0); }} className="text-sm text-muted hover:text-highlight cursor-pointer transition-colors">Sobre o Autor</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="font-bold uppercase tracking-wider text-accent mb-2">Legal</h4>
              <span onClick={() => { setActiveTab('termos'); window.scrollTo(0,0); }} className="text-sm text-muted hover:text-highlight cursor-pointer transition-colors">Termos de Uso</span>
              <span onClick={() => { setActiveTab('privacidade'); window.scrollTo(0,0); }} className="text-sm text-muted hover:text-highlight cursor-pointer transition-colors">Política de Privacidade</span>
              <span onClick={() => { setActiveTab('cookies'); window.scrollTo(0,0); }} className="text-sm text-muted hover:text-highlight cursor-pointer transition-colors">Política de Cookies</span>
              <span onClick={() => { setActiveTab('regras'); window.scrollTo(0,0); }} className="text-sm text-muted hover:text-highlight cursor-pointer transition-colors">Regras de Comentários</span>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-bg border-t border-border py-4 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted text-center sm:text-left">
          <span>© {new Date().getFullYear()} Klebsuchan. Todos os direitos reservados.</span>
          <span>Desenvolvido com dedicação para a comunidade geek.</span>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-card-bg border-t border-border p-4 lg:p-6 z-50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-full duration-500">
          <div className="text-sm text-accent max-w-4xl">
            <p>
              Utilizamos cookies para melhorar sua experiência no Klebsuchan, personalizar conteúdo e anúncios, e analisar nosso tráfego. 
              Ao continuar navegando, você concorda com a nossa <span onClick={() => { setActiveTab('cookies'); window.scrollTo(0,0); setShowCookieConsent(false); localStorage.setItem('cookieConsent', 'true'); }} className="text-highlight cursor-pointer hover:underline">Política de Cookies</span> e <span onClick={() => { setActiveTab('privacidade'); window.scrollTo(0,0); setShowCookieConsent(false); localStorage.setItem('cookieConsent', 'true'); }} className="text-highlight cursor-pointer hover:underline">Política de Privacidade</span>.
            </p>
          </div>
          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            <button 
              onClick={handleAcceptCookies}
              className="flex-1 sm:flex-none bg-highlight text-white px-6 py-2.5 rounded font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              Aceitar
            </button>
          </div>
        </div>
      )}

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelectPost={(post) => {
          setSelectedPost(post);
          setActiveTab('posts');
        }} 
      />

      <ShareModal
        post={postToShare}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        getPostImage={getPostImage}
      />
    </div>
  );
}
