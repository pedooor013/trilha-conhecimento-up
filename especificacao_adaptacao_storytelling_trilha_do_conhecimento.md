# Especificação de Adaptação — Trilha do Conhecimento

## Reino das Seis Trilhas

> Documento-base para uma IA/agente adaptar o sistema existente ao novo storytelling e gameplay do **Trilha do Conhecimento**, preservando os personagens, imagens, poses, arquitetura e funcionalidades úteis já existentes.

---

## 1. Objetivo

O projeto **NÃO deve ser recriado do zero**.

A IA deve primeiro analisar o código existente e então adaptar progressivamente:

- fluxo;
- storytelling;
- UX/UI;
- sistema de perguntas;
- progressão;
- feedback;
- mapa;
- recompensas;
- ambientação;
- responsividade;
- acessibilidade.

O resultado precisa parecer um **jogo infantil de aventura/RPG para aprender**, e não uma plataforma escolar com um quiz.

> **Regra de ouro:** a criança não está respondendo uma prova. Ela está ajudando personagens a resolver problemas usando aquilo que aprendeu.

---

## 2. Público-alvo

**1º ano do Ensino Fundamental — Londrina/PR.**

Considerar que as crianças:

- estão em diferentes estágios de alfabetização;
- precisam de textos curtos;
- precisam de elementos visuais grandes;
- podem utilizar tablet;
- aprendem melhor com contexto e associação;
- precisam de feedback rápido;
- não devem ser punidas pelo erro;
- podem precisar ouvir perguntas em vez de apenas lê-las.

---

## 3. Preservar o projeto existente

Antes de alterar qualquer arquivo:

1. mapear a estrutura do projeto;
2. identificar framework, rotas e componentes;
3. localizar stores/services;
4. identificar autenticação e persistência;
5. localizar o sistema atual de questões;
6. localizar todos os assets;
7. localizar as imagens dos personagens;
8. localizar as poses disponíveis;
9. identificar componentes reutilizáveis;
10. produzir um plano incremental.

Não trocar framework, banco, roteador, state manager ou arquitetura principal sem necessidade real.

---

## 4. Personagens e imagens existentes

Continuar utilizando **os mesmos personagens e imagens existentes no projeto**.

Personagens:

- Arqueiro/Arqueira;
- Mago;
- Bárbaro;
- Paladino/Paladina;
- Ladino/Ladina;
- Herói.

Poses já planejadas/existentes:

- `idle`;
- `speaking`;
- `happy`.

A IA deve descobrir os nomes e caminhos reais dos arquivos.

### Proibido

- substituir personagens por emojis;
- gerar novos personagens automaticamente;
- mudar o estilo artístico;
- mudar características dos personagens;
- substituir sprites por imagens genéricas;
- renomear assets desnecessariamente.

Criar, se necessário, um mapeamento central:

```ts
const characterAssets = {
  mage: {
    idle: "...",
    speaking: "...",
    happy: "..."
  }
};
```

---

## 5. Conceito narrativo

O **Reino das Seis Trilhas** foi atingido por uma tempestade mágica.

Depois dela:

- as cores desapareceram;
- animais se perderam;
- caminhos foram destruídos;
- uma ponte caiu;
- duas vilas deixaram de conversar;
- palavras começaram a desaparecer;
- o reino ficou dividido.

O jogador é apresentado como um jovem **Guardião do Conhecimento**.

Ele deverá ajudar seis personagens.

Cada problema será resolvido usando conteúdos do 1º ano.

---

## 6. Filosofia de gameplay

Toda questão deve possuir um motivo dentro da história.

Evitar:

> Quanto é 3 + 2?

Preferir:

> O Bárbaro encontrou 3 tábuas e mais 2 estão perto do rio. Quantas tábuas teremos?

Evitar:

> Qual é o habitat do peixe?

Preferir:

> O Mago encontrou um peixe perdido. Onde devemos levá-lo?

A habilidade pedagógica é a mesma, mas existe um propósito narrativo.

---

## 7. Fluxo principal

```text
ABERTURA
   ↓
INTRODUÇÃO DO REINO
   ↓
MAPA
   ↓
AVENTURA
   ↓
CENA DO PERSONAGEM
   ↓
PROBLEMA
   ↓
DESAFIOS
   ↓
MUNDO É MODIFICADO
   ↓
CONCLUSÃO
   ↓
ARTEFATO
   ↓
MAPA RESTAURADO
   ↓
PRÓXIMA AVENTURA
   ↓
MISSÃO DO HERÓI
   ↓
REVELAÇÃO FINAL
```

---

## 8. Tela inicial

Deve ser chamativa, simples e infantil.

Utilizar:

- logo;
- personagens existentes;
- cenário de fantasia;
- animações suaves;
- CTA principal grande.

Novo jogador:

**COMEÇAR A AVENTURA**

Jogador existente:

**CONTINUAR AVENTURA**

Configurações devem ser secundárias.

---

## 9. Introdução

Dividir a história em cenas curtas.

Exemplo:

> Há muito tempo, seis trilhas mantinham o reino em equilíbrio...

Avançar.

> Até que uma enorme tempestade mágica atravessou aquelas terras.

Avançar.

> As cores desapareceram. Caminhos foram perdidos. Pontes caíram. Palavras sumiram.

Avançar.

> Agora, seis aventureiros precisam de ajuda.

Avançar.

> E um novo Guardião acaba de chegar.

Botão:

**COMEÇAR A AVENTURA**

Evitar grandes parágrafos na tela.

---

## 10. Mapa do Reino

Substituir menus frios por um **mapa de aventura**, quando compatível com a arquitetura atual.

Regiões:

1. Torre/Floresta do Mago;
2. Floresta da Arqueira;
3. Rio/Ponte do Bárbaro;
4. Vilas do Sol e da Lua;
5. Biblioteca da Ladina;
6. Praça do Reino/Herói.

Estados:

```ts
type AdventureStatus =
  | "locked"
  | "available"
  | "in_progress"
  | "completed";
```

### Bloqueada

- cadeado discreto;
- região suavizada.

### Disponível

- brilho/animação leve;
- personagem visível.

### Em andamento

- progresso temático.

### Concluída

- região restaurada;
- artefato;
- cores vivas.

---

## 11. O mapa precisa mudar

Antes das aventuras:

- floresta cinza;
- placas quebradas;
- ponte destruída;
- vilas separadas;
- biblioteca afetada;
- praça vazia.

Após as missões:

- cores retornam;
- caminhos aparecem;
- ponte é construída;
- vilas se aproximam;
- biblioteca é restaurada;
- praça recebe a festa.

O progresso deve ser **visível no mundo**.

---

## 12. Ordem das aventuras

```text
1. Mago
2. Arqueira
3. Bárbaro
4. Paladina
5. Ladina
6. Herói
```

O Herói permanece bloqueado até a conclusão das cinco primeiras aventuras.

---

# 13. Mago — A Poção das Cores Perdidas

**Conteúdos:** Ciências + Arte.

As cores desapareceram da floresta.

O Mago precisa preparar a **Poção das Cores**, mas sua receita está incompleta.

Cada resposta correta encontra ou prepara um ingrediente.

Progressão:

```text
caldeirão vazio
→ ingredientes
→ poção começa a mudar
→ efeitos mágicos
→ poção completa
→ floresta colorida
```

Progresso na interface:

**Ingredientes encontrados: 7 / 15**

Recompensa:

**Cristal das Cores**

Personalidade:

- curioso;
- inteligente;
- um pouco atrapalhado.

Feedback exemplo:

> “Perfeito! Esse ingrediente vai funcionar!”

---

# 14. Arqueira — O Caminho para Casa

**Conteúdos:** Geografia + Matemática.

A tempestade destruiu placas e caminhos. Animais ficaram perdidos.

Cada resposta revela uma parte do mapa ou ajuda um animal.

Progressão:

```text
mapa incompleto
→ caminho revelado
→ placas restauradas
→ animais retornando
→ mapa completo
```

Progresso:

**Caminho descoberto: 8 / 15**

Recompensa:

**Bússola da Floresta**

Personalidade:

- atenta;
- calma;
- exploradora.

Feedback:

> “Boa! Encontramos o caminho.”

---

# 15. Bárbaro — A Ponte Quebrada

**Conteúdos:** Matemática + Ciências.

Uma ponte foi destruída.

O Bárbaro possui força, mas precisa do conhecimento da criança para calcular e escolher materiais.

Progressão:

```text
rio
→ pilares
→ primeiras tábuas
→ estrutura
→ ponte completa
```

Progresso:

**Ponte construída: 9 / 15**

Recompensa:

**Martelo da Construção**

Mensagem:

> Força e conhecimento trabalham melhor juntos.

Personalidade:

- forte;
- divertido;
- impulsivo;
- disposto a aprender.

Feedback:

> “Isso! Agora temos material suficiente!”

---

# 16. Paladina — O Festival da Amizade

**Conteúdos:** História + Português + convivência.

As Vilas do Sol e da Lua deixaram de conversar.

A Paladina não escolhe um lado.

> “Um verdadeiro guardião primeiro escuta.”

A criança ajuda os moradores com situações envolvendo respeito, família, passado, presente, diálogo e cooperação.

Progressão:

```text
vilas separadas
→ moradores conversando
→ aproximação
→ decoração compartilhada
→ festival
```

Progresso:

**Preparativos concluídos: 10 / 15**

Recompensa:

**Medalhão da Amizade**

Personalidade:

- gentil;
- justa;
- boa ouvinte.

Feedback:

> “Ótima escolha. Conversar pode ajudar.”

---

# 17. Ladina — O Mistério das Palavras Desaparecidas

**Conteúdos:** Português + pensamento computacional.

Palavras desaparecem dos livros.

A Ladina encontra pistas pela biblioteca.

Cada acerto restaura letras, palavras ou revela uma pista.

Progressão:

```text
livros incompletos
→ letras
→ palavras
→ pistas
→ criatura encontrada
→ biblioteca restaurada
```

No final, descobrimos que a criatura não queria destruir os livros.

Ela queria aprender a ler.

Recompensa:

**Livro das Palavras**

Personalidade:

- curiosa;
- esperta;
- investigadora.

Feedback:

> “Encontramos outra pista!”

---

# 18. Herói — A Grande Festa do Reino

**Conteúdo:** revisão integrada.

O reino está restaurado.

O Herói precisa organizar uma celebração em que **todos possam participar**.

As questões recuperam habilidades das aventuras anteriores.

Progressão:

```text
praça vazia
→ mesas
→ decoração
→ caminhos
→ acessibilidade
→ convidados
→ festa completa
```

Progresso:

**Festa preparada: 12 / 15**

Personalidade:

- inspirador;
- cooperativo;
- acolhedor.

Feedback:

> “Mais uma parte da festa está pronta!”

---

## 19. Inclusão

Manter a diversidade já definida nos personagens.

O Herói utiliza cadeira de rodas.

Isso não deve ser sua única característica.

Acessibilidade aparece naturalmente.

Exemplo:

> Há escadas na entrada da praça. O que ajuda pessoas que usam cadeira de rodas a entrar?

Resposta:

**Rampa.**

A ideia é mostrar que espaços devem ser planejados para todos.

---

## 20. Final

Mostrar os cinco artefatos:

- Cristal das Cores;
- Bússola da Floresta;
- Martelo da Construção;
- Medalhão da Amizade;
- Livro das Palavras.

Eles começam a brilhar e formam a:

# ⭐ Estrela do Conhecimento

O Herói diz:

> “Agora eu entendi.”

> “Nós não precisávamos encontrar o sexto Guardião.”

> “Você era o sexto Guardião.”

Mostrar:

# GUARDIÃO DO CONHECIMENTO

Depois:

# PARABÉNS!

> Você restaurou o Reino das Seis Trilhas!

---

## 21. Quantidade de desafios

Cada aventura possui **15 questões**.

```text
Mago       15
Arqueira   15
Bárbaro    15
Paladina   15
Ladina     15
Herói      15
----------------
TOTAL      90
```

O documento de storytelling e questões deve ser utilizado como fonte do conteúdo.

---

## 22. Progressão pedagógica

### Questões 1–5

- reconhecimento;
- identificação;
- associação simples.

### Questões 6–10

- aplicação;
- pequenas operações;
- relações;
- interpretação simples.

### Questões 11–15

- situações-problema;
- integração;
- resolução narrativa.

---

## 23. Mecânica obrigatória

Todas as questões usam:

**SELEÇÃO ÚNICA**

Sempre:

- 4 alternativas;
- exatamente 1 correta.

Não implementar digitação como requisito.

Não implementar drag-and-drop como requisito.

A criança deve clicar/tocar em uma das quatro opções.

---

## 24. Tela de desafio

Estrutura conceitual:

```text
┌─────────────────────────────────────────────┐
│ progresso temático                         │
│                                             │
│ [ PERSONAGEM — pose speaking ]              │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ contexto/fala curta                    │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ PERGUNTA                                    │
│                                             │
│ [ IMAGEM + OPÇÃO ]  [ IMAGEM + OPÇÃO ]     │
│                                             │
│ [ IMAGEM + OPÇÃO ]  [ IMAGEM + OPÇÃO ]     │
│                                             │
│ 🔊 OUVIR                                    │
└─────────────────────────────────────────────┘
```

---

## 25. Cards de resposta

Priorizar cards grandes:

```text
┌────────────────┐
│                │
│     IMAGEM     │
│                │
│      FLOR      │
│                │
└────────────────┘
```

Em vez de depender de:

> B) Flor

Isso reduz a dependência da leitura.

---

## 26. Imagens nas alternativas

Sempre que fizer sentido, usar imagens.

Exemplo:

> Qual destes é uma planta?

Apresentar visualmente:

```text
[ PEDRA ] [ FLOR ]

[ PEIXE ] [ NUVEM ]
```

Texto pode acompanhar a imagem.

Não usar emojis como arte final se existirem assets adequados. Emojis são apenas exemplos neste documento.

---

## 27. Resposta correta

Fluxo:

1. bloquear múltiplos cliques;
2. destacar opção;
3. personagem muda para `happy`;
4. mostrar feedback;
5. executar consequência;
6. salvar progresso;
7. avançar.

Exemplo:

> “Muito bem! Encontramos a raiz!”

Depois:

- raiz entra no inventário;
- caldeirão reage;
- progresso aumenta.

---

## 28. Resposta incorreta

Não usar:

- “ERRADO!”;
- buzzer agressivo;
- perda de vida;
- tela vermelha;
- reinício.

Usar:

> “Quase! Vamos observar novamente?”

ou:

> “Boa tentativa! Tente mais uma vez.”

A questão continua disponível.

---

## 29. Ajuda progressiva

Primeiro erro:

> “Vamos tentar novamente?”

Segundo erro:

mostrar dica.

Terceiro erro:

destacar uma pista visual.

Exemplo:

> “Lembre-se: a raiz costuma ficar debaixo da terra.”

Não selecionar automaticamente a resposta.

---

## 30. O mundo deve reagir

Uma resposta correta precisa, sempre que possível, provocar uma consequência.

### Mago

Ingrediente entra no caldeirão.

### Arqueira

Trecho do mapa é revelado.

### Bárbaro

Nova peça aparece na ponte.

### Paladina

Moradores se aproximam ou decoração aparece.

### Ladina

Palavra retorna ao livro.

### Herói

Parte da festa é preparada.

---

## 31. Checkpoints

Não criar cutscene longa após toda pergunta.

Usar:

```text
Questões 1–5
   ↓
Cena curta

Questões 6–10
   ↓
Cena curta

Questões 11–14
   ↓
Preparação final

Questão 15
   ↓
Conclusão
```

---

## 32. Personagens durante a UI

Usar poses para reforçar estado:

```text
idle      → esperando
speaking  → explicando/perguntando
happy     → acerto/conquista
```

Criar/adaptar um componente central:

```tsx
<CharacterSprite
  character="mage"
  pose="speaking"
/>
```

Não duplicar lógica de caminhos dos assets em várias telas.

---

## 33. Storytelling curto

O texto deve ser dividido.

Evitar:

```text
[ parágrafo enorme com toda a história ]
```

Preferir:

```text
Mago:
"As cores desapareceram!"

[Continuar]

Mago:
"Existe uma poção que pode trazê-las de volta."

[Continuar]

Mago:
"Mas vou precisar da sua ajuda!"

[COMEÇAR MISSÃO]
```

---

## 34. Narração

Preparar a arquitetura para áudio:

```ts
audioUrl?: string;
```

Aplicável a:

- diálogos;
- perguntas;
- alternativas;
- feedback;
- introduções.

Adicionar botão grande:

**🔊 OUVIR**

Mesmo que a narração completa seja implementada posteriormente.

---

## 35. Visual infantil

A direção visual deve combinar:

```text
RPG infantil
+
livro ilustrado
+
mapa de aventura
+
fantasia amigável
+
cards grandes
+
personagens expressivos
+
feedback visual
```

Evitar aparência de:

```text
dashboard
+
formulário
+
tabela
+
quiz corporativo
```

---

## 36. Elementos visuais

Podem ser usados:

- pergaminhos;
- cristais;
- livros;
- folhas;
- estrelas;
- madeira;
- mapas;
- partículas mágicas;
- bandeiras;
- caminhos;
- nuvens;
- elementos da natureza.

Sem prejudicar legibilidade.

---

## 37. Cores

Primeiro analisar a paleta existente.

Não criar uma identidade completamente diferente.

Pode haver uma identidade temática por aventura.

Nunca depender apenas da cor para indicar estado.

Garantir contraste adequado.

---

## 38. Tipografia

Utilizar fontes:

- legíveis;
- grandes;
- claras;
- com caracteres facilmente distinguíveis.

Fonte decorativa apenas para títulos, se já for compatível com a identidade.

Conteúdo pedagógico deve priorizar leitura.

---

## 39. Animações

Adicionar animações curtas:

- personagem entrando;
- personagem respirando;
- card reagindo;
- estrela surgindo;
- ingrediente indo ao caldeirão;
- ponte recebendo peça;
- mapa sendo revelado;
- palavra retornando;
- artefato brilhando;
- confete na conclusão.

Evitar:

- flashes;
- movimento excessivo;
- animações longas;
- elementos que atrapalhem leitura.

Respeitar:

```css
@media (prefers-reduced-motion: reduce)
```

---

## 40. Microinterações

Exemplos:

- card sobe levemente ao hover;
- botão responde ao toque;
- opção correta dá pequeno salto;
- estrelas aparecem;
- artefato pulsa;
- personagem comemora.

Hover nunca deve ser requisito para uso.

---

## 41. Responsividade

Prioridade:

1. tablet;
2. desktop;
3. mobile.

### Desktop

```text
PERSONAGEM      PERGUNTA

                [ opção ][ opção ]
                [ opção ][ opção ]
```

### Tablet

```text
[ personagem + fala ]

[ pergunta ]

[ opção ] [ opção ]
[ opção ] [ opção ]
```

### Mobile

```text
[ personagem ]

[ fala ]

[ pergunta ]

[ opção ]
[ opção ]
[ opção ]
[ opção ]
```

---

## 42. Touch

Considerar uso em tablet.

Requisitos:

- áreas grandes;
- espaçamento;
- nenhum controle pequeno;
- nada dependente de hover;
- sem precisão motora elevada.

---

## 43. Acessibilidade

Implementar:

- HTML semântico;
- foco visível;
- teclado;
- `aria-label`;
- `alt`;
- contraste;
- redução de movimento;
- botões de áudio;
- estados que não dependem apenas de cor;
- touch targets adequados.

---

## 44. Design emocional

Personalidades:

### Mago
Curioso, inteligente, atrapalhado.

### Arqueira
Atenta, calma, exploradora.

### Bárbaro
Forte, engraçado, impulsivo, aprende com os erros.

### Paladina
Gentil, justa, boa ouvinte.

### Ladina
Curiosa, esperta, investigadora.

### Herói
Inspirador, cooperativo, acolhedor.

Diálogos devem refletir isso.

---

## 45. Não infantilizar excessivamente

Evitar linguagem de bebê.

Evitar elogios exagerados.

Preferir:

> “Boa! Encontramos outra pista.”

Não:

> “UAAAAAU! VOCÊ É O MELHOR DO UNIVERSO!!!”

A criança deve ser tratada como participante competente da aventura.

---

## 46. Progresso temático

Evitar destacar apenas:

> Questão 7/15

Usar:

- Mago → `Ingredientes 7/15`
- Arqueira → `Caminho 7/15`
- Bárbaro → `Ponte 7/15`
- Paladina → `Preparativos 7/15`
- Ladina → `Páginas 7/15`
- Herói → `Festa 7/15`

Pode existir `7/15` internamente ou de forma secundária.

---

## 47. Recompensas

Não criar economia complexa agora.

Principal recompensa:

> **ver o mundo sendo restaurado.**

Recompensas adicionais:

- artefatos;
- estrelas;
- desbloqueio de regiões;
- celebrações;
- coleção.

Não criar loja ou moedas sem justificativa pedagógica.

---

## 48. Tela de artefato

Exemplo:

```text
✨ NOVO ARTEFATO! ✨

[ imagem ]

CRISTAL DAS CORES

As cores da floresta foram restauradas!

[ CONTINUAR ]
```

Mostrar personagem em `happy`.

---

## 49. Coleção

Criar painel:

```text
TESOUROS DO GUARDIÃO

Cristal das Cores       ✓
Bússola da Floresta     ✓
Martelo da Construção   ✓
Medalhão da Amizade     🔒
Livro das Palavras      🔒
Estrela do Conhecimento 🔒
```

Utilizar assets próprios quando disponíveis.

---

## 50. Não usar vidas

Não implementar punição por erro com:

```text
❤️ ❤️ ❤️
```

Erro faz parte da aprendizagem.

---

## 51. Pontuação

Se já existir, pode permanecer internamente.

Não transformar score no objetivo principal.

Priorizar:

- narrativa;
- progresso;
- exploração;
- conquistas;
- restauração.

---

## 52. Sons e música

Preparar categorias:

```text
/audio
├── ui
├── success
├── story
├── ambient
└── narration
```

Configurações futuras/atuais:

- narração;
- música;
- efeitos.

Música deve ser suave e nunca competir com voz.

---

## 53. Configurações

Interface simples:

```text
Narração      [ON/OFF]
Música        [ON/OFF]
Efeitos       [ON/OFF]
Animações     [ON/OFF]
Texto maior   [ON/OFF]
```

Se fora do escopo inicial, estruturar o sistema para futura inclusão.

---

## 54. Loading

Não usar somente:

> Loading...

Preferir:

> Preparando sua aventura...

> Abrindo o mapa do reino...

> Procurando novas pistas...

Manter animação leve.

---

## 55. Erros técnicos

Apresentação amigável:

> Ops! O mapa não abriu desta vez.

> Vamos tentar novamente?

Botão:

**TENTAR DE NOVO**

Erros técnicos completos continuam disponíveis nos logs.

---

## 56. Conteúdo separado da interface

Não hardcodar as 90 questões diretamente nos componentes.

Criar estrutura semelhante a:

```text
data/
└── adventures/
    ├── mage
    ├── archer
    ├── barbarian
    ├── paladin
    ├── rogue
    └── hero
```

Adaptar ao padrão real do projeto.

---

## 57. Modelo de aventura

```ts
interface Adventure {
  id: string;
  characterId: string;
  title: string;
  subtitle?: string;
  subjects: string[];
  status: "locked" | "available" | "in_progress" | "completed";
  introScenes: StoryScene[];
  challenges: Challenge[];
  artifact: Artifact;
  completionScenes: StoryScene[];
}
```

---

## 58. Modelo de cena

```ts
interface StoryScene {
  id: string;
  characterId?: string;
  pose?: "idle" | "speaking" | "happy";
  background?: string;
  text: string;
  audioUrl?: string;
  event?: string;
}
```

---

## 59. Modelo de questão

```ts
interface Challenge {
  id: string;
  adventureId: string;
  subjects: string[];
  difficulty: 1 | 2 | 3;
  context?: string;
  question: string;
  questionAudioUrl?: string;
  answers: Answer[];
  correctAnswerId: string;
  correctFeedback: string;
  incorrectFeedback: string;
  hint?: string;
  successEvent?: string;
}
```

---

## 60. Alternativa

```ts
interface Answer {
  id: string;
  text?: string;
  image?: string;
  audioUrl?: string;
  alt?: string;
}
```

---

## 61. Artefato

```ts
interface Artifact {
  id: string;
  name: string;
  description: string;
  image?: string;
  unlocked: boolean;
}
```

---

## 62. Progresso

Reutilizar a persistência existente.

Conceitualmente:

```ts
interface PlayerProgress {
  currentAdventureId?: string;
  completedAdventures: string[];
  adventureProgress: Record<string, number>;
  unlockedArtifacts: string[];
  completedChallenges: string[];
  attempts?: Record<string, number>;
}
```

Salvar pelo menos:

- aventura atual;
- desafio atual;
- desafios concluídos;
- aventuras concluídas;
- artefatos;
- conclusão final.

---

## 63. Continuar aventura

Ao voltar:

```text
CONTINUAR COM O BÁRBARO

Ponte construída: 8 / 15
```

Não reiniciar sem necessidade.

---

## 64. Máquina de estados

Evitar muitos booleanos.

```ts
type ChallengeState =
  | "presenting"
  | "answering"
  | "correct"
  | "incorrect"
  | "animating"
  | "completed";
```

Fluxo:

```text
answering
→ seleção
→ validação
→ feedback
→ animação
→ save
→ completed
→ próximo
```

---

## 65. Duplo clique

Após seleção:

- bloquear clique temporariamente;
- impedir dois submits;
- reativar se incorreta;
- avançar apenas uma vez.

---

## 66. Eventos narrativos

Exemplos:

```ts
"mage:add_ingredient"
"mage:change_potion_color"

"archer:reveal_path"
"archer:return_animal"

"barbarian:add_plank"
"barbarian:complete_bridge"

"paladin:restore_friendship"
"paladin:add_decoration"

"rogue:restore_word"
"rogue:reveal_clue"

"hero:add_decoration"
"hero:build_ramp"
```

Criar sistema extensível, sem exagerar na abstração.

---

## 67. Salvamento

Salvar após:

- resposta correta;
- checkpoint;
- conclusão;
- artefato.

Refresh não deve apagar o progresso.

---

## 68. Métricas opcionais

Se houver painel administrativo/professor:

```ts
{
  challengeId,
  attempts,
  completed,
  firstTryCorrect,
  timestamp
}
```

Não apresentar isso à criança de forma punitiva.

---

## 69. Performance

O visual não pode tornar o jogo pesado.

Priorizar:

- otimização de imagens;
- preload seletivo;
- lazy loading;
- CSS para animações simples;
- poucos rerenders;
- dependências leves;
- funcionamento em computadores escolares modestos.

Pré-carregar assets da próxima cena quando possível.

---

## 70. Expansão futura

A arquitetura deve permitir:

- 2º ano;
- 3º ano;
- 4º ano;
- 5º ano;
- novas aventuras;
- novas questões;
- novos personagens.

Não implementar agora.

Apenas não bloquear essa evolução.

Estrutura conceitual:

```text
grade
└── adventures
    └── adventure
        ├── scenes
        ├── challenges
        ├── artifact
        └── rewards
```

---

# 71. Estratégia obrigatória de migração

## Etapa 1 — Auditoria

Analisar:

- estrutura;
- componentes;
- rotas;
- estilos;
- assets;
- personagens;
- sistema atual de quiz;
- progresso;
- autenticação;
- backend;
- persistência.

Antes de alterar muito código, produzir um plano curto.

## Etapa 2 — Modelagem

Implementar/adaptar:

- Adventure;
- StoryScene;
- Challenge;
- Answer;
- Artifact;
- PlayerProgress.

## Etapa 3 — Assets

Centralizar:

- personagens;
- poses;
- cenários;
- artefatos.

## Etapa 4 — Navegação

Implementar:

- abertura;
- mapa;
- regiões;
- bloqueios;
- continuar aventura.

## Etapa 5 — Storytelling

Implementar:

- cenas;
- falas;
- poses;
- checkpoints.

## Etapa 6 — Gameplay

Implementar:

- 4 cards;
- validação;
- tentativa;
- feedback;
- eventos;
- progresso.

## Etapa 7 — Conteúdo

Migrar as **90 questões** do documento pedagógico/storytelling.

## Etapa 8 — Recompensas

Implementar:

- artefatos;
- coleção;
- desbloqueios.

## Etapa 9 — Final

Implementar:

- missão do Herói;
- Estrela do Conhecimento;
- revelação do jogador.

## Etapa 10 — Polimento

Revisar:

- responsividade;
- animações;
- acessibilidade;
- performance;
- sons;
- erros;
- regressões.

---

# 72. Critérios de aceitação — visual

- [ ] personagens atuais preservados;
- [ ] poses utilizadas;
- [ ] aparência de jogo de aventura;
- [ ] mapa de progressão;
- [ ] regiões visualmente diferentes;
- [ ] cards grandes;
- [ ] textos curtos;
- [ ] tablet funcional;
- [ ] desktop funcional;
- [ ] mobile funcional;
- [ ] feedback visual;
- [ ] interface não parece formulário/quiz tradicional.

---

# 73. Critérios de aceitação — gameplay

- [ ] 4 alternativas;
- [ ] 1 correta;
- [ ] erro permite nova tentativa;
- [ ] acerto modifica o mundo;
- [ ] progresso salvo;
- [ ] continuar aventura funciona;
- [ ] 15 desafios por personagem;
- [ ] artefato após conclusão;
- [ ] Herói bloqueado até as anteriores;
- [ ] final narrativo implementado.

---

# 74. Critérios de aceitação — pedagógico

- [ ] adequado ao 1º ano;
- [ ] baixa dependência de leitura quando possível;
- [ ] imagens utilizadas;
- [ ] erro não é punição;
- [ ] perguntas contextualizadas;
- [ ] conhecimento resolve problemas;
- [ ] inclusão natural;
- [ ] dificuldade progressiva.

---

# 75. Critérios de aceitação — técnico

- [ ] aplicação continua executando;
- [ ] sem erros críticos no console;
- [ ] assets funcionando;
- [ ] sem duplicação desnecessária;
- [ ] questões separadas da UI;
- [ ] progresso persistido;
- [ ] clique duplo tratado;
- [ ] refresh preserva progresso;
- [ ] imagens otimizadas;
- [ ] arquitetura existente respeitada.

---

# 76. Critérios de aceitação — acessibilidade

- [ ] foco visível;
- [ ] labels;
- [ ] `alt`;
- [ ] contraste;
- [ ] teclado;
- [ ] redução de movimento;
- [ ] touch targets grandes;
- [ ] estado não depende apenas de cor.

---

# 77. Checklist de cada tela

Antes de finalizar:

1. Parece uma aventura ou um quiz?
2. Existe motivo narrativo?
3. O personagem está presente?
4. O objetivo está claro?
5. Existe texto demais?
6. O CTA principal é óbvio?
7. As opções são grandes?
8. A resposta modifica o mundo?
9. Os assets atuais estão sendo usados?
10. É divertido sem ficar confuso?

---

# 78. Checklist de cada questão

```text
[ ] contexto narrativo
[ ] pergunta
[ ] exatamente 4 alternativas
[ ] exatamente 1 correta
[ ] linguagem adequada
[ ] imagem quando útil
[ ] feedback correto
[ ] feedback de tentativa
[ ] dica quando necessária
[ ] consequência narrativa
[ ] progresso salvo
```

---

# 79. Prioridades

## P0 — Obrigatório

- reutilizar projeto;
- personagens existentes;
- storytelling;
- mapa;
- aventuras;
- 4 alternativas;
- feedback;
- progresso;
- 90 questões;
- artefatos;
- missão final;
- responsividade.

## P1 — Importante

- animações;
- imagens nas alternativas;
- poses;
- checkpoints;
- coleção;
- acessibilidade;
- preload.

## P2 — Evolução

- narração completa;
- música;
- efeitos avançados;
- métricas;
- painel de professor;
- outras séries.

Não atrasar P0 por funcionalidades P2.

---

# 80. Exemplo completo

O jogador entra na região do Mago.

A floresta está sem cor.

Mago em `speaking`:

> “Guardião! Minha receita diz que precisamos de uma planta. Você consegue encontrar uma?”

Quatro cards aparecem:

```text
[ pedra ] [ flor ]

[ peixe ] [ nuvem ]
```

### Acerto

Criança seleciona flor.

- card recebe destaque;
- Mago muda para `happy`;
- pequenas estrelas aparecem.

> “Isso! Uma flor!”

A flor vai até a mochila/cal­deirão.

```text
Ingredientes: 1 / 15
```

O mundo reage.

### Erro

Criança seleciona pedra.

Feedback suave:

> “Quase! Procure algo que seja uma planta.”

Nenhuma vida é perdida.

A criança tenta novamente.

---

# 81. Resultado esperado

Uma pessoa deve abrir o projeto e pensar:

> **“Isso é um jogo de aventura para aprender.”**

e não:

> **“Isso é um site de perguntas com personagens.”**

Essa diferença deve orientar toda decisão de desenvolvimento.

---

# 82. Instrução final para a IA desenvolvedora

Ao receber este documento e o repositório:

1. não comece reescrevendo tudo;
2. analise primeiro;
3. descubra a arquitetura real;
4. descubra os assets reais;
5. preserve personagens e poses;
6. identifique o fluxo atual;
7. identifique a persistência;
8. compare o sistema com esta especificação;
9. crie um plano incremental;
10. implemente em pequenas etapas;
11. teste após cada etapa;
12. preserve funcionalidades úteis;
13. não invente novos conteúdos pedagógicos;
14. use o documento das 90 questões como fonte;
15. priorize simplicidade;
16. faça respostas modificarem o mundo;
17. use storytelling como gameplay;
18. mantenha acessibilidade;
19. mantenha performance;
20. mantenha responsividade.

---

# 83. Regra de ouro

> **A criança não está respondendo uma prova.**

> **Ela está ajudando personagens a salvar um mundo usando aquilo que aprendeu.**

---

# 84. Visão final

O Mago ensina a observar.

A Arqueira ensina a encontrar caminhos.

O Bárbaro mostra que raciocínio também é força.

A Paladina mostra o valor de ouvir e respeitar.

A Ladina mostra o poder das palavras.

O Herói mostra que todos podem participar.

No final, a criança descobre que não estava apenas ajudando os heróis.

Ela também fazia parte da história.

# ⭐ O jogador é o Guardião do Conhecimento.
