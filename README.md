# DevGuild - MVP Implementation

A React Native mobile app that helps developers find and connect with peers in their geographic area, fostering collaboration and community building.

## 🎯 Project Vision

DevGuild is designed to be **forked and customized** by local institutions (colleges, universities, tech incubators). Each organization can:
- Add their own branding and styling
- Translate to local languages
- Point to their own backend service
- Deploy to app stores for their community

The codebase prioritizes **clarity and maintainability** so external developers can easily understand and modify the code without needing to contact the original authors.

---

## 📋 Implementation Overview

This MVP includes three core screens and supporting services:

### **Screens**

#### 1. **Welcome Screen** (`src/screens/WelcomeScreen.tsx`)
- **Purpose**: First-time user onboarding
- **Flow**: 
  - User enters GitHub username
  - Validated against GitHub API
  - Saved locally in AsyncStorage
  - Never shown again after successful signup
- **Key Features**:
  - Real-time validation with loading state
  - Clear error messages
  - Responsive, clean UI

#### 2. **Map Screen** (`src/screens/MapScreen.tsx`)
- **Purpose**: Browse all registered developers
- **Features**:
  - Interactive map showing all community members
  - User avatars as map markers
  - Tap marker → see user tooltip with name/org/avatar
  - Tap tooltip → navigate to GitHub profile
  - Mock data for MVP (replace with backend API)
- **Extensibility**: Easy to swap `MOCK_USERS` with API endpoint

#### 3. **Profile Screen** (`src/screens/ProfileScreen.tsx`)
- **Purpose**: View developer's GitHub profile
- **Implementation**: WebView wrapping GitHub profile URL
- **Shows**: Repositories, contributions, followers, bio, etc.

### **Components**

#### `UserMarker.tsx`
- Displays user avatar as map marker
- Circular with white border
- Customizable size
- Reusable across different contexts

#### `UserTooltip.tsx`
- Card-style component showing user info
- Name, organization, and avatar
- Pressure-sensitive (clickable)
- Styled for consistency

### **Services**

#### `services/github.ts` - GitHub API Integration
```typescript
githubService.validateUsername(username)  // Check if user exists
githubService.fetchUserProfile(username)  // Get user details
githubService.fetchUserRepos(username)    // Get public repos
```
**Design Intent**: Single point of GitHub API integration. Institutions can replace this with their own backend while keeping the same interface.

#### `services/storage.ts` - Local Data Persistence
```typescript
storageService.saveUsername(username)     // Save after validation
storageService.getUsername()              // Check on app load
storageService.cacheUsers(users)          // Store user list
storageService.clearAll()                 // Logout functionality
```
**Design Intent**: Abstracted storage layer. Easy to swap AsyncStorage for another solution (realm, SQLite, etc.)

### **Types**

#### `types/User.ts`
```typescript
interface User {
  username: string;
  name: string | null;
  org: string | null;
  latitude: number;
  longitude: number;
  avatar: string;
  bio?: string;
  followers?: number;
}

// Mock data for development
export const MOCK_USERS: User[] = [...]
```

### **Navigation**

#### `navigation/AppNavigator.tsx`
- Conditional routing based on onboarding status
- **Welcome** - First app launch
- **Map** - After signup (main screen)
- **Profile** - View individual GitHub profile
- Proper loading state while checking stored data

---

## 🏗️ Architecture & Design Decisions

### **Service-Based Architecture**
Each service handles a specific domain (GitHub API, local storage). This allows:
- Easy unit testing
- Simple to replace with alternative implementations
- Clear separation of concerns

### **Type Safety with TypeScript**
- All components and screens fully typed
- Catch errors at compile-time
- Better developer experience for fork maintainers

### **Conditional Navigation**
The app checks for saved username on startup:
- **Has username** → Show Map (main experience)
- **No username** → Show Welcome (signup)
- This prevents showing signup screen to returning users

### **Error Handling**
- Network errors display user-friendly alerts
- Fallback to mock data if API fails
- Loading states prevent double-taps

### **Extensibility for Institutions**
Each component is designed to be easily customizable:

```
// To rebrand, just update:
src/theme/      (colors, fonts, spacing)
src/screens/    (content, text, images)
src/services/github.ts  (API endpoint - not just GitHub)

// Navigation and structure remain the same
```

---

## 🔄 Data Flow

```
App.tsx
  ↓
AppNavigator (checks if user exists)
  ├─ Welcome Screen (on first launch)
  │   ├─ User enters GitHub username
  │   ├─ GitHub service validates
  │   └─ Storage service saves
  │
  ├─ Map Screen (main screen)
  │   ├─ Load users (mock or API)
  │   ├─ Display markers
  │   └─ Open profile on tap
  │
  └─ Profile Screen (WebView)
      └─ Display full GitHub profile
```

---

## 🚀 Setup & Development

### **Prerequisites**
- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### **Installation**
```bash
npm install
```

### **Run Development Server**
```bash
npm start

# Then press 'i' for iOS, 'a' for Android, or 'w' for web
```

### **Build APK/IPA**
```bash
# Build APK for Android
eas build -p android

# Build IPA for iOS
eas build -p ios
```

---

## 📦 Dependencies

**Core**:
- `react-native-maps` - Interactive map component
- `react-native-webview` - WebView for GitHub profiles
- `@react-navigation` - Navigation between screens

**Storage**:
- `@react-native-async-storage/async-storage` - Local data persistence

**UI**:
- `expo-constants` - Device constants
- `react-native-safe-area-context` - Safe area handling

**Utilities**:
- `expo-router` - File-based routing (backup navigation)
- `react-native-reanimated` - Smooth animations

---

## 🔧 Customization Guide for Institutions

### **1. Change API Endpoint**
Edit `src/services/github.ts`:
```typescript
// Before
const response = await fetch(`https://api.github.com/users/${username}`);

// After (institution's backend)
const response = await fetch(`https://api.myinstitution.com/developers/${username}`);
```

### **2. Update Branding**
- Modify colors in Welcome Screen (`WelcomeScreen.tsx`)
- Update app name in `app.json`
- Replace logo/splash screen in `assets/images/`

### **3. Add Institution-Specific Features**
- Create new screens in `src/screens/`
- Add new navigation routes to `AppNavigator.tsx`
- Import and use existing services

### **4. Replace Mock Users**
In `MapScreen.tsx`:
```typescript
// Replace this:
setUsers(MOCK_USERS);

// With your API call:
const response = await fetch('https://api.myinstitution.com/users');
const users = await response.json();
setUsers(users);
```

---

## 📝 Code Style & Conventions

**All screens, components, and services follow these patterns**:

1. **Comments explain "why"**, not "what"
   ```typescript
   // ✅ Good
   // Prevent showing signup screen to returning users
   setInitialRoute(username ? 'Map' : 'Welcome');

   // ❌ Avoid
   // Set initial route
   setInitialRoute(username ? 'Map' : 'Welcome');
   ```

2. **TypeScript interfaces for all props**
   ```typescript
   interface WelcomeScreenProps {
     navigation: any;
   }
   const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
   ```

3. **Error handling with user-friendly messages**
   ```typescript
   Alert.alert('Username Not Found', 'This GitHub username does not exist...');
   ```

4. **Loading states for async operations**
   ```typescript
   {isLoading ? <ActivityIndicator /> : <TouchableOpacity>}
   ```

---

## 🧪 Testing

**For MVP**: Manual testing is sufficient
- Test on iOS and Android simulators
- Test network errors (disable wifi)
- Test with valid/invalid GitHub usernames

**Future enhancements**:
- Unit tests for services
- Component tests with React Testing Library
- Integration tests for navigation flow

---

## 🐛 Troubleshooting

**"User not found" error after entering valid GitHub username**
- Likely GitHub API rate limiting (60 requests/hour for unauthenticated)
- Wait or add GitHub token in `github.ts`:
  ```typescript
  headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
  ```

**Map not showing markers**
- Check that `MOCK_USERS` has valid latitude/longitude
- Or replace with real API data

**AsyncStorage warnings**
- Normal on first app launch
- Data persists after first save

---

## 📚 Project Structure

```
DevGuild/
├── App.tsx                           # Root component
├── app.json                          # Expo configuration
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
│
├── src/
│   ├── api/                         # API clients (empty for MVP)
│   │
│   ├── components/                  # Reusable components
│   │   ├── UserMarker.tsx          # Map marker avatar
│   │   └── UserTooltip.tsx         # User info card
│   │
│   ├── hooks/                       # Custom React hooks (empty for MVP)
│   │
│   ├── navigation/                  # Navigation configuration
│   │   └── AppNavigator.tsx        # Main navigation stack
│   │
│   ├── screens/                     # App screens
│   │   ├── WelcomeScreen.tsx       # Signup screen
│   │   ├── MapScreen.tsx           # Community map
│   │   └── ProfileScreen.tsx       # GitHub profile viewer
│   │
│   ├── services/                    # Business logic services
│   │   ├── github.ts               # GitHub API integration
│   │   └── storage.ts              # Local storage management
│   │
│   ├── theme/                       # Styling (empty for MVP)
│   │
│   └── types/                       # TypeScript interfaces
│       └── User.ts                 # User interface & mock data
│
└── assets/                          # Images, fonts, etc.
```

---

## 📄 Git Commit History

This implementation was built incrementally with clear commit messages:

1. **Core services** - GitHub API and storage abstractions
2. **Type definitions** - User interface and mock data
3. **Reusable components** - Map marker and tooltip
4. **MVP screens** - Welcome, Map, Profile
5. **Navigation & initialization** - App entry point and routing

Each commit explains the "why" to help external developers understand design decisions.

---

## 🤝 Contributing for External Developers

When forking this project:

1. **Understand the architecture** - Read this README and code comments
2. **Start with `services/github.ts`** - Replace with your backend
3. **Update `MOCK_USERS`** - Point to your users
4. **Customize screens** - Add branding and institution-specific content
5. **Keep the component structure** - Makes it easier for others to fork later

The goal is for this code to be a **starting point**, not a template to be copied. Each institution should make it their own!

---

## 📄 License

This project is open-source and designed to be forked and customized. Check LICENSE file for details.

---

## 🎓 Learning Resources

This project demonstrates:
- React Native with Expo
- TypeScript in React Native
- Navigation patterns (conditional routing)
- API integration and error handling
- Local data persistence
- Component composition
- Service-based architecture

Perfect for learning or as a template for similar community apps!
