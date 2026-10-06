import { Component, computed, signal } from '@angular/core';
import { Adventure, AdventureId, adventures } from './adventure-bank';
import { questionBank, yearCatalog } from './question-bank';

type Screen = 'welcome' | 'quiz' | 'map' | 'lesson' | 'intro' | 'challenge' | 'checkpoint' | 'artifact' | 'ending';
type CharacterId = 'mago' | 'barbaro' | 'ladino' | 'paladino' | 'arqueiro' | 'heroi';
type CharacterMood = 'idle' | 'speaking' | 'happy';
type CharacterVoiceProfile = { rate: number; pitch: number; voiceSlot: number };
type SubjectId =
  | 'matematica'
  | 'ciencias'
  | 'arte'
  | 'educacao-fisica'
  | 'lingua-portuguesa'
  | 'etica'
  | 'historia'
  | 'geografia'
  | 'ensino-religioso'
  | 'computacao';

interface SubjectInfo {
  id: SubjectId;
  label: string;
  icon: string;
  description: string;
}

interface Character {
  id: CharacterId;
  name: string;
  title: string;
  description: string;
  subjects: SubjectId[];
  icon: string;
  color: string;
  glow: string;
  voice: string;
}

interface ProgressData {
  completedLessons: string[];
  activeLesson: string;
  badges: string[];
  completedYears: number[];
}

interface GameProgress {
  currentAdventureId?: AdventureId;
  completedAdventures: AdventureId[];
  challengeProgress: Partial<Record<AdventureId, number>>;
  unlockedArtifacts: AdventureId[];
  finalCompleted: boolean;
}

interface LocalProfile {
  character: CharacterId;
  subject: SubjectId;
  progress: ProgressData;
  game?: GameProgress;
}

interface QuizQuestion {
  prompt: string;
  options: { label: string; character: CharacterId }[];
}

type CurriculumQuestion = {
  year: number;
  subject: string;
  prompt: string;
  answer: string;
  guidance: string;
};

const yearQuestionBank: Record<string, CurriculumQuestion[]> = questionBank as Record<string, CurriculumQuestion[]>;

const subjectCatalog: Record<SubjectId, SubjectInfo> = {
  matematica: { id: 'matematica', label: 'Matemática', icon: '✦', description: 'Resolver desafios e pensar com clareza.' },
  ciencias: { id: 'ciencias', label: 'Ciências', icon: '✧', description: 'Observar o mundo com curiosidade.' },
  arte: { id: 'arte', label: 'Arte', icon: '✚', description: 'Expressar ideias e imaginação.' },
  'educacao-fisica': { id: 'educacao-fisica', label: 'Educação Física', icon: '⚑', description: 'Mover-se com atenção e energia.' },
  'lingua-portuguesa': { id: 'lingua-portuguesa', label: 'Língua Portuguesa', icon: '⌁', description: 'Ler, escrever e interpretar com cuidado.' },
  etica: { id: 'etica', label: 'Ética', icon: '❖', description: 'Respeitar, escolher com justiça e empatia.' },
  historia: { id: 'historia', label: 'História', icon: '✪', description: 'Entender o passado para valorizar o presente.' },
  geografia: { id: 'geografia', label: 'Geografia', icon: '✹', description: 'Explorar lugares, mapas e culturas.' },
  'ensino-religioso': { id: 'ensino-religioso', label: 'Ensino Religioso', icon: '☼', description: 'Refletir sobre valores e convivência.' },
  computacao: { id: 'computacao', label: 'Computação', icon: '⌨', description: 'Entender tecnologias de forma crítica.' }
};

const characters: Character[] = [
  { id: 'arqueiro', name: 'Arqueiro', title: 'Olhar atento', description: 'Foco, observação e liberdade.', subjects: ['educacao-fisica', 'geografia'], icon: '✦', color: '#1f7a65', glow: '#6ce0b7', voice: 'Mire com calma. Cada passo pequeno também é uma vitória.' },
  { id: 'mago', name: 'Mago', title: 'Faísca criativa', description: 'Criatividade, intuição e imaginação.', subjects: ['ciencias', 'arte', 'computacao'], icon: '✧', color: '#5c3dcf', glow: '#b59cff', voice: 'Toda pergunta guarda uma magia escondida. Vamos descobrir juntos?' },
  { id: 'barbaro', name: 'Bárbaro', title: 'Força de vontade', description: 'Coragem, força e determinação.', subjects: ['matematica'], icon: '⚔', color: '#b9532a', glow: '#ffb26a', voice: 'Respire fundo e avance. Desafios ficam menores quando encaramos um de cada vez.' },
  { id: 'paladino', name: 'Paladino', title: 'Coração justo', description: 'Empatia, justiça e proteção.', subjects: ['etica', 'ensino-religioso'], icon: '✚', color: '#bf8a20', glow: '#ffd76a', voice: 'Aprender também é cuidar. Seu jeito de olhar o mundo tem muito valor.' },
  { id: 'ladino', name: 'Ladino', title: 'Mente esperta', description: 'Inteligência, estratégia e adaptação.', subjects: ['lingua-portuguesa'], icon: '⌁', color: '#3557b5', glow: '#8fd0ff', voice: 'Observe as pistas e escolha seu caminho. A melhor estratégia é continuar tentando.' },
  { id: 'heroi', name: 'Herói', title: 'Luz que guia', description: 'Liderança, esperança e superação.', subjects: ['historia', 'geografia'], icon: '✪', color: '#237bb8', glow: '#72d5ff', voice: 'Sua coragem inspira a jornada. Vamos abrir o próximo portal?' }
];

const characterVoiceProfiles: Record<AdventureId, CharacterVoiceProfile> = {
  mago: { rate: 0.96, pitch: 1.08, voiceSlot: 0 },
  arqueiro: { rate: 0.94, pitch: 1.01, voiceSlot: 1 },
  barbaro: { rate: 0.93, pitch: 0.9, voiceSlot: 2 },
  paladino: { rate: 0.95, pitch: 1.04, voiceSlot: 3 },
  ladino: { rate: 1, pitch: 1.1, voiceSlot: 4 },
  heroi: { rate: 0.94, pitch: 0.98, voiceSlot: 5 }
};

const quizQuestions: QuizQuestion[] = [
  { prompt: 'Quando aparece um desafio novo, o que combina mais com você?', options: [
    { label: 'Invento um jeito diferente de resolver.', character: 'mago' },
    { label: 'Vou direto e não desisto.', character: 'barbaro' },
    { label: 'Penso antes de agir e observo bem.', character: 'ladino' },
    { label: 'Cuido das pessoas e escolho o bem.', character: 'paladino' },
    { label: 'Me movo com foco e atenção.', character: 'arqueiro' },
    { label: 'Encaro a jornada com coragem e liderança.', character: 'heroi' }
  ] },
  { prompt: 'Qual tipo de missão você mais gosta?', options: [
    { label: 'Descobrir como o mundo funciona.', character: 'mago' },
    { label: 'Superar obstáculos com força.', character: 'barbaro' },
    { label: 'Entender mensagens e histórias.', character: 'ladino' },
    { label: 'Ajudar quem precisa e ser justo.', character: 'paladino' },
    { label: 'Explorar e observar tudo ao redor.', character: 'arqueiro' },
    { label: 'Guiar a equipe para frente.', character: 'heroi' }
  ] },
  { prompt: 'Em grupo, qual papel você assume?', options: [
    { label: 'Crio ideias e soluções criativas.', character: 'mago' },
    { label: 'Protejo e enfrento o desafio.', character: 'barbaro' },
    { label: 'Analiso estratégias e opções.', character: 'ladino' },
    { label: 'Cuido do bem-estar do grupo.', character: 'paladino' },
    { label: 'Estou atento aos detalhes e ao ambiente.', character: 'arqueiro' },
    { label: 'Motivo e organizo a equipe.', character: 'heroi' }
  ] },
  { prompt: 'Qual valor é mais importante para você?', options: [
    { label: 'Criatividade e imaginação.', character: 'mago' },
    { label: 'Coragem e determinação.', character: 'barbaro' },
    { label: 'Inteligência e estratégia.', character: 'ladino' },
    { label: 'Empatia e justiça.', character: 'paladino' },
    { label: 'Foco e liberdade.', character: 'arqueiro' },
    { label: 'Liderança e esperança.', character: 'heroi' }
  ] },
  { prompt: 'Como você prefere aprender?', options: [
    { label: 'Experimentando e explorando.', character: 'mago' },
    { label: 'Praticando e avançando passo a passo.', character: 'barbaro' },
    { label: 'Lendo, interpretando e pensando.', character: 'ladino' },
    { label: 'Conectando com as pessoas e o cuidado.', character: 'paladino' },
    { label: 'Observando o mundo e se movendo.', character: 'arqueiro' },
    { label: 'Com histórias e rumo claro.', character: 'heroi' }
  ] },
  { prompt: 'Se você pudesse escolher uma jornada, qual seria?', options: [
    { label: 'Explorar mistérios e inventar novas soluções.', character: 'mago' },
    { label: 'Conquistar um objetivo com força.', character: 'barbaro' },
    { label: 'Resolver enigmas e dominar estratégias.', character: 'ladino' },
    { label: 'Cuidar de todos e agir com empatia.', character: 'paladino' },
    { label: 'Aventure-se por caminhos e desafios.', character: 'arqueiro' },
    { label: 'Liderar e inspirar quem está ao redor.', character: 'heroi' }
  ] }
];

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app-game.html',
  styleUrl: './app-game.scss'
})
export class App {
  protected readonly screen = signal<Screen>('welcome');
  protected readonly quizIndex = signal(0);
  protected readonly quizScores = signal<Partial<Record<CharacterId, number>>>({});
  protected readonly selectedCharacter = signal<CharacterId>('mago');
  protected readonly selectedSubject = signal<SubjectId>('matematica');
  protected readonly selectedYear = signal<number>(1);
  protected readonly challengeIndex = signal(0);
  protected readonly answerInput = signal('');
  protected readonly feedback = signal<string>('');
  protected readonly isCorrectAnswer = signal<boolean | null>(null);
  protected readonly progress = signal<ProgressData>({
    completedLessons: [],
    activeLesson: 'matematica',
    badges: [],
    completedYears: []
  });
  protected readonly gameProgress = signal<GameProgress>({
    completedAdventures: [],
    challengeProgress: {},
    unlockedArtifacts: [],
    finalCompleted: false
  });
  protected readonly selectedAdventureId = signal<AdventureId>('mago');
  protected readonly selectedAnswer = signal<number | null>(null);
  protected readonly attemptCount = signal(0);
  protected readonly checkpointIndex = signal(0);
  protected readonly availableSpeechVoices = signal<SpeechSynthesisVoice[]>([]);
  protected readonly narrationPlaying = signal(false);
  private activeUtterance: SpeechSynthesisUtterance | null = null;

  protected readonly characters = characters;
  protected readonly adventures = adventures;
  protected readonly artifactAdventures = adventures.filter((item) => item.id !== 'heroi');
  protected readonly quizQuestions = quizQuestions;
  protected readonly subjectCatalog = subjectCatalog;
  protected readonly years = yearCatalog;

  readonly activeCharacter = computed(() => this.character(this.selectedCharacter()));
  readonly characterMood = computed<CharacterMood>(() => {
    if (this.isCorrectAnswer() === false) {
      return 'speaking';
    }

    if (this.isCorrectAnswer() === true) {
      return 'happy';
    }

    return 'idle';
  });
  readonly themeClass = computed(() => `theme-${this.selectedCharacter()}`);
  readonly activeSubjects = computed(() => this.activeCharacter().subjects.map((subjectId) => subjectCatalog[subjectId]));
  readonly currentLesson = computed(() => subjectCatalog[this.selectedSubject()]);
  readonly currentQuestion = computed(() => quizQuestions[this.quizIndex()]);
  readonly yearQuestions = computed(() => yearQuestionBank[String(this.selectedYear())] ?? []);
  readonly subjectQuestions = computed(() => {
    const activeSubjectIds = this.activeCharacter().subjects;
    const subject = activeSubjectIds.includes(this.selectedSubject())
      ? this.selectedSubject()
      : activeSubjectIds[0];

    return this.yearQuestions().filter((question) => question.subject === subject);
  });
  readonly currentChallenge = computed(() => this.subjectQuestions()[this.challengeIndex()] ?? null);
  readonly currentYearMeta = computed(() => this.years.find((item) => item.year === this.selectedYear()) ?? this.years[0]);
  readonly activeAdventure = computed(() => this.adventure(this.selectedAdventureId()));
  readonly activeAdventureChallenge = computed(() => this.activeAdventure().challenges[this.challengeIndex()] ?? this.activeAdventure().challenges[0]);
  readonly adventureCount = computed(() => this.gameProgress().challengeProgress[this.selectedAdventureId()] ?? 0);
  readonly allArtifactsUnlocked = computed(() => this.gameProgress().unlockedArtifacts.length === 5);

  constructor() {
    this.refreshSpeechVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.addEventListener('voiceschanged', () => this.refreshSpeechVoices());
    }

    const savedProfile = this.readProfile();
    if (savedProfile) {
      this.selectedCharacter.set(savedProfile.character);
      const characterSubjects = this.character(savedProfile.character).subjects;
      this.selectedSubject.set(characterSubjects.includes(savedProfile.subject) ? savedProfile.subject : characterSubjects[0]);
      this.progress.set(savedProfile.progress);
      if (savedProfile.game) {
        this.gameProgress.set({
          currentAdventureId: savedProfile.game.currentAdventureId,
          completedAdventures: Array.isArray(savedProfile.game.completedAdventures) ? savedProfile.game.completedAdventures : [],
          challengeProgress: savedProfile.game.challengeProgress ?? {},
          unlockedArtifacts: Array.isArray(savedProfile.game.unlockedArtifacts) ? savedProfile.game.unlockedArtifacts : [],
          finalCompleted: savedProfile.game.finalCompleted === true
        });
      }
      this.screen.set('map');
    } else {
      this.selectedSubject.set(this.character().subjects[0]);
    }
  }

  protected normalizeText(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  protected matchesExpected(input: string, expected: string): boolean {
    if (!input || !expected) {
      return false;
    }

    if (input === expected || expected.includes(input) || input.includes(expected)) {
      return true;
    }

    if (expected.includes('resposta pessoal')) {
      return input.length >= 3;
    }

    const expectedWords = expected
      .split(' ')
      .filter((word) => word.length > 2)
      .map((word) => word.replace(/\.$/, ''));

    return expectedWords.length > 0 && expectedWords.every((word) => input.includes(word));
  }

  protected selectCharacter(characterId: CharacterId): void {
    this.selectedCharacter.set(characterId);
    this.selectedSubject.set(this.character(characterId).subjects[0]);
  }

  protected characterImage(mood: CharacterMood = 'idle', characterId: CharacterId = this.selectedCharacter()): string {
    return `assets/characters/${characterId}-${mood}.png`;
  }

  protected adventure(id: AdventureId): Adventure {
    return adventures.find((item) => item.id === id) ?? adventures[0];
  }

  protected adventureStatus(id: AdventureId): 'locked' | 'available' | 'in_progress' | 'completed' {
    const completed = this.gameProgress().completedAdventures;
    if (completed.includes(id)) {
      return 'completed';
    }

    const index = adventures.findIndex((item) => item.id === id);
    if (index === 0 || completed.includes(adventures[index - 1].id)) {
      return (this.gameProgress().challengeProgress[id] ?? 0) > 0 ? 'in_progress' : 'available';
    }

    return 'locked';
  }

  protected startAdventure(id: AdventureId): void {
    if (this.adventureStatus(id) === 'locked') {
      return;
    }

    this.selectedAdventureId.set(id);
    this.selectedCharacter.set(id);
    this.challengeIndex.set(Math.min(this.gameProgress().challengeProgress[id] ?? 0, 14));
    this.selectedAnswer.set(null);
    this.attemptCount.set(0);
    this.feedback.set('');
    this.isCorrectAnswer.set(null);

    if (this.gameProgress().completedAdventures.includes(id)) {
      this.screen.set(id === 'heroi' && this.gameProgress().finalCompleted ? 'ending' : 'artifact');
    } else {
      this.screen.set('intro');
    }
  }

  protected beginAdventure(): void {
    this.gameProgress.update((current) => ({ ...current, currentAdventureId: this.selectedAdventureId() }));
    this.persist();
    this.screen.set('challenge');
    this.speakChallenge();
  }

  protected speak(text: string, characterId: AdventureId = this.selectedAdventureId()): void {
    if (!('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    this.activeUtterance = null;
    this.narrationPlaying.set(false);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.voice = this.voiceForCharacter(characterId) ?? null;
    utterance.rate = characterVoiceProfiles[characterId].rate;
    utterance.pitch = characterVoiceProfiles[characterId].pitch;
    this.activeUtterance = utterance;
    utterance.onstart = () => {
      if (this.activeUtterance === utterance) {
        this.narrationPlaying.set(true);
      }
    };
    utterance.onend = () => this.finishNarration(utterance);
    utterance.onerror = () => this.finishNarration(utterance);
    window.speechSynthesis.speak(utterance);
  }

  protected toggleNarration(text: string, characterId: AdventureId = this.selectedAdventureId()): void {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (this.narrationPlaying() || window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      this.activeUtterance = null;
      this.narrationPlaying.set(false);
      return;
    }

    this.speak(text, characterId);
  }

  protected toggleChallengeNarration(): void {
    this.toggleNarration(this.challengeNarrationText(), this.activeAdventure().characterId);
  }

  private finishNarration(utterance: SpeechSynthesisUtterance): void {
    if (this.activeUtterance === utterance) {
      this.activeUtterance = null;
      this.narrationPlaying.set(false);
    }
  }

  protected speakChallenge(): void {
    this.speak(this.challengeNarrationText(), this.activeAdventure().characterId);
  }

  protected challengeNarrationText(): string {
    const challenge = this.activeAdventureChallenge();
    const options = challenge.options
      .map((option, index) => `Alternativa ${['A', 'B', 'C', 'D'][index]}: ${option}.`)
      .join(' ');

    return `${challenge.context} ${challenge.prompt} As opções são: ${options}`;
  }

  protected refreshSpeechVoices(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.availableSpeechVoices.set(window.speechSynthesis.getVoices());
    }
  }

  protected voiceForCharacter(characterId: AdventureId): SpeechSynthesisVoice | undefined {
    const allVoices = this.availableSpeechVoices();
    const portugueseVoices = allVoices.filter((voice) => voice.lang.toLowerCase().startsWith('pt-br'));
    const voices = portugueseVoices.length > 0
      ? portugueseVoices
      : allVoices.filter((voice) => voice.lang.toLowerCase().startsWith('pt'));

    if (voices.length === 0) {
      return undefined;
    }

    const naturalVoices = [...voices].sort((first, second) => this.voiceQuality(second) - this.voiceQuality(first));
    return naturalVoices[characterVoiceProfiles[characterId].voiceSlot % naturalVoices.length];
  }

  protected voiceQuality(voice: SpeechSynthesisVoice): number {
    let score = voice.lang.toLowerCase() === 'pt-br' ? 4 : 0;
    if (!voice.localService) {
      score += 3;
    }
    if (/natural|neural|online|premium/i.test(voice.name)) {
      score += 6;
    }
    return score;
  }

  protected playHappySound(): void {
    if (!('AudioContext' in window)) {
      return;
    }

    try {
      const audioContext = new AudioContext();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const start = audioContext.currentTime;

      notes.forEach((frequency, index) => {
        const noteStart = start + index * 0.14;
        const oscillator = audioContext.createOscillator();
        const volume = audioContext.createGain();
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(frequency, noteStart);
        volume.gain.setValueAtTime(0.0001, noteStart);
        volume.gain.exponentialRampToValueAtTime(0.12, noteStart + 0.02);
        volume.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.2);
        oscillator.connect(volume);
        volume.connect(audioContext.destination);
        oscillator.start(noteStart);
        oscillator.stop(noteStart + 0.21);
        if (index === notes.length - 1) {
          oscillator.onended = () => void audioContext.close();
        }
      });
    } catch {
      return;
    }
  }

  protected chooseAnswer(index: number): void {
    if (this.isCorrectAnswer() === true) {
      return;
    }

    const challenge = this.activeAdventureChallenge();
    if (!challenge) {
      return;
    }

    this.selectedAnswer.set(index);
    if (index === challenge.correctIndex) {
      this.isCorrectAnswer.set(true);
      this.feedback.set(challenge.feedback);
      this.playHappySound();
      return;
    }

    const attempts = this.attemptCount() + 1;
    this.attemptCount.set(attempts);
    this.isCorrectAnswer.set(false);
    this.feedback.set(attempts >= 2
      ? `Quase! ${challenge.hint}`
      : 'Boa tentativa. Vamos observar as opções mais uma vez?');
  }

  protected continueChallenge(): void {
    if (this.isCorrectAnswer() !== true) {
      return;
    }

    const adventure = this.activeAdventure();
    const nextIndex = this.challengeIndex() + 1;
    const nextProgress: GameProgress = {
      ...this.gameProgress(),
      currentAdventureId: adventure.id,
      challengeProgress: { ...this.gameProgress().challengeProgress, [adventure.id]: nextIndex }
    };

    if (nextIndex === adventure.challenges.length) {
      nextProgress.completedAdventures = [...new Set([...nextProgress.completedAdventures, adventure.id])];
      if (adventure.id !== 'heroi' && !nextProgress.unlockedArtifacts.includes(adventure.id)) {
        nextProgress.unlockedArtifacts = [...nextProgress.unlockedArtifacts, adventure.id];
      }
      if (adventure.id === 'heroi') {
        nextProgress.finalCompleted = true;
        this.gameProgress.set(nextProgress);
        this.persist();
        this.screen.set('ending');
        return;
      }

      this.gameProgress.set(nextProgress);
      this.persist();
      this.screen.set('artifact');
      return;
    }

    this.gameProgress.set(nextProgress);
    this.challengeIndex.set(nextIndex);
    this.selectedAnswer.set(null);
    this.attemptCount.set(0);
    this.feedback.set('');
    this.isCorrectAnswer.set(null);
    this.persist();

    if (nextIndex === 5 || nextIndex === 10) {
      this.checkpointIndex.set(nextIndex === 5 ? 0 : 1);
      this.screen.set('checkpoint');
      return;
    }

    this.speakChallenge();
  }

  protected continueCheckpoint(): void {
    this.screen.set('challenge');
    this.speakChallenge();
  }

  protected returnToAdventureMap(): void {
    this.screen.set('map');
  }

  protected handleImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.hidden = true;
  }

  protected continueToMap(): void {
    this.feedback.set('');
    this.answerInput.set('');
    this.isCorrectAnswer.set(null);
    this.persist();
    this.screen.set('map');
  }

  protected startQuiz(): void {
    this.quizIndex.set(0);
    this.quizScores.set({});
    this.screen.set('quiz');
  }

  protected answerQuiz(character: CharacterId): void {
    const nextScores = { ...this.quizScores(), [character]: (this.quizScores()[character] ?? 0) + 1 };
    this.quizScores.set(nextScores);

    if (this.quizIndex() < quizQuestions.length - 1) {
      this.quizIndex.update((index) => index + 1);
      return;
    }

    const winner = (Object.entries(nextScores).sort(([, scoreA], [, scoreB]) => Number(scoreB) - Number(scoreA))[0]?.[0] ?? 'mago') as CharacterId;
    this.selectedCharacter.set(winner);
    this.persist();
    this.screen.set('map');
  }

  protected openLesson(subjectId?: SubjectId): void {
    if (subjectId) {
      this.selectedSubject.set(subjectId);
    }
    this.selectedYear.set(1);
    this.challengeIndex.set(0);
    this.feedback.set('');
    this.answerInput.set('');
    this.isCorrectAnswer.set(null);
    this.persist();
    this.screen.set('lesson');
  }

  protected startYear(year: number): void {
    this.selectedYear.set(year);
    this.challengeIndex.set(0);
    this.answerInput.set('');
    this.feedback.set('');
    this.isCorrectAnswer.set(null);
    this.screen.set('lesson');
  }

  protected handleAnswerSubmit(): void {
    const challenge = this.currentChallenge();
    if (!challenge) {
      return;
    }

    const answer = this.normalizeText(this.answerInput());
    const expected = this.normalizeText(challenge.answer);
    const isCorrect = this.matchesExpected(answer, expected);

    if (isCorrect) {
      this.isCorrectAnswer.set(true);
      const nextIndex = this.challengeIndex() + 1;
      const questions = this.subjectQuestions();

      if (nextIndex < questions.length) {
        this.challengeIndex.set(nextIndex);
        this.answerInput.set('');
        this.feedback.set(`Parabéns! ${challenge.guidance}`);
        return;
      }

      this.completeYear();
      return;
    }

    this.isCorrectAnswer.set(false);
    this.answerInput.set('');
    this.feedback.set(`Ainda não, mas você está no caminho certo. ${challenge.guidance}`);
  }

  protected completeYear(): void {
    const year = this.selectedYear();
    const completedYears = new Set(this.progress().completedYears);
    completedYears.add(year);
    const medal = this.currentYearMeta().medal;

    this.progress.update((current) => ({
      ...current,
      completedYears: [...completedYears],
      badges: current.badges.includes(`medalha-${year}`)
        ? current.badges
        : [...current.badges, `medalha-${year}`]
    }));

    this.feedback.set(`Parabéns! Você concluiu o ${this.currentYearMeta().label} e ganhou a medalha ${medal}. Continue assim!`);
    this.isCorrectAnswer.set(true);
    this.persist();
    this.screen.set('map');
  }

  protected completeLesson(): void {
    const currentProgress = this.progress();
    const lessonId = this.selectedSubject();
    const completedLessons = currentProgress.completedLessons.includes(lessonId)
      ? currentProgress.completedLessons
      : [...currentProgress.completedLessons, lessonId];

    const badges = currentProgress.badges.includes(`badge_${lessonId}`)
      ? currentProgress.badges
      : [...currentProgress.badges, `badge_${lessonId}`];

    this.progress.set({
      ...currentProgress,
      completedLessons,
      badges,
      activeLesson: lessonId
    });

    this.persist();
    this.screen.set('map');
  }

  protected changeCharacter(): void {
    this.screen.set('welcome');
  }

  protected returnToMap(): void {
    this.screen.set('map');
  }

  protected openWelcome(): void {
    this.screen.set('welcome');
  }

  protected character(id: CharacterId = this.selectedCharacter()): Character {
    return characters.find((character) => character.id === id) ?? characters[1];
  }

  protected readProfile(): LocalProfile | null {
    const stored = localStorage.getItem('rotas-do-cuidado');
    if (!stored) {
      return null;
    }

    try {
      const parsed = JSON.parse(stored) as LocalProfile;
      if (!parsed?.character || !parsed?.progress) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  protected persist(): void {
    const profile: LocalProfile = {
      character: this.selectedCharacter(),
      subject: this.selectedSubject(),
      progress: this.progress(),
      game: this.gameProgress()
    };

    localStorage.setItem('rotas-do-cuidado', JSON.stringify(profile));
  }
}
