# Meu Portfólio

Abra `index.html` no navegador para usar o site sem instalação ou conexão.
Para desenvolvimento, com Node.js disponível:

```sh
npm run check
npm run build
npm run dev
```

O servidor usa a porta 3000; `PORT` permite escolher outra porta.

Edite `template.html`, `style.css` e `app.js`, depois execute `npm run build`.
O comando gera `index.html` com CSS, JavaScript e retrato incorporados.
Não edite o arquivo gerado diretamente.

Para adicionar trabalhos, inclua objetos na lista de `projects.js`:

```js
{ title: 'Nome do projeto', category: 'Ecommerce', demo: false,
  image: 'assets/minha-thumbnail.png', url: 'https://exemplo.com',
  description: 'Descrição do trabalho.' }
```

Coloque a thumbnail em `assets/` e execute `npm run build`. Distribua a pasta
completa para manter as thumbnails locais disponíveis. A galeria, a alternância
automática e os detalhes usam a lista sem precisar alterar o layout.
As três entradas iniciais são demonstrações, não trabalhos reais.

Os botões de contratação abrem o WhatsApp com o serviço e o preço preenchidos.
Não há processamento de pagamento; valores e escopo são combinados na conversa.
