# Animated Grid Beams Implementation Guide

## Overview
This document explains the animated grid beams feature for the hero section and provides troubleshooting steps.

## Current Implementation

### Component Structure
- **Component**: `src/components/AnimatedGridBeams.tsx`
- **Integration**: Used in `src/components/HeroSection.tsx`
- **Technology**: Framer Motion (motion/react)

### Features
- 3 animated beams (2 horizontal, 1 vertical)
- Diffuse glow effects with emerald green color
- Variable speeds and staggered delays
- Fade in/out at edges
- Infinite loop animations
- Theme-aware (dark/light mode support)

## Current Configuration

### Beam Specifications
1. **Beam 1**: Horizontal at row 10 (400px from top)
   - Duration: 12s
   - Delay: 0s
   - Start: -25vw from left

2. **Beam 2**: Vertical at column 15 (600px from left)
   - Duration: 15s
   - Delay: 3s
   - Start: -20vh from top

3. **Beam 3**: Horizontal at row 20 (800px from top)
   - Duration: 18s
   - Delay: 6s
   - Start: -30vw from left

### Grid Configuration
- Cell size: 40px
- Grid system: Virtual grid (not visible)

## Troubleshooting Steps

### 1. Verify Component is Rendering
**Check if the component is being imported and used correctly:**

```tsx
// In HeroSection.tsx
import { AnimatedGridBeams } from "./AnimatedGridBeams";

// Inside the section:
<AnimatedGridBeams />
```

**Verify the component is in the DOM:**
- Open browser DevTools
- Inspect the hero section
- Look for `AnimatedGridBeams` component wrapper
- Check if motion.div elements are present

### 2. Check for Console Errors
- Open browser console (F12)
- Look for:
  - React errors
  - Framer Motion errors
  - Import/module errors

### 3. Verify Visibility Issues

**Potential visibility problems:**

#### A. Z-Index Conflicts
- Beams are set to `z-0`
- Content is set to `z-10`
- Check if global background has higher z-index

**Fix:** Ensure AnimatedGridBeams container has proper z-index:
```tsx
<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
```

#### B. Opacity Too Low
- Current opacity animates from 0 to 1
- Gradient uses 0.8 opacity
- May blend with background

**Fix:** Increase opacity or adjust colors:
```tsx
background: "linear-gradient(..., rgba(16, 185, 129, 0.9) ...)"
```

#### C. Beams Off-Screen
- Positions use fixed pixel values
- May be outside viewport on different screen sizes

**Fix:** Use viewport-relative positioning:
```tsx
position: 10, // 10 * 40px = 400px
// Consider: Math.floor(window.innerHeight * 0.3 / CELL_SIZE)
```

### 4. Animation Not Working

**Check Framer Motion:**
- Verify `motion/react` is installed
- Check if animations are being blocked by CSS
- Verify `overflow-hidden` is not clipping animations

**Test with simpler animation:**
```tsx
animate={{ opacity: [0, 1, 0] }}
```

### 5. Transform Issues

**Current implementation uses:**
- `x: "-25vw"` for horizontal beams
- `y: "-20vh"` for vertical beams

**Potential issues:**
- Transform percentages may not work as expected
- Viewport units might not animate smoothly

**Alternative approach:**
```tsx
// Use pixel-based transforms
initial={{ x: -window.innerWidth * 0.25 }}
animate={{ x: window.innerWidth * 1.2 }}
```

Or use CSS animations instead of Framer Motion transforms.

## Debugging Checklist

- [ ] Component is imported correctly
- [ ] Component is in the DOM (DevTools)
- [ ] No console errors
- [ ] Z-index is correct (beams behind content)
- [ ] Beams are within viewport bounds
- [ ] Framer Motion is working (test with simple animation)
- [ ] Colors are visible against background
- [ ] Transform animations are working
- [ ] Opacity animations are working
- [ ] Dev server is running and updated

## Recommended Next Steps

### Step 1: Add Debug Overlay (Temporary)
Add a visible test element to verify the component is rendering:

```tsx
// In AnimatedGridBeams.tsx
return (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Debug: Temporary visible element */}
    <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 opacity-50 z-50">
      DEBUG
    </div>
    
    {/* Rest of beams... */}
  </div>
);
```

If you see the red debug box, the component is rendering. If not, check imports.

### Step 2: Test with Static Beams
Replace animated beams with static visible beams:

```tsx
// Static test beam
<div
  className="absolute"
  style={{
    top: 400,
    left: 0,
    width: "100vw",
    height: "4px",
    background: "rgba(16, 185, 129, 1)",
    boxShadow: "0 0 50px rgba(16, 185, 129, 0.8)",
  }}
/>
```

If static beam is visible, the issue is with animations.

### Step 3: Simplify Animation
Test with a basic Framer Motion animation:

```tsx
<motion.div
  animate={{ opacity: [0, 1, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
  style={{
    position: "absolute",
    top: 400,
    left: 0,
    width: "100vw",
    height: "4px",
    background: "rgba(16, 185, 129, 1)",
  }}
/>
```

### Step 4: Check Background Overlay
The global `AnimatedBackground` component might be covering the beams:
- Check z-index in `AnimatedBackground.tsx`
- Ensure it's `z-[-10]` or lower
- Beams should be `z-0`, content `z-10`

### Step 5: Alternative Implementation
If Framer Motion continues to have issues, consider:

**Option A: CSS Animations**
```css
@keyframes slide-right {
  from { transform: translateX(-25vw); }
  to { transform: translateX(120vw); }
}

.beam-horizontal {
  animation: slide-right 12s linear infinite;
}
```

**Option B: Canvas-based**
- Use HTML5 Canvas for more control
- Better performance for many beams
- More complex implementation

**Option C: Pure CSS with transforms**
- Use CSS `@keyframes`
- More reliable across browsers
- Less flexible than Framer Motion

## Testing Recommendations

1. **Test in different browsers:**
   - Chrome/Edge
   - Firefox
   - Safari

2. **Test different screen sizes:**
   - Mobile (< 768px)
   - Tablet (768px - 1024px)
   - Desktop (> 1024px)

3. **Test with different themes:**
   - Dark mode
   - Light mode

4. **Performance testing:**
   - Check FPS during animation
   - Ensure smooth 60fps
   - Reduce blur/glow if laggy

## Performance Considerations

- **Current blur**: `blur(2px)` - may impact performance
- **Multiple box-shadows**: 3 layers - can be heavy
- **Infinite animations**: Running continuously
- **Consider**: Using `will-change: transform` for optimization

## Future Enhancements

1. **Responsive positioning**: Adjust beam positions based on viewport
2. **Interactive beams**: Respond to mouse movement
3. **More beams**: Add more beams with different patterns
4. **Parallax effect**: Beams move with scroll
5. **Performance optimization**: Use CSS animations or WebGL

## Files to Check

- `src/components/AnimatedGridBeams.tsx` - Main component
- `src/components/HeroSection.tsx` - Integration point
- `src/components/AnimatedBackground.tsx` - May conflict with z-index
- `src/App.tsx` - Check overall structure

## Quick Fixes to Try

1. **Increase brightness:**
   ```tsx
   rgba(16, 185, 129, 1) // instead of 0.8
   ```

2. **Remove blur temporarily:**
   ```tsx
   filter: "none" // instead of blur(2px)
   ```

3. **Use fixed positions:**
   ```tsx
   top: "50vh" // center of viewport
   ```

4. **Add border for visibility:**
   ```tsx
   border: "1px solid rgba(16, 185, 129, 1)"
   ```

## Contact Points

If issues persist:
1. Check browser console for errors
2. Verify all dependencies are installed
3. Test in incognito mode (rule out extensions)
4. Check if other animations are working
5. Verify Framer Motion version compatibility

---

**Last Updated**: Current implementation with vw/vh transforms
**Status**: Ready for testing and debugging

