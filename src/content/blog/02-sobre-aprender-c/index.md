---
title: "Sobre aprender C"
description: "Domínio do sistema operacional"
date: "Sep 29 2026"
---

# 0. Principais conceitos e referências
- Eu já uso no dia a dia typescript e havia começado a estudar rust, mas surgiu a necessidade de aprender C por conta da faculdade e da grade curricular do Open Source Society University. Mais especificamente o livro OSTEP (operating systems: three easy pieces).
- A sintaxe em si da linguagem C e seus principais componentes foram fáceis de se aprender uma vez que já conheço bem pelo menos uma linguagem com tipagem estática.
- O foco agora está em dominar o coração do C: o gerenciamento manual de memória e algumas das principais bibliotecas como a <stdio.h>, a <stdlib.h> e a <string.h>

# 1. Pipeline de Compilação e Organização do Projeto
- Pré-processador: Substituição textual via diretivas (`#include`, `#define`, `#ifdef`) e o uso de Include Guards (`#ifndef` ou `#pragma once`).
- Separação de arquivos: Divisão clara entre interfaces (`.h`) e implementações (`.c`).
- Estágios do Pipeline: Entender o fluxo Pré-processamento $\rightarrow$ Compilação $\rightarrow$ Assembly $\rightarrow$ Linkagem (geração de arquivos `.o`, ligação com bibliotecas como `sqlite3` e o executável final via Makefile).

# 2. Ponteiros, Endereçamento e Ponteiros Especiais
- Operadores Básicos: `&` (obter endereço) e `*` (desreferenciar/acessar valor) para passagem de parâmetros por referência nas funções de combate e menus.
- Aritmética de Ponteiros: Avançar e recuar na memória respeitando a largura em bytes do tipo do dado ao percorrer buffers e arrays.
- Ponteiros Duplos (`**p`): Uso para modificar diretamente o ponteiro de alocação da mochila/inventário dentro de funções de expansão de memória.
- Ponteiros para Funções (Callbacks): Passagem de comportamento como argumento para executar habilidades especiais dinâmicas de diferentes tipos de inimigos.

# 3. Modelo e Gerenciamento Manual de Memória
- Stack vs. Heap: Compreender o tempo de vida e escopo das variáveis locais automáticas (Stack) versus alocações em tempo de execução para entidades expansíveis (Heap).
- Alocação e Liberação (`<stdlib.h>`): Uso obrigatorio de `malloc`, `calloc`, `realloc` para gerenciar a mochila do jogador e `free` para prevenir vazamentos.
- Erros de Memória Comuns: Evitar Memory Leaks (falta de free ao fechar o jogo/limpar inventário), Dangling Pointers, Use-After-Free e Segmentation Faults.

# 4. Arrays, Strings e Decaimento
- Arrays: Alocação contígua de memória e o conceito de array decay (conversão implícita do array para ponteiro no primeiro elemento).
- Strings: Arrays de `char` terminados obrigatoriamente no caractere nulo (`\0`).
- Manipulação Segura: Uso das funções de `<string.h>` (`strlen`, `strcpy`, `strcmp`, `strcat`, `snprintf`) e prevenção contra Buffer Overflow usando limites claros no `scanf`/`fgets` e rotinas de limpeza de buffer (`limpar_buffer`).

# 5. Tipos Customizados e Layout de Memória (Structs)
- `struct` e `union`: Agrupamento de dados, uso do operador `.` (instância direta) e `->` (acesso via ponteiro), além de `typedef` para aliases.
- Alinhamento e Padding: Como o compilador insere bytes invisíveis na struct para otimizar o acesso à memória pelo processador.

# 6. Comportamento Indefinido (Undefined Behavior - UB)
- O perigo silencioso do C: Entender que erros de lógica muitas vezes não geram alertas de compilação, resultando em binários imprevisíveis.
- Gatilhos clássicos de UB: Acesso fora dos limites de arrays/inventário, leitura de variáveis não inicializadas, overflow de inteiros assinados e desreferenciamento de ponteiros nulos (`NULL`).

# 7. Entrada/Saída e Manipulação de Arquivos
- I/O Padrão (`<stdio.h>`): `printf`, controle de `scanf` com scansets (`%[^\n]`), limpeza do `stdin` e leitura com `fgets`.
- I/O de Arquivos: Modos texto e binário para abertura, leitura de artes ASCII, escrita e fechamento de streams (`fopen`, `fgetc`, `fread`, `fwrite`, `fclose`).

# Projeto: Terminal RPG - Dungeon Crawler em C
- Objetivo: Aprender a linguagem C, seus principais conceitos e sintaxe, utilizando um RPG em CLI como contexto para a aplicação, composta por:
    - Menu de opções com `switch-case`
    - Organização em módulos (`player.h`/`.c`, `combat.h`/`.c`, `database.h`/`.c`)
    - Structs para sala, player, enemy e item
    - Inimigos com habilidades dinâmicas disparadas por ponteiros para funções
    - Sistema de inventário expansível alocado dinamicamente na Heap (`malloc`/`realloc`)
    - Derrotar enemy gera recursos usados para comprar itens na loja
    - Cada sala gera enemy com características diferentes
    - "N" salas zeram o jogo
    - Conexão com SQLite para persistência dos dados da gameplay

# Por que usar essa estrutura para aprender C?
## Separação Limpa de Responsabilidades:
- `struct player` / `struct enemy`: Gerenciam os atributos de combate em memória RAM (Stack para estados locais, Heap para o inventário).
- `struct room`: Controla a navegação e a lógica do loop do Dungeon Crawler (ponteiros/IDs para salas adjacentes e referência ao inimigo da sala atual).

## Uso Prático de Ponteiros Avançados:
- Inimigos possuem um campo de callback `void (*habilidade_especial)(player *p)` executado a cada turno.
- Funções de gerenciamento de inventário usam ponteiros duplos (`item **mochila`) para redimensionar a memória na Heap dinamicamente.

## Integração do SQLite com C (`sqlite3.h`):
- Em vez de reiniciar o jogo do zero a cada execução, salva a ficha do jogador, o inventário de itens e o progresso nas salas.

## Loop de Gameplay:
- Combate: O jogador e o inimigo trocam turnos dentro de um laço `while`.
- Recompensa: Vencer incrementa o campo `resources` do jogador.
- Loja / Inventário: O `switch` do menu permite gastar recursos para comprar itens ou expandir a mochila antes de avançar de sala.
- Condição de Vitória: Um contador de salas (`salas_limpas >= N`) encerra o jogo com uma tela de vitória.

# Arquitetura Inicial das Structs
```c
#include <stdio.h>
#include <stdlib.h>

#define NAME_SIZE 30

typedef struct item {
    char name[NAME_SIZE];
    int atk;
    int def;
    int price;
} item;

// Declaração antecipada para o ponteiro de função
struct player;

// Callback para habilidades especiais do inimigo
typedef void (*EnemySkill)(struct player *target);

typedef struct player {
    char name[NAME_SIZE];
    int hp_max;
    int hp_currently;
    int atk;
    int def;
    float resources;
    
    // Inventário dinâmico alocado na Heap
    item *inventory;
    int inventory_count;
    int inventory_cap;
} player;

typedef struct enemy {
    char name[NAME_SIZE];
    int hp;
    int atk;
    int def;
    float drop_resources;
    EnemySkill skill; // Ponteiro para função de habilidade
} enemy;

typedef struct room {
    int id;
    char description[200];
    enemy currently_enemy;
    int clean; // 0 = Inimigo vivo, 1 = Sala conquistada
} room;

```
# Transição para o SQLite
- No início do desenvolvimento, implementar o loop do jogo funcionando 100% em memória RAM (com structs locais e alocação dinâmica). Quando o fluxo de exploração, combate e loja estiver rodando liso no terminal, adicionar a camada do SQLite para:
    - Carregar a lista de itens da loja diretamente de uma tabela `itens`.
    - Salvar e carregar o estado do personagem em uma tabela `save_game`.
# Ideias para o Futuro

## Organização por módulos
- Para garantir modularidade e seguir os padrões de projetos em C, o projeto é dividido em diretórios específicos de interfaces, implementações e automação de build:
```text
/dungeon_crawler
├── include/
│   ├── player.h      # Contratos: structs de dados (player, item) e assinaturas
│   ├── combat.h      # Contratos: callbacks de habilidades e rotinas de combate
│   └── database.h    # Contratos: operações de I/O com a API do SQLite
├── src/
│   ├── player.c      # Lógica de criação, destruição e gerenciamento da Heap
│   ├── combat.c      # Loop de combate, turnos e disparo de callbacks
│   ├── database.c    # Implementação das queries SQL e conexões sqlite3
│   └── main.c        # Ponto de entrada, menu CLI e controle do fluxo geral
└── Makefile          # Automação da compilação modular e linkagem (-lsqlite3)
```
* **Separação entre Interface e Implementação:** Os arquivos em `include/` (`.h`) funcionam como contratos públicos. O `main.c` só precisa saber **o que** as funções fazem (lendo o `.h`), sem se preocupar com **como** foram implementadas (que fica isolado nos arquivos `.c`).
* **Compilação Incremental e Modular:** Ao alterar a regra de dano no `combat.c`, o compilador precisa reprocessar apenas esse arquivo para gerar o objeto `combat.o`, em vez de recompilar todo o projeto do zero.
* **Include Guards:** Cada cabeçalho `.h` utiliza diretivas de pré-processamento (`#ifndef` / `#define` / `#endif`) para evitar definições duplicadas durante a compilação.
* **Automação via Makefile:** Simplifica o pipeline de compilação. Com um único comando `make` no terminal, o gcc compila os módulos em `src/`, busca os cabeçalhos em `include/` e realiza a linkagem final com a biblioteca dinâmica do SQLite3 (`-lsqlite3`).
## CLI-IMAGE Visualizer:
- Exibir a imagem do herói no terminal usando ASCII art.
- Ler arquivos de imagem reais (PNG/JPG) e convertê-los em pixels de texto diretamente no terminal via `stb_image.h`, mapeando as cores RGB para sequências de escape ANSI do terminal.

## Sistema de "Aposentadoria" (Roguelite / New Game+):
- "Zerar" o jogo permite "aposentar" o herói, alimentando o progresso da próxima partida.
- Criar uma tabela `herdeiros` no banco. O novo herói consulta o SQLite no início: `SELECT SUM(bonus) FROM herois_aposentados;`.
- Se houver heróis no "Hall da Fama", o novo personagem nasce com atributos extras (`+2 ATK`, `+50 Recursos`) ou libera o surgimento de Enemies Raros com drops especiais.

## WebAssembly (Port para itch.io / Site Próprio):
- Usar o Emscripten (`emcc`) para compilar o código em C diretamente para WebAssembly (`.wasm`) sem alterar a lógica em C.
- O Emscripten gera o HTML/JS criando um terminal embutido no navegador (`xterm.js`).
- O SQLite roda via Wasm guardando o progresso no `LocalStorage` do navegador, permitindo publicar o jogo no itch.io para jogar direto pelo browser sem instalar nada.