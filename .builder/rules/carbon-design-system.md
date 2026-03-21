# IBM Carbon Design System Rules

Applies to: `src/components/`, `src/pages/`

## Component usage

Always use IBM Carbon components from `@carbon/react` when a suitable one exists.
Prefer Carbon over plain HTML elements for:

| Need | Use |
|------|-----|
| Buttons | `<Button kind="primary|secondary|ghost|danger">` |
| Text inputs | `<TextInput>`, `<Search>`, `<NumberInput>` |
| Layout | `<Grid>`, `<Column>` |
| Cards | `<Tile>`, `<ClickableTile>`, `<ExpandableTile>` |
| Tables | `<DataTable>` with `<Table>`, `<TableHead>`, etc. |
| Alerts | `<InlineNotification>`, `<ActionableNotification>` |
| Loading | `<SkeletonText>`, `<SkeletonPlaceholder>`, `<Loading>` |
| Navigation | `<Header>`, `<Breadcrumb>`, `<Tabs>` |
| Tags | `<Tag type="gray|blue|red|...">` |

## Tokens

Use Carbon CSS custom properties for all style values:
- Colors: `var(--cds-text-primary)`, `var(--cds-background)`, `var(--cds-interactive)`, `var(--cds-border-subtle)`
- Never hardcode hex values like `#0043ce` — use the token instead.

## Theming

The app supports light (`white`) and dark (`g100`) themes via `<Theme theme={theme}>` in `App.jsx`.
Any new component must look correct in both themes — use Carbon tokens exclusively to ensure this.

## Registering with Builder.io

After creating a new component, register it in `src/components/builder-registry.js`:
```js
Builder.registerComponent(MyComponent, {
  name: 'My Component',
  inputs: [
    { name: 'propName', type: 'string', defaultValue: 'value' },
  ],
});
```
This makes the component available in Builder.io's visual drag-and-drop editor.
