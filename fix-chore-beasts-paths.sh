#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Fixing Chore Beasts import paths..."

# Helper for GNU/BSD sed compatibility
sedi() {
  if sed --version >/dev/null 2>&1; then
    sed -i"$1" "$2" "$3"
  else
    sed -i '' "$2" "$3"
  fi
}

# 1) Make sure canonical folders exist
mkdir -p src/components
mkdir -p src/state
mkdir -p src/features/quests
mkdir -p src/features/streaks

# 2) If duplicate storage.js exists inside src/screens/src/, remove it
if [ -f src/screens/src/storage.js ]; then
  echo "🧹 Removing duplicate storage.js from src/screens/src/"
  rm -f src/screens/src/storage.js
fi

# 3) Move helpers if they’re in nested folders
[ -f src/screens/src/state/XpContext.js ]        && mv -n src/screens/src/state/XpContext.js        src/state/XpContext.js
[ -f src/screens/src/components/ErrorBoundary.js ]&& mv -n src/screens/src/components/ErrorBoundary.js src/components/ErrorBoundary.js
[ -f src/screens/src/features/quests/quests.js ] && mv -n src/screens/src/features/quests/quests.js src/features/quests/quests.js

# 4) Update imports inside all screen files (src/screens/*.js)
echo "🛠  Rewriting imports in src/screens..."
find src/screens -type f -name "*.js" -print0 | while IFS= read -r -d '' f; do
  # storage
  sedi "" "s#from ['\"]/src/storage['\"]#from \"../storage\"#g" "$f"
  sedi "" "s#from ['\"]/storage['\"]#from \"../storage\"#g" "$f"
  # state
  sedi "" "s#from ['\"]/src/state/XpContext['\"]#from \"../state/XpContext\"#g" "$f"
  # components
  sedi "" "s#from ['\"]/src/components/#from \"../components/#g" "$f"
  # features
  sedi "" "s#from ['\"]/src/features/streaks/#from \"../features/streaks/#g" "$f"
  sedi "" "s#from ['\"]/src/features/quests/#from \"../features/quests/#g" "$f"
done

# 5) Update imports inside helpers themselves
# src/state/*
find src/state -type f -name "*.js" -print0 | while IFS= read -r -d '' f; do
  sedi "" "s#from ['\"]/src/storage['\"]#from \"../storage\"#g" "$f"
done
# src/features/streaks/*
find src/features/streaks -type f -name "*.js" -print0 | while IFS= read -r -d '' f; do
  sedi "" "s#from ['\"]/src/storage['\"]#from \"../../storage\"#g" "$f"
done
# src/features/quests/*
find src/features/quests -type f -name "*.js" -print0 | while IFS= read -r -d '' f; do
  sedi "" "s#from ['\"]/src/storage['\"]#from \"../../storage\"#g" "$f"
done

# 6) Normalize App.js imports
if [ -f App.js ]; then
  echo "🧭 Fixing App.js imports..."
  sedi "" "s#from ['\"]/HomeScreen['\"]#from \"./src/screens/HomeScreen\"#g" App.js
  sedi "" "s#from ['\"]/ChoresScreen['\"]#from \"./src/screens/ChoresScreen\"#g" App.js
  sedi "" "s#from ['\"]/EditRoomsScreen['\"]#from \"./src/screens/EditRoomsScreen\"#g" App.js
  sedi "" "s#from ['\"]/LeaderboardScreen['\"]#from \"./src/screens/LeaderboardScreen\"#g" App.js
  sedi "" "s#from ['\"]/PrizesScreen['\"]#from \"./src/screens/PrizesScreen\"#g" App.js
  sedi "" "s#from ['\"]/TasksScreen['\"]#from \"./src/screens/TasksScreen\"#g" App.js
  sedi "" "s#from ['\"]/ViewHomeScreen['\"]#from \"./src/screens/ViewHomeScreen\"#g" App.js
  sedi "" "s#from ['\"]/ChatScreen['\"]#from \"./src/screens/ChatScreen\"#g" App.js
  sedi "" "s#from ['\"]/QuestsScreen['\"]#from \"./src/screens/QuestsScreen\"#g" App.js
  sedi "" "s#from ['\"]/src/state/XpContext['\"]#from \"./src/state/XpContext\"#g" App.js
  sedi "" "s#from ['\"]/src/components/ErrorBoundary['\"]#from \"./src/components/ErrorBoundary\"#g" App.js
fi

echo "✅ All done. Helpers under /src, screens under /src/screens, imports fixed."
