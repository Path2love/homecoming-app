export interface ProtocolStep {
  id: number;
  title: string;
  subtitle: string;
  coachScript: string;
  coachNotes: string;
  clientFocus: string;
  followUpQuestions?: string[]; // Only on dialogue steps — hidden during relaxation
  hasBodyMap?: boolean;
  hasEnergySelector?: boolean;
  hasScale?: boolean;
  hasCoachNotes?: boolean; // Whether coach can jot notes on this step
  scaleLabel?: string;
  reflection?: string;
  duration?: string;
  isRelaxation?: boolean; // Steps 2-4: no follow-up questions, pure script
}

export const PROTOCOL_STEPS: ProtocolStep[] = [
  {
    id: 1,
    title: "Arriving",
    subtitle: "Intention + Opening Scale",
    duration: "3–5 min",
    clientFocus: "Take a slow breath. You are safe. This space is yours.",
    hasScale: true,
    scaleLabel: "How intense does this feel right now? (1 = barely there, 10 = overwhelming)",
    coachScript: `"Welcome. I'm really glad you're here today.

Before we begin, take one full breath with me. In through the nose... and out through the mouth. Good.

This space is yours. There is nothing to perform here, nothing to get right. We're going to be here together and see what wants to move.

So — what is it that you're carrying today? What brought you here?

[Pause. Let them speak fully. Reflect back what you hear without interpreting.]

And if you had to name what you most want to release or shift in our time together today — what would that be?

[Pause. Let them name it clearly.]

Thank you for naming that.

Now, on a scale of 1 to 10 — 1 being this barely registers and 10 being it's overwhelming you right now — where does that feel like it's sitting in your body today?

[Record the number. Note body language and breath quality.]

Good. We're going to work with that. Let's begin."`,
    coachNotes: `Watch for: resistance in the body (crossed arms, shallow breath, held jaw). Don't rush the intention. If they give a vague answer like "I want to feel better," probe: "And what does 'better' feel like in your body? What would you be feeling that you're not feeling now?"`,
    followUpQuestions: [
      "When you feel that in your body right now, where does it live?",
      "How long have you been carrying this?",
      "What would it mean for you if this shifted today?",
      "On a scale of 1–10, how ready does your body feel to let some of this go?",
    ],
  },
  {
    id: 2,
    title: "Settling the Body",
    subtitle: "Progressive Relaxation",
    duration: "5–8 min",
    isRelaxation: true,
    clientFocus: "Let your body get heavy. Nothing to do. Nowhere to be.",
    coachScript: `"Good. Now gently close your eyes, or soften your gaze to the floor — whatever feels comfortable.

Begin to let your breath slow down. You don't need to breathe deeply or perfectly. Just... naturally slower. Let the exhale be a little longer than the inhale.

[Pause 10 seconds.]

Bring your attention down to your feet. Notice them. The floor beneath them. The weight of them. Just let your feet be heavy. Let them soften and release.

Let that heaviness travel slowly up into your ankles... your calves... the backs of your knees. Heavy. Relaxed. Not held.

Up into your thighs and hips. You don't need to hold yourself up right now. Let the chair hold you completely.

Let your belly soften. You don't need to hold it in. Just let it be.

Let your lower back release. Let your mid-back soften. Let your shoulder blades drop down and away from your ears.

[Pause.]

Your shoulders. Let them fall. And again — let them fall a little further than you think they can.

Your upper arms... forearms... hands. Let your hands be completely open and heavy in your lap. Nothing to hold.

Your neck — gently let your head find its natural balance point. Not held forward, not held back. Just resting.

Let your jaw unclench. Let your tongue drop from the roof of your mouth. Let your forehead smooth out.

[Long pause — 10 seconds.]

Good. Right there.

You are here. You are safe. Your body is beginning to remember what it feels like to not have to be on guard."`,
    coachNotes: `Speak slowly — much more slowly than feels natural. Pause between body regions. Watch for the moment the client's shoulders actually drop — that's the signal they've landed. If they remain visibly tense, linger longer on that area. You can add: "And if there's any place still holding on... just let it know it can rest for now."`,
  },
  {
    id: 3,
    title: "Grounding",
    subtitle: "Crystal Core Alignment",
    duration: "3–5 min",
    isRelaxation: true,
    clientFocus: "You are rooted. You are held. The earth has you.",
    coachScript: `"With your eyes still closed, bring your attention to the soles of your feet.

Imagine that from the soles of your feet, roots are beginning to grow downward. Not forcefully — naturally, like a tree that has been here for a very long time.

Down through the floor. Down through the foundation of this building. Down through layers of rock and soil and ancient earth.

These roots go deep. They are yours. They connect you to something steady, something that has been here long before any of your pain — and will be here long after it moves through.

[Pause.]

Now imagine a column of light — clear, crystalline light — running through the very centre of your body. From the crown of your head, all the way down through your spine, down through your feet, and deep into the earth below.

This is your crystal core. Steady. Luminous. It cannot be shaken. This is the part of you that has always been whole, even when nothing else felt that way.

Let yourself rest on that column right now. It is holding you.

[Pause 15 seconds.]

You are not alone in this room. You are not alone in your body. The earth has you. I have you. We can go deeper now."`,
    coachNotes: `This establishes felt safety before inner work begins. If a client has a trauma or dissociation history, visualisation may be difficult — simply invite them to feel the physical weight of their body on the chair instead. Stay with the physical before the imaginal.`,
  },
  {
    id: 4,
    title: "Quieting the Mind",
    subtitle: "10-Step Descent",
    duration: "3–5 min",
    isRelaxation: true,
    clientFocus: "10... 9... 8... Deeper with each breath...",
    coachScript: `"Now I'm going to count down from 10 to 1. With each number, with each breath, you'll travel a little deeper into yourself. Deeper into stillness. Deeper into the truth of what is here.

You don't need to do anything. The numbers will carry you.

[Speak each number on an exhale. Slow. Deliberate. 4–5 seconds between each.]

10... breathing out... feeling the body relax a little more.

9... going deeper... the mind growing quieter now.

8... any thoughts that arise... just let them pass like clouds. You don't have to follow them.

7... deeper still. You are safe.

6... halfway down... feel how much quieter it's getting.

5... your body completely supported... your mind settling like water becoming still.

4... almost there. Any tension remaining... just let it soften.

3... nearly all the way down... you are present, you are safe, you are ready.

2... take one more breath...

1... here. You're here. Welcome to the quiet inside yourself.

[Silence — hold for 15 full seconds. Do not speak.]

From this place, we're going to meet what's true."`,
    coachNotes: `The countdown rhythmically signals the nervous system to downregulate. The silence after "1" is critical — don't fill it. Some clients will fidget or open their eyes; gently say "just stay with me" if needed. If they mention thoughts arising, normalise: "That's perfect. Noticing is the practice."`,
  },
  {
    id: 5,
    title: "Meeting What's Here",
    subtitle: "Inner Encounter + Intuition",
    duration: "5–8 min",
    hasCoachNotes: true,
    clientFocus: "Who or what is here to meet you today?",
    coachScript: `"From this quiet place, I'd like you to gently look inward.

Not searching. Not forcing. Just... noticing.

Is there a feeling here? A presence? Something that has been waiting to be seen?

[Pause — 15 seconds.]

Can you tell me what you're noticing?

[Let them speak. Don't interpret. Reflect back what they say.]

Good. So there is [repeat back] here with you.

Now, I'd like to invite you to meet your intuition — that wise, calm part of you that always knows.

Imagine stepping into a place inside yourself where your intuition lives. It might appear as a light, a figure, a feeling — whatever arises naturally.

What do you notice?

[Pause. Let them describe.]

Ask your intuition: "What do I most need to know today?"

[Long pause — let them receive.]

What did you hear, or sense, or feel?

[Reflect back.]

Thank you. Carry that with you.

Now, is there also an inner child present? A younger version of you? Just notice — don't search for it.

[Pause.]

What do you see or feel?

[Let them respond.]

Can you turn toward whatever is here? Not away from it — toward it. Like turning to face someone who has been standing behind you for a very long time.

What happens in your body when you do that?"`,
    coachNotes: `This step often produces the first emotional opening. If they cry, let them — don't rush to comfort. A quiet "that's it, let it move through" is enough. The intuition question is important before moving to the wound work — it activates the wiser, witnessing self, not just the wounded self. If no inner child appears, don't force it. Work with whatever does arrive.`,
    followUpQuestions: [
      "How old does this feel? Does it have an age?",
      "What is it doing when you turn toward it? Is it reaching toward you or moving away?",
      "What does it feel like in your chest when you acknowledge it directly?",
      "What does your intuition want you to remember as we go deeper?",
      "Have you met this part of yourself before?",
    ],
  },
  {
    id: 6,
    title: "Finding the Energy",
    subtitle: "Somatic Locating",
    duration: "5–8 min",
    hasBodyMap: true,
    hasEnergySelector: true,
    clientFocus: "Where does this live in your body?",
    coachScript: `"Now bring your awareness to your body.

Where does this [emotion / presence / feeling] actually live in your physical body? Don't think about it — just feel. Where are you drawn?

[Pause. Let them locate it. They can point if that helps.]

Good. Stay there. Keep your full attention right on that spot.

Now — if this energy had a colour — not the colour it should be, just the colour it is — what colour do you see or sense?

[Pause. Let them name it.]

And if it had a shape, a texture, a density — what would that be? Is it sharp? Dense? Scattered? Hollow?

[Pause. Let them describe it in their own words.]

And roughly what size? The size of a fist? A stone? Something larger?

[Pause.]

So we have [their colour] energy, [their shape], in your [body location].

Just be with that for a moment. Don't try to change it. Just acknowledge: this is here.

This energy has been in your body a long time. It has been carrying something for you. We're going to listen to it now."`,
    coachNotes: `If the client stays abstract ("I feel sad"), redirect: "Where in your body does sad live? If you put your hand there right now, where would you put it?" The colour, shape, and size engage the subconscious. These aren't metaphors to them — they're real. Follow their language exactly, not yours.`,
    followUpQuestions: [
      "Does the colour change as you look at it more closely?",
      "What happens to the energy when you breathe directly into it?",
      "Does it have a temperature — hot, cold, warm?",
      "How long has this been living in your body?",
      "Is it moving or is it still?",
    ],
  },
  {
    id: 7,
    title: "Listening",
    subtitle: "Energy Dialogue",
    duration: "10–15 min",
    hasCoachNotes: true,
    clientFocus: "Let it speak. You are listening without judgment.",
    reflection: "What did the energy say? What does it want to release?",
    coachScript: `"I'd like you to speak to this energy. Not in your head — out loud, here with me.

Say: 'I see you. I know you're here. I'm listening.'

[Pause while they say it.]

Now I'm going to ask you to put this question directly to the energy. Say it out loud to it:

'What is the one thing you would like me to know so that you can easily and effortlessly leave my body?'

[Long pause — 15 to 20 seconds. Hold the silence. Let them receive.]

What came?

[If they say nothing:]
"That's okay. Try this: 'If you were to know — what might it be?'

[Wait again. Even a whisper is enough.]

[Reflect back exactly what they said.]

Good. Stay with that.

Now ask it: 'What are you here to protect?'

[Pause. Let them respond.]

[If the answer is negative (e.g. 'I don't want to be hurt') ask:]
'What do you want instead? And when you have that — what do you have?'

[If the answer is a thought (e.g. 'I need to be careful') ask:]
'When you know that, what will you have?'

[If the answer is a label or identity (e.g. 'I'm unlovable') ask:]
'What are the qualities and characteristics of someone who is [that label]?'

[Pause after each response. Reflect. Don't interpret.]

Now ask it: 'Who put this energy here? Was it your ego, your inner critic, or your inner child?'

[Pause.]

And finally: 'What has carrying this cost you?'

[Long pause. This often produces deep emotion. Let it move.]

[If tears arise: "That's it. Let it move. You're doing beautifully."]

You have just given this part of yourself something it may never have received before: your full, undivided attention. Your willingness to listen without needing it to be different.

That is profound. That is love."`,
    coachNotes: `This is the heart of the session. The "one thing you'd like me to know" question is the most important in the entire protocol — don't rush past it. Repeat it gently if needed. The "If you were to know?" fallback almost always unlocks something. Resist the urge to interpret or fix what comes up. Your job is only to hold the space and reflect back. All answers are valid. None are wrong.`,
    followUpQuestions: [
      "'What is the one thing you would like me to know so you can easily and effortlessly leave my body?' (repeat if needed)",
      "'If you were to know — what might it be?' (use if no response)",
      "If answer is negative: 'What do you want instead? And when you have that, what do you have?'",
      "If answer is a thought: 'When you know this, what will you have?'",
      "If answer is a label/identity: 'What are the qualities and characteristics of [that label]?'",
      "'Who put this energy here — was it your ego, your inner critic, or your inner child?'",
      "'What would it mean to no longer need this protection?'",
    ],
  },
  {
    id: 8,
    title: "Transforming",
    subtitle: "Release Visualisation",
    duration: "5–8 min",
    clientFocus: "Watch it shift. Feel the change.",
    reflection: "What transformed? What does the body feel now?",
    coachScript: `"Beautiful. You've listened. You've given it what it needed.

Now I'd like to invite a transformation — not a forced release, not an 'I'm done with you' — but a gentle, willing shift.

Bring your attention back to that energy in your body. The [their colour], [their shape], in your [location].

As you breathe in, imagine breathing warm, clear light directly into that energy. Not to destroy it — to honour it. To fill it with something it has been missing.

[Pause.]

With each exhale, allow just a little of what no longer serves you to leave. You don't have to release everything. Just what is ready.

[Pause.]

Watch what happens to the colour. Does it change? Does the shape shift?

[Pause. Let them describe what they notice.]

What's happening in your body right now?

[Let them speak.]

Now imagine that energy transforming — not disappearing, but changing form. What does it want to become? A colour of light? A warmth? A sense of spaciousness where there was once density?

[Pause — hold 15 seconds.]

Let it transform into whatever it naturally becomes. You're not creating this — you're witnessing it.

What do you notice now in your body where that energy used to be?"`,
    coachNotes: `Some clients feel a dramatic release — warmth, tingling, tears, deep breath. Others feel a subtle shift or "nothing yet." Both are valid. If they say nothing changed, ask: "Is there anything that shifted even slightly? Even 5% counts." Don't judge the depth of the release — the nervous system registers it even when the mind doesn't have language for it yet.`,
    followUpQuestions: [
      "What did it transform into?",
      "Where in your body do you feel the most spaciousness right now?",
      "Is there any residue — any echo of the old energy still present?",
      "What would it take for that residue to transform too?",
      "What does your body want to do with this new feeling?",
    ],
  },
  {
    id: 9,
    title: "Integrating",
    subtitle: "Future Visioning",
    duration: "5–8 min",
    clientFocus: "See yourself living what just opened.",
    reflection: "What did they vision? What becomes possible now?",
    coachScript: `"Now I'd like to take you forward.

From this place — this body, this breath, this shift — I want you to see yourself three months from now.

You've been doing this work. You've been showing up. What does your life look like?

What does your relationship with yourself feel like? Your relationships with others?

[Pause — 15 seconds. Let them really see it.]

What do you notice? What's different?

[Let them respond.]

Now six months forward. The shift that happened today has had time to root and grow. What's possible now that wasn't possible before?

[Pause — 10 seconds.]

What do you see? What do you feel?

[Let them respond.]

And now one year from now. This version of you — who has done this work, who has listened to the parts of themselves that needed to be heard — what does that person's life look like?

What do they have that the person who walked in today was still longing for?

[Long pause — 15 seconds.]

Take a moment to really inhabit that future self. Feel what they feel. Stand where they stand.

What does that person most want you to know?"`,
    coachNotes: `The future visioning integrates the neurological pattern change. It's not fantasy — it's the nervous system experiencing (in present tense) what safety and wholeness actually feel like. If the client struggles to see a positive future, that is itself important data. Ask: "What's blocking the vision? Let's meet that."`,
    followUpQuestions: [
      "What surprised you about what you saw?",
      "What does that future version of you want to say to who you are today?",
      "What is the single most important thing that shifted in that vision?",
      "What did you notice in your body as you visited that future self?",
      "Is there a relationship in your life that looks completely different in that future?",
    ],
  },
  {
    id: 10,
    title: "Returning",
    subtitle: "Grounding + Inspired Actions",
    duration: "5–8 min",
    clientFocus: "Gently returning. Bringing everything with you.",
    hasScale: true,
    scaleLabel: "How does the intensity feel now? (1–10)",
    reflection: "What inspired actions did they name?",
    coachScript: `"Beautiful. It's time to gently come back.

I'm going to count from 1 to 5. With each number you're going to return — slowly, gently — carrying everything from this session with you. Nothing is left behind. Everything that shifted stays shifted.

1... beginning to come back. Feeling your breath in your body.

2... feeling the weight of your body on the chair beneath you.

3... becoming aware of the sounds in the room. The temperature of the air.

4... wiggling your fingers and toes if you like. Coming all the way back into the room.

5... eyes gently open whenever you're ready. Welcome back.

[Long pause. Let them fully orient. Don't rush to words. Let them arrive.]

How are you feeling right now?

[Let them respond without interruption.]

And that number we started with — where does it feel like it's sitting now?

[Record the closing number. Note the shift.]

[If it dropped:]
"That's real. What happened in your body today was real."

[If unchanged:]
"That's okay. The work you did today has been heard. The shift is still in motion — sometimes it lands tonight, sometimes in how you respond to something tomorrow."

Now, from everything that moved in this session — what one action is calling to you? Not a should, not what you think you ought to do. What actually wants to happen next?

[Let them name it. Reflect it back in exactly their words.]

That's yours. That's what this session is asking you to do.

Thank you for trusting this process — and for trusting yourself enough to go here today. That was brave."`,
    coachNotes: `The closing scale drop matters — even 1 point is meaningful. The inspired action must come from them, not you. Even if it sounds small. Especially if it sounds small. The client's own language is what lands. Repeat it back exactly as they said it.`,
    followUpQuestions: [
      "What feels most different in your body now compared to when we started?",
      "What do you most want to remember from today?",
      "What would be the first sign that the shift from today is alive in your daily life?",
      "What support do you need this week as this continues to integrate?",
      "What does your body want you to know before you leave this space today?",
    ],
  },
];

export const ENERGY_COLORS = [
  { name: "Deep Red", value: "#8B0000", label: "Rage / Grief" },
  { name: "Burgundy", value: "#722F37", label: "Shame / Sadness" },
  { name: "Dark Orange", value: "#CC5500", label: "Anxiety / Fear" },
  { name: "Amber", value: "#FFBF00", label: "Confusion / Overwhelm" },
  { name: "Forest Green", value: "#228B22", label: "Envy / Resentment" },
  { name: "Slate Blue", value: "#6A7F9E", label: "Numbness / Disconnect" },
  { name: "Deep Purple", value: "#4B0082", label: "Powerlessness" },
  { name: "Charcoal", value: "#555555", label: "Heaviness / Shutdown" },
  { name: "Warm Gold", value: "#C4975A", label: "Longing / Yearning" },
  { name: "Soft Teal", value: "#177E89", label: "Something Shifting" },
];

export const ENERGY_SHAPES = [
  { name: "Dense Ball", icon: "●" },
  { name: "Sharp Spike", icon: "▲" },
  { name: "Tight Knot", icon: "◈" },
  { name: "Heavy Stone", icon: "◆" },
  { name: "Spreading Fog", icon: "◯" },
  { name: "Vibrating Wave", icon: "≈" },
  { name: "Empty Hollow", icon: "○" },
  { name: "Tangled Web", icon: "✦" },
];

export const BODY_REGIONS = [
  { id: "head", label: "Head / Mind" },
  { id: "jaw", label: "Jaw / Face" },
  { id: "throat", label: "Throat" },
  { id: "chest", label: "Chest / Heart" },
  { id: "shoulders", label: "Shoulders" },
  { id: "stomach", label: "Stomach / Solar Plexus" },
  { id: "gut", label: "Gut / Sacral" },
  { id: "hips", label: "Hips / Pelvis" },
  { id: "legs", label: "Legs" },
];
