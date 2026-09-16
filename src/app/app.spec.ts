import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the RPG welcome title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Qual personagem desse mundo combina com você?');
  });

  it('should show only questions from the active subject', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as App & {
      selectedSubject: { set: (subject: string) => void };
      subjectQuestions: () => { subject: string }[];
    };

    app.selectedSubject.set('ciencias');

    expect(app.subjectQuestions().length).toBeGreaterThan(0);
    expect(app.subjectQuestions().every((question) => question.subject === 'ciencias')).toBeTrue();
  });

  it('should not keep a subject from another character', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as App & {
      selectedCharacter: { set: (character: string) => void };
      selectedSubject: { set: (subject: string) => void };
      subjectQuestions: () => { subject: string }[];
    };

    app.selectedCharacter.set('barbaro');
    app.selectedSubject.set('ciencias');

    expect(app.subjectQuestions().every((question) => question.subject === 'matematica')).toBeTrue();
  });
});
