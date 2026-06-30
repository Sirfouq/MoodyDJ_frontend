# Layout Architecture — Hero / Compact + Sticky Bottom Bar

How the HomePage layout transitions between an empty state and a populated state.

## The two states

### State 1 — Empty (no tracks, not loading)
- VibeInput is the **hero** — large, centered in the main area
- No bottom bar
- PlayerController not yet shown (no `current_track`)

### State 2 — Populated (tracks loaded, or skeletons loading)
- Main area becomes a **scrollable list** (TracksList)
- Bottom bar appears, fixed to the viewport bottom
- Bottom bar contains a **compact VibeInput** + PlayerController
- List scrolls *under* the bottom bar (frosted-glass effect)

## The trigger

```ts
const hasContent = tracks.length > 0 || isLoading
```

`isLoading` is included so the layout commits *the moment the user submits*, not after the fetch resolves. Otherwise you get an awkward two-step where the input stays huge while skeletons appear below it.

## VibeInput variant prop

Single component, two visual modes via a `variant?: 'hero' | 'compact'` prop. Defaults to `hero`.

- **hero**: `max-w-3xl` wrapper, full Textarea height, larger submit button
- **compact**: full-width, `min-h-[2.5rem] resize-none` Textarea, smaller button + icon

Submit handler and keyboard behavior are identical across variants.

## HomePage shell structure

```tsx
<div className="flex flex-col h-screen">
  <main className="flex-1 overflow-y-auto px-4 pb-40">
    {!hasContent && <VibeInput variant="hero" ... />}
    {hasContent  && <TracksList ... />}
  </main>

  {hasContent && (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white/95 backdrop-blur-sm z-50">
      <VibeInput variant="compact" ... />
      {current_track && <PlayerController ... />}
    </div>
  )}
</div>
```

## How the "scroll behind" effect works

Three layered mechanisms — z-index alone is NOT enough:

| Mechanism | Class | Role |
|---|---|---|
| `position: fixed` | `fixed bottom-0 left-0 right-0` | Bar floats above content, out of document flow. **The essential piece.** |
| `z-index` | `z-50` | Tie-breaker against future overlays (modals, dropdowns). |
| Translucent bg | `bg-white/95 backdrop-blur-sm` | The *visual* "frosted glass" effect — content under the bar is dimmed but visible. |

Without `fixed`, the bar would push content. Without the translucent bg, content would *vanish* at the bar's edge instead of fading.

## Critical layout detail — `pb-40` on main

The fixed bottom bar overlaps the bottom of `<main>`. Without padding, the last TrackCard would be hidden behind the bar.

`pb-40` adds enough bottom padding (~160px) for the bar + compact input + player controller. Adjust based on actual bar height.

## Animation note

Defer animations for v1. The "hero → compact" transition can't be animated with pure CSS because the elements move between *different DOM locations* (main → bottom bar). For a true morphing animation, would need Framer Motion's shared layout — not worth the dep cost initially.

If basic transitions are wanted later, add `transition-all duration-300` on wrappers and play with `opacity`.

## Edge cases to handle later

1. **User submits empty input again** — if `tracks` reset to `[]`, layout snaps back to hero. Decide: keep old tracks until success, or add explicit "Clear" action.
2. **Mobile keyboard** — virtual keyboards push the bottom bar up. May need `pb-safe` or `keyboard-aware` handling.
3. **Bar height varies** — when `PlayerController` appears/disappears, `pb-40` on main may need to be reactive.
