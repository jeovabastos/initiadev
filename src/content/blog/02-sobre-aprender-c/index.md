---
title: "Sobre aprender C"
description: "Domínio do sistema operacional"
date: "Sep 29 2026"
---

# Principais conceitos e referências
- Eu já uso no dia a dia typescript e havia começado a estudar rust, mas surgiu a necessidade de aprender C por conta da faculdade e da grade curricular do Open Source Society University. Mais especificamente o livro OSTEP (operating systems: three easy pieces).
- A sintaxe em si da linguagem C e seus principais componentes foram fáceis de se aprender uma vez que já conheço bem pelo menos uma linguagem com tipagem estática.
- O foco agora está em dominar o coração do C: o gerenciamento manual de memória e algumas das principais bibliotecas como a <stdio.h>, a <stdlib.h> e a <string.h>

# Pipeline de Compilação e Organização do Projeto
- Pré-processador: Substituição textual via diretivas (`#include`, `#define`, `#ifdef`) e o uso de Include Guards (`#ifndef` ou `#pragma once`).
- Separação de arquivos: Divisão clara entre interfaces (`.h`) e implementações (`.c`).
- Estágios do Pipeline: Entender o fluxo Pré-processamento $\rightarrow$ Compilação $\rightarrow$ Assembly $\rightarrow$ Linkagem (geração de arquivos `.o`, ligação com bibliotecas como `sqlite3` e o executável final via Makefile).

# Ponteiros, Endereçamento e Ponteiros Especiais
- Operadores Básicos: `&` (obter endereço) e `*` (desreferenciar/acessar valor) para passagem de parâmetros por referência nas funções de combate e menus.
- Aritmética de Ponteiros: Avançar e recuar na memória respeitando a largura em bytes do tipo do dado ao percorrer buffers e arrays.
- Ponteiros Duplos (`**p`): Uso para modificar diretamente o ponteiro de alocação da mochila/inventário dentro de funções de expansão de memória.
- Ponteiros para Funções (Callbacks): Passagem de comportamento como argumento para executar habilidades especiais dinâmicas de diferentes tipos de inimigos.

# Modelo e Gerenciamento Manual de Memória
- Stack vs. Heap: Compreender o tempo de vida e escopo das variáveis locais automáticas (Stack) versus alocações em tempo de execução para entidades expansíveis (Heap).
- Alocação e Liberação (`<stdlib.h>`): Uso obrigatorio de `malloc`, `calloc`, `realloc` para gerenciar a mochila do jogador e `free` para prevenir vazamentos.
- Erros de Memória Comuns: Evitar Memory Leaks (falta de free ao fechar o jogo/limpar inventário), Dangling Pointers, Use-After-Free e Segmentation Faults.

# Arrays, Strings e Decaimento
- Arrays: Alocação contígua de memória e o conceito de array decay (conversão implícita do array para ponteiro no primeiro elemento).
- Strings: Arrays de `char` terminados obrigatoriamente no caractere nulo (`\0`).
- Manipulação Segura: Uso das funções de `<string.h>` (`strlen`, `strcpy`, `strcmp`, `strcat`, `snprintf`) e prevenção contra Buffer Overflow usando limites claros no `scanf`/`fgets` e rotinas de limpeza de buffer (`limpar_buffer`).

# Tipos Customizados e Layout de Memória (Structs)
- `struct` e `union`: Agrupamento de dados, uso do operador `.` (instância direta) e `->` (acesso via ponteiro), além de `typedef` para aliases.
- Alinhamento e Padding: Como o compilador insere bytes invisíveis na struct para otimizar o acesso à memória pelo processador.

# Comportamento Indefinido (Undefined Behavior - UB)
- O perigo silencioso do C: Entender que erros de lógica muitas vezes não geram alertas de compilação, resultando em binários imprevisíveis.
- Gatilhos clássicos de UB: Acesso fora dos limites de arrays/inventário, leitura de variáveis não inicializadas, overflow de inteiros assinados e desreferenciamento de ponteiros nulos (`NULL`).

# Entrada/Saída e Manipulação de Arquivos
- I/O Padrão (`<stdio.h>`): `printf`, controle de `scanf` com scansets (`%[^\n]`), limpeza do `stdin` e leitura com `fgets`.
- I/O de Arquivos: Modos texto e binário para abertura, leitura de artes ASCII, escrita e fechamento de streams (`fopen`, `fgetc`, `fread`, `fwrite`, `fclose`).

# Projeto: Protonotes - gerenciador de anotações CLI + persistência via SQLite
- Para garantir a fixação dos conteúdos estudados, procuro fazer projetos simples e úteis, como esse gerenciador de notas, que funciona da seguinte forma:
- Organização em pastas: O programa cria automaticamente uma pasta específica no computador chamada notes_storage para guardar todas as suas anotações em arquivos separados (no formato .md).
- Banco de Dados Inteligente: Ele utiliza um banco de dados interno (protonotes.db) para registrar o título, o caminho do arquivo e a data de criação de cada nota, facilitando a busca rápida.
- Criação de Notas (-c): Permite criar uma nova nota informando um título e o conteúdo desejado. O sistema cria o arquivo de texto e salva o registro no banco de dados.
- Leitura de Notas (-r): Permite abrir e ler o conteúdo de uma nota específica buscando pelo seu número de identificação (ID).
- Listagem de Notas (-l): Exibe na tela uma lista com todas as notas já cadastradas, mostrando seus IDs, títulos, locais onde estão salvas e datas de criação.
- Atualização de Notas (-u): Permite alterar o conteúdo de uma nota existente utilizando o seu ID.
- Exclusão de Notas (-d): Apaga a nota tanto do banco de dados quanto o arquivo de texto correspondente do computador, usando o ID.
- Link para o código: [protonotes](https://github.com/jeovabastos/protonotes)