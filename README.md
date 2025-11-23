# 📱 Legacy iOS Teleprompter

> A fully-featured, self-contained browser-based teleprompter designed specifically for ancient iOS devices that modern apps have forgotten.

![iOS 9.3.5](https://img.shields.io/badge/iOS-9.3.5-blue)
![Safari Compatible](https://img.shields.io/badge/Safari-Legacy-orange)
![No Dependencies](https://img.shields.io/badge/dependencies-none-green)
![ES5](https://img.shields.io/badge/JavaScript-ES5-yellow)

## 🎬 The Origin Story

It started with a simple idea: *"I'll grab a cheap used iPad Mini for teleprompter work."*

A 2012 iPad Mini 1 appeared on Facebook marketplace for £25. Perfect! Small, portable, and exactly what I needed. I bought it, charged it up, opened the App Store, and searched for "web teleprompter."

**Every. Single. One. Was. Broken.**

Modern teleprompter web apps are built with ES6+, Flexbox, CSS Grid, and assume you're running at least iOS 12. My little iPad Mini was stuck on iOS 9.3.5 — the final update it would ever receive — and couldn't render any of them properly. Buttons didn't work. Text wouldn't scroll. Some didn't load at all.


Desperate, I went down the jailbreak rabbit hole. Surely someone had patched together a solution for legacy iOS devices? I tried every jailbreak tool I could find:
- **Lower Install**
- **App Admin** 
- **Unc0vered**

Nothing worked. The jailbreak scene for iOS 9 in 2025 is essentially dead.

So I did what any developer would do when faced with a £25 paperweight: I assembled a crack team of AI models and said, *"Let's vibe code a teleprompter that'll run on this ancient thing."*

**Several hours and multiple AI iterations later, this repo was born.**

## ✨ Features

This isn't just a basic scrolling text box. This is a **fully-featured professional teleprompter** that happens to run on hardware from 2012.

### 📝 Core Teleprompter Features
- ✅ **Adjustable font size** (32px - 144px)
- ✅ **Line spacing control** (1.0x - 3.0x)
- ✅ **Side margins** (0px - 200px)
- ✅ **Text alignment** (left, center, right)
- ✅ **Horizontal mirroring** (for physical teleprompter rigs)
- ✅ **Customizable colors** (text + background)
- ✅ **Variable scroll speed** (1-15, adjustable on the fly)
- ✅ **Tap to pause/resume**
- ✅ **Keyboard shortcuts** (Space/K to pause, Escape to exit)

### 🎤 Advanced Features
- ✅ **Voice-based speed matching** (uses Web Speech API when available)
  - Automatically adjusts scroll speed based on your speaking pace
  - Shows real-time WPM (words per minute)
  - Gracefully degrades on unsupported browsers (iOS 9 doesn't support it, so it auto-hides)

### 🎨 UI/UX Design
- ✅ **Split-screen preview** (edit controls + live preview)
- ✅ **Fullscreen prompter mode** (controls hidden during presentation)
- ✅ **Touch-optimized interface** (large buttons, easy sliders)
- ✅ **Clean, professional design**
- ✅ **Notification system** (no ugly alerts)

## 🛠️ Technical Details

### Built For Compatibility
This app is meticulously crafted to work on **Safari iOS 9.3.5** and older browsers:

- **No ES6** - Only ES5 JavaScript (no arrow functions, no `let`/`const`, no template literals)
- **No modern CSS** - No Flexbox or Grid (uses inline-block and positioning)
- **No external dependencies** - Zero CDN links, zero frameworks, zero libraries
- **No build process** - Just open the HTML file and it works
- **Offline-first** - Runs 100% offline once downloaded

### File Structure
```
📦 legacy-ios-teleprompter/
├── 📄 index.html          # The entire app (HTML + CSS + JS)
├── 📄 README.md           # You are here
└── 📄 LICENSE             # MIT License
```

That's it. **One file.** The entire app is self-contained in a single HTML file.

## 🚀 Usage

### Option 1: Host It Yourself
1. Clone this repo
2. Upload `index.html` to your web server
3. Visit the URL on your old iOS device
4. Bookmark it for easy access

### Option 2: Run Locally
1. Download `index.html`
2. Open it in any browser (even ancient ones)
3. It just works™

### Option 3: File Protocol (Offline)
1. Download `index.html` to your iOS device
2. Open it with Safari using the Files app
3. Use it completely offline

### How To Use The Teleprompter

1. **Paste your script** into the text area
2. **Adjust settings:**
   - Font size, line spacing, margins
   - Text alignment and colors
   - Scroll speed (start conservative, adjust during use)
   - Enable voice matching if supported (optional)
3. **Click "Start Prompter"** - Controls hide, prompter goes fullscreen
4. **Tap the screen** to pause/resume scrolling
5. **Press "Stop & Edit"** to return to settings (or press Escape on a keyboard)

## 🎯 Tested On

- ✅ iPad Mini 1 (iOS 9.3.5) - Safari
- ✅ iPad 2 (iOS 9.3.5) - Safari
- ✅ iPhone 4S (iOS 9.3.5) - Safari
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge) - for development

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