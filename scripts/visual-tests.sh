#!/usr/bin/env bash
# Roda os testes visuais do catálogo dentro da imagem oficial do Playwright (Linux),
# a mesma usada no CI — assim os prints de referência são idênticos em qualquer máquina.
#
#   npm run test:visual                 compara com os prints de referência
#   npm run test:visual:update          regera os prints (após uma mudança visual intencional)
#
# Os node_modules do container ficam em volumes próprios, sem tocar nos do seu computador.
set -euo pipefail

IMAGE="mcr.microsoft.com/playwright:v1.63.0-noble"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker não encontrado. Instale o Docker Desktop para rodar os testes visuais." >&2
  exit 1
fi

docker run --rm --ipc=host \
  -e CI=1 \
  -v "$ROOT":/repo \
  -v mycon-ui-visual-root-modules:/repo/node_modules \
  -v mycon-ui-visual-ui-modules:/repo/packages/ui/node_modules \
  -v mycon-ui-visual-catalog-modules:/repo/apps/catalog/node_modules \
  -w /repo \
  "$IMAGE" \
  bash -c "npm ci --no-audit --no-fund --loglevel=error && npm run test:visual --workspace=mycon-catalog -- $*"
