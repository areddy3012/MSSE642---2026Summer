Week 7 – State Transition Testing
Traffic Light State Machine (Built Using Claude AI)

🧭 Introduction

State Transition Testing is a black‑box testing technique used to validate how a system behaves as it moves between defined states. A state represents a condition the system can be in, and a transition represents a change triggered by an event. This technique is especially useful for systems that have:
- Distinct modes or phases
- Rules governing the order of operations
- Behavior that depends on previous actions
Common examples include login lockouts, vending machines, elevators, and traffic lights.
When to Use It
- When the system has a finite number of states
- When transitions depend on events or inputs
- When order matters
Limitations
- Can become complex if the number of states grows
- Requires clear, well‑defined states
- Harder to apply to continuous or highly dynamic systems
For this assignment, I implemented a Traffic Light State Machine using Claude AI as my agentic coding assistant.

🚦 State Transition Model
Mermaid State Diagram
stateDiagram-v2
    [*] --> Red
    Red --> Green: Timer
    Green --> Yellow: Timer
    Yellow --> Red: Emergency
    Red --> Red: Emergency
    Green --> Red: Emergency
    Yellow --> (Invalid): Timer



📋 State Transition Table
|  |  |  |  | 
|  |  |  |  | 
|  |  |  |  | 
|  |  |  |  | 
|  |  |  |  | 


The invalid transition (Yellow → Timer) is used for the Rainy Day scenario.

💻 Vibe Coding Assignment – Traffic Light App
This app was generated and debugged using Claude AI, which produced the HTML, CSS, and JavaScript. I ran the code locally in my browser and captured screenshots of both Sunny Day and Rainy Day scenarios.
Files Used
- index.html
- style.css
- script.js

Screenshot
Vibe_Coding_Assignment_2\State Transition Testing.md\Folder screenshot.png

🌤️ Sunny Day Scenario (Valid Transitions)
These screenshots demonstrate correct state transitions:
- Red → Green (Timer)
- Green → Yellow (Timer)
- Yellow → Red (Emergency)

Screenshots

![Sunny Day - Red to Green] Vibe_Coding_Assignment_2\State Transition Testing.md\Sunny day 2.jpeg
![Sunny Day - Green to Yellow] Vibe_Coding_Assignment_2\State Transition Testing.md\Sunny day 3.jpeg
![Sunny Day - Yellow to Red] Vibe_Coding_Assignment_2\State Transition Testing.md\Sunny day 4.jpeg



🌧️ Rainy Day Scenario (Invalid Transition)
The Rainy Day scenario occurs when the user clicks Timer while in Yellow, because the Timer transition from Yellow was intentionally removed.
Expected behavior:
- State does not change
- Log displays:
❌ Invalid transition: Yellow → (Timer)
Screenshot
Vibe_Coding_Assignment_2\State Transition Testing.md\Rainy day.jpeg



🧩 Key Code Snippets
Transitions Object
const transitions = {
  Red: { Timer: "Green", Emergency: "Red" },
  Green: { Timer: "Yellow", Emergency: "Red" },
  Yellow: { Emergency: "Red" } // Timer removed to force invalid transition
};


Invalid Transition Handling
function triggerEvent(event) {
  const next = transitions[currentState][event];

  if (!next) {
    log(`❌ Invalid transition: ${currentState} → (${event})`);
    return;
  }

  log(`✔ ${currentState} → ${next} via ${event}`);
  currentState = next;
  updateUI();
}


🧪 Test Scenarios
Sunny Day
- Start at Red
- Timer → Green
- Timer → Yellow
- Emergency → Red
- All transitions valid
Rainy Day
- Start at Yellow
- Timer → ❌ Invalid
- State remains Yellow
- Error logged

🏁 Conclusion
Using Claude AI as my agentic coding assistant made it significantly easier to generate, debug, and refine the Traffic Light State Machine. Claude helped me:
- Build the UI
- Implement the state machine logic
- Add invalid transition handling
- Regenerate code quickly when changes were needed
Challenges
- Ensuring invalid transitions actually occurred
- Syncing UI updates with state changes
- Making sure the log displayed both valid and invalid transitions
What I Learned
- How State Transition Testing applies to real systems
- How to design Sunny Day and Rainy Day scenarios
- How agentic AI tools can accelerate development and debugging
- How to structure a state machine cleanly and test it thoroughly


