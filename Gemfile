# FAIR-in-action Playbook — Jekyll (ELIXIR Toolkit Theme lineage)
#
# Builds with stock Jekyll 4 locally (`bundle exec jekyll serve`).
# On GitHub Pages, deploy via GitHub Actions (the workflow runs this same
# Gemfile) rather than the classic "Pages from a branch" build — classic
# Pages pins an old jekyll/plugin set and would not match this Gemfile.
source "https://rubygems.org"

gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  # ETT (ELIXIR Toolkit Theme) lineage is followed via vendored layouts, not a
  # remote_theme — ETT's config pulls a private plugin that breaks stock builds.
  # jekyll-remote-theme is kept installed so re-enabling ETT is a one-line change.
  gem "jekyll-remote-theme"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end

# Windows / JRuby timezone data (harmless elsewhere)
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Faster file watching on macOS
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
