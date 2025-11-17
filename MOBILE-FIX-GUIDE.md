# 📱 Mobile Viewport Fix for Full-Page Artifacts

## The Problem

Your Strategy Workshop uses `height: 100vh` and `overflow: hidden` on the body, which causes the footer to be cut off on mobile because:

1. **Mobile browsers have UI elements** (address bar, navigation bar)
2. **`100vh` includes these UI elements** in the calculation
3. **The actual visible area is smaller** than 100vh
4. **`overflow: hidden` prevents scrolling** to see the cut-off content

## The Solution

Replace `height: 100vh` with `height: 100dvh` (dynamic viewport height) which accounts for mobile browser UI.

### Quick Fix for Your Strategy Workshop

In your artifact's CSS, change this line:

```css
/* OLD - causes mobile cutoff */
.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

/* NEW - works on mobile */
.container {
    height: 100dvh;  /* Dynamic viewport height */
    display: flex;
    flex-direction: column;
}
```

### Alternative Fix (Better Browser Support)

If you want to support older browsers:

```css
.container {
    height: 100vh;
    height: 100dvh;  /* Fallback for modern browsers */
    display: flex;
    flex-direction: column;
}

/* Or use JavaScript */
<script>
// Set actual viewport height
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
</script>

<style>
.container {
    height: calc(var(--vh, 1vh) * 100);
    display: flex;
    flex-direction: column;
}
</style>
```

## How to Update Your Artifact

### Option 1: Edit in Admin Dashboard

1. Go to `https://artifact-vault.vercel.app/admin`
2. Find your "coaching-ourselves" artifact
3. Click "Show Code"
4. Copy the code
5. Delete the artifact
6. Create a new one with the fixed CSS
7. Use the same name to keep the same slug

### Option 2: Direct Database Update (Advanced)

If you want to keep the same artifact ID, you'd need to add an "Edit" feature to the admin dashboard.

## Mobile Testing Checklist

After applying the fix, test on mobile:
- [ ] Header visible (timer, progress, counter)
- [ ] Content scrollable
- [ ] Footer visible (Previous/Next buttons)
- [ ] Buttons touchable
- [ ] No horizontal scroll
- [ ] Text readable
- [ ] All slides accessible

## Why This Happens

**Desktop browsers:**
- `100vh` = full window height
- No address bar interference
- Footer always visible

**Mobile browsers:**
- `100vh` = full height INCLUDING address bar
- Address bar takes ~60-100px
- Footer gets pushed below visible area
- `overflow: hidden` prevents scrolling to it

**Solution:**
- `100dvh` = dynamic viewport (excludes browser UI)
- Footer stays visible
- No scrolling needed

## Future Artifacts

For any full-page artifacts, use:
```css
body {
    height: 100dvh;  /* Not 100vh */
    overflow: hidden;
}
```

Or allow scrolling:
```css
body {
    min-height: 100vh;
    overflow-y: auto;  /* Allow scrolling */
}
```

---

**The Artifact Vault is working perfectly!** The mobile issue is in the artifact's CSS, not the vault itself. Update your artifact with `100dvh` and it will work flawlessly on mobile! 📱