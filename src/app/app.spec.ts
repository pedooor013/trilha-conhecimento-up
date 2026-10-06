import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { adventures } from './adventure-bank';

describe('App', () => {
  beforeEach(async () => {
    localStorage.removeItem('rotas-do-cuidado');
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the Guardião welcome screen', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('O reino precisa de um Guardião do Conhecimento.');
  });

  it('should provide six adventures with fifteen single-choice questions each', () => {
    expect(adventures.length).toBe(6);
    for (const adventure of adventures) {
      expect(adventure.challenges.length).toBe(15);
      for (const challenge of adventure.challenges) {
        expect(challenge.options.length).toBe(4);
        expect(challenge.correctIndex).toBeGreaterThanOrEqual(0);
        expect(challenge.correctIndex).toBeLessThan(4);
      }
    }
  });

  it('should lock the hero until the first five adventures are complete', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as unknown as {
      adventureStatus: (id: string) => string;
    };

    expect(app.adventureStatus('mago')).toBe('available');
    expect(app.adventureStatus('heroi')).toBe('locked');
  });

  it('should allow retrying after an incorrect answer without advancing', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as unknown as {
      startAdventure: (id: 'mago') => void;
      beginAdventure: () => void;
      chooseAnswer: (index: number) => void;
      challengeIndex: () => number;
      isCorrectAnswer: () => boolean | null;
    };

    app.startAdventure('mago');
    app.beginAdventure();
    app.chooseAnswer(1);

    expect(app.challengeIndex()).toBe(0);
    expect(app.isCorrectAnswer()).toBeFalse();

    app.chooseAnswer(0);

    expect(app.challengeIndex()).toBe(0);
    expect(app.isCorrectAnswer()).toBeTrue();
  });

  it('should narrate the story context, prompt, and all four answers', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as unknown as {
      startAdventure: (id: 'mago') => void;
      challengeNarrationText: () => string;
    };

    app.startAdventure('mago');
    const narration = app.challengeNarrationText();

    expect(narration).toContain('O Mago encontrou um objeto na biblioteca.');
    expect(narration).toContain('Qual destes objetos usamos para ler uma história?');
    expect(narration).toContain('Alternativa A: Livro.');
    expect(narration).toContain('Alternativa B: Colher.');
    expect(narration).toContain('Alternativa C: Sapato.');
    expect(narration).toContain('Alternativa D: Bola.');
  });

  it('should stop the current narration when the listen control is clicked again', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as unknown as {
      narrationPlaying: { set: (playing: boolean) => void; (): boolean };
      toggleNarration: (text: string, characterId: 'mago') => void;
    };
    const cancelSpeech = spyOn(window.speechSynthesis, 'cancel');
    const startSpeech = spyOn(window.speechSynthesis, 'speak');
    app.narrationPlaying.set(true);

    app.toggleNarration('Uma pergunta completa.', 'mago');

    expect(cancelSpeech).toHaveBeenCalled();
    expect(startSpeech).not.toHaveBeenCalled();
    expect(app.narrationPlaying()).toBeFalse();
  });
});
