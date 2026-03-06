import { Product, ArticlePanier } from './types';

/**
 * Calcule le prix après application d'une réduction
 */
export function calculerPrixAvecReduction(prix: number, reduction: number): number {
  if (prix < 0) {
    throw new Error('Le prix ne peut pas être négatif');
  }
  if (reduction < 0 || reduction > 100) {
    throw new Error('La réduction doit être comprise entre 0 et 100');
  }
  
  const prixReduit = prix * (1 - reduction / 100);
  return Math.round(prixReduit * 100) / 100;
}

/**
 * Calcule le prix total d'un panier
 */
export function calculerPrixTotalPanier(articles: ArticlePanier[]): number {
  if (!articles.length) {
    return 0;
  }

  const total = articles.reduce((sum, article) => {
    return sum + (article.product.price * article.quantity);
  }, 0);

  return Math.round(total * 100) / 100;
}

/**
 * Modifie la quantité d'un produit
 */
export function modifierQuantite(
  articles: ArticlePanier[], 
  productId: number, 
  operation: 'incrementer' | 'decrementer'
): ArticlePanier[] {
  const index = articles.findIndex(a => a.product.id === productId);
  
  if (index === -1) {
    throw new Error('Produit non trouvé dans le panier');
  }

  const nouveauxArticles = [...articles];
  const article = { ...nouveauxArticles[index] };

  if (operation === 'incrementer') {
    article.quantity += 1;
  } else {
    if (article.quantity <= 1) {
      nouveauxArticles.splice(index, 1);
      return nouveauxArticles;
    }
    article.quantity -= 1;
  }

  nouveauxArticles[index] = article;
  return nouveauxArticles;
}

/**
 * Vérifie si un produit est dans le panier
 */
export function produitEstDansPanier(articles: ArticlePanier[], productId: number): boolean {
  return articles.some(article => article.product.id === productId);
}

/**
 * Trouve un article par ID
 */
export function trouverArticle(articles: ArticlePanier[], productId: number): ArticlePanier | undefined {
  return articles.find(article => article.product.id === productId);
}

// Exporter le type Product pour qu'il soit utilisé
export type { Product };