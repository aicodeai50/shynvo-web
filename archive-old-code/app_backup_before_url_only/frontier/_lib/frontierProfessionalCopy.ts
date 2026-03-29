type OutputShape = {
  title: string
  summary: string
  meaning: string
  nextAction: string
  why: string[]
  deliverables: string[]
  risk: string
  encouragement: string
}

function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function list(items: string[]) {
  return items.join(" • ")
}

/* CODING ARENA */

export function buildCodingOutput(args: {
  buildTitle: string
  guideMode: string
  idea: string
  stack: string[]
  firstStep: string
}): OutputShape {

  const { buildTitle, guideMode, idea, stack, firstStep } = args

  const summaries = [
    `Frontier interprets the idea "${idea}" as a ${buildTitle.toLowerCase()} project.`,
    `Your request "${idea}" is being translated into a ${buildTitle.toLowerCase()} build path.`,
    `The workspace classifies this idea as a ${buildTitle.toLowerCase()} system to construct.`,
  ]

  const meanings = [
    `This workspace converts ideas into executable build routes instead of leaving them as concepts.`,
    `Frontier is mapping the idea into a technical architecture that can actually be built.`,
    `The platform is translating your idea into a realistic project structure.`,
  ]

  const actions = [
    `Start by completing the first milestone: ${firstStep.toLowerCase()}.`,
    `Begin with the smallest working step: ${firstStep.toLowerCase()}.`,
    `Focus first on this milestone: ${firstStep.toLowerCase()}.`,
  ]

  return {
    title: "AI Build Guidance",

    summary: pick(summaries),

    meaning: pick(meanings),

    nextAction: pick(actions),

    why: [
      `The selected build category is ${buildTitle}.`,
      `The stack ${list(stack)} matches the project requirements.`,
      `Guide mode (${guideMode}) shapes the level of explanation or execution guidance.`,
    ],

    deliverables: [
      "A defined first milestone",
      "A stable project foundation",
      "A clearer build roadmap",
    ],

    risk:
      "Trying to build too many features before finishing the first working milestone.",

    encouragement:
      "Every successful product begins with a small working version. Build the first milestone and iterate from there.",
  }
}

/* ALGORITHM LAB */

export function buildAlgorithmOutput(args: {
  challengeTitle: string
  mode: string
  problem: string
  focus: string[]
  hint: string
  route: string
  mistake: string
}): OutputShape {

  const { challengeTitle, mode, problem, focus, hint, route, mistake } = args

  return {
    title: "Reasoning Guidance",

    summary: pick([
      `Frontier classifies this as a ${challengeTitle.toLowerCase()} reasoning problem.`,
      `The system interprets this challenge as a ${challengeTitle.toLowerCase()} structure.`,
      `This problem falls under ${challengeTitle.toLowerCase()} reasoning.`,
    ]),

    meaning:
      `The workspace shifts thinking toward structured reasoning rather than guessing. ${mode} mode adjusts how much help the system provides.`,

    nextAction:
      "Break the problem into constraints, inputs, and desired outcome before attempting a solution.",

    why: [
      `The reasoning focus is ${focus.join(", ").toLowerCase()}.`,
      `Suggested solving route: ${route}`,
      `Common failure pattern: ${mistake}`,
    ],

    deliverables: [
      `Key hint: ${hint}`,
      "A structured reasoning path",
      "Better algorithm thinking",
    ],

    risk:
      "Jumping into implementation before fully understanding the structure of the problem.",

    encouragement:
      "Strong engineers solve problems by recognizing patterns before writing solutions.",
  }
}

/* AI BOT LAB */

export function buildBotOutput(args: {
  modeTitle: string
  toneTitle: string
  prompt: string
  modeDesc: string
  tags: string[]
}): OutputShape {

  const { modeTitle, toneTitle, prompt, modeDesc, tags } = args

  return {
    title: "Response Guidance",

    summary: pick([
      `${modeTitle} mode is interpreting the prompt "${prompt}".`,
      `Frontier is generating a ${modeTitle.toLowerCase()} style response.`,
      `The prompt "${prompt}" is being analyzed through ${modeTitle.toLowerCase()} behaviour.`,
    ]),

    meaning:
      `${modeDesc} The tone layer (${toneTitle}) changes the communication style of the response.`,

    nextAction:
      "Improve the prompt by clarifying the goal, the audience, and the decision you want help with.",

    why: [
      `This mode specializes in ${tags.join(", ").toLowerCase()}.`,
      `Tone selection changes the style of intelligence delivery.`,
      `Better prompts produce stronger AI reasoning.`,
    ],

    deliverables: [
      "A clearer AI response style",
      "Better prompt structure",
      "Stronger AI behavior testing",
    ],

    risk:
      "Testing vague prompts while expecting precise AI behavior.",

    encouragement:
      "Experiment with different modes and tones to discover the most effective AI behavior.",
  }
}

/* PUZZLE LAB */

export function buildPuzzleOutput(args: {
  question: string
  mode: string
  hint1: string
  hint2: string
  answer: string
}): OutputShape {

  const { question, mode, hint1, hint2, answer } = args

  return {
    title: "Puzzle Guidance",

    summary: pick([
      "This puzzle trains logical reasoning through constraints.",
      "The system treats this as a structured logic exercise.",
      "This challenge focuses on reasoning patterns rather than guessing.",
    ]),

    meaning:
      `Solve mode (${mode}) controls how much help the system provides while solving.`,

    nextAction:
      "Identify the constraints first, then test possible solutions against those rules.",

    why: [
      `First hint: ${hint1}`,
      `Second hint: ${hint2}`,
      "The reasoning process matters more than the answer itself.",
    ],

    deliverables: [
      "A stronger reasoning pattern",
      "Better constraint analysis",
      `Final solution: ${answer}`,
    ],

    risk:
      "Revealing the answer too early removes the learning value of the puzzle.",

    encouragement:
      "Each puzzle strengthens the mental pattern used for complex problem solving.",
  }
}
