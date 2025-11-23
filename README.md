# 📱 Legacy iOS Teleprompter

> A fully-featured, self-contained browser-based teleprompter designed specifically for ancient iOS devices that modern apps have forgotten.

![iOS 9.3.5](https://img.shields.io/badge/iOS-9.3.5-blue)
![Safari Compatible](https://img.shields.io/badge/Safari-Legacy-orange)
![No Dependencies](https://img.shields.io/badge/dependencies-none-green)
![ES5](https://img.shields.io/badge/JavaScript-ES5-yellow)

## 🎬 The Origin Story

It started with a simple idea: *"I'll grab a cheap used iPad Mini for teleprompter work."*

A 2012 iPad Mini 1 appeared on Facebook marketplace for £25. Perfect! Small, portable, and exactly what I needed. I bought it, charged it up, opened the App Store, and searched for "Prompt+"

**Every. Single. One. Was. Broken.**

Modern teleprompter web apps are built with ES6+, Flexbox, CSS Grid, and assume you're running at least iOS 12. My little iPad Mini was stuck on iOS 9.3.5 — the final update it would ever receive — and couldn't render any of them properly. Buttons didn't work. Text wouldn't scroll. Some didn't load at all.


Desperate, I went down the jailbreak rabbit hole. Surely someone had patched together a solution for legacy iOS devices? I tried every jailbreak tool I could find:
- **Lower Install**
- **App Admin** 
- **Unc0vered**

Nothing worked. The jailbreak scene for iOS 9 in 2025 is essentially dead.

So I did what any wannabe developer would do when faced with a £25 paperweight: I assembled a crack team of AI models and said, *"Let's vibe code a teleprompter that'll run on this ancient thing."*

**Several hours and multiple AI iterations later, this repo was born.**

## ✨ Features
This isn't just a basic text box. This is a **database-backed teleprompter** that happens to run on hardware from 2012.


### 📝 Core Teleprompter Features
- ✅ **Sub-Pixel Smoothing**: Custom float-accumulator engine to allow ultra-slow scrolling on old WebKit browsers.
- ✅ **Settings Persistence**: Remembers your Font Size, Margins, Speed, and Mirror settings (localStorage).
- ✅ **Script Management**: Save, Load, and Delete scripts via a built-in SQLite database.
- ✅ **"True" Fullscreen**: Hides the address bar when added to the iOS Home Screen.
- ✅ **NoSleep Mode**: Uses a hidden video loop to prevent the iPad from auto-locking during speeches.
- ✅ **Mirror Mode**: Defaults to ON for professional beam-splitter glass rigs.
- ✅ **Detailed Controls**: 
  - Live Speed Slider (1-80)
  - Navigation Buttons (`«` Top, `<` Up 20%, `>` Down 20%, `»` Bottom)
  - Margin adjustments for readability


### 🛠️ Technical Details
### Built For Compatibility
This app is meticulously crafted to work on **Safari iOS 9.3.5**:
- **No ES6**: Strict ES5 JavaScript (no arrow functions, no `let`/`const`).
- **No Flexbox/Grid**: Uses retro `float` layouts and absolute positioning.
- **Legacy Touch Events**: Optimized `onclick` handlers that respond instantly on old touchscreens.

### Architecture
Unlike the original prototype, this is now a containerized application:
- **Backend**: Node.js (Express) serving the API.
- **Database**: SQLite3 (embedded, no external DB container needed).
- **Frontend**: Vanilla HTML/CSS/JS served statically by Express.

### File Structure
```
📦 legacy-ios-teleprompter/
├── 📄 index.html          # The entire app (HTML + CSS + JS)
├── 📄 README.md           # You are here
└── 📄 LICENSE             # MIT License
```

That's it. **One file.** The entire app is self-contained in a single HTML file.


## 🚀 Deployment
### 1. Docker Compose (Recommended)
This setup assumes you have Traefik running externally, but can be displayed standalone by mapping ports.

```bash
# 1. Clone the repo
git clone https://github.com/salakoayoola/legacy-teleprompter-web.git

# 2. Build and Run
docker-compose up -d --build

### How To Use The Teleprompter

1. **Navigate to your hosted URL on Safari.**
2. **Tap the Share Icon** (Square with arrow pointing up).
3. **Tap "Add to Home Screen".**
4. **Open the new Icon.**
Why? iOS 9 does not support the Fullscreen API via JavaScript. This "WebApp" mode is the only way to remove the URL bar and get 100% screen real estate.

## Easter Egg
If you launch the application with an empty database, it will automatically seed itself with Carl Sagan's Pale Blue Dot speech. You're welcome.


## 🎯 Tested On

- ✅ iPad Mini 1 (iOS 9.3.5) - Safari

## 🧠 Development Philosophy

This project was **"vibe coded"** with an ensemble of AI models, each contributing their strengths:

### 🤖 The AI Dream Team

1. **ChatGPT GPT-4o** - Initial PRD (Product Requirements Document) refinement and feature scoping
2. **Gemini 2.0 Flash** - Additional PRD iteration and edge case analysis (via Open WebUI)
3. **Bolt.new** - Rapid prototyping and initial UI concepts
4. **Claude Sonnet 4.5** - Final implementation, ES5 compatibility enforcement, and code quality

### The Process
1. Define requirements based on real hardware limitations
2. Iterate PRD across multiple AI models to catch edge cases
3. Rapid prototype with Bolt.new to validate concepts
4. Implement production version with strict compatibility constraints
5. Test on actual iOS 9.3.5 hardware
6. Refine UI/UX based on real-world usage

**No fancy frameworks. No bleeding-edge features. Just pure, functional code that works on forgotten hardware.**

This multi-model approach proved invaluable: each AI brought different perspectives on browser compatibility, UX patterns, and potential pitfalls. The result is a robust app that actually works on decade-old hardware.

## 🤝 Contributing

This project is feature-complete for its intended purpose, but contributions are welcome:

- 🐛 Bug reports for compatibility issues
- 💡 Feature suggestions (must work on iOS 9.3.5)
- 🎨 UI/UX improvements
- 📱 Testing on other old devices

**Please test on actual legacy hardware before submitting PRs.**

## 📜 License

MIT License - Use it, modify it, host it, whatever. Just don't blame me if your presentation goes sideways.

## 🙏 Acknowledgments

- **My £25 iPad Mini from Facebook Marketplace** - For refusing to run modern web apps and inspiring this project
- **ChatGPT (OpenAI)** - For PRD refinement and requirements engineering
- **Gemini 2.0 Flash (Google)** - For additional PRD iteration and edge case discovery
- **Bolt.new (StackBlitz)** - For rapid prototyping and UI exploration
- **Claude Sonnet 4.5 (Anthropic)** - For final implementation and ES5 compatibility wizardry

- **The iOS 9 Safari team** - For creating a browser that still kinda works in 2025
- **The jailbreak community** - For trying, even though it didn't work out this time
---

**Made with ☕ and a coalition of AI models in 2025**

*Because sometimes all old-school problems need are old-school solutions, dressed as modern ingenuity.*