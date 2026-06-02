# Track Progress & Seeking - How It Works

## Overview

Track progress is managed across two files:

- `useSpotifyPlayer.tsx` (the hook) — owns the `position` state and communicates with Spotify SDK
- `PlayerController.tsx` (the component) — displays the slider and handles user interaction

---

## How position updates during normal playback

1. When a track starts playing, Spotify fires `player_state_changed` with `state.position` (in ms).
2. The hook stores this in `position` state via `setPosition(state.position)`.
3. A `setInterval` runs every 1000ms and increments `position` by 1000 — this is a local approximation so the slider moves smoothly without constantly polling Spotify.
4. When the track is paused, the interval is cleared (it only runs when `isPaused` is false).

```
Spotify event fires (real position) --> setPosition(state.position)
          |
          v
Interval ticks every 1s --> setPosition(prev => prev + 1000)
          |
          v
Slider reads `position` and renders the thumb at the right spot
```

---

## How seeking (dragging the slider) works

### The two-value pattern: `position` vs `seekPosition`

- `position` = the live playback position (ticking every second)
- `seekPosition` = temporary override while the user is dragging (local to PlayerController)

The slider displays: `seekPosition ?? position`

- If `seekPosition` is not null (user is dragging) --> show the drag position
- If `seekPosition` is null (not dragging) --> show the live position

### Step-by-step flow when user drags the slider:

1. **User starts dragging** --> `onValueChange` fires --> `setSeekPosition(val)`
   - Slider now shows `seekPosition` (the user's finger), not the ticking `position`
   - Without this, the slider thumb would fight the user's drag

2. **User releases the slider** --> `onValueCommit` fires with the final value
   - `player.seek(val)` is called --> tells Spotify to jump to that position
   - `setSeekPosition(null)` --> slider falls back to showing `position`

3. **Spotify processes the seek** --> fires `player_state_changed` with the new position
   - `setPosition(state.position)` updates to the real new position
   - The interval continues ticking from the new position

```
User drags slider
    |
    v
onValueChange --> setSeekPosition(dragValue)
    |               Slider shows: seekPosition (user's drag position)
    v
User releases
    |
    v
onValueCommit --> player.seek(newPosition)  (tells Spotify to jump)
              --> setSeekPosition(null)      (slider falls back to `position`)
    |
    v
Spotify fires player_state_changed
    |
    v
setPosition(state.position)  (now `position` reflects the new spot)
    |
    v
Interval resumes ticking from new position
```

---

## Why `seekPosition` resets to `null` (not `0`)

`null` means "not seeking" — the slider should show `position`.
`0` is a valid position (the start of a track) and would make the slider jump to the beginning.
