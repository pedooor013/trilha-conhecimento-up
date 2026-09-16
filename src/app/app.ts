import { Component, computed, signal } from '@angular/core';
import { questionBank, yearCatalog } from './question-bank';

type Screen = 'welcome' | 'quiz' | 'map' | 'lesson';
type CharacterId = 'mago' | 'barbaro' | 'ladino' | 'paladino' | 'arqueiro' | 'heroi';
type CharacterMood = 'idle' | 'speaking' | 'happy';
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

interface LocalProfile {
  character: CharacterId;
  subject: SubjectId;
  progress: ProgressData;
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
  templateUrl: './app.html',
  styleUrl: './app.scss'
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

  protected readonly characters = characters;
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

  constructor() {
    const savedProfile = this.readProfile();
    if (savedProfile) {
      this.selectedCharacter.set(savedProfile.character);
      const characterSubjects = this.character(savedProfile.character).subjects;
      this.selectedSubject.set(characterSubjects.includes(savedProfile.subject) ? savedProfile.subject : characterSubjects[0]);
      this.progress.set(savedProfile.progress);
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

  protected characterImage(mood: CharacterMood = 'idle'): string {
    return `assets/characters/${this.selectedCharacter()}-${mood}.png`;
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
      progress: this.progress()
    };

    localStorage.setItem('rotas-do-cuidado', JSON.stringify(profile));
  }
}
