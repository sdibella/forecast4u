# GitHub Setup Instructions

Follow these steps on your machine to create the repo and push the code:

## 1. Create a new repository on GitHub

Go to https://github.com/new and:
- **Repository name**: `forecast4u`
- **Description**: (optional) "Forecast4U - 5-day weather forecast with Builder.io and IBM Carbon"
- **Public**: Yes
- **Do NOT initialize** with README, .gitignore, or license (we already have these)
- Click "Create repository"

## 2. Add the remote and push all branches

In your terminal, from the `forecast4u` folder:

```bash
git remote add origin https://github.com/YOUR_USERNAME/forecast4u.git
git branch -M main
git push -u origin main
git push -u origin feature/weather-alert-banner
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 3. Verify

Visit https://github.com/YOUR_USERNAME/forecast4u and you should see:
- **main branch** with all the code
- **feature/weather-alert-banner branch** with the WeatherAlertBanner custom component

## 4. Set up GitHub Actions secrets (for CI/CD design system indexing)

After pushing, go to your repo settings:
1. Settings → Secrets and variables → Actions
2. Create these secrets:
   - `BUILDER_PUBLIC_KEY`: `f228a19714884e3ca66e924d6affbfe8`
   - `BUILDER_PRIVATE_KEY`: (get from Builder.io Settings → API keys)
   - `BUILDER_USER_ID`: (get from `npx @builder.io/dev-tools@latest auth status`)

Once these are set, the `.github/workflows/builder-index.yml` workflow will automatically re-index your Carbon design system on every push to `main`.

## 5. Next: Run the design system indexing

After creating the GitHub repo, run this in your `forecast4u` folder:

```bash
npx "@builder.io/dev-tools@latest" index-repo \
  --skipHeader \
  --designSystemPackage @carbon/react \
  --designSystemName "IBM Carbon"
```

This requires:
- `BUILDER_PUBLIC_KEY` env var
- `BUILDER_PRIVATE_KEY` env var
- `BUILDER_USER_ID` env var

You can set them in your terminal:
```bash
export BUILDER_PUBLIC_KEY="f228a19714884e3ca66e924d6affbfe8"
export BUILDER_PRIVATE_KEY="your_private_key_here"
export BUILDER_USER_ID="your_user_id_here"
npx "@builder.io/dev-tools@latest" index-repo --skipHeader --designSystemPackage @carbon/react --designSystemName "IBM Carbon"
```
