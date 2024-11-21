import Client from 'shopify-buy';

// Configuración del cliente de Shopify
const client = Client.buildClient({
  domain: 'your-shopify-store.myshopify.com', // Tu dominio de Shopify
  storefrontAccessToken: 'your-storefront-access-token', // Token generado en Shopify
});

export default client;
