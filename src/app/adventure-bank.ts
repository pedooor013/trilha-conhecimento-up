export type AdventureId = 'mago' | 'arqueiro' | 'barbaro' | 'paladino' | 'ladino' | 'heroi';

export interface Challenge {
  id: string;
  context: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  hint: string;
  feedback: string;
}

export interface Adventure {
  id: AdventureId;
  characterId: AdventureId;
  title: string;
  location: string;
  subjects: string;
  objective: string;
  artifact: string;
  artifactDescription: string;
  progressLabel: string;
  intro: string[];
  checkpoint: [string, string];
  successLine: string;
  challenges: Challenge[];
}

type Options = [string, string, string, string];
type QuestionInput = [prompt: string, correctIndex: number, options: Options, context?: string, hint?: string];

function buildAdventure(
  details: Omit<Adventure, 'challenges'>,
  questions: QuestionInput[]
): Adventure {
  return {
    ...details,
    challenges: questions.map(([prompt, correctIndex, options, context = '', hint = prompt], index) => ({
      id: `${details.id}_${String(index + 1).padStart(2, '0')}`,
      context,
      prompt,
      options,
      correctIndex,
      hint,
      feedback: details.successLine
    }))
  };
}

export const adventures: Adventure[] = [
  buildAdventure({
    id: 'mago', characterId: 'mago', title: 'A Poção das Cores Perdidas', location: 'Floresta Encantada',
    subjects: 'Ciências e Arte', objective: 'Preparar a poção que devolverá as cores à floresta.',
    artifact: 'Cristal das Cores', artifactDescription: 'A floresta voltou a florescer.', progressLabel: 'Ingredientes',
    intro: [
      'As flores e árvores da floresta perderam suas cores depois da tempestade.',
      'O Mago encontrou uma receita antiga, mas vários ingredientes desapareceram.',
      'Ajude a observar a natureza e preparar a Poção das Cores.'
    ], checkpoint: ['O caldeirão começa a brilhar!', 'A poção está quase pronta. Falta encontrar os últimos ingredientes.'],
    successLine: 'Muito bem! Esse ingrediente vai para o caldeirão.'
  }, [
    ['Qual destes objetos usamos para ler uma história?', 0, ['Livro', 'Colher', 'Sapato', 'Bola'], 'O Mago encontrou um objeto na biblioteca.'],
    ['Qual destes é uma planta?', 1, ['Pedra', 'Flor', 'Peixe', 'Nuvem'], 'Precisamos encontrar uma planta para a receita.'],
    ['Qual parte da planta geralmente fica debaixo da terra?', 2, ['Flor', 'Folha', 'Raiz', 'Fruto'], 'Uma flor foi encontrada perto do caldeirão.'],
    ['Qual cor normalmente encontramos nas folhas de muitas plantas?', 0, ['Verde', 'Roxo', 'Preto', 'Rosa'], 'O Mago procura uma folha saudável.'],
    ['Onde o peixe vive?', 1, ['Árvore', 'Água', 'Nuvem', 'Areia'], 'Um peixe apareceu perto do caldeirão.'],
    ['Qual atitude ajuda a cuidar da água?', 2, ['Jogar lixo no rio', 'Deixar a torneira aberta', 'Fechar a torneira', 'Jogar óleo na pia'], 'A receita pede água limpa.'],
    ['Qual parte do corpo usamos para sentir cheiros?', 0, ['Nariz', 'Pé', 'Mão', 'Joelho'], 'O Mago precisa sentir o perfume de uma flor.'],
    ['Qual destas opções também pode ser vermelha?', 0, ['Morango', 'Carvão', 'Leite', 'Arroz'], 'O caldeirão ficou vermelho.'],
    ['Azul + amarelo formam qual cor?', 0, ['Verde', 'Vermelho', 'Branco', 'Preto'], 'O Mago precisa misturar cores.'],
    ['Qual destes animais possui asas?', 1, ['Cachorro', 'Borboleta', 'Peixe', 'Gato'], 'Vários animais chegaram à torre.'],
    ['Qual destes alimentos pode nascer em uma árvore?', 0, ['Maçã', 'Queijo', 'Ovo', 'Leite'], 'A receita pede algo que vem de uma planta.'],
    ['Onde devemos jogar uma embalagem usada?', 2, ['Rio', 'Chão', 'Lixeira', 'Floresta'], 'Precisamos proteger a floresta.'],
    ['Qual formato lembra o Sol?', 0, ['Círculo', 'Quadrado', 'Triângulo', 'Retângulo'], 'O Mago desenhou três formas na receita.'],
    ['O que uma planta precisa para viver?', 0, ['Água', 'Plástico', 'Brinquedos', 'Tinta'], 'A poção está quase pronta.'],
    ['Qual atitude ajuda a cuidar da natureza?', 2, ['Quebrar plantas', 'Jogar lixo no chão', 'Cuidar das plantas', 'Desperdiçar água'], 'Último ingrediente!']
  ]),
  buildAdventure({
    id: 'arqueiro', characterId: 'arqueiro', title: 'O Caminho para Casa', location: 'Floresta dos Caminhos',
    subjects: 'Geografia e Matemática', objective: 'Encontrar os animais perdidos e reconstruir o mapa.',
    artifact: 'Bússola da Floresta', artifactDescription: 'Os caminhos e as casas dos animais foram encontrados.', progressLabel: 'Caminho descoberto',
    intro: [
      'A tempestade derrubou placas e mudou os caminhos da floresta.',
      'Vários animais se perderam, e o mapa da Arqueira ficou incompleto.',
      'Leia as pistas com ela para ajudar todos a voltar para casa.'
    ], checkpoint: ['O mapa revelou novos caminhos!', 'Estamos perto de encontrar o último animal perdido.'],
    successLine: 'Boa! Encontramos mais uma parte do caminho.'
  }, [
    ['Temos 1 coelho e encontramos mais 1. Quantos temos?', 1, ['1', '2', '3', '4'], 'Um coelho está esperando companhia.'],
    ['Qual número vem depois do 3?', 1, ['2', '4', '5', '1'], 'A trilha tem números apagados.'],
    ['Qual número vem antes do 6?', 2, ['7', '4', '5', '8'], 'Uma placa mostra o número 6.'],
    ['Existem 5 árvores e 2 caíram. Quantas ficaram?', 1, ['2', '3', '4', '5'], 'A tempestade derrubou algumas árvores.'],
    ['Qual grupo possui MAIS animais?', 1, ['2', '5', '1', '3'], 'A Arqueira compara os grupos na trilha.'],
    ['A casa está perto da árvore. Qual palavra indica posição?', 0, ['Perto', 'Bonito', 'Verde', 'Feliz'], 'Uma placa mostra onde fica uma casa.'],
    ['Qual é o lado oposto à esquerda?', 1, ['Frente', 'Direita', 'Atrás', 'Cima'], 'A Arqueira precisa seguir para o lado oposto à esquerda.'],
    ['Complete: 1, 2, 3, __.', 2, ['5', '6', '4', '2'], 'Há uma sequência de pegadas numeradas.'],
    ['Temos 2 pássaros e chegam mais 3. Quantos ficam?', 2, ['4', '6', '5', '3'], 'Mais pássaros pousaram no mapa.'],
    ['Qual forma parece uma placa redonda?', 0, ['Círculo', 'Quadrado', 'Triângulo', 'Retângulo'], 'A placa da trilha tem formato redondo.'],
    ['Qual lugar normalmente possui ruas, casas e moradores?', 0, ['Bairro', 'Oceano', 'Lua', 'Floresta'], 'O mapa mostra diferentes lugares.'],
    ['Qual objeto pode representar ruas e lugares?', 0, ['Mapa', 'Colher', 'Travesseiro', 'Copo'], 'Precisamos descobrir por onde seguir.'],
    ['Complete: 2, 4, 6, __.', 2, ['7', '9', '8', '5'], 'A Arqueira encontrou outra sequência.'],
    ['Há 7 animais. 2 foram para casa. Quantos faltam?', 1, ['4', '5', '6', '3'], 'Alguns animais já voltaram para casa.'],
    ['O último animal está atrás da árvore. Onde devemos procurar?', 1, ['Na frente', 'Atrás', 'Dentro do rio', 'No céu'], 'A última pista indica a posição do animal.']
  ]),
  buildAdventure({
    id: 'barbaro', characterId: 'barbaro', title: 'A Ponte Quebrada', location: 'Rio das Tábuas',
    subjects: 'Matemática e Ciências', objective: 'Reconstruir a ponte que conecta a vila ao reino.',
    artifact: 'Martelo da Construção', artifactDescription: 'A ponte está pronta e segura para todos.', progressLabel: 'Ponte construída',
    intro: [
      'A tempestade destruiu a ponte sobre o rio.',
      'O Bárbaro tem força de sobra, mas percebeu que precisa planejar a construção.',
      'Conte os materiais e ajude a escolher as peças certas.'
    ], checkpoint: ['Os pilares estão firmes!', 'A ponte está quase completa. Vamos conferir os últimos materiais.'],
    successLine: 'Isso! Mais uma peça da ponte está no lugar.'
  }, [
    ['Temos 2 tábuas e encontramos mais 2. Quantas temos?', 2, ['2', '3', '4', '5'], 'O Bárbaro encontrou tábuas perto do rio.'],
    ['Precisamos de 5 tábuas e temos 4. Quantas faltam?', 0, ['1', '2', '3', '4'], 'A ponte precisa de mais uma tábua.'],
    ['Qual número é maior?', 1, ['2', '8', '3', '1'], 'O Bárbaro está comparando as medidas.'],
    ['Qual número é menor?', 2, ['7', '4', '1', '9'], 'Precisamos escolher a menor medida.'],
    ['3 pedras + 2 pedras = ?', 1, ['4', '5', '6', '3'], 'Duas pedras chegaram para a construção.'],
    ['Temos 6 cordas e usamos 2. Quantas sobraram?', 2, ['3', '5', '4', '2'], 'O Bárbaro usou algumas cordas para prender as tábuas.'],
    ['Qual material vem das árvores?', 0, ['Madeira', 'Vidro', 'Metal', 'Plástico'], 'Precisamos escolher um material para a ponte.'],
    ['Qual material seria ruim para fazer uma ponte sobre um rio?', 2, ['Madeira resistente', 'Pedra', 'Papel', 'Metal'], 'A ponte precisa resistir ao vento e à água.'],
    ['Qual forma possui três lados?', 2, ['Quadrado', 'Círculo', 'Triângulo', 'Retângulo'], 'O plano da ponte mostra algumas formas.'],
    ['Qual objeto é normalmente mais pesado?', 1, ['Pena', 'Pedra', 'Folha', 'Papel'], 'O Bárbaro precisa escolher uma peça pesada.'],
    ['Complete: 5, 6, 7, __.', 1, ['9', '8', '6', '10'], 'Há uma sequência de números nas tábuas.'],
    ['Temos 4 pregos e precisamos de 7. Quantos faltam?', 2, ['2', '4', '3', '1'], 'Faltam pregos para fixar as peças.'],
    ['Duas tábuas de cada lado. Quantas tábuas são no total?', 2, ['2', '3', '4', '5'], 'A ponte terá tábuas dos dois lados.'],
    ['O que devemos fazer antes de atravessar a ponte recém-construída?', 0, ['Verificar se está segura', 'Correr', 'Pular', 'Quebrar uma tábua'], 'A construção acabou.'],
    ['A ponte precisa de 8 peças. Já colocamos 7. Quantas faltam?', 2, ['3', '2', '1', '4'], 'Falta só mais uma peça.']
  ]),
  buildAdventure({
    id: 'paladino', characterId: 'paladino', title: 'O Festival da Amizade', location: 'Vilas do Sol e da Lua',
    subjects: 'História, Português e convivência', objective: 'Fazer as duas vilas voltarem a conversar.',
    artifact: 'Medalhão da Amizade', artifactDescription: 'As duas vilas voltaram a cooperar.', progressLabel: 'Preparativos',
    intro: [
      'As Vilas do Sol e da Lua pararam de conversar depois de uma discussão.',
      'O Festival da Amizade foi cancelado.',
      'A Paladina vai ouvir os moradores. Ajude a encontrar caminhos de respeito e cooperação.'
    ], checkpoint: ['As vilas começaram a conversar!', 'Moradores das duas vilas estão preparando algo juntos.'],
    successLine: 'Boa escolha. Respeito e conversa aproximam as pessoas.'
  }, [
    ['Quando alguém está falando, devemos...', 0, ['Escutar', 'Gritar', 'Virar as costas', 'Interromper'], 'A Paladina conversa com os moradores.'],
    ['Qual expressão usamos ao pedir algo educadamente?', 1, ['Nunca', 'Por favor', 'Sai', 'Agora'], 'Um morador precisa pedir ajuda.'],
    ['Alguém ajudou você. O que podemos dizer?', 0, ['Obrigado', 'Sai', 'Não', 'Pare'], 'Um vizinho ajudou na praça.'],
    ['Duas crianças querem o mesmo brinquedo. O que podem fazer?', 1, ['Brigar', 'Dividir', 'Quebrar', 'Esconder'], 'As crianças querem brincar juntas.'],
    ['Uma criança é diferente de você. Devemos...', 0, ['Respeitá-la', 'Rir dela', 'Excluí-la', 'Ignorá-la'], 'Cada pessoa tem seu jeito.'],
    ['Pai, mãe, avós e responsáveis podem fazer parte da nossa...', 0, ['Família', 'Mochila', 'Rua', 'Escola'], 'As famílias chegaram ao festival.'],
    ['Algo que aconteceu ontem pertence ao...', 1, ['Futuro', 'Passado', 'Amanhã', 'Depois'], 'Os moradores relembram o festival anterior.'],
    ['O que está acontecendo agora é o...', 1, ['Passado', 'Presente', 'Futuro', 'Ontem'], 'A Paladina pergunta sobre este momento.'],
    ['Fotografias antigas podem ajudar a conhecer...', 0, ['O passado', 'Apenas o futuro', 'Números', 'Cores'], 'Uma moradora encontrou fotos antigas.'],
    ['Qual atitude demonstra amizade?', 0, ['Ajudar', 'Empurrar', 'Zombar', 'Gritar'], 'Os vizinhos querem voltar a ser amigos.'],
    ['Complete: “Eu gosto dos ___ amigos.”', 0, ['meus', 'azul', 'correram', 'sete'], 'A Ladina encontrou uma frase incompleta.'],
    ['Se machucamos alguém sem querer, podemos...', 0, ['Pedir desculpas', 'Rir', 'Fugir', 'Culpar outra pessoa'], 'Um morador esbarrou em outra pessoa.'],
    ['Pessoas podem ter costumes diferentes?', 0, ['Sim', 'Não', 'Somente adultos', 'Somente crianças'], 'As duas vilas têm costumes próprios.'],
    ['Qual atitude ajuda a resolver uma discussão?', 0, ['Conversar', 'Gritar', 'Bater', 'Ignorar'], 'A Paladina escuta os dois lados.'],
    ['Para as duas vilas realizarem a festa juntas, elas precisam...', 0, ['Cooperar', 'Brigar', 'Competir sempre', 'Separar todos'], 'O festival pode voltar se todos ajudarem.']
  ]),
  buildAdventure({
    id: 'ladino', characterId: 'ladino', title: 'O Mistério das Palavras Desaparecidas', location: 'Biblioteca do Reino',
    subjects: 'Língua Portuguesa e Computação', objective: 'Descobrir por que palavras estão sumindo dos livros.',
    artifact: 'Livro das Palavras', artifactDescription: 'As palavras voltaram à biblioteca.', progressLabel: 'Páginas restauradas',
    intro: [
      'Algumas palavras desapareceram dos livros da biblioteca.',
      'A Ladina encontrou pegadas entre as estantes e quer investigar.',
      'Reconstrua letras e palavras para descobrir quem está por trás do mistério.'
    ], checkpoint: ['Uma nova pista apareceu entre as páginas!', 'Estamos perto de descobrir quem levou os livros.'],
    successLine: 'Encontramos mais uma pista. A biblioteca está se recuperando.'
  }, [
    ['Qual letra começa a palavra BOLA?', 0, ['B', 'D', 'P', 'M'], 'Uma letra sumiu da primeira página.'],
    ['Qual letra começa a palavra CASA?', 1, ['S', 'C', 'A', 'T'], 'A Ladina encontrou uma palavra incompleta.'],
    ['Complete: CA + __ = CASA.', 1, ['TO', 'SA', 'BO', 'PA'], 'Duas partes da palavra foram apagadas.'],
    ['Qual palavra começa com M?', 1, ['Bola', 'Mesa', 'Casa', 'Sapo'], 'A pista começa com a letra M.'],
    ['Qual palavra termina com A?', 1, ['Sol', 'Casa', 'Mar', 'Papel'], 'Observe o final de cada palavra.'],
    ['Qual destas é uma vogal?', 2, ['B', 'T', 'A', 'P'], 'Uma vogal desapareceu do livro.'],
    ['Complete: BO + __ = BOLA.', 0, ['LA', 'SA', 'TA', 'MA'], 'A Ladina precisa completar a palavra.'],
    ['Qual palavra representa um gato?', 0, ['Gato', 'Pato', 'Rato', 'Sapo'], 'Um desenho de animal apareceu na página.'],
    ['Qual palavra representa uma casa?', 0, ['Casa', 'Bola', 'Lua', 'Peixe'], 'A pista tem o desenho de uma moradia.'],
    ['Qual frase faz sentido?', 0, ['A bola é azul.', 'Azul bola a é.', 'Bola azul é a.', 'É a azul bola.'], 'As palavras da frase ficaram fora de ordem.'],
    ['Qual sequência está em ordem crescente?', 0, ['1 → 2 → 3', '3 → 1 → 2', '2 → 3 → 1', '3 → 2 → 1'], 'A pista seguinte depende da ordem dos números.'],
    ['Na sequência ↑ → ↓, qual movimento vem depois de ↑?', 2, ['↓', '←', '→', '↑'], 'Siga a instrução da pista.'],
    ['Qual palavra possui duas sílabas?', 0, ['Casa', 'Sol', 'Flor', 'Mar'], 'Conte as partes faladas de cada palavra.'],
    ['Complete: “O gato bebe ___.”', 0, ['água', 'pedra', 'cadeira', 'lápis'], 'Uma frase ficou sem a última palavra.'],
    ['A criatura pegou os livros porque ainda não sabia...', 0, ['Ler', 'Correr', 'Pular', 'Dormir'], 'A Ladina encontrou a criatura entre os livros.']
  ]),
  buildAdventure({
    id: 'heroi', characterId: 'heroi', title: 'A Grande Festa do Reino', location: 'Praça do Reino',
    subjects: 'Revisão integrada', objective: 'Organizar uma festa em que todas as pessoas possam participar.',
    artifact: 'Estrela do Conhecimento', artifactDescription: 'O conhecimento e o trabalho em equipe restauraram o reino.', progressLabel: 'Festa preparada',
    intro: [
      'As cores voltaram, os animais estão em casa e a ponte foi reconstruída.',
      'As vilas fizeram as pazes e os livros estão completos.',
      'Ajude o Herói a preparar uma festa acessível para todo o reino.'
    ], checkpoint: ['A praça está ficando pronta!', 'Todos os artefatos estão brilhando. Falta pouco para a festa.'],
    successLine: 'Mais uma parte da festa está pronta. Todos poderão participar.'
  }, [
    ['Temos 5 amigos e chega mais 1. Quantos são?', 2, ['4', '5', '6', '7'], 'Mais um amigo chegou à praça.'],
    ['Qual palavra começa com F?', 0, ['Festa', 'Bola', 'Casa', 'Mesa'], 'O convite da festa perdeu sua primeira letra.'],
    ['Azul + amarelo formam qual cor?', 0, ['Verde', 'Roxo', 'Preto', 'Vermelho'], 'Vamos colorir a decoração da praça.'],
    ['Qual objeto mostra o caminho até a festa?', 0, ['Mapa', 'Garfo', 'Bola', 'Copo'], 'Alguns convidados precisam encontrar a praça.'],
    ['Temos 8 frutas e usamos 3. Quantas sobraram?', 1, ['4', '5', '6', '3'], 'As frutas estão sendo colocadas nas mesas.'],
    ['Onde devemos colocar o lixo da festa?', 2, ['Chão', 'Rio', 'Lixeira', 'Rua'], 'A festa também precisa cuidar da natureza.'],
    ['Uma criança quer brincar conosco. Devemos...', 0, ['Incluí-la', 'Ignorá-la', 'Rir dela', 'Mandá-la embora'], 'Todos os convidados devem se sentir bem-vindos.'],
    ['Qual alimento vem de uma planta?', 0, ['Banana', 'Queijo', 'Leite', 'Ovo'], 'Vamos escolher alimentos para a festa.'],
    ['Qual forma possui quatro lados iguais?', 1, ['Círculo', 'Quadrado', 'Triângulo', 'Oval'], 'A decoração tem várias formas.'],
    ['Complete: FES + __ = FESTA.', 0, ['TA', 'PA', 'LA', 'MA'], 'Uma palavra sumiu do convite.'],
    ['Para saber como era uma festa antigamente podemos olhar...', 0, ['Fotografias antigas', 'Somente brinquedos novos', 'O céu', 'Uma calculadora'], 'O Herói encontrou registros de festas antigas.'],
    ['O que ajuda pessoas que usam cadeira de rodas a entrar onde há escadas?', 0, ['Rampa', 'Outra escada', 'Parede', 'Buraco'], 'A entrada da praça deve ser acessível a todos.'],
    ['Qual sequência está correta?', 0, ['2, 3, 4, 5', '2, 4, 3, 5', '5, 3, 4, 2', '4, 2, 5, 3'], 'Os números das mesas precisam ficar em ordem.'],
    ['Para realizar uma festa com muitas pessoas precisamos...', 0, ['Cooperar', 'Brigar', 'Esconder objetos', 'Gritar'], 'Cada pessoa pode ajudar de um jeito.'],
    ['O que tornou possível salvar o reino?', 0, ['Conhecimento e trabalho em equipe', 'Apenas força', 'Apenas magia', 'Fazer tudo sozinho'], 'A última pergunta da jornada.']
  ])
];
