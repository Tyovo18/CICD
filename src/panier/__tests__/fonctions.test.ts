import {
  calculerPrixAvecReduction,
  calculerPrixTotalPanier,
  modifierQuantite,
  produitEstDansPanier,
  trouverArticle
} from '../fonctions.js';  // Added .js extension
import { Product } from '../types.js';  // Added .js extension

describe('Fonctions de gestion de panier', () => {
  // Utilisation de la structure de votre products.json
  const product1: Product = {
    id: 1,
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics',
    inStock: true
  };

  const product2: Product = {
    id: 2,
    name: 'Wireless Mouse',
    price: 29.99,
    category: 'Electronics',
    inStock: true
  };

  describe('calculerPrixAvecReduction', () => {
    test('devrait appliquer une réduction de 20%', () => {
      expect(calculerPrixAvecReduction(100, 20)).toBe(80);
    });

    test('devrait arrondir à 2 décimales', () => {
      expect(calculerPrixAvecReduction(99.99, 15)).toBe(84.99);
    });

    test('devrait lancer une erreur si prix négatif', () => {
      expect(() => calculerPrixAvecReduction(-10, 20)).toThrow('Le prix ne peut pas être négatif');
    });

    test('devrait lancer une erreur si réduction invalide', () => {
      expect(() => calculerPrixAvecReduction(100, -10)).toThrow('La réduction doit être comprise entre 0 et 100');
      expect(() => calculerPrixAvecReduction(100, 150)).toThrow('La réduction doit être comprise entre 0 et 100');
    });
  });

  describe('calculerPrixTotalPanier', () => {
    test('devrait retourner 0 pour un panier vide', () => {
      expect(calculerPrixTotalPanier([])).toBe(0);
    });

    test('devrait calculer le total avec plusieurs articles', () => {
      const articles = [
        { product: product1, quantity: 1 },
        { product: product2, quantity: 2 }
      ];
      expect(calculerPrixTotalPanier(articles)).toBe(1059.97);
    });

    test('devrait gérer les quantités multiples', () => {
      const articles = [
        { product: product2, quantity: 3 }
      ];
      expect(calculerPrixTotalPanier(articles)).toBe(89.97);
    });
  });

  describe('modifierQuantite', () => {
    let articles: any[];

    beforeEach(() => {
      articles = [
        { product: product1, quantity: 1 },
        { product: product2, quantity: 2 }
      ];
    });

    test('devrait incrémenter la quantité', () => {
      const resultat = modifierQuantite(articles, 1, 'incrementer');
      expect(resultat[0].quantity).toBe(2);
      expect(resultat[1].quantity).toBe(2);
    });

    test('devrait décrémenter la quantité', () => {
      const resultat = modifierQuantite(articles, 2, 'decrementer');
      expect(resultat[1].quantity).toBe(1);
      expect(resultat[0].quantity).toBe(1);
    });

    test('devrait supprimer l\'article si quantité devient 0', () => {
      const resultat = modifierQuantite(articles, 1, 'decrementer');
      expect(resultat).toHaveLength(1);
      expect(resultat[0].product.id).toBe(2);
    });

    test('devrait lancer une erreur si produit non trouvé', () => {
      expect(() => modifierQuantite(articles, 999, 'incrementer'))
        .toThrow('Produit non trouvé dans le panier');
    });
  });

  describe('produitEstDansPanier', () => {
    const articles = [{ product: product1, quantity: 1 }];

    test('devrait retourner true si produit présent', () => {
      expect(produitEstDansPanier(articles, 1)).toBe(true);
    });

    test('devrait retourner false si produit absent', () => {
      expect(produitEstDansPanier(articles, 999)).toBe(false);
    });
  });

  describe('trouverArticle', () => {
    const articles = [
      { product: product1, quantity: 1 },
      { product: product2, quantity: 2 }
    ];

    test('devrait trouver un article existant', () => {
      const article = trouverArticle(articles, 2);
      expect(article).toBeDefined();
      expect(article?.product.name).toBe('Wireless Mouse');
      expect(article?.quantity).toBe(2);
    });

    test('devrait retourner undefined si produit non trouvé', () => {
      expect(trouverArticle(articles, 999)).toBeUndefined();
    });
  });
});