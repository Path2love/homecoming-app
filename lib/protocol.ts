export interface ProtocolStep {
  id: number;
  title: string;
  subtitle: string;
  coachScript: string;       // Full word-for-word script Alison speaks
  coachNotes: string;        // Background coaching notes / what to watch for
  clientFocus: string;       // What client sees on screen
  followUpQuestions: string[]; // Suggested deepening questions
  hasBodyMap?: boolean;
  hasEnergySelector?: boolean;
  hasScale?: boolean;
  scaleLabel?: string;
  reflection?: string;
  duration?: string;
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

Before we begin, I want you to take one full breath with me. In through the nose... and out through the mouth. Good.

This space is yours. There is nothing to perform here, nothing to get right, nothing to figure out. We're just going to be here together and see what wants to move.

So — what is it that you're carrying today? What brought you here?

[Pause. Let them speak. Reflect back what you hear without interpreting.]

And if you had to name what you most want to release or shift in our time together today — what would that be?

[Pause. Let them name it clearly.]

Thank you for naming that. That took courage.

Now, on a scale of 1 to 10 — 1 being this is barely a whisper and 10 being it's overwhelming you right now — where does that feel like it's sitting in your body today?

[Record the number. Note their body language.]

Good. We're going to work with that. Let's begin."`,
    coachNotes: `Watch for: resistance in the body (crossed arms, shallow breath, held jaw). Don't rush the intention-setting — the quality of what they name here shapes the entire session. If they give a vague answer ("I want to feel better"), gently probe: "And what does 'better' feel like in your body? What would you feel that you're not feeling now?"`,
    followUpQuestions: [
      "When you feel that in your body right now, where does it live?",
      "How long have you been carrying this?",
      "If this had a name — not a label, just a name — what would it be?",
      "What would it mean for you if this shifted today?",
      "On a scale of 1–10, how ready does your body feel to let some of this go?",
    ],
  },
  {
    id: 2,
    title: "Settling the Body",
    subtitle: "Progressive Relaxation",
    duration: "5–8 min",
    clientFocus: "Let your body get heavy. Nothing to do. Nowhere to be.",
    coachScript: `"Good. Now I'd like you to gently close your eyes, or soften your gaze to the floor — whatever feels comfortable.

Begin to let your breath slow down. You don't need to breathe deeply or perfectly. Just... naturally slower. Let the exhale be a little longer than the inhale.

[Pause 10 seconds.]

Now bring your attention down to your feet. Notice them. The floor beneath them. The weight of them. Just let your feet be heavy. Let them soften and release.

Let that heaviness travel slowly up into your ankles... your calves... the backs of your knees. Heavy. Relaxed. Not held.

Up into your thighs and hips. You don't need to hold yourself up right now. Let the chair or the cushion hold you completely.

Let your belly soften. You don't need to hold it in. Just let it be. Soft belly.

Let your lower back release. Let your mid-back soften. Let your shoulder blades drop down and away from your ears.

[Pause.]

Now your shoulders. Let them fall. And again — let them fall a little further than you think they can.

Your upper arms... forearms... hands. Let your hands be completely open and heavy in your lap. Nothing to hold.

Your neck. Gently let your head find its natural balance point. Not held forward, not held back. Just... resting.

Let your jaw unclench. Let your tongue drop from the roof of your mouth. Let your forehead smooth out.

[Long pause — 10 seconds.]

Good. Right there. You're doing beautifully.

You are here. You are safe. Your body is beginning to remember what it feels like to not have to be on guard."`,
    coachNotes: `Speak slowly — much more slowly than feels natural. Pause between body regions. Watch for the moment the client's shoulders actually drop — that's the signal they've landed. If they're visibly tense, linger longer. You can gently say: "And if there's any place still holding on... just let it know it can rest for now."`,
    followUpQuestions: [
      "Where are you noticing your body still holding something?",
      "What did it feel like when your shoulders finally dropped?",
      "Is there a part of your body that feels reluctant to soften?",
      "What does your body feel like right now compared to when you walked in?",
    ],
  },
  {
    id: 3,
    title: "Grounding",
    subtitle: "Crystal Core Alignment",
    duration: "3–5 min",
    clientFocus: "You are rooted. You are held. The earth has you.",
    coachScript: `"Now, with your eyes still closed, bring your attention to the soles of your feet.

Imagine that from the soles of your feet, roots are beginning to grow downward. Not forcefully — naturally, like a tree that's been here for a very long time. Down through the floor. Down through the foundation of this building. Down through the layers of rock and earth.

These roots go deep. They are yours. They connect you to something steady, something that has been here long before any of your pain — and will be here long after it moves through.

[Pause.]

And now, imagine a column of light running through the very centre of your body. From the crown of your head, all the way down through your spine, down through your feet, into the earth below.

This is your crystal core — clear, steady, luminous. It cannot be shaken. It is the part of you that has always been whole, even when nothing else felt that way.

Let yourself rest on that column of light right now. It is holding you.

[Pause 10 seconds.]

You are not alone in this room. You are not alone in your body. The earth has you. And I have you. We can go deeper now."`,
    coachNotes: `This step is about establishing safety before the inner work begins. If a client has a trauma history or dissociation pattern, they may find visualisation difficult — simply invite them to feel the physical weight of their body on the chair instead. "Ground" is about "I am here, I am held" — not about being perfect at visualisation.`,
    followUpQuestions: [
      "What does it feel like to imagine yourself as rooted right now?",
      "Does the crystal core feel clear or is there anything clouding it?",
      "What part of your body feels most grounded right now?",
      "Is there a part of you that doesn't want to be held? That's okay — what does that part need?",
    ],
  },
  {
    id: 4,
    title: "Quieting the Mind",
    subtitle: "10-Step Descent",
    duration: "3–5 min",
    clientFocus: "10... 9... 8... Deeper with each breath...",
    coachScript: `"Now I'm going to count down from 10 to 1. With each number, with each breath, you're going to travel a little deeper into yourself. Deeper into stillness. Deeper into the truth of what's here.

You don't need to do anything. The numbers will carry you.

[Speak each number on an exhale. Slow. Deliberate.]

10... breathing out... feeling the body relax a little more.

9... going deeper... the mind growing quieter now.

8... any thoughts that arise... just let them pass like clouds. You don't have to follow them.

7... deeper still. You are safe.

6... halfway down... feel how much quieter it's getting.

5... your body completely supported now... your mind settling like water becoming still.

4... almost there. Any tension remaining... just let it soften.

3... nearly all the way down... you are present, you are safe, you are ready.

2... take one more breath...

1... here. You're here. Welcome to the quiet inside yourself.

[Long pause — 15 seconds of complete silence.]

From this place, we're going to meet what's true."`,
    coachNotes: `The countdown is not about hypnosis — it's about rhythmically signalling the nervous system to downregulate. The silence after "1" is important. Don't rush it. Some clients will have thoughts arise and feel they're "failing" — remind them that noticing thoughts IS the practice. The thoughts are not the enemy.`,
    followUpQuestions: [
      "What's the quality of this stillness for you right now?",
      "Did anything surface during the countdown that wants your attention?",
      "What does quiet feel like in your body?",
    ],
  },
  {
    id: 5,
    title: "Meeting What's Here",
    subtitle: "Inner Encounter",
    duration: "3–5 min",
    clientFocus: "Who or what is here to meet you today?",
    coachScript: `"From this quiet place, I'd like you to gently look inward.

Not searching. Not forcing. Just... noticing.

Is there a feeling here? A presence? Something that's been waiting to be seen?

Maybe it's an emotion. Maybe it's an image — a younger version of yourself, or just a sense of something.

Whatever is here... let it be exactly what it is. You don't need to understand it. You don't need to change it. Just... acknowledge it.

[Pause — 15 seconds.]

Can you tell me what you're noticing? What's present for you right now?

[Let them speak. Don't interpret. Reflect.]

Good. So there's [repeat back what they said] here with you.

Can you turn toward it? Not away from it — toward it. Like you're turning to face someone who's been standing behind you for a very long time.

What happens when you do that?

[Pause. Let them respond.]

Stay with that. We're going to go deeper into it."`,
    coachNotes: `This step often produces the first emotional response of the session. If they cry, let them — don't rush to comfort or fix. A gentle "that's it, let it move through" is enough. The inner child often appears here, but not always — sometimes it's a feeling (grief, rage, numbness), sometimes an image. Follow what they bring, not what you expect.`,
    followUpQuestions: [
      "How old does this feel? Does it have an age?",
      "Have you met this part of yourself before?",
      "What is it doing when you turn toward it? Is it reaching toward you, or moving away?",
      "What does it most need you to know right now?",
      "What does it feel like in your chest when you acknowledge it directly?",
    ],
  },
  {
    id: 6,
    title: "Finding the Energy",
    subtitle: "Somatic Locating",
    duration: "5–8 min",
    clientFocus: "Where does this live in your body?",
    hasBodyMap: true,
    hasEnergySelector: true,
    coachScript: `"Now I'd like you to bring your awareness to your body.

Where does this [emotion / presence / feeling] actually live in your physical body? Don't think about it — just feel. Where are you drawn?

[Pause.]

Point to it if you like, or just notice it internally.

[Let them respond.]

Good. Stay there. Keep your attention right on that spot.

Now, if this energy had a colour — not the colour it should be, just the colour it is — what colour do you see or sense?

[Pause. Let them name it.]

And if it had a shape — a texture, a density — what would that be? Is it sharp, or dense, or scattered, or hollow?

[Pause. Let them describe.]

And if you had to guess at its size — is it the size of a fist? A stone? A room?

[Pause.]

So we have [their colour] energy, shaped like [their description], sitting in your [body location].

Just be with that for a moment. Don't try to change it. Just acknowledge it.

This energy has been here a long time, carrying something for you. We're going to listen to it now."`,
    coachNotes: `The somatic locating is the bridge between story and body. Some clients will go abstract ("I feel sad") — gently redirect: "Where in your body does sad live? If you put your hand there, where would you put it?" Don't rush the colour/shape/size — these sensory details help the subconscious mind engage. They're not metaphors for the client; they're real.`,
    followUpQuestions: [
      "Does the colour change as you look at it more closely?",
      "What happens to the energy when you breathe directly into it?",
      "Does it have a temperature? Hot, cold, warm?",
      "Is it moving or is it still?",
      "How long has this been living in your body? If it knew, what would it say?",
    ],
  },
  {
    id: 7,
    title: "Listening",
    subtitle: "Energy Dialogue",
    duration: "8–12 min",
    clientFocus: "Let it speak. You are listening without judgment.",
    reflection: "What did the energy say? What does it want to release?",
    coachScript: `"Now I'd like you to speak to this energy. Not in your head — out loud, here with me.

You can say: 'I see you. I know you're here. I'm listening.'

[Pause while they say it or repeat it back silently.]

Good. Now, I'd like you to ask it: 'What are you here to protect?'

[Long pause — let them receive and respond.]

[Reflect back what they said without judgment.]

Thank you. Stay with it.

Now ask it: 'What do you most need me to know?'

[Long pause.]

[Reflect back.]

And now this one: 'What has carrying this cost you?'

[Long pause. This often produces deep emotion. Let it move.]

[If tears arise: "That's it. Let it move. You're doing beautifully."]

And finally — ask it: 'What would you like to release? What are you ready to let go of?'

[Long pause.]

[Reflect back.]

You've just given this part of yourself something it may never have received: your full attention. Your willingness to listen without needing it to be different.

That is profound. That is love."`,
    coachNotes: `This is the heart of the session. Resist the urge to interpret, analyse, or guide toward a particular answer. Your job is to hold space for what is true — not what you think should be true. If the client says "I don't know what it wants" — that's okay. Ask: "If it did know, what might it say?" The energy often has very practical things to say (protection, anger, grief, longing). All of it is valid. None of it is wrong.`,
    followUpQuestions: [
      "What surprised you in what it said?",
      "Did any part of what it said land in your body in a different way?",
      "Is there anything it said that part of you is resisting?",
      "What does it feel like to actually listen to this part of you rather than push it away?",
      "Is there anything it needs to hear from you before it can release?",
      "What would it mean to no longer need this protection?",
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

Bring your attention back to that energy in your body. The [colour], the [shape], in your [location].

Now, as you breathe in, imagine breathing light directly into that energy. Warm, clear, golden light. Not to destroy it — but to honour it. To fill it with something it's been missing.

[Pause.]

With each exhale, allow just a little of what no longer serves you to leave. You don't have to release everything. Just what is ready.

[Pause.]

Watch what happens to the colour. Does it change? Does the shape shift?

[Pause. Let them respond.]

What's happening in your body right now?

[Let them describe.]

Now imagine that energy transforming — not disappearing, but changing form. What does it want to become? A colour of light? A warmth? A sense of spaciousness where there was once density?

[Pause.]

Let it transform into whatever it naturally becomes. You're not creating this — you're witnessing it.

[Long pause — 15 seconds.]

What do you notice now in your body where that energy used to be?"`,
    coachNotes: `Some clients will feel a dramatic release — warmth, tingling, tears, deep breath. Others will feel a subtle shift or "nothing yet." Both are valid. Transformation doesn't always feel loud. If they say nothing changed, ask: "Is there anything that changed even slightly? Even a 5% shift counts." The visualisation of the energy changing form is important — it signals to the nervous system that something is different now.`,
    followUpQuestions: [
      "What did it transform into?",
      "Where in your body do you feel the most spaciousness right now?",
      "Is there any residue — any echo of the old energy still present?",
      "What would it take for that residue to transform too?",
      "If this shift has a colour now — what colour is it?",
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

What does your relationship with yourself feel like? Your relationships with others? The way you move through the world?

[Pause — 15 seconds. Let them really see it.]

What do you notice? What's different?

[Let them respond.]

Good. Stay with that.

Now six months forward. The shift that happened today has had time to root and grow. What's possible now that wasn't possible before?

[Pause — 10 seconds.]

What do you see? What do you feel?

[Let them respond.]

And now one year from now. This version of you — who has done this work, who has listened to the parts of themselves that needed to be heard — what does that person's life look like?

What do they have that the person who walked in here today was still longing for?

[Long pause — 15 seconds.]

Take a moment to really inhabit that future self. Feel what they feel. Stand where they stand.

[Pause.]

What does that person most want you to know?"`,
    coachNotes: `The future visioning locks in the neurological pattern change. It's not about creating fantasy — it's about the nervous system experiencing (in the present tense) what safety, wholeness, or love actually feels like. If the client struggles to see a positive future ("I can't imagine that"), that is itself important data. Ask: "What's blocking the vision? Let's meet that."`,
    followUpQuestions: [
      "What surprised you about what you saw?",
      "What does that future version of you want to say to who you are today?",
      "What is the single most important thing that shifted in your future vision?",
      "What would it take to close the gap between who you are now and who you saw?",
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

I'm going to count from 1 to 5. With each number, you're going to return — slowly, gently — carrying everything from this session with you. Nothing is left behind. Everything that shifted stays shifted.

1... beginning to come back. Feeling your breath in your body.

2... feeling the weight of your body on the chair beneath you.

3... becoming aware of the sounds in the room. The temperature of the air.

4... wiggling your fingers and toes if you like. Coming all the way back into the room.

5... eyes gently open whenever you're ready. Welcome back.

[Long pause. Let them orient.]

[Pause in silence — don't rush to words. Let them arrive.]

How are you feeling right now?

[Let them respond without interruption.]

And that number we started with — the intensity you named at the beginning — where does it feel like it's sitting now? On a scale of 1 to 10?

[Record the closing number.]

[If it dropped: "That's real. What happened in your body today was real."]
[If it stayed: "That's okay. The work you did today has been heard. The shift is still in motion."]

Now, from everything that moved in this session — what one action is calling to you? Not a should, not what you think you ought to do. What actually wants to happen next?

[Let them name it. Reflect it back as exactly as they said it.]

Write that down. That's yours. That's what this session is asking you to do.

Thank you for trusting this process — and for trusting yourself enough to go here today. That was brave."`,
    coachNotes: `The closing scale drop is important — record it for the report. If the number dropped even 1–2 points, that is meaningful. If it didn't drop, normalise it: "Sometimes the shift doesn't show up in the number right away — it lands later, in dreams, in how you respond to something tomorrow." The inspired action must come from THEM, not from you. Even if it sounds small. Especially if it sounds small.`,
    followUpQuestions: [
      "What feels most different in your body now compared to when we started?",
      "What do you most want to remember from today?",
      "Is there anything that surprised you about what came up?",
      "What support do you need this week as this continues to integrate?",
      "What would be the first sign that the shift from today is alive in your daily life?",
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
  { id: "head", label: "Head / Mind", x: 48, y: 4 },
  { id: "throat", label: "Throat", x: 48, y: 14 },
  { id: "chest", label: "Chest / Heart", x: 48, y: 24 },
  { id: "shoulders", label: "Shoulders", x: 48, y: 20 },
  { id: "stomach", label: "Stomach / Solar Plexus", x: 48, y: 34 },
  { id: "gut", label: "Gut / Sacral", x: 48, y: 44 },
  { id: "hips", label: "Hips / Pelvis", x: 48, y: 53 },
  { id: "legs", label: "Legs", x: 48, y: 68 },
  { id: "jaw", label: "Jaw / Face", x: 48, y: 10 },
];
