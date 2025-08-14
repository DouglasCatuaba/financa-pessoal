# Guia de Deploy

Este documento descreve diferentes formas de publicar a aplicação **Finança Pessoal** em ambientes estáticos ou em nuvem.  A aplicação é completamente client‑side e requer apenas um servidor HTTP para servir os arquivos gerados pelo build.  Abaixo você encontrará instruções para GitHub Pages e sugestões para outras plataformas.

## GitHub Pages

O GitHub Pages é o alvo principal deste projeto.  Siga os passos abaixo para publicar:

1. **Crie um fork ou clone do repositório** no GitHub.
2. **Configure a base do Vite** para o nome do repositório, como já definido em `vite.config.ts` (`'/financa-pessoal/'`).
3. Execute `npm run build` para gerar o conteúdo estático na pasta `dist/`.
4. Crie um arquivo vazio `.nojekyll` dentro de `dist/` para desabilitar o processamento Jekyll no GitHub.
5. **Inicialize uma branch `gh-pages`** (se ainda não existir) e faça commit de todos os arquivos da pasta `dist/` (incluindo `.nojekyll`).  Por exemplo:

   ```bash
   git checkout --orphan gh-pages
   git reset --hard
   cp -r dist/* .
   touch .nojekyll
   git add .
   git commit -m "Deploy"
   git push origin gh-pages
   ```

6. No GitHub, acesse *Settings* → *Pages* e selecione a branch `gh-pages` como fonte, pasta `/`.
7. Após alguns minutos, o site estará disponível em `https://seu‑usuario.github.io/financa-pessoal/`.

## Outras Plataformas

A aplicação gerada pelo Vite é totalmente estática.  Portanto, você pode hospedá-la em qualquer serviço que sirva arquivos HTML/CSS/JS, como Netlify, Vercel, Surge, Firebase Hosting ou até mesmo em um bucket S3 com CloudFront.

### Netlify

1. Faça login no Netlify e crie um novo site a partir do seu repositório Git.
2. Defina o comando de build como `npm run build` e a pasta de publicação como `dist`.
3. Defina a variável de ambiente `VITE_BASE` (se desejar parametrizar o `base` no `vite.config.ts`).
4. Netlify cuidará do deploy contínuo automaticamente.

### Vercel

1. Faça login no Vercel e importe o repositório.
2. Configure o build para usar `npm run build` e a pasta `dist` como saída estática.
3. Vercel oferece preview automático para cada branch e deploy contínuo na branch principal.

### Surge

Surge é uma plataforma muito simples para sites estáticos.  Depois de instalar o CLI com `npm install -g surge` (em um ambiente com internet), execute:

```bash
npm run build
surge dist
```

Você será solicitado a escolher um domínio `*.surge.sh` e o site será publicado.

### Firebase Hosting

1. Instale as ferramentas do Firebase CLI (`npm install -g firebase-tools`) em um ambiente com acesso à internet.
2. Faça login (`firebase login`) e inicialize o projeto (`firebase init hosting`), escolhendo `dist` como diretório de hospedagem.
3. Execute `firebase deploy` para subir o site.

### Docker

Para servir a aplicação usando Docker, você pode utilizar uma imagem Nginx.  Exemplo de `Dockerfile`:

```Dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Construa e execute com:

```bash
npm run build
docker build -t financa-pessoal .
docker run --rm -p 8080:80 financa-pessoal
```

O site estará acessível em `http://localhost:8080`.

## Considerações de Segurança

- Todos os dados permanecem no navegador do usuário (IndexedDB); não há sincronização entre dispositivos.  Para backup/restore, considere implementar exportação/importação de JSON.
- O Service Worker é responsável por servir os arquivos em cache offline.  Não adicione rotas ou APIs não existentes, pois retornarão 404.
- Caso utilize importação de arquivos (CSV/JSON), valide os dados antes de persistir no banco local.