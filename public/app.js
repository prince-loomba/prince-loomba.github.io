const cases = [
  {
    slug: 'lantern-heist',
    title: 'Lantern Heist',
    difficulty: 'Easy',
    summary: 'A museum lantern vanished before the evening gala. The trail points to a suspect with a strong motive and a clue in the conservatory.',
    story: 'At the grand reopening of the Ashford Museum, the centerpiece lantern vanished just before the first speech. The room was packed with patrons, and the theft unfolded in a space that should have been tightly watched. The scene feels calculated rather than frantic, as though someone had already planned their path through the evening.',
    objective: 'Identify the suspect who best fits the records surrounding the missing lantern.',
    hint: 'Use the evidence_items table and the suspect records to match the conservatory clue to the right person.',
    challenge: {
      title: 'Trace the conservatory lead',
      prompt: 'Find the suspect whose evidence item was found in the conservatory and who is marked as a primary suspect.',
      expected_sql: "SELECT s.name FROM suspects s JOIN evidence_items e ON e.suspect_id = s.id JOIN locations l ON l.id = e.location_id WHERE l.name = 'Conservatory' AND s.status = 'Primary'",
      // Source-only misdirection: the museum title is not the clue, even though it appears first in the file.
      sourceOnlyDecoys: ['The line about the private sale is a false trail.', 'The first suspect in the array is not the answer.'],
      resultRows: [{ name: 'Nora Pike' }],
      walkthrough: [
        'Start with the evidence_items table and filter for the location named Conservatory.',
        'That identifies the clue tied to the scene of the theft.',
        'Join that result to suspects through the shared suspect relationship to bring in the suspect profile.',
        'Finally, filter suspects where status is Primary to isolate the main suspect.'
      ]
    },
    suspects: [
      { name: 'Nora Pike', occupation: 'Curator', motive: 'Needed the lantern for a private sale.', status: 'Primary' },
      { name: 'Elias Hart', occupation: 'Security Guard', motive: 'Wanted the museum to look careless.', status: 'Secondary' },
      { name: 'Mei Chen', occupation: 'Photographer', motive: 'Needed a dramatic backdrop for a story.', status: 'Observer' }
    ],
    locations: [
      { name: 'Conservatory', category: 'Gallery' },
      { name: 'Loading Dock', category: 'Service' },
      { name: 'Archive Room', category: 'Storage' }
    ],
    evidence: [
      { item_name: 'Silver wire', description: 'A strand of silver wire found near the lantern display.', location_name: 'Conservatory', suspect_name: 'Nora Pike' },
      { item_name: 'Ink-stained cuff', description: 'A cuff with blue-black ink from the loading dock.', location_name: 'Loading Dock', suspect_name: 'Elias Hart' },
      { item_name: 'Broken seal', description: 'A wax seal from an archive crate.', location_name: 'Archive Room', suspect_name: 'Mei Chen' }
    ],
    alibis: [
      { suspect_name: 'Nora Pike', location_name: 'Archive Room', timeframe: '19:00-19:30', description: 'She catalogued records during the first half of the gala.' },
      { suspect_name: 'Elias Hart', location_name: 'Loading Dock', timeframe: '19:10-19:45', description: 'He inspected the freight elevator after the alarms squealed.' },
      { suspect_name: 'Mei Chen', location_name: 'Conservatory', timeframe: '19:20-19:50', description: 'She stayed near the display to capture the lantern lighting.' }
    ],
    witnesses: [
      { witness_name: 'Ava Reed', statement_text: 'I saw the curator touch the display case before the lights dimmed.', suspect_name: 'Nora Pike' },
      { witness_name: 'Ben Ortiz', statement_text: 'The security guard lingered by the freight elevator during the theft window.', suspect_name: 'Elias Hart' },
      { witness_name: 'Jules Moran', statement_text: 'The photographer asked for the lantern to be lit for one last shot.', suspect_name: 'Mei Chen' }
    ]
  },
  {
    slug: 'midnight-ink',
    title: 'Midnight Ink',
    difficulty: 'Medium',
    summary: 'A novelist vanished after leaving a trail of ink across the old library. Two witnesses and one fragment of evidence conflict.',
    story: 'When the lights flickered in the old library, the novelist Daniel Voss was last seen reading by the fireplace. A disturbed reading spot and a trace of ink on the floor suggested someone had been close enough to move through the room without drawing attention. The mystery sits in the details left behind between the shelves.',
    objective: 'Find the suspect whose record best matches the clues left in the library.',
    hint: 'Cross-reference the witness statements and evidence items to find the suspect who appears in both.',
    challenge: {
      title: 'Cross-check the witness lead',
      prompt: 'Find the suspect named by the witness who spoke about the ink-stained cuff and whose evidence item was also tied to it.',
      expected_sql: "SELECT s.name FROM suspects s JOIN witness_statements w ON w.suspect_id = s.id JOIN evidence_items e ON e.suspect_id = s.id WHERE w.witness_name = 'Dr. Ruan' AND e.item_name = 'Ink-stained cuff'",
      // Source-only misdirection: the rose clue is a decorative trap left for curious readers.
      sourceOnlyDecoys: ['The rose note looks important, but it never participates in the answer.', 'The witness name is only useful after the evidence item filter.'],
      resultRows: [{ name: 'Theo Bennett' }],
      walkthrough: [
        'Begin with witness_statements and look for the statement from Dr. Ruan.',
        'That points you to the suspect connected to the witness account.',
        'Then join evidence_items and filter for the item named Ink-stained cuff.',
        'The overlap confirms the suspect whose evidence and witness story line up.'
      ]
    },
    suspects: [
      { name: 'Theo Bennett', occupation: 'Night Porter', motive: 'He wanted the writer to leave town.', status: 'Primary' },
      { name: 'Iris Vale', occupation: 'Archivist', motive: 'She feared the novel would expose a family secret.', status: 'Secondary' },
      { name: 'Lena Cruz', occupation: 'Journalist', motive: 'She needed an exclusive interview.', status: 'Observer' }
    ],
    locations: [
      { name: 'Reading Room', category: 'Library' },
      { name: 'Roof Terrace', category: 'Exterior' },
      { name: 'Archive Vault', category: 'Storage' }
    ],
    evidence: [
      { item_name: 'Ink-stained cuff', description: 'A cuff marked with blue-black ink.', location_name: 'Reading Room', suspect_name: 'Theo Bennett' },
      { item_name: 'Pressed rose', description: 'A rose folded into the archivist’s notes.', location_name: 'Archive Vault', suspect_name: 'Iris Vale' },
      { item_name: 'Glass shard', description: 'A sliver of glass from the terrace door.', location_name: 'Roof Terrace', suspect_name: 'Lena Cruz' }
    ],
    alibis: [
      { suspect_name: 'Theo Bennett', location_name: 'Reading Room', timeframe: '22:15-23:00', description: 'He worked the service corridor while the writer read a manuscript.' },
      { suspect_name: 'Iris Vale', location_name: 'Archive Vault', timeframe: '22:20-23:10', description: 'She handled old ledgers until the alarm chime sounded.' },
      { suspect_name: 'Lena Cruz', location_name: 'Roof Terrace', timeframe: '22:30-23:25', description: 'She waited for the moonrise and collected notes from the terrace.' }
    ],
    witnesses: [
      { witness_name: 'Dr. Ruan', statement_text: 'The porter carried an ink-stained cuff into the reading room before the lights flickered.', suspect_name: 'Theo Bennett' },
      { witness_name: 'Mina Ford', statement_text: 'The archivist had a rose in her hand and a nervous tremor.', suspect_name: 'Iris Vale' },
      { witness_name: 'Owen Pike', statement_text: 'The journalist never left the terrace without a camera.', suspect_name: 'Lena Cruz' }
    ]
  },
  {
    slug: 'copper-rail',
    title: 'Copper Rail',
    difficulty: 'Hard',
    summary: 'A train conductor died beside the copper rail in a sealed station. The evidence suggests a highly choreographed alibi.',
    story: 'At 1:10 a.m., the last train of the night pulled into the station and the conductor was found dead beside the copper rail. The station had been sealed, but the scene did not feel like a panic-stricken moment. It felt like a carefully staged interruption, as though the killer knew the layout as well as the staff.',
    objective: 'Identify the suspect whose location record matches the station timeline.',
    hint: 'Use the alibis table together with the locations table to match the suspect to the station timeline.',
    challenge: {
      title: 'Break the rail alibi',
      prompt: 'Find the suspect tied to the signal room alibi during the 01:10-01:50 window.',
      expected_sql: "SELECT s.name FROM suspects s JOIN alibis a ON a.suspect_id = s.id JOIN locations l ON l.id = a.location_id WHERE l.name = 'Signal Room' AND a.timeframe = '01:10-01:50'",
      // Source-only misdirection: the platform clue is there to distract anyone reading the file by hand.
      sourceOnlyDecoys: ['The platform and carriage entries are useful for flavor, not for the final join.', 'The time window is the real anchor, not the suspect occupation.'],
      resultRows: [{ name: 'Mara Quinn' }],
      walkthrough: [
        'Open the alibis table and filter for the time window 01:10-01:50.',
        'That narrows the event to one suspect in the station timeline.',
        'Join locations to the alibi record so you can verify that the suspect was in the Signal Room.',
        'The matching location and timeframe identify the culprit.'
      ]
    },
    suspects: [
      { name: 'Mara Quinn', occupation: 'Station Master', motive: 'She wanted the railway sold to a private firm.', status: 'Primary' },
      { name: 'Cal Mercer', occupation: 'Conductor', motive: 'He feared a disciplinary hearing.', status: 'Secondary' },
      { name: 'June Patel', occupation: 'Mechanic', motive: 'She wanted revenge for a demotion.', status: 'Observer' }
    ],
    locations: [
      { name: 'Signal Room', category: 'Operations' },
      { name: 'Platform 3', category: 'Transit' },
      { name: 'Carriage 8', category: 'Transit' }
    ],
    evidence: [
      { item_name: 'Copper pin', description: 'A pin snapped from a signal jacket.', location_name: 'Signal Room', suspect_name: 'Mara Quinn' },
      { item_name: 'Scuffed boot', description: 'A boot print left beside the rail.', location_name: 'Platform 3', suspect_name: 'Cal Mercer' },
      { item_name: 'Oil rag', description: 'A rag with machine grease.', location_name: 'Carriage 8', suspect_name: 'June Patel' }
    ],
    alibis: [
      { suspect_name: 'Mara Quinn', location_name: 'Signal Room', timeframe: '01:10-01:50', description: 'She locked the signal boards while the train crew changed shifts.' },
      { suspect_name: 'Cal Mercer', location_name: 'Platform 3', timeframe: '01:15-01:35', description: 'He oversaw the final boarding call for the night.' },
      { suspect_name: 'June Patel', location_name: 'Carriage 8', timeframe: '01:20-01:45', description: 'She inspected the brake couplings after the conductor collapsed.' }
    ],
    witnesses: [
      { witness_name: 'Noel Greene', statement_text: 'The station master was alone in the signal room when the lights cut.', suspect_name: 'Mara Quinn' },
      { witness_name: 'Tessa Bell', statement_text: 'The conductor never moved from the platform after the whistle.', suspect_name: 'Cal Mercer' },
      { witness_name: 'Soren Vale', statement_text: 'The mechanic was near carriage eight and smelled of engine oil.', suspect_name: 'June Patel' }
    ]
  },
  {
    slug: 'chapel-echo',
    title: 'Chapel Echo',
    difficulty: 'Expert',
    summary: 'A chapel bell was rung in a closed sanctuary, and each suspect carries a different version of the night.',
    story: 'The bells of Saint Elmo Chapel rang at 2:05 a.m. even though the sanctuary had been locked for hours. The vestibule held a small object beneath a spill of candle wax, and the scene suggested someone had moved through the building with familiarity rather than haste. The case depends on finding the one account that truly fits the setting.',
    objective: 'Find the suspect whose record best aligns with the chapel evidence and timeline.',
    hint: 'Match the evidence item to the witness account to identify the suspect who appears in both records.',
    challenge: {
      title: 'Reconcile the chapel clues',
      prompt: 'Find the suspect tied to the silver locket clue and the witness account from the vestibule.',
      expected_sql: "SELECT s.name FROM suspects s JOIN evidence_items e ON e.suspect_id = s.id JOIN witness_statements w ON w.suspect_id = s.id WHERE e.item_name = 'Silver locket' AND w.witness_name = 'Brother Jude'",
      // Source-only misdirection: the bell rope fiber is a nice detail, but it is not part of the answer path.
      sourceOnlyDecoys: ['The bell rope fiber looks important because it is mentioned twice.', 'The caretaker is a decoy with a very believable motive.'],
      resultRows: [{ name: 'Sage Rowan' }],
      walkthrough: [
        'Start with evidence_items and locate the Silver locket clue.',
        'That points you to the suspect attached to that item.',
        'Next, join witness_statements and filter for Brother Jude to confirm the same suspect appears in the chapel account.',
        'The shared suspect is the one who fits both records.'
      ]
    },
    suspects: [
      { name: 'Sage Rowan', occupation: 'Choir Director', motive: 'She wanted the chapel fundraising plan to fail.', status: 'Primary' },
      { name: 'Damon Hale', occupation: 'Bell Ringer', motive: 'He wanted a reunion with a stolen ledger.', status: 'Secondary' },
      { name: 'Nina Brooks', occupation: 'Caretaker', motive: 'She feared the chapel would be sold.', status: 'Observer' }
    ],
    locations: [
      { name: 'North Aisle', category: 'Chapel' },
      { name: 'Bell Loft', category: 'Chapel' },
      { name: 'Vestibule', category: 'Chapel' }
    ],
    evidence: [
      { item_name: 'Silver locket', description: 'A locket found in the chapel vestibule.', location_name: 'Vestibule', suspect_name: 'Sage Rowan' },
      { item_name: 'Bell rope fiber', description: 'Fibre from the bell rope in the loft.', location_name: 'Bell Loft', suspect_name: 'Damon Hale' },
      { item_name: 'Dusty key', description: 'A bronze key from the north aisle gate.', location_name: 'North Aisle', suspect_name: 'Nina Brooks' }
    ],
    alibis: [
      { suspect_name: 'Sage Rowan', location_name: 'Vestibule', timeframe: '02:00-02:20', description: 'She rehearsed with the choir until the last note faded.' },
      { suspect_name: 'Damon Hale', location_name: 'Bell Loft', timeframe: '02:05-02:25', description: 'He rang the bell while the choir practiced.' },
      { suspect_name: 'Nina Brooks', location_name: 'North Aisle', timeframe: '02:10-02:30', description: 'She swept the aisle after the service ended.' }
    ],
    witnesses: [
      { witness_name: 'Brother Jude', statement_text: 'The silver locket appeared near the vestibule just before the bell rang.', suspect_name: 'Sage Rowan' },
      { witness_name: 'Marta Cole', statement_text: 'The bell rope fiber was pulled from the loft moments before the echo.', suspect_name: 'Damon Hale' },
      { witness_name: 'Parker Moss', statement_text: 'The dusty key was left near the north aisle gate after midnight.', suspect_name: 'Nina Brooks' }
    ]
  }
];

const caseListEl = document.getElementById('case-list');
const activeCaseTitle = document.getElementById('active-case-title');
const activeCaseSummary = document.getElementById('active-case-summary');
const objectiveEl = document.getElementById('objective');
const hintEl = document.getElementById('hint');
const promptEl = document.getElementById('challenge-prompt');
const sqlInput = document.getElementById('sql-input');
const feedbackEl = document.getElementById('feedback');
const resultTableEl = document.getElementById('result-table');
const tablePickerEl = document.getElementById('table-picker');
const explorerOutputEl = document.getElementById('explorer-output');
const caseStoryEl = document.getElementById('case-story');
const casePeopleEl = document.getElementById('case-people');
const hintButtonEl = document.getElementById('fill-hint');

let selectedSlug = null;
let caseData = null;
let db = null;
let sqlLib = null;
let hintVisible = false;

function normalizeSql(sql) {
  return String(sql || '').trim().replace(/;$/i, '').replace(/\s+/g, ' ').toLowerCase();
}

function createDatabaseForCase(caseItem) {
  if (!sqlLib) {
    return null;
  }

  const schemaSql = `
    CREATE TABLE suspects (id INTEGER PRIMARY KEY, name TEXT, occupation TEXT, motive TEXT, status TEXT);
    CREATE TABLE locations (id INTEGER PRIMARY KEY, name TEXT, category TEXT);
    CREATE TABLE evidence_items (id INTEGER PRIMARY KEY, item_name TEXT, description TEXT, location_name TEXT, suspect_name TEXT);
    CREATE TABLE alibis (id INTEGER PRIMARY KEY, suspect_name TEXT, location_name TEXT, timeframe TEXT, description TEXT);
    CREATE TABLE witness_statements (id INTEGER PRIMARY KEY, witness_name TEXT, statement_text TEXT, suspect_name TEXT);
  `;

  const database = new sqlLib.Database();
  database.exec(schemaSql);

  const insertRows = [];
  caseItem.suspects.forEach((suspect, index) => {
    insertRows.push(`INSERT INTO suspects (id, name, occupation, motive, status) VALUES (${index + 1}, '${suspect.name.replace(/'/g, "''")}', '${suspect.occupation.replace(/'/g, "''")}', '${suspect.motive.replace(/'/g, "''")}', '${suspect.status.replace(/'/g, "''")}' );`);
  });
  caseItem.locations.forEach((location, index) => {
    insertRows.push(`INSERT INTO locations (id, name, category) VALUES (${index + 1}, '${location.name.replace(/'/g, "''")}', '${location.category.replace(/'/g, "''")}' );`);
  });
  caseItem.evidence.forEach((item, index) => {
    insertRows.push(`INSERT INTO evidence_items (id, item_name, description, location_name, suspect_name) VALUES (${index + 1}, '${item.item_name.replace(/'/g, "''")}', '${item.description.replace(/'/g, "''")}', '${item.location_name.replace(/'/g, "''")}', '${item.suspect_name.replace(/'/g, "''")}' );`);
  });
  caseItem.alibis.forEach((item, index) => {
    insertRows.push(`INSERT INTO alibis (id, suspect_name, location_name, timeframe, description) VALUES (${index + 1}, '${item.suspect_name.replace(/'/g, "''")}', '${item.location_name.replace(/'/g, "''")}', '${item.timeframe.replace(/'/g, "''")}', '${item.description.replace(/'/g, "''")}' );`);
  });
  caseItem.witnesses.forEach((item, index) => {
    insertRows.push(`INSERT INTO witness_statements (id, witness_name, statement_text, suspect_name) VALUES (${index + 1}, '${item.witness_name.replace(/'/g, "''")}', '${item.statement_text.replace(/'/g, "''")}', '${item.suspect_name.replace(/'/g, "''")}' );`);
  });

  insertRows.forEach((statement) => database.run(statement));
  return database;
}

function formatRows(rows, columns) {
  if (!rows.length) {
    return '<p>No rows returned.</p>';
  }

  const table = `
    <table>
      <thead><tr>${columns.map((column) => `<th>${column}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((row) => `<tr>${columns.map((column) => `<td>${row[column]}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  `;
  return table;
}

function executeSql(sql) {
  if (!db) {
    return { error: 'The SQL engine is still loading. Please wait a moment and try again.' };
  }

  const cleaned = String(sql || '').trim();
  if (!cleaned) {
    return { error: 'Enter a SQL statement to run.' };
  }

  const lower = cleaned.toLowerCase();
  if (lower.startsWith('show tables')) {
    const query = "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name";
    const results = db.exec(query);
    const columns = ['name'];
    const rows = results[0]?.values.map((value) => ({ name: value[0] })) || [];
    return { rows, columns, message: 'Tables loaded.' };
  }

  if (lower.startsWith('describe ') || lower.startsWith('desc ')) {
    const tableName = cleaned.replace(/^describe\s+/i, '').replace(/^desc\s+/i, '').replace(/;$/, '').trim();
    const query = `PRAGMA table_info('${tableName}')`;
    const results = db.exec(query);
    const columns = ['cid', 'name', 'type', 'notnull', 'dflt_value', 'pk'];
    const rows = results[0]?.values.map((value) => ({ cid: value[0], name: value[1], type: value[2], notnull: value[3], dflt_value: value[4], pk: value[5] })) || [];
    return { rows, columns, message: `Schema for ${tableName}.` };
  }

  if (!/^select\b/i.test(cleaned)) {
    return { error: 'Please use a SELECT query, SHOW TABLES, or DESCRIBE.' };
  }

  try {
    const results = db.exec(cleaned);
    if (!results.length) {
      return { rows: [], columns: [], message: 'Query ran with no result set.' };
    }

    const columns = results[0].columns;
    const rows = results[0].values.map((values) => Object.fromEntries(columns.map((column, index) => [column, values[index]])));
    return { rows, columns, message: `${rows.length} row(s) returned.` };
  } catch (error) {
    return { error: error.message };
  }
}

function evaluateQuery(caseItem, sql) {
  const clean = String(sql || '').trim();
  const result = executeSql(clean);
  if (result.error) {
    return {
      correct: false,
      message: result.error,
      rows: []
    };
  }

  const expectedRows = caseItem.challenge.resultRows.map((row) => Object.fromEntries(Object.entries(row).sort(([a], [b]) => a.localeCompare(b))));
  const actualRows = result.rows.map((row) => Object.fromEntries(Object.entries(row).sort(([a], [b]) => a.localeCompare(b))));

  const actualJson = JSON.stringify(actualRows);
  const expectedJson = JSON.stringify(expectedRows);

  if (actualJson === expectedJson) {
    return {
      correct: true,
      message: 'Case cracked. The evidence now points to the correct suspect.',
      rows: actualRows
    };
  }

  return {
    correct: false,
    message: 'The evidence is still incomplete. Try another join or filter.',
    rows: actualRows
  };
}

function renderCases() {
  caseListEl.innerHTML = cases.map((item) => `
    <button class="case-card ${item.slug === selectedSlug ? 'active' : ''}" data-slug="${item.slug}">
      <span class="difficulty">${item.difficulty}</span>
      <strong>${item.title}</strong>
      <p>${item.summary}</p>
    </button>
  `).join('');

  caseListEl.querySelectorAll('.case-card').forEach((button) => {
    button.addEventListener('click', () => selectCase(button.dataset.slug));
  });
}

function renderTablePicker() {
  const tables = ['suspects', 'locations', 'evidence_items', 'alibis', 'witness_statements'];
  tablePickerEl.innerHTML = '<option value="">Choose table</option>' + tables.map((table) => `<option value="${table}">${table}</option>`).join('');
}

function selectCase(slug) {
  selectedSlug = slug;
  caseData = cases.find((item) => item.slug === slug) || cases[0];
  activeCaseTitle.textContent = caseData.title;
  activeCaseSummary.textContent = caseData.summary;
  objectiveEl.textContent = caseData.objective;
  hintEl.textContent = '';
  promptEl.textContent = caseData.challenge?.prompt || 'No challenge loaded.';
  caseStoryEl.textContent = caseData.story || 'No narrative available for this case yet.';
  casePeopleEl.innerHTML = ['<strong>Suspects</strong>', ...caseData.suspects.map((suspect) => `<li>${suspect.name} — ${suspect.occupation}</li>`)].join('');
  sqlInput.value = '';
  sqlInput.placeholder = "Try: SELECT name FROM suspects;";
  feedbackEl.textContent = 'Case loaded. Explore the tables, run SQL, and use the output to solve the puzzle.';
  resultTableEl.innerHTML = '';
  explorerOutputEl.innerHTML = '<p>Select a table or run a query to inspect the evidence.</p>';
  hintVisible = false;
  if (hintButtonEl) {
    hintButtonEl.textContent = 'Show hint';
  }
  renderCases();
  renderTablePicker();
  db = createDatabaseForCase(caseData);
  if (!db) {
    feedbackEl.textContent = 'Loading the SQL engine…';
  }
}

function submitQuery() {
  if (!selectedSlug) {
    feedbackEl.textContent = 'Select a case first.';
    return;
  }

  const result = evaluateQuery(caseData, sqlInput.value);
  feedbackEl.textContent = result.message;
  resultTableEl.innerHTML = formatRows(result.rows, Object.keys(result.rows[0] || {}));
}

function showHint() {
  if (!caseData?.hint) {
    return;
  }

  if (!hintVisible) {
    hintEl.textContent = caseData.hint;
    feedbackEl.textContent = 'Hint revealed. Use it carefully and keep testing your SQL.';
    hintVisible = true;
    if (hintButtonEl) {
      hintButtonEl.textContent = 'Hide hint';
    }
  } else {
    hintEl.textContent = '';
    feedbackEl.textContent = 'Hint hidden. Keep digging through the evidence.';
    hintVisible = false;
    if (hintButtonEl) {
      hintButtonEl.textContent = 'Show hint';
    }
  }
}

function showAnswer() {
  if (caseData?.challenge) {
    sqlInput.value = caseData.challenge.expected_sql || '';
    const steps = Array.isArray(caseData.challenge.walkthrough) ? caseData.challenge.walkthrough : [];
    const stepsMarkup = steps.length
      ? `<ol>${steps.map((step) => `<li>${step}</li>`).join('')}</ol>`
      : '<p>No walkthrough available for this case yet.</p>';
    feedbackEl.innerHTML = `<strong>Answer revealed.</strong><br />${stepsMarkup}`;
  }
}

function inspectTable() {
  const tableName = tablePickerEl.value;
  if (!tableName) {
    explorerOutputEl.innerHTML = '<p>Select a table first.</p>';
    return;
  }

  const result = executeSql(`SELECT * FROM ${tableName} LIMIT 10`);
  explorerOutputEl.innerHTML = result.error ? `<p>${result.error}</p>` : formatRows(result.rows, result.columns);
}

function describeTable() {
  const tableName = tablePickerEl.value;
  if (!tableName) {
    explorerOutputEl.innerHTML = '<p>Select a table first.</p>';
    return;
  }

  const result = executeSql(`PRAGMA table_info('${tableName}')`);
  explorerOutputEl.innerHTML = result.error ? `<p>${result.error}</p>` : formatRows(result.rows, result.columns);
}

async function initializeDatabaseEngine() {
  if (sqlLib) {
    return;
  }

  const SQLModule = await window.initSqlJs({
    locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
  });
  sqlLib = SQLModule;
  db = createDatabaseForCase(cases[0]);
  renderTablePicker();
}

document.getElementById('submit-query').addEventListener('click', submitQuery);
document.getElementById('fill-hint').addEventListener('click', showHint);
document.getElementById('show-answer').addEventListener('click', showAnswer);
document.getElementById('show-tables').addEventListener('click', () => {
  const result = executeSql("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name");
  explorerOutputEl.innerHTML = result.error ? `<p>${result.error}</p>` : formatRows(result.rows, result.columns);
});
document.getElementById('describe-table').addEventListener('click', describeTable);
document.getElementById('sample-table').addEventListener('click', inspectTable);

renderCases();
renderTablePicker();
selectCase(cases[0].slug);
initializeDatabaseEngine().then(() => {
  if (caseData) {
    db = createDatabaseForCase(caseData);
    feedbackEl.textContent = 'SQL playground ready. Explore the tables and solve the case.';
  }
}).catch(() => {
  feedbackEl.textContent = 'The SQL playground could not load. Please refresh and try again.';
});
