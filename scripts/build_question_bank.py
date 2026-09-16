import json
import re
import unicodedata
from pathlib import Path

root = Path(__file__).resolve().parent.parent
markdown_path = root / 'perguntas_londrina_1ao5ano.md'
output_path = root / 'src' / 'app' / 'question-bank.ts'

subject_alias = {
    'Lingua Portuguesa': 'lingua-portuguesa',
    'Matematica': 'matematica',
    'Ciencias': 'ciencias',
    'Geografia': 'geografia',
    'História': 'historia',
    'Arte': 'arte',
    'Educação Física': 'educacao-fisica',
    'Ensino Religioso': 'ensino-religioso',
    'Computação': 'computacao',
}


def normalize_subject(raw: str) -> str:
    value = re.sub(r'^[^\w]+', '', raw.strip(), flags=re.UNICODE)
    value = ''.join(character for character in unicodedata.normalize('NFD', value) if not unicodedata.combining(character))
    if value in subject_alias:
        return subject_alias[value]
    return re.sub(r'[^a-z0-9]+', '-', value.lower()).strip('-')


lines = markdown_path.read_text(encoding='utf-8').splitlines()
bank: dict[int, dict[str, list[dict[str, str]]]] = {}
current_year: int | None = None
current_subject: str | None = None

for idx, line in enumerate(lines):
    year_match = re.match(r'^#+\s*.*?(\d+)\s*º?\s*ANO', line, flags=re.I)
    if year_match:
        current_year = int(year_match.group(1))
        current_subject = None
        bank.setdefault(current_year, {})
        continue

    subject_match = re.match(r'^##\s+(.+?)\s*$', line)
    if subject_match:
        label = subject_match.group(1).strip()
        if label not in {'Resumo do banco de perguntas'}:
            current_subject = normalize_subject(label)
            bank.setdefault(current_year, {}).setdefault(current_subject, [])
        continue

    if current_year is None or current_subject is None:
        continue

    question_match = re.match(r'^\s*\d+\.\s+\*\*Pergunta:\*\*\s*(.+)$', line)
    if not question_match:
        continue

    prompt = question_match.group(1).strip()
    answer = ''
    for next_line in lines[idx + 1: idx + 25]:
        if next_line.strip().startswith('**Resposta:**'):
            answer = next_line.strip().replace('**Resposta:**', '').strip()
            break
        if next_line.startswith('## ') or next_line.startswith('# '):
            break
    if not answer:
        continue

    bank[current_year].setdefault(current_subject, []).append({
        'prompt': prompt,
        'answer': answer,
        'guidance': 'Pense no conceito principal da pergunta e tente lembrar o que foi ensinado em sala. Você consegue!',
    })

question_bank: dict[str, list[dict[str, str | int]]] = {}
for year in sorted(bank):
    questions: list[dict[str, str | int]] = []
    for subject, items in bank[year].items():
        for item in items:
            questions.append({
                'year': year,
                'subject': subject,
                'prompt': item['prompt'],
                'answer': item['answer'],
                'guidance': item['guidance'],
            })
    question_bank[str(year)] = questions

medal_order = [
    {'year': 1, 'label': '1º Ano', 'medal': 'bronze'},
    {'year': 2, 'label': '2º Ano', 'medal': 'bronze'},
    {'year': 3, 'label': '3º Ano', 'medal': 'prata'},
    {'year': 4, 'label': '4º Ano', 'medal': 'prata'},
    {'year': 5, 'label': '5º Ano', 'medal': 'ouro'},
]

content = [
    'export const questionBank = ',
    json.dumps(question_bank, ensure_ascii=False, indent=2),
    ';\n\n',
    'export const yearCatalog = ',
    json.dumps(medal_order, ensure_ascii=False, indent=2),
    ';\n',
]
output_path.write_text(''.join(content), encoding='utf-8')
print(f'Generated {sum(len(v) for v in question_bank.values())} questions across {len(question_bank)} years.')
