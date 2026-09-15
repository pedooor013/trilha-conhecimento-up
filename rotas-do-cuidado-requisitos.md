# Rotas do Cuidado — Levantamento de Requisitos

## 1. Visão Geral
Aplicação web voltada a crianças neurodivergentes do Ensino Fundamental, que transforma o estudo das matérias escolares em uma "trilha de conhecimento" guiada por personagens de fantasia (RPG). A criança escolhe/descobre seu personagem por meio de um quiz de personalidade e avança por trilhas de conteúdo temáticas.

## 2. Público-Alvo
- Crianças neurodivergentes, Ensino Fundamental (1º ao 9º ano).
- Matérias baseadas na matriz curricular da rede estadual/municipal de Londrina-PR.

## 3. Personagens e Matérias

| Personagem | Traço de personalidade | Matérias |
|---|---|---|
| Mago | Criatividade, intuição, imaginação | Ciências + Arte |
| Bárbaro | Coragem, força, determinação | Matemática |
| Ladino | Inteligência, estratégia, adaptação | Língua Portuguesa |
| Paladino | Empatia, justiça, proteção | Ensino Religioso + Ética |
| Arqueiro | Foco, observação, liberdade | Educação Física |
| Herói | Liderança, esperança, superação | História + Geografia |

- Cada personagem tem **voz/tom de diálogo próprio** durante as lições (personalidade textual) e **identidade visual temática própria** (cores, ilustrações, elementos de UI).
- O quiz pode ser refeito a qualquer momento — a criança pode trocar de personagem.

## 4. Fluxo do Usuário
1. **Acesso inicial**: app verifica `localStorage`.
   - Sem dado local → tela de boas-vindas → Quiz de personalidade.
   - Com dado local → retoma exatamente de onde parou (personagem ativo + última posição na trilha).
2. **Quiz de personalidade** define o personagem inicial.
3. **Seleção de matéria** dentro do universo do personagem (quando há mais de uma, ex: Ciências + Arte).
4. **Trilha linear com pré-requisitos**: tópicos avançam em sequência lógica (ex: soma/subtração antes de multiplicação/divisão).
5. **Conteúdo da lição**: texto explicativo (com a voz do personagem) → exercício/quiz de fixação → minigame interativo (quando aplicável).
6. **Conquistas**: badges visíveis ao concluir marcos da trilha.
7. A qualquer momento, a criança pode refazer o quiz e migrar de personagem sem perder o progresso das matérias já iniciadas.

## 5. Requisitos Funcionais
- RF01 — Quiz de personalidade com resultado = 1 dos 6 personagens.
- RF02 — Possibilidade de refazer o quiz e trocar de personagem livremente.
- RF03 — Progresso de aprendizagem armazenado **por matéria**, independente do personagem ativo no momento.
- RF04 — Trilhas com navegação linear/sequencial respeitando pré-requisitos de conteúdo.
- RF05 — Conteúdo por lição: texto + exercício/quiz + minigame.
- RF06 — Sistema de badges/conquistas visíveis.
- RF07 — Persistência 100% local (`localStorage`), sem backend/nuvem/banco de dados.
- RF08 — Detecção automática de dado local existente → retomar sessão; ausência de dado → iniciar do zero.
- RF09 — Cada personagem possui textos com tom/voz de diálogo distintos, refletindo sua personalidade.

## 6. Requisitos Não-Funcionais / Acessibilidade
- RNF01 — Nenhum elemento com timer ou cronômetro.
- RNF02 — Fontes e cores adaptáveis (alto contraste, fontes amigáveis à dislexia).
- RNF03 — Feedback sempre positivo/encorajador; sem indicar "erro" de forma punitiva.
- RNF04 — Telas com passos curtos e simples, uma ação principal por tela.
- RNF05 — Interface responsiva (mobile-first, já que o design de referência é mobile).

## 7. Estrutura de Dados (localStorage) — rascunho inicial
```json
{
  "perfil": {
    "personagemAtivo": "mago",
    "criadoEm": "2026-09-14"
  },
  "progresso": {
    "matematica": { "faseAtual": "multiplicacao", "concluidas": ["soma", "subtracao"] },
    "ciencias": { "faseAtual": "...", "concluidas": [] },
    "arte": { "faseAtual": "...", "concluidas": [] }
  },
  "conquistas": ["badge_soma_completa", "badge_primeira_trilha"]
}
```
*(estrutura a ser refinada na fase de modelagem de dados)*

## 8. Fora de Escopo do MVP
- Contas de usuário, login, sincronização entre dispositivos.
- Banco de dados / backend.
- Vídeos como formato de conteúdo.
- Painel para pais/professores (não mencionado ainda — validar se entra em versão futura).

## 9. Pontos em Aberto
- Confirmar se Ética fica junto do Paladino ou vira eixo próprio.
- Definir quantidade e formato das perguntas do quiz de personalidade.
- Detalhar o conteúdo pedagógico de cada fase/trilha por matéria.
