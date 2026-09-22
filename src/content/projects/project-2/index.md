---
title: "ProtoGuild"
description: "Forum para artistas que criam projetos."
date: "Sep 13 2026"
demoURL: "https://protoguild-frontend.vercel.app/"
---

![protoguild](/protoguild.png)

- O ProtoGuild nasceu de uma necessidade pessoal: criar um espaço livre do ruído, dos algoritmos e das distrações das redes sociais tradicionais. A ideia é simples — um fórum privado limitado a 100 membros, focado no desenvolvimento de projetos de ilustração, games, música, arte 3D, código e produção audiovisual.
- Abaixo, um panorama do conceito da plataforma, de seu funcionamento e da engenharia por trás da sua construção.

## Conceito e Dinâmica
- O ProtoGuild opera como um ecossistema de cocriação. Para garantir uma navegação familiar, a interface se inspira na estrutura do Discord, organizada em canais temáticos.

- **Artigos e Discussões:** Cada publicação funciona como um artigo próprio com uma seção dedicada de comentários.
- **Vitrine Pública:** O conteúdo dos *posts* é 100% público para visitantes, permitindo que o fórum sirva como um portfólio otimizado para SEO para os membros.
- **Membros (Pagantes):** Têm permissão para criar, editar e interagir com a comunidade.
- **Assinaturas via PIX:** Integradas via AbacatePay (planos mensais de 31 dias ou anuais de 366 dias), ativadas diretamente usando o e-mail de cadastro.

## Arquitetura Técnica e *Stack*
- A escolha da *stack* prioriza performance no *front-end*, baixo tempo de resposta (*low-latency*) nas APIs e portabilidade de dados para facilitar a manutenção independente.

**Front-end**
- **Vite + React (TypeScript):** Escolhidos pelo tempo de *build* extremamente rápido e por uma experiência de desenvolvimento (*Developer Experience* ou DX) fluida. O TypeScript garante *type safety* estrito em *posts*, *payloads* de comentários e estados de autenticação.
- **UI de Chat/Fórum:** Design de componentes leve que simula a navegação por canais e *threads* do Discord, sem o *overhead* de bibliotecas pesadas de UI.

**Back-end e Banco de Dados**
- **Fastify (Node.js/TypeScript):** Selecionado no lugar do Express por seu baixo consumo de recursos e performance superior em roteamento HTTP. O Fastify gerencia as rotas de API, *webhooks* do AbacatePay e validação de *schemas*.
- **PostgreSQL + Supabase:** O Supabase atua como a camada inicial de BaaS, gerenciando o banco de dados relacional Postgres, autenticação e armazenamento de mídias (*media storage*).

**Estratégia de Infraestrutura: O Caminho para o *Self-Hosting***
- A arquitetura atual foi planejada para evitar *vendor lock-in*. Embora o Supabase alimente a fase inicial de prototipagem, o objetivo a médio prazo é migrar toda a infraestrutura para um ambiente ***self-hosted* em uma VPS dedicada** (utilizando Docker, Coolify ou Dokku junto a uma instância isolada de PostgreSQL). 
- Como a API principal está desacoplada dentro do Fastify e o *schema* do banco de dados utiliza SQL padrão, a migração exigirá primariamente o redirecionamento de *endpoints* e variáveis de ambiente.

## *Roadmap* de Desenvolvimento
- Plataforma desenvolvida de forma independente. Recursos atualmente no *pipeline*:
    - [x] Layout base para *mobile* e *desktop*.
    - [x] Leitura pública de *posts* para visitantes.
    - [x] Criação e edição de *posts* para administradores.
    - [x] *Deploy* de *frontend* e *backend* para testes públicos.
    - [ ] Criação e edição de *posts* para membros ativos.
    - [ ] Autenticação e gerenciamento de assinaturas via PIX.
    - [ ] Exportação de *posts* em Markdown e PDF.
    - [ ] Canais de voz integrados (WebRTC).
    - [ ] Compartilhamento de tela via *live streaming*.

## Perguntas Frequentes (FAQ)
- **Por que limitar a 100 membros?**
    - Para preservar a qualidade das interações. Grupos massivos tendem a se transformar em canais de transmissão; limitar a 100 membros garante que todos se conheçam e colaborem genuinamente.
- **Os visitantes pagam para ler?**
    - Não. Todo o conteúdo da base de conhecimento e os projetos compartilhados permanecem abertos para leitura externa. A assinatura desbloqueia a criação, edição e participação ativa.

## Design System
- [Figma](https://www.figma.com/design/uye3jAiDD0o9H4pxY4Ax1G/protoguild?node-id=0-1&t=FlQAfNNnT1NI5AMJ-1)