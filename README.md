

# AI Persona

An LLM-powered chatbot that simulates two different software engineering mentors with unique personalities and teaching styles.

## Live Demo

[https://ai-persona-wine.vercel.app/](https://ai-persona-wine.vercel.app/)

## GitHub Repository

[https://github.com/Abhilash-E-1993/AI-Persona](https://github.com/Abhilash-E-1993/AI-Persona)

---

## Features

* LLM-based conversational interface
* Two AI mentor personas:
* **Hitesh Choudhary (HC)**
* **Piyush Garg (PG)**


* Seamless persona switching
* Hinglish conversation support
* Markdown rendering for code and structured text
* Context-aware conversations
* Responsive UI

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* OpenAI API

---

## Persona Data Collection & Preparation

### Hitesh Choudhary (HC)

The persona was created by analyzing publicly available educational content, teaching philosophy, communication style, commonly used phrases, and technical explanations. The focus was on:

* Fundamentals-first teaching with a structured approach (Why, What, Intuition).
* Project-based learning and practical advice.
* Friendly Hinglish communication ("Chai ke saath chill karo").
* Beginner-friendly explanations and real-world analogies.

### Piyush Garg (PG)

This persona was built by studying publicly available technical content, presentation style, system design discussions, and software engineering philosophy. The focus was on:

* Deep technical explanations ("under the hood").
* Systems thinking and building "muscle memory".
* Practical engineering mindset.
* Tying coding concepts to deeper philosophical/system-level analogies.

---

## Prompt Engineering Strategy

Each mentor uses an independent system prompt containing:

* Identity definition
* Personality rules
* Speaking style
* Teaching methodology
* Behavioral constraints
* Tone guidelines
* Response structure

**Prompt engineering techniques used:**

* Role prompting
* Persona conditioning
* Behavioral constraints
* Teaching flow templates
* Natural Hinglish generation
* Context-aware prompting

This ensures that both mentors consistently maintain their own personality and teaching style throughout the conversation.

---

## Context Management

Conversation history is maintained by sending the recent messages along with the system prompt to the LLM.

**Current strategy:**

* Keep the latest conversation history to preserve conversational flow.
* Reset history when switching mentors to prevent persona bleeding.
* Inject a separate, highly detailed system prompt for each persona.
* Provide coherent responses while keeping token usage efficient.

---

## Sample Conversations

Here is a side-by-side comparison of how each persona answers the exact same question.

### Hitesh Choudhary

**User:**

> coding kaise seekna hai?

**HC AI Response:**

> Haan ji, coding seekhna ek interesting aur rewarding journey hai. Dekho, pehle toh yeh samajhna zaroori hai ke coding se problem solve karte hain. Har software ya app kisi na kisi problem ko solve kar raha hota hai.
> 1. **Why does the problem exist?**: Programming ki demand isliye hai kyunki hum technology se apne daily life ke problems solve karte hain, jaise online shopping, social networking, etc.
> 2. **What problem does this solve?**: Different coding languages aur frameworks se hum in problems ke customized solutions bana sakte hain.
> 3. **Simple intuition**: Coding ka basic intuition yeh hai ke hum computer ko logically bata rahe hain ke usse kya karna hai.
> 4. **Internal working**: Har programming language ke apne syntax aur rules hote hain. Yeh rules follow karke hum instructions dete hain.
> 5. **Real-world example**: Socho jab tum ek recipe follow karte ho, waise hi coding mein instructions follow karne hote hain, bas yeh instructions computer ke liye hote hain.
> 6. **Code or syntax**: Start karne ke liye Python ya JavaScript achhe options hain. In languages ki syntax simple hoti hai.
> 7. **Practical advice**: Kahin se bhi padh lo... par padh lo. Free resources bahut hain jaise Codecademy, freeCodeCamp, aur YouTube tutorials. Projects banao, kyunki practical experience se hi learning hoti hai.
> 
> 
> Consistency rakho, roz thoda thoda practice karo. Aur haan, enjoy the process. Coding seekhna ek marathon hai, sprint nahi. Chai ke saath chill karo. 😄

---

### Piyush Garg

**User:**

> coding kasisa seekna hai?

**PG AI Response:**

> Bhai, coding seekhna is like learning to play a musical instrument or doing yoga. It's all about practice, patience, and persistence. Sabse pehle na, tu samajh, ki ye koi rattafication wala subject nahi hai. It's more about developing muscle memory and understanding the logic behind what you're doing.
> 1. **Start with Basics:** Sabse pehle, start with a language like Python or JavaScript. Yeh languages easy to read hain aur bhohot saari resources available hain online.
> 2. **Hands-on Practice:** Code likho, and I mean a lot! Jo bhi concept seekho, usko implement karo. Let's say you learn about loops; immediately write programs that use loops in different ways. The more you type, the more your fingers will build that muscle memory.
> 3. **Understand the "Why":** Har cheez ke peeche ka logic samjho. For example, agar you’re dealing with arrays, understand how they are stored in memory. This will help you make optimized decisions in the future.
> 4. **Projects:** Chhote-chhote projects banao. This will help you apply what you've learned in a practical manner. Kuch simple se shuru karo, like a to-do list app, and then gradually move to more complex projects.
> 5. **Community Involvement:** Join coding communities or forums. Stack Overflow, GitHub, Reddit - ye sab jagah pe log apne issues discuss karte hain, aur discussions se bohot kuch seekhne ko milta hai.
> 6. **Learn the Underlying Systems:** Jaise hum software likhte hain, uske peeche jo systems hain, unko bhi samjho. Like if you're doing web development, understand how browsers work, or if you're doing back-end, understand server architecture.
> 7. **Be Curious:** The more you learn, the more you'll realize how much there is still to learn. Yeh ek endless journey hai, and that's the beauty of it.
> 8. **Balance Theory with Practice:** Theory is important, but don't get stuck in it. Practice is what makes you a better coder. Both are like two sides of a coin, samajh rahe ho?
> 
> 
> Remember, yeh journey tumhara hai. Har koi apne pace pe seekhta hai. Don't compare yourself with others. Keep coding, keep exploring, and the universe of software engineering will keep revealing its secrets to you. 😊

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/Abhilash-E-1993/AI-Persona.git

```

### Install Dependencies

**Backend**

```bash
npm install

```

**Frontend**

```bash
cd frontend
npm install

```

---

## Environment Variables

Create a `.env` file in the backend root folder:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o
PORT=5000

```

---

## Run Backend

```bash
npm run dev

```

---

## Run Frontend

```bash
cd frontend
npm run dev

```

---

## Project Structure

```text
backend/
    prompts/
    routes/
    services/

frontend/
    components/
    pages/
    services/

```

---

## Submission Checklist

* ✅ Live deployed website
* ✅ Public GitHub repository
* ✅ Working LLM-based chat interface
* ✅ Hitesh Choudhary persona
* ✅ Piyush Garg persona
* ✅ Persona switching
* ✅ Persona data collection explained
* ✅ Prompt engineering strategy explained
* ✅ Context management explained
* ✅ Sample conversations included
* ✅ Setup instructions included

---

## Author

**Abhilash E**
