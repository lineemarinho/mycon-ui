# Especificação de Props — Inventário de Componentes

> Levantamento de `variant`/`size`/`state` e demais props relevantes para cada componente de UI que o design system pode vir a cobrir. Não é a API final implementada — é um inventário de planejamento para orientar a Fase 4 (implementação) e a Fase 2 (arquitetura de variantes). Onde um componente já foi implementado em `packages/ui`, a API real pode ser mais enxuta que este levantamento (ex.: `Button` real hoje tem `variant: primary|secondary|outline|graylight`, mais próximo do que já era usado via `MyconButtons` — ver `AUDITORIA.md`/`DECISIONS.md`).

## Ações

**Button**: variant (primary, secondary, tertiary, danger, link), size (sm, md, lg), state (default, hover, active, focus, disabled, loading), icon (nenhum, esquerda, direita, icon-only), width (auto, full), shape (reto, arredondado, pill).

**Icon button**: variant (primary, secondary, tertiary, danger, ghost), size (sm, md, lg), state (default, hover, active, focus, disabled, loading), shape (quadrado, arredondado, circular), tooltip (nenhum, label).

**Button group**: variant (primary, secondary, outline), size (sm, md, lg), orientation (horizontal, vertical), selection (nenhuma, única, múltipla), attached (true, false).

**Link**: variant (default, sutil, danger), size (sm, md, lg), state (default, hover, active, visited, disabled), underline (sempre, no hover, nunca), icon (nenhum, esquerda, direita, externo).

## Formulário — texto e números

**Input de texto**: variant (outlined, filled, underline), size (sm, md, lg), state (default, focus, disabled, readonly, error, success), label (flutuante, estática, nenhuma), icon (nenhum, esquerda, direita), clearable (true, false).

**Input de número**: variant (outlined, filled), size (sm, md, lg), state (default, focus, disabled, readonly, error), stepper (nenhum, botões +/-), min/max, precision (casas decimais), align (esquerda, direita).

**Input de senha**: variant (outlined, filled), size (sm, md, lg), state (default, focus, disabled, error), visibility (mascarado, revelado), strengthIndicator (nenhum, fraco, médio, forte).

**Input de busca**: variant (outlined, filled), size (sm, md, lg), state (default, focus, disabled, loading), icon (busca fixo à esquerda), clearable (true, false), suggestions (nenhuma, dropdown).

**Input com máscara** (CPF, CNPJ, telefone, CEP, moeda): maskType (cpf, cnpj, telefone, cep, moeda, custom), size (sm, md, lg), state (default, focus, disabled, error), validation (automática, manual), prefix/suffix (R$, %, nenhum).

**Textarea**: variant (outlined, filled), size (sm, md, lg), state (default, focus, disabled, readonly, error), resize (nenhum, vertical, ambos), autoGrow (true, false), maxLength (com contador, sem contador).

## Formulário — seleção

**Select / Dropdown**: variant (outlined, filled), size (sm, md, lg), state (default, focus, disabled, error, loading), placement (abaixo, acima, automático), clearable (true, false).

**Combobox / Autocomplete**: variant (outlined, filled), size (sm, md, lg), state (default, focus, disabled, error, loading, sem-resultados), mode (síncrono, assíncrono), creatable (true, false).

**Multi-select**: variant (outlined, filled), size (sm, md, lg), state (default, focus, disabled, error, loading), tagDisplay (chip, contagem, truncado), maxSelection (ilimitado, N).

**Radio button**: size (sm, md, lg), state (não marcado, marcado, disabled, error), orientation (horizontal, vertical), labelPosition (esquerda, direita).

**Checkbox**: size (sm, md, lg), state (não marcado, marcado, indeterminado, disabled, error), labelPosition (esquerda, direita).

**Switch / Toggle**: size (sm, md, lg), state (desligado, ligado, disabled, loading), labelPosition (esquerda, direita), icon (nenhum, ícones on/off).

**Toggle group / Segmented control**: variant (preenchido, outline), size (sm, md, lg), selection (única, múltipla), state (default, disabled), orientation (horizontal, vertical).

## Formulário — especializados

**Date picker**: variant (outlined, filled), size (sm, md, lg), mode (data única, intervalo, múltiplas datas), state (default, focus, disabled, error), format (dd/mm/aaaa etc.), view (dia, mês, ano).

**Time picker**: variant (outlined, filled), size (sm, md, lg), format (12h, 24h), state (default, focus, disabled, error), step (intervalo em minutos).

**File upload**: variant (dropzone, botão, avatar), size (sm, md, lg), state (ocioso, arrastando, enviando, sucesso, erro), multiple (true, false), accept (tipos MIME), preview (thumbnail, lista, nenhum).

**Slider / Range**: variant (valor único, intervalo), size (sm, md, lg), state (default, hover, active, disabled), marks (nenhuma, marcadores fixos), orientation (horizontal, vertical), tooltip (sempre, no hover, nunca).

**Tags / Chips input**: size (sm, md, lg), state (default, focus, disabled, error), variant (texto livre, a partir de lista), removable (true, false), maxTags (ilimitado, N).

**Color picker**: variant (swatch, roda de cores, input de texto), size (sm, md, lg), state (default, focus, disabled), format (hex, rgb, hsl), alpha (true, false).

**Rating**: size (sm, md, lg), state (default, hover, readonly, disabled), icon (estrela, coração, custom), precision (inteiro, meio ponto), max (5, 10, custom).

**OTP / PIN input**: length (4, 6, custom), size (sm, md, lg), state (default, focus, preenchido, error, disabled), mask (visível, oculto), type (numérico, alfanumérico).

**Rich text editor**: variant (compacto, toolbar completa), size (sm, md, lg), state (default, focus, disabled, error, readonly), toolbar (fixa, flutuante), format (html, markdown).

**Signature pad**: size (sm, md, lg), state (vazio, desenhando, preenchido, disabled), penColor, penWidth (fina, média, grossa), background (transparente, branco, grid).

## Formulário — suporte

**Label**: size (sm, md, lg), weight (regular, medium, bold), required (true, false), state (default, disabled, error).

**Helper text**: state (default, error, success, warning), size (sm, md), icon (nenhum, info).

**Mensagem de erro / sucesso**: variant (error, success, warning, info), size (sm, md), icon (nenhum, automático), dismissible (true, false).

**Form / Fieldset**: variant (default, com borda), state (default, disabled), layout (vertical, horizontal, grid), legend (visível, oculta).

**Sticky action bar / footer**: variant (default, elevado), position (inferior, superior), state (default, oculto), actions (1, 2, N).

## Dados

**Table**: variant (default, listrada, com bordas), size (compacta, confortável), state (default, loading, vazia, erro), selection (nenhuma, única, múltipla), sortable (true, false), stickyHeader (true, false).

**Data grid**: (estende Table) editable (true, false), pagination (client-side, server-side, nenhuma), grouping (true, false), resizableColumns (true, false), virtualization (true, false).

**List**: variant (default, dividida, tipo card), size (sm, md, lg), state (default, loading, vazia), selection (nenhuma, única, múltipla), orientation (vertical, horizontal).

**Card**: variant (outlined, elevated, filled), size (sm, md, lg), state (default, hover, selected, disabled), orientation (vertical, horizontal), media (nenhuma, topo, lateral).

**Avatar**: size (xs, sm, md, lg, xl), shape (circular, quadrado, arredondado), variant (imagem, iniciais, ícone), state (default, online, offline, ocupado).

**Avatar group**: size (xs, sm, md, lg), max (N visíveis + contagem de overflow), overlap (justo, solto).

**Badge**: variant (sólido, outline, ponto), color (semântica: success, warning, error, info, neutral), size (sm, md), position (independente, ancorado a um elemento).

**Tag / Chip**: variant (preenchido, outline), size (sm, md, lg), state (default, selecionado, disabled), removable (true, false), color (semântica).

**Tooltip**: placement (topo, base, esquerda, direita), variant (escuro, claro), size (sm, md), trigger (hover, focus, click), delay (nenhum, curto, longo).

**Accordion**: variant (default, com borda, preenchido), size (sm, md, lg), state (recolhido, expandido, disabled), multiple (apenas um aberto, múltiplos abertos), iconPosition (esquerda, direita).

**Tree view**: variant (default, com borda), size (sm, md), state (recolhido, expandido, selecionado, disabled), selection (nenhuma, única, múltipla), checkable (true, false).

**Timeline**: variant (default, alternada), size (sm, md, lg), orientation (vertical, horizontal), state (default, ativo, concluído, erro).

**Stat / KPI tile**: variant (default, com borda, preenchido), size (sm, md, lg), trend (alta, baixa, neutro), state (default, loading, erro).

## Navegação

**Pagination**: variant (default, compacta, simples), size (sm, md, lg), state (default, disabled), showFirstLast (true, false).

**Navbar / Header**: variant (default, transparente, elevado), size (sm, md, lg), state (default, scrolled), sticky (true, false).

**Sidebar / Menu lateral**: variant (default, colapsada/mini, overlay), size (largura em sm, md, lg), state (expandida, colapsada), position (esquerda, direita).

**Breadcrumb**: variant (default, com ícones), size (sm, md), separator (barra, chevron, ponto), collapse (nenhum, com reticências).

**Tabs**: variant (linha, preenchida, pill), size (sm, md, lg), state (default, ativa, disabled), orientation (horizontal, vertical), scrollable (true, false).

**Dropdown menu**: variant (default, com borda), size (sm, md, lg), placement (bottom-start, bottom-end, top-start, top-end), state (default, item disabled).

**Menu de contexto**: variant (default), size (sm, md), trigger (clique direito), state (default, item disabled), nested (true, false).

**Command palette**: variant (default), size (sm, md, lg), state (aberto, fechado, loading, vazio), grouping (true, false), shortcuts (visíveis, ocultos).

**Stepper**: variant (numerado, pontos, progresso), size (sm, md, lg), orientation (horizontal, vertical), state (pendente, ativo, concluído, erro), linear (true, false).

## Overlay e feedback

**Modal / Dialog**: variant (default, fullscreen, centralizado), size (sm, md, lg, xl), state (default, loading), dismissible (clique no backdrop, esc, ambos, nenhum).

**Drawer / Side panel**: variant (default, persistente, temporário), size (largura em sm, md, lg), anchor (esquerda, direita, topo, base), state (aberto, fechado).

**Toast / Snackbar**: variant (default, success, error, warning, info), position (top-right, bottom-center, etc.), duration (curta, longa, persistente), action (nenhuma, uma ação).

**Alert / Banner**: variant (info, success, warning, error), size (sm, md), dismissible (true, false), icon (automático, nenhum, custom).

**Popover**: placement (topo, base, esquerda, direita, automático), size (sm, md, lg), trigger (clique, hover), state (aberto, fechado).

**Confirmation dialog**: variant (default, danger), size (sm, md), state (default, loading, erro).

**Spinner / Loader**: size (xs, sm, md, lg), variant (circular, pontos, barra), color (primary, neutral, herdada).

**Loading overlay**: variant (página inteira, container), state (visível, oculto), backdrop (blur, escurecido, nenhum).

**Progress bar**: variant (linear, circular), size (sm, md, lg), state (determinado, indeterminado, erro, sucesso), color (semântica).

**Notification badge**: variant (ponto, contagem), size (sm, md), max (99+, custom), color (semântica).

## Layout e mídia

**Divider**: orientation (horizontal, vertical), variant (sólido, tracejado), spacing (sm, md, lg), label (nenhum, texto centralizado).

**Container / Grid**: variant (fluido, fixo), size (breakpoints sm, md, lg, xl), columns (N), gap (sm, md, lg).

**Carousel de imagens**: variant (default, com thumbnails), size (sm, md, lg), state (reproduzindo, pausado), navigation (setas, pontos, ambos, nenhuma), autoplay (true, false).

**Video player**: variant (default, minimalista), size (responsivo, fixo), state (reproduzindo, pausado, carregando, finalizado), controls (completos, mínimos, nenhum).

**Theme switcher (dark/light)**: variant (toggle, dropdown, icon-button), size (sm, md), options (claro, escuro, sistema), state (default, ativo).

**Empty state**: variant (default, com ilustração, compacto), size (sm, md, lg), action (nenhuma, uma ação, múltiplas ações).

**Skeleton / loading placeholder**: variant (texto, circular, retangular, arredondado), size (sm, md, lg, custom), animation (pulse, wave, nenhuma).
