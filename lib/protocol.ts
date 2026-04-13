export interface ProtocolStep {
  id: number;
  title: string;
  subtitle: string;
  coachPrompt: string; // What coach says/does
  clientFocus: string; // What client sees/experiences
  hasBodyMap?: boolean;
  hasEnergySelector?: boolean;
  hasScale?: boolean;
  scaleLabel?: string;
  reflection?: string; // Pause prompt for coach to capture
  duration?: string; // Approximate time
}

export const PROTOCOL_STEPS: ProtocolStep[] = [
  {
    id: 1,
    title: "Arriving",
    subtitle: "Intention + Opening Scale",
    coachPrompt: "Welcome them in. Ask: 'What do you want to release or shift in this session?' Then invite them to rate their current intensity on a scale of 1-10.",
    clientFocus: "Take a slow breath. You are safe. This space is yours.",
    hasScale: true,
    scaleLabel: "How intense does this feel right now? (1 = barely there, 10 = overwhelming)",
    duration: "3-5 min",
  },
  {
    id: 2,
    title: "Settling the Body",
    subtitle: "Progressive Relaxation",
    coachPrompt: "Guide them through a slow body scan — feet, legs, hips, belly, chest, shoulders, neck, face. Invite each area to soften. Speak slowly.",
    clientFocus: "Let your body get heavy. Nothing to do. Nowhere to be.",
    duration: "5-8 min",
  },
  {
    id: 3,
    title: "Grounding",
    subtitle: "Crystal Core Alignment",
    coachPrompt: "Guide them to imagine roots growing from their feet deep into the earth. A crystal core of light running from crown to base of spine. They are connected and held.",
    clientFocus: "You are rooted. You are held. The earth has you.",
    duration: "3-5 min",
  },
  {
    id: 4,
    title: "Quieting the Mind",
    subtitle: "10-Step Descent",
    coachPrompt: "Count slowly from 10 to 1. With each number, invite them deeper into stillness. 'With each breath, the mind grows quieter...'",
    clientFocus: "10... 9... 8... Deeper with each breath...",
    duration: "3-5 min",
  },
  {
    id: 5,
    title: "Meeting What's Here",
    subtitle: "Inner Encounter",
    coachPrompt: "Invite them to notice: is there an inner child present? An emotion? A part of them that wants to be seen? Just observe without judgment.",
    clientFocus: "Who or what is here to meet you today?",
    duration: "3-5 min",
  },
  {
    id: 6,
    title: "Finding the Energy",
    subtitle: "Somatic Locating",
    coachPrompt: "Ask: 'Where do you feel this in your body? If this energy had a color, what would it be? A shape? A size?' Allow them to explore without rushing.",
    clientFocus: "Where does this live in your body?",
    hasBodyMap: true,
    hasEnergySelector: true,
    duration: "5-8 min",
  },
  {
    id: 7,
    title: "Listening",
    subtitle: "Energy Dialogue",
    coachPrompt: "Guide a dialogue with the energy: 'What is it here to protect? What does it need you to know? What would it like to release?'",
    clientFocus: "Let it speak. You are listening without judgment.",
    reflection: "What is the energy saying? What does it want to release?",
    duration: "8-12 min",
  },
  {
    id: 8,
    title: "Transforming",
    subtitle: "Release Visualization",
    coachPrompt: "Guide them to imagine the energy transforming — dissolving into light, washing out with breath, lifting from the body. What does it become?",
    clientFocus: "Watch it shift. Feel the change.",
    reflection: "What transformed? What does the body feel now?",
    duration: "5-8 min",
  },
  {
    id: 9,
    title: "Integrating",
    subtitle: "Future Visioning",
    coachPrompt: "Invite them to see themselves at 3 months, 6 months, 1 year — carrying this shift forward. What becomes possible? What do they feel?",
    clientFocus: "See yourself living what just opened.",
    reflection: "What did they vision? What becomes possible now?",
    duration: "5-8 min",
  },
  {
    id: 10,
    title: "Returning",
    subtitle: "Grounding + Inspired Actions",
    coachPrompt: "Slowly bring them back. Count from 1 to 5. Ask: 'What one inspired action calls to you from this session?'",
    clientFocus: "Gently returning. Bringing everything with you.",
    hasScale: true,
    scaleLabel: "How does the intensity feel now? (1-10)",
    reflection: "What inspired actions did they name?",
    duration: "5-8 min",
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
