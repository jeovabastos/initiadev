---
title: "Propositum Formarum"
description: "Gerenciador de assets digitais para ilustradores e designers."
date: "Aug 08 2026"
demoURL: "https://propositum-formarum.vercel.app/"
# repoURL: "https://github.com/markhorn-dev/astro-nano"
---

![propositum formarum](/propositumformarum.png)


- **Propositum Formarum** é um *digital asset manager* simples, rápido e confiável para ilustradores. Desenvolvido com Tauri v.2 e TypeScript/Rust via API IPC.
- Foi concebido como um *Digital Asset Manager* de alta performance, *offline* e focado em privacidade, contando com organização visual, indexação por *tags*, filtros de cor, *moodboards* e gerenciamento de notas.

## Principais Decisões de Desenvolvimento
- ***Core Stack*:** Construído utilizando Tauri v2 + Rust no *backend* com React + TypeScript no *frontend*, utilizando SQLite para armazenamento local.
- **Processamento e Performance:** Indexação pesada de arquivos, geração de *thumbnails* e consultas ao banco de dados são delegadas ao código nativo em Rust para manter a UI leve e responsiva.
- **Privacidade e *Offline-First*:** Todas as estruturas de dados e *assets* de mídia permanecem estritamente no sistema de arquivos local, sem dependência de serviços em nuvem.

## Por que escolher Tauri + Rust (Mesmo sem conhecimento prévio em Rust)?
- **Eficiência de Recursos (vs. Electron):** O Electron empacota uma instância inteira do Chromium e do *runtime* do Node.js, resultando em alto consumo de RAM e executáveis enormes. O Tauri utiliza as *WebViews* nativas do SO e compila para um binário enxuto em Rust, garantindo baixo *overhead* de memória ao lidar com grandes bibliotecas de imagens.
- ***Memory Safety* e I/O Nativo:** Indexação de arquivos, extração de metadados e persistência no SQLite exigem interação direta com o sistema de arquivos. O Rust garante *memory safety* e concorrência de alta performance sem o *overhead* de um *garbage collector*.
- **Curva de Aprendizado Estratégica:** A escolha foi deliberada para ganhar experiência prática com Rust em um projeto real com requisitos estritos de performance, aproveitando uma clara divisão de responsabilidades: uma *stack* familiar de React/TypeScript para a UI e o Rust isolado para os comandos do *backend*.

## Recursos (*Features*)
- Indexação de imagens de qualquer pasta
- Adicionar/Remover *tags* de *N* imagens
- Adicionar/Remover notas para imagens
- Entrar em modo de estudo com imagens/pastas selecionadas
- *Brainstorming* com o *moodboard* usando imagens e caneta SVG! Salve e reutilize mais tarde.