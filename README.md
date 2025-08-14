# Finança Pessoal

Um aplicativo web progressivo (PWA) para controle financeiro pessoal.  O objetivo deste projeto é fornecer uma ferramenta simples, responsiva e 100 % estática que funcione diretamente no GitHub Pages sem a necessidade de um backend tradicional.  Ele permite que o usuário registre suas entradas e saídas, visualize o saldo do mês e tenha uma visão rápida da sua saúde financeira.

## Tecnologias

O projeto utiliza as seguintes tecnologias e bibliotecas:

- **React 18 com TypeScript** – para construção da interface de usuário.
- **Vite** – ferramenta de build e dev‑server.
- **Tailwind CSS** – sistema de design utilitário com suporte a tema claro/escuro.
- **Zustand** – gerenciamento de estado global de forma simples.
- **Dexie** – wrapper para IndexedDB usado como banco de dados local.
- **Recharts** – (opcional) para gráficos interativos.
- **vite-plugin-pwa** – geração de Service Worker e manifest para instalar a aplicação como PWA.
- **react-dropzone** – (opcional) para importação/exportação de arquivos.
- **ESLint e Prettier** – garantem qualidade e formatação de código.

## Estrutura de Pastas

```
financa-pessoal/
├── index.html            # Ponto de entrada HTML
├── package.json          # Definições de dependências e scripts
├── vite.config.ts        # Configuração do Vite e PWA
├── tailwind.config.js    # Cores, tipografia e dark mode
├── postcss.config.js     # Plugins do PostCSS
├── tsconfig.json         # Configuração TypeScript
├── public/
│   ├── manifest.webmanifest  # Manifesto PWA
│   ├── icon-192.png          # Ícone 192x192
│   └── icon-512.png          # Ícone 512x512
└── src/
    ├── index.css         # Importa Tailwind
    ├── main.tsx          # Renderiza o App
    ├── App.tsx           # Layout e navegação
    ├── components/       # Componentes reutilizáveis (Button, Input, Modal, etc.)
    ├── db/               # Configuração do IndexedDB (Dexie)
    ├── store/            # Store Zustand para transações
    ├── utils/            # Funções utilitárias (formatação, datas, cálculos)
    └── features/
        ├── dashboard/    # Tela do Dashboard
        ├── transactions/ # Modal de movimentações
        ├── recurrings/   # Recorrentes (placeholder)
        ├── budgets/      # Orçamentos (placeholder)
        ├── rules/        # Regras (placeholder)
        └── settings/     # Configurações (placeholder)
```

## Funcionalidades Implementadas

- **Layout Responsivo** – Topbar com título e botão para criar nova movimentação; navegação inferior para dispositivos móveis; alternador de tema claro/escuro salvo no `localStorage`.
- **Dashboard** – Exibe três KPIs (Saldo do mês, Entradas, Saídas) calculados com base nas movimentações do mês corrente. Os valores são formatados em BRL e atualizam automaticamente quando novas movimentações são adicionadas.
- **Modal de Movimentação** – Permite adicionar ou editar movimentações com campos para data, tipo (entrada/saída), valor, categoria, subcategoria, conta e descrição. O formulário inclui validações básicas e utiliza componentes reutilizáveis.
- **Persistência Local** – As movimentações são armazenadas via IndexedDB utilizando Dexie. O Zustand mantém o estado sincronizado em memória e persiste as alterações no banco local. Isso garante que seus dados permaneçam disponíveis mesmo após fechar o navegador (em um único dispositivo).
- **PWA** – Configuração de Service Worker e manifest para permitir instalação na tela inicial do dispositivo e funcionamento offline dos recursos estáticos.
- **Tema Escuro** – Suporte completo a dark mode através de Tailwind CSS com classe `dark` no elemento `<html>`.

## Como Executar Localmente

> **Observação:** A instalação de dependências requer acesso à internet para baixar pacotes.  Se você estiver em um ambiente sem rede, apenas copie o repositório e execute os comandos em um local com acesso ao NPM.

1. **Clone este repositório**

```bash
git clone https://github.com/seu-usuario/financa-pessoal.git
cd financa-pessoal
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute em modo de desenvolvimento**

```bash
npm run dev
```

O projeto estará acessível em `http://localhost:5173` (ou outra porta indicada).  À medida que você edita os arquivos, o Vite recarrega a página automaticamente.

4. **Gere o build de produção**

```bash
npm run build
```

O build será criado na pasta `dist/`.  Para testar localmente o build, execute `npm run preview`.

## Deploy no GitHub Pages

Este projeto foi projetado para ser publicado via GitHub Pages sem back‑end.  Siga os passos abaixo:

1. **Configure a opção `base`** no `vite.config.ts` para o nome do repositório (`'/financa-pessoal/'`), já definido neste repositório.
2. **Crie um build de produção:** `npm run build`.
3. **Inclua um arquivo `.nojekyll`** vazio na raiz da pasta `dist/`.  Isso impede que o GitHub trate os arquivos como um site Jekyll e garante que o Service Worker funcione corretamente.
4. **Faça commit do conteúdo de `dist/`** na branch `gh-pages` do repositório.  Você pode utilizar a CLI do Git ou scripts como `gh-pages` para automatizar esse processo.
5. **Ative o GitHub Pages** nas configurações do repositório, selecionando a branch `gh-pages` como fonte.  O site será servido em `https://seu-usuario.github.io/financa-pessoal/`.

Para detalhes adicionais sobre outras opções de deploy (Netlify, Vercel, Surge, Firebase, Docker), consulte o arquivo [DEPLOYMENT.md](DEPLOYMENT.md).

## Estrutura de Dados

A configuração do Dexie (`src/db/index.ts`) define quatro tabelas:

- **transactions** – movimentações individuais contendo `date`, `type` (`'entrada'` ou `'saida'`), `amount` (centavos), `category`, `subcategory`, `account`, `description`, `createdAt` e `updatedAt`.
- **recurrings** – receitas/despesas recorrentes com título, valor, categoria, dia do mês, status de ativo e controle do último lançamento.
- **budgets** – orçamentos mensais por categoria.
- **rules** – regras para categorização automática de transações.

Por enquanto, apenas a tabela de **transactions** é utilizada na versão inicial.  As outras tabelas servirão de base para futuras funcionalidades.

## Contribuindo

Contribuições são bem‑vindas!  Se você encontrar problemas ou tiver sugestões de melhorias, abra uma issue ou envie um pull request.  Antes de submeter código, certifique‑se de rodar o lint (`npm run lint`) e ajustar a formatação com o Prettier.

## Licença

Este projeto é distribuído sob a licença MIT.  Consulte o arquivo `LICENSE` (a ser adicionado) para mais detalhes.