import React, { useState, useEffect } from 'react';
import { ShoppingBag, ExternalLink, Star, Search, Filter, ShoppingCart, Tag, AlertTriangle } from 'lucide-react';

const storeCategories = [
  "Todos",
  "Setup Gamer",
  "Periféricos",
  "Colecionáveis",
  "Acessórios"
];

interface Product {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  category: string;
  image: string;
  item_url?: string;
}

export default function Store() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorConfig, setErrorConfig] = useState<string | null>(null);

  const storeLink = "https://collshp.com/klebsuchanstore?view=storefront";

  useEffect(() => {
    async function loadShopeeProducts() {
      try {
        setLoading(true);
        let keyword = "";
        if (activeCategory === "Setup Gamer") keyword = "setup gamer pc";
        if (activeCategory === "Periféricos") keyword = "teclado gamer";
        if (activeCategory === "Colecionáveis") keyword = "action figure anime";
        if (activeCategory === "Acessórios") keyword = "mousepad gamer";

        const url = `/api/shopee/products${keyword ? `?keyword=${encodeURIComponent(keyword)}` : ""}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.configNeeded) {
          setErrorConfig(data.error || data.apiError);
        }

        if (!response.ok) {
          if (!data.configNeeded) {
            console.error("Erro na API da Shopee:", data.error);
          }
          setLoading(false);
          return;
        }

        // Se o backend indicou que caiu no fallback (por n motivos, ex: falta access token)
        // a gente não trava a loja do usuário
        if (data.isFallback && data.apiError) {
          console.warn("Shopee API Error:", data.apiError, "Mostrando visual na loja...");
        }

        if (data.products && data.products.length > 0) {
          const shopeeProducts = data.products.map((item: any) => ({
            id: item.itemId || item.item_id || Math.random().toString(),
            name: item.productName || item.itemName || item.item_name || 'Produto Shopee',
            price: item.price ? (typeof item.price === 'string' ? parseFloat(item.price) : item.price / 100000) : 0, 
            category: item.category || "Todos",
            image: item.imageUrl || item.image_url || 'https://via.placeholder.com/300',
            item_url: item.offerLink || item.productLink || item.item_url || storeLink,
            reviews: item.sales || 0
          }));
          setProducts(shopeeProducts);
        } else {
          setProducts([]);
        }
        
      } catch (err) {
        console.error("Failed to fetch shopee products", err);
      } finally {
        setLoading(false);
      }
    }

    loadShopeeProducts();
  }, [activeCategory]);

  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-6 sm:p-8 lg:p-10">
      
      {/* Header da Loja */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag size={24} className="text-highlight" />
            <span className="text-highlight text-xs font-bold tracking-[4px] uppercase">Loot Box</span>
          </div>
          <h2 className="font-serif text-[36px] sm:text-[48px] font-black text-accent uppercase tracking-tight leading-none">
            Klebsuchan Store
          </h2>
          <p className="text-muted mt-4 max-w-xl">
            A seleção definitiva de equipamentos e itens colecionáveis para o seu setup. 
            Integrado em tempo real com a Shopee.
          </p>
        </div>
        
        <div className="flex-shrink-0 flex items-center gap-4">
          <a
            href={storeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-card-bg border border-border hover:border-highlight text-accent px-6 py-3 rounded font-bold uppercase tracking-wider text-xs transition-colors"
          >
            Ver Vitrine Completa <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {errorConfig ? (
        <div className="col-span-full py-16 text-center flex flex-col items-center bg-card-bg border border-red-500/30 rounded p-8">
          <AlertTriangle size={64} className="text-highlight mb-6 opacity-80" />
          <h3 className="text-2xl font-serif text-accent mb-4">Atenção Especialista! Integração Shopee Pendente</h3>
          <p className="text-muted max-w-2xl text-lg mb-6 leading-relaxed">
            {errorConfig}
          </p>
          <div className="text-left bg-[#121214] p-6 rounded border border-border w-full max-w-xl">
            <p className="text-sm font-bold text-highlight mb-2 uppercase tracking-wider">Como resolver:</p>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-white mb-2 underline">No AI Studio:</p>
                <ol className="list-decimal pl-5 text-sm text-gray-400 space-y-1">
                  <li>Menu <strong className="text-white">Settings</strong> &gt; <strong className="text-white">Add Secret</strong>.</li>
                  <li>Adicione <strong className="text-white">SHOPEE_APP_ID</strong> e <strong className="text-white">SHOPEE_APP_SECRET</strong>.</li>
                </ol>
              </div>
              <div>
                <p className="text-xs font-bold text-white mb-2 underline">No Vercel:</p>
                <ol className="list-decimal pl-5 text-sm text-gray-400 space-y-1">
                  <li>Vá em <strong className="text-white">Settings</strong> &gt; <strong className="text-white">Environment Variables</strong>.</li>
                  <li>Adicione <strong className="text-white">SHOPEE_APP_ID</strong> e <strong className="text-white">SHOPEE_APP_SECRET</strong>.</li>
                  <li>Faça um novo <strong>Redeploy</strong> para as alterações fazerem efeito!</li>
                </ol>
              </div>
              <p className="text-xs text-muted italic">Sua loja vai começar a puxar os produtos oficiais da Shopee remotamente após a configuração.</p>
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin text-highlight"><ShoppingBag size={48} /></div>
        </div>
      ) : (
        <>
          {/* Busca e Filtros */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-muted" />
              </div>
              <input
                type="text"
                placeholder="Buscar produtos (ex: Mouse, Cadeira...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card-bg border border-border rounded p-4 pl-12 text-accent focus:outline-none focus:border-highlight transition-colors"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {storeCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-6 py-4 rounded text-xs font-bold uppercase tracking-wider transition-colors border ${
                    activeCategory === cat 
                      ? 'bg-highlight border-highlight text-white' 
                      : 'bg-card-bg border-border text-accent hover:border-highlight'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="bg-card-bg border border-border rounded overflow-hidden group hover:border-highlight transition-colors flex flex-col relative text-left">
                  
                  {/* Badge de Desconto Promocional */}
                  {product.oldPrice && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded z-10 flex items-center gap-1 shadow-lg">
                      <Tag size={10} />
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </div>
                  )}

                  <div className="aspect-square bg-white overflow-hidden relative p-2 sm:p-4 rounded-t-xl">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      width="300"
                      height="300"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-3 sm:p-5 flex flex-col flex-1 border-t border-border">
                    <div className="text-[9px] sm:text-[10px] font-bold text-highlight uppercase tracking-wider mb-1 sm:mb-2 line-clamp-1">
                      {product.category}
                    </div>
                    
                    <h3 className="font-bold text-xs sm:text-sm text-accent mb-2 sm:mb-3 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-3 sm:mb-4">
                      {product.rating && (
                        <div className="flex text-[#f6c15c]">
                          <Star fill="currentColor" size={12} className="sm:w-[14px] sm:h-[14px]" />
                          <span className="text-[10px] sm:text-xs text-muted ml-1">{product.rating}</span>
                        </div>
                      )}
                      {product.reviews && <span className="text-[10px] sm:text-xs text-muted ml-0.5 sm:ml-1">({product.reviews})</span>}
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-1">
                      <div className="flex-1">
                        {product.oldPrice && (
                          <div className="text-[10px] sm:text-xs text-muted line-through mb-0.5 sm:mb-1 -mt-1">
                            R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                          </div>
                        )}
                        <div className="text-sm sm:text-xl font-black text-accent text-highlight truncate">
                          {product.price > 0 ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : 'Ver Preço'}
                        </div>
                      </div>
                      <a
                        href={product.item_url || storeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded bg-highlight flex items-center justify-center text-white hover:bg-opacity-80 transition-opacity shadow-lg group-hover:-translate-y-1 transform duration-300"
                        title="Comprar na Shopee"
                      >
                        <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center flex flex-col items-center">
                <Search size={48} className="text-muted mb-4 opacity-50" />
                <h3 className="text-2xl font-serif text-accent mb-2">Nenhum loot encontrado</h3>
                <p className="text-muted">Não encontramos produtos para esta categoria ou busca.</p>
                <button 
                  onClick={() => {setSearchQuery(""); setActiveCategory("Todos");}}
                  className="mt-6 px-6 py-3 bg-card-bg border border-border text-accent rounded hover:border-highlight hover:text-highlight transition-colors text-sm font-bold uppercase tracking-wider"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}

