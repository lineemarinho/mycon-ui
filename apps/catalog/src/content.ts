// Conteúdo textual do catálogo, mantido à mão.
// Navegação, tabelas de props e exemplos de código de cada seção.
// As prévias são os componentes reais — ver src/demos.tsx.

export type PropRow = { name: string; required: boolean; type: string; default: string };
export type SectionContent = { id: string; title: string; category: string; props: PropRow[]; codeHtml: string };
export type NavItem = { id: string; name: string; dot: string };
export type NavGroup = { id: string; title: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    "id": "acoes",
    "title": "Ações",
    "items": [
      {
        "id": "button",
        "dot": "accent",
        "name": "Button"
      },
      {
        "id": "iconactionbutton",
        "dot": "accent",
        "name": "IconActionButton"
      }
    ]
  },
  {
    "id": "feedback",
    "title": "Feedback",
    "items": [
      {
        "id": "statusbadge",
        "dot": "success",
        "name": "StatusBadge"
      },
      {
        "id": "alert",
        "dot": "warning",
        "name": "Alert"
      },
      {
        "id": "toast",
        "dot": "warning",
        "name": "Toast"
      },
      {
        "id": "confirmdialog",
        "dot": "warning",
        "name": "ConfirmDialog"
      },
      {
        "id": "modal",
        "dot": "warning",
        "name": "Modal"
      },
      {
        "id": "progressbar",
        "dot": "warning",
        "name": "ProgressBar"
      },
      {
        "id": "skeleton",
        "dot": "warning",
        "name": "Skeleton"
      },
      {
        "id": "spinner",
        "dot": "warning",
        "name": "Spinner"
      },
      {
        "id": "emptystate",
        "dot": "warning",
        "name": "EmptyState"
      }
    ]
  },
  {
    "id": "layout",
    "title": "Layout",
    "items": [
      {
        "id": "card",
        "dot": "ink-soft",
        "name": "Card"
      },
      {
        "id": "listitemcard",
        "dot": "ink-soft",
        "name": "ListItemCard"
      },
      {
        "id": "sectioncard",
        "dot": "ink-soft",
        "name": "SectionCard"
      },
      {
        "id": "detailscard",
        "dot": "ink-soft",
        "name": "DetailsCard"
      },
      {
        "id": "divider",
        "dot": "ink-soft",
        "name": "Divider"
      },
      {
        "id": "scrollarea",
        "dot": "ink-soft",
        "name": "ScrollArea"
      },
      {
        "id": "drawer",
        "dot": "ink-soft",
        "name": "Drawer"
      },
      {
        "id": "tabs",
        "dot": "ink-soft",
        "name": "Tabs"
      },
      {
        "id": "popover",
        "dot": "ink-soft",
        "name": "Popover"
      },
      {
        "id": "logo",
        "dot": "ink-soft",
        "name": "Logo"
      },
      {
        "id": "tooltip",
        "dot": "ink-soft",
        "name": "Tooltip"
      },
      {
        "id": "breadcrumb",
        "dot": "ink-soft",
        "name": "Breadcrumb"
      },
      {
        "id": "pagination",
        "dot": "ink-soft",
        "name": "Pagination"
      }
    ]
  },
  {
    "id": "dados",
    "title": "Dados",
    "items": [
      {
        "id": "datatable",
        "dot": "accent",
        "name": "DataTable"
      },
      {
        "id": "avatar",
        "dot": "accent",
        "name": "Avatar"
      },
      {
        "id": "avatargroup",
        "dot": "accent",
        "name": "AvatarGroup"
      },
      {
        "id": "tag",
        "dot": "accent",
        "name": "Tag"
      }
    ]
  },
  {
    "id": "formulario",
    "title": "Formulário",
    "items": [
      {
        "id": "input",
        "dot": "info",
        "name": "Input"
      },
      {
        "id": "select",
        "dot": "info",
        "name": "Select"
      },
      {
        "id": "multiselect",
        "dot": "info",
        "name": "MultiSelect"
      },
      {
        "id": "autocomplete",
        "dot": "info",
        "name": "Autocomplete"
      },
      {
        "id": "checkboxfield",
        "dot": "info",
        "name": "CheckboxField"
      },
      {
        "id": "radiogroupfield",
        "dot": "info",
        "name": "RadioGroupField"
      },
      {
        "id": "switchfield",
        "dot": "info",
        "name": "SwitchField"
      },
      {
        "id": "textarea",
        "dot": "info",
        "name": "Textarea"
      },
      {
        "id": "fileupload",
        "dot": "info",
        "name": "FileUpload"
      },
      {
        "id": "filterpanel",
        "dot": "info",
        "name": "FilterPanel"
      }
    ]
  }
];

export const sections: Record<string, SectionContent> = {
  "button": {
    "id": "button",
    "title": "Button",
    "category": "Ações",
    "props": [
      {
        "name": "variant",
        "required": false,
        "type": "\"primary\" | \"secondary\" | \"tertiary\" | \"outline\" | \"danger\" | \"link\"",
        "default": "\"primary\""
      },
      {
        "name": "size",
        "required": false,
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\""
      },
      {
        "name": "tone",
        "required": false,
        "type": "\"info\" | \"success\" | \"warning\" | \"error\"",
        "default": "undefined"
      },
      {
        "name": "shape",
        "required": false,
        "type": "\"square\" | \"rounded\" | \"pill\"",
        "default": "\"pill\""
      },
      {
        "name": "width",
        "required": false,
        "type": "\"auto\" | \"full\"",
        "default": "\"auto\""
      },
      {
        "name": "icon",
        "required": false,
        "type": "ReactNode",
        "default": "undefined"
      },
      {
        "name": "iconPosition",
        "required": false,
        "type": "\"left\" | \"right\"",
        "default": "\"left\""
      },
      {
        "name": "iconOnly",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "isLoading",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "disabled",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "...rest",
        "required": false,
        "type": "MuiButtonProps (exceto variant/size/color)",
        "default": "—"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Button</span> <span class=\"attr\">variant</span>=<span class=\"str\">\"secondary\"</span> <span class=\"attr\">tone</span>=<span class=\"str\">\"success\"</span> <span class=\"attr\">isLoading</span>={isSaving}&gt;\n  Confirmar\n<span class=\"tag\">&lt;/Button&gt;</span>"
  },
  "iconactionbutton": {
    "id": "iconactionbutton",
    "title": "IconActionButton",
    "category": "Ações",
    "props": [
      {
        "name": "label",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "icon",
        "required": true,
        "type": "ReactNode",
        "default": "—"
      },
      {
        "name": "onClick",
        "required": false,
        "type": "() => void",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "color",
        "required": false,
        "type": "\"primary\" | \"default\"",
        "default": "\"default\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;IconActionButton</span> <span class=\"attr\">label</span>=<span class=\"str\">\"Editar\"</span> <span class=\"attr\">icon</span>={&lt;EditIcon /&gt;} <span class=\"attr\">onClick</span>={handleEdit} <span class=\"tag\">/&gt;</span>"
  },
  "statusbadge": {
    "id": "statusbadge",
    "title": "StatusBadge",
    "category": "Feedback",
    "props": [
      {
        "name": "status",
        "required": true,
        "type": "\"success\" | \"warning\" | \"error\" | \"neutral\" | \"info\"",
        "default": "—"
      },
      {
        "name": "label",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "variant",
        "required": false,
        "type": "\"dot\" | \"tag\"",
        "default": "\"dot\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;StatusBadge</span> <span class=\"attr\">status</span>=<span class=\"str\">\"success\"</span> <span class=\"attr\">label</span>=<span class=\"str\">\"Ativo\"</span> <span class=\"tag\">/&gt;</span>"
  },
  "alert": {
    "id": "alert",
    "title": "Alert",
    "category": "Feedback",
    "props": [
      {
        "name": "variant",
        "required": false,
        "type": "\"info\" | \"success\" | \"warning\" | \"error\"",
        "default": "\"info\""
      },
      {
        "name": "children",
        "required": true,
        "type": "ReactNode",
        "default": "—"
      },
      {
        "name": "onClose",
        "required": false,
        "type": "() => void",
        "default": "undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Alert</span> <span class=\"attr\">variant</span>=<span class=\"str\">\"warning\"</span> <span class=\"attr\">onClose</span>={fechar}&gt;\n  Verifique os dados antes de continuar.\n<span class=\"tag\">&lt;/Alert&gt;</span>"
  },
  "toast": {
    "id": "toast",
    "title": "Toast",
    "category": "Feedback",
    "props": [
      {
        "name": "open",
        "required": true,
        "type": "boolean",
        "default": "—"
      },
      {
        "name": "onClose",
        "required": true,
        "type": "() => void",
        "default": "—"
      },
      {
        "name": "message",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "variant",
        "required": false,
        "type": "\"default\" | \"success\" | \"error\" | \"warning\" | \"info\"",
        "default": "\"default\""
      },
      {
        "name": "autoHideDuration",
        "required": false,
        "type": "number",
        "default": "4000"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Toast</span> <span class=\"attr\">open</span>={open} <span class=\"attr\">onClose</span>={() =&gt; setOpen(false)} <span class=\"attr\">message</span>=<span class=\"str\">\"Alterações salvas.\"</span> <span class=\"attr\">variant</span>=<span class=\"str\">\"success\"</span> <span class=\"tag\">/&gt;</span>"
  },
  "confirmdialog": {
    "id": "confirmdialog",
    "title": "ConfirmDialog",
    "category": "Feedback",
    "props": [
      {
        "name": "open",
        "required": true,
        "type": "boolean",
        "default": "—"
      },
      {
        "name": "title",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "message",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "onConfirm",
        "required": true,
        "type": "() => void",
        "default": "—"
      },
      {
        "name": "onCancel",
        "required": true,
        "type": "() => void",
        "default": "—"
      },
      {
        "name": "confirmText",
        "required": false,
        "type": "string",
        "default": "\"Confirmar\""
      },
      {
        "name": "cancelText",
        "required": false,
        "type": "string",
        "default": "\"Cancelar\""
      },
      {
        "name": "loading",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "error",
        "required": false,
        "type": "string | null",
        "default": "undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;ConfirmDialog</span>\n  <span class=\"attr\">open</span>={open}\n  <span class=\"attr\">title</span>=<span class=\"str\">\"Cancelar oferta\"</span>\n  <span class=\"attr\">message</span>=<span class=\"str\">\"Essa ação não pode ser desfeita.\"</span>\n  <span class=\"attr\">onConfirm</span>={handleConfirm}\n  <span class=\"attr\">onCancel</span>={() =&gt; setOpen(false)}\n<span class=\"tag\">/&gt;</span>"
  },
  "modal": {
    "id": "modal",
    "title": "Modal",
    "category": "Feedback",
    "props": [
      {
        "name": "open",
        "required": true,
        "type": "boolean",
        "default": "—"
      },
      {
        "name": "onClose",
        "required": true,
        "type": "() => void",
        "default": "—"
      },
      {
        "name": "children",
        "required": true,
        "type": "ReactNode",
        "default": "—"
      },
      {
        "name": "title",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "actions",
        "required": false,
        "type": "ReactNode",
        "default": "undefined"
      },
      {
        "name": "size",
        "required": false,
        "type": "\"sm\" | \"md\" | \"lg\" | \"xl\"",
        "default": "\"sm\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Modal</span> <span class=\"attr\">open</span>={open} <span class=\"attr\">onClose</span>={() =&gt; setOpen(false)} <span class=\"attr\">title</span>=<span class=\"str\">\"Editar contato\"</span> <span class=\"attr\">actions</span>={&lt;Button onClick={salvar}&gt;Salvar&lt;/Button&gt;}&gt;\n  {children}\n<span class=\"tag\">&lt;/Modal&gt;</span>"
  },
  "progressbar": {
    "id": "progressbar",
    "title": "ProgressBar",
    "category": "Feedback",
    "props": [
      {
        "name": "value",
        "required": false,
        "type": "number",
        "default": "undefined"
      },
      {
        "name": "variant",
        "required": false,
        "type": "\"determinate\" | \"indeterminate\"",
        "default": "\"determinate\""
      },
      {
        "name": "color",
        "required": false,
        "type": "\"primary\" | \"success\" | \"warning\" | \"error\"",
        "default": "\"primary\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;ProgressBar</span> <span class=\"attr\">value</span>={70} <span class=\"attr\">color</span>=<span class=\"str\">\"success\"</span> <span class=\"tag\">/&gt;</span>"
  },
  "skeleton": {
    "id": "skeleton",
    "title": "Skeleton",
    "category": "Feedback",
    "props": [
      {
        "name": "variant",
        "required": false,
        "type": "\"text\" | \"circular\" | \"rectangular\" | \"rounded\"",
        "default": "\"text\""
      },
      {
        "name": "width",
        "required": false,
        "type": "number | string",
        "default": "undefined"
      },
      {
        "name": "height",
        "required": false,
        "type": "number | string",
        "default": "undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Skeleton</span> <span class=\"attr\">variant</span>=<span class=\"str\">\"circular\"</span> <span class=\"attr\">width</span>={48} <span class=\"attr\">height</span>={48} <span class=\"tag\">/&gt;</span>"
  },
  "spinner": {
    "id": "spinner",
    "title": "Spinner",
    "category": "Feedback",
    "props": [
      {
        "name": "size",
        "required": false,
        "type": "\"xs\" | \"sm\" | \"md\" | \"lg\"",
        "default": "\"md\""
      },
      {
        "name": "color",
        "required": false,
        "type": "\"primary\" | \"inherit\"",
        "default": "\"primary\""
      },
      {
        "name": "label",
        "required": false,
        "type": "string",
        "default": "\"Carregando\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Spinner</span> <span class=\"attr\">size</span>=<span class=\"str\">\"lg\"</span> <span class=\"tag\">/&gt;</span>"
  },
  "emptystate": {
    "id": "emptystate",
    "title": "EmptyState",
    "category": "Feedback",
    "props": [
      {
        "name": "title",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "description",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "icon",
        "required": false,
        "type": "ReactNode",
        "default": "undefined"
      },
      {
        "name": "action",
        "required": false,
        "type": "ReactNode",
        "default": "undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;EmptyState</span>\n  <span class=\"attr\">title</span>=<span class=\"str\">\"Nenhum registro encontrado\"</span>\n  <span class=\"attr\">description</span>=<span class=\"str\">\"Ajuste os filtros ou cadastre um novo item.\"</span>\n  <span class=\"attr\">action</span>={&lt;Button&gt;Novo cadastro&lt;/Button&gt;}\n<span class=\"tag\">/&gt;</span>"
  },
  "card": {
    "id": "card",
    "title": "Card",
    "category": "Layout",
    "props": [
      {
        "name": "variant",
        "required": false,
        "type": "\"outlined\" | \"elevated\" | \"filled\"",
        "default": "\"outlined\""
      },
      {
        "name": "children",
        "required": true,
        "type": "ReactNode",
        "default": "—"
      },
      {
        "name": "onClick",
        "required": false,
        "type": "() => void",
        "default": "undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Card</span> <span class=\"attr\">variant</span>=<span class=\"str\">\"elevated\"</span>&gt;\n  {children}\n<span class=\"tag\">&lt;/Card&gt;</span>"
  },
  "listitemcard": {
    "id": "listitemcard",
    "title": "ListItemCard",
    "category": "Layout",
    "props": [
      {
        "name": "status",
        "required": false,
        "type": "SemanticColor",
        "default": "undefined"
      },
      {
        "name": "children",
        "required": true,
        "type": "ReactNode (KeyValueItem, máx. 6)",
        "default": "—"
      },
      {
        "name": "actions",
        "required": false,
        "type": "ReactNode[]",
        "default": "undefined"
      },
      {
        "name": "expandedContent",
        "required": false,
        "type": "ReactNode",
        "default": "undefined"
      },
      {
        "name": "menuItems",
        "required": false,
        "type": "{ label, onClick, disabled? }[]",
        "default": "undefined"
      },
      {
        "name": "title",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "value",
        "required": true,
        "type": "ReactNode",
        "default": "—"
      },
      {
        "name": "showBorder",
        "required": false,
        "type": "boolean",
        "default": "true"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;ListItemCard</span>\n  <span class=\"attr\">status</span>=<span class=\"str\">\"warning\"</span>\n  <span class=\"attr\">expandedContent</span>={&lt;DetailsCard <span class=\"attr\">rows</span>={detalhes} /&gt;}\n  <span class=\"attr\">menuItems</span>={[{ <span class=\"attr\">label</span>: <span class=\"str\">\"Imprimir boleto\"</span>, <span class=\"attr\">onClick</span>: imprimir }]}\n&gt;\n  <span class=\"tag\">&lt;KeyValueItem</span> <span class=\"attr\">title</span>=<span class=\"str\">\"Cliente\"</span> <span class=\"attr\">value</span>=<span class=\"str\">\"Leonardo\"</span> <span class=\"tag\">/&gt;</span>\n<span class=\"tag\">&lt;/ListItemCard&gt;</span>"
  },
  "sectioncard": {
    "id": "sectioncard",
    "title": "SectionCard",
    "category": "Layout",
    "props": [
      {
        "name": "title",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "subtitle",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "boxed",
        "required": false,
        "type": "boolean",
        "default": "true"
      },
      {
        "name": "collapsible",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "defaultExpanded",
        "required": false,
        "type": "boolean",
        "default": "true"
      },
      {
        "name": "headerAction",
        "required": false,
        "type": "ReactNode",
        "default": "undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;SectionCard</span> <span class=\"attr\">title</span>=<span class=\"str\">\"Dados do cliente\"</span> <span class=\"attr\">collapsible</span>&gt;\n  {children}\n<span class=\"tag\">&lt;/SectionCard&gt;</span>"
  },
  "detailscard": {
    "id": "detailscard",
    "title": "DetailsCard",
    "category": "Layout",
    "props": [
      {
        "name": "rows",
        "required": true,
        "type": "{ label: string; value: ReactNode }[]",
        "default": "—"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;DetailsCard</span> <span class=\"attr\">rows</span>={[{ <span class=\"attr\">label</span>: <span class=\"str\">\"Contrato\"</span>, <span class=\"attr\">value</span>: <span class=\"str\">\"00123.4\"</span> }]} <span class=\"tag\">/&gt;</span>"
  },
  "divider": {
    "id": "divider",
    "title": "Divider",
    "category": "Layout",
    "props": [
      {
        "name": "orientation",
        "required": false,
        "type": "\"horizontal\" | \"vertical\"",
        "default": "\"horizontal\""
      },
      {
        "name": "variant",
        "required": false,
        "type": "\"solid\" | \"dashed\"",
        "default": "\"solid\""
      },
      {
        "name": "children",
        "required": false,
        "type": "ReactNode",
        "default": "undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Divider</span> <span class=\"attr\">variant</span>=<span class=\"str\">\"dashed\"</span> <span class=\"tag\">/&gt;</span>"
  },
  "scrollarea": {
    "id": "scrollarea",
    "title": "ScrollArea",
    "category": "Layout",
    "props": [
      {
        "name": "children",
        "required": true,
        "type": "ReactNode",
        "default": "—"
      },
      {
        "name": "offsetHeight",
        "required": false,
        "type": "number",
        "default": "206"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;ScrollArea</span> <span class=\"attr\">offsetHeight</span>={140}&gt;\n  {children}\n<span class=\"tag\">&lt;/ScrollArea&gt;</span>"
  },
  "drawer": {
    "id": "drawer",
    "title": "Drawer",
    "category": "Layout",
    "props": [
      {
        "name": "open",
        "required": true,
        "type": "boolean",
        "default": "—"
      },
      {
        "name": "onClose",
        "required": true,
        "type": "() => void",
        "default": "—"
      },
      {
        "name": "children",
        "required": true,
        "type": "ReactNode",
        "default": "—"
      },
      {
        "name": "anchor",
        "required": false,
        "type": "\"left\" | \"right\" | \"top\" | \"bottom\"",
        "default": "\"right\""
      },
      {
        "name": "width",
        "required": false,
        "type": "number",
        "default": "320"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Drawer</span> <span class=\"attr\">open</span>={open} <span class=\"attr\">onClose</span>={() =&gt; setOpen(false)} <span class=\"attr\">anchor</span>=<span class=\"str\">\"right\"</span>&gt;\n  {children}\n<span class=\"tag\">&lt;/Drawer&gt;</span>"
  },
  "tabs": {
    "id": "tabs",
    "title": "Tabs",
    "category": "Layout",
    "props": [
      {
        "name": "items",
        "required": true,
        "type": "{ value: string; label: string }[]",
        "default": "—"
      },
      {
        "name": "value",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "onChange",
        "required": true,
        "type": "(value: string) => void",
        "default": "—"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Tabs</span>\n  <span class=\"attr\">items</span>={[{ <span class=\"attr\">value</span>: <span class=\"str\">\"resumo\"</span>, <span class=\"attr\">label</span>: <span class=\"str\">\"Resumo\"</span> }]}\n  <span class=\"attr\">value</span>={tab}\n  <span class=\"attr\">onChange</span>={setTab}\n<span class=\"tag\">/&gt;</span>"
  },
  "popover": {
    "id": "popover",
    "title": "Popover",
    "category": "Layout",
    "props": [
      {
        "name": "open",
        "required": true,
        "type": "boolean",
        "default": "—"
      },
      {
        "name": "anchorEl",
        "required": true,
        "type": "HTMLElement | null",
        "default": "—"
      },
      {
        "name": "onClose",
        "required": true,
        "type": "() => void",
        "default": "—"
      },
      {
        "name": "children",
        "required": true,
        "type": "ReactNode",
        "default": "—"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Popover</span> <span class=\"attr\">open</span>={open} <span class=\"attr\">anchorEl</span>={anchorEl} <span class=\"attr\">onClose</span>={() =&gt; setOpen(false)}&gt;\n  {children}\n<span class=\"tag\">&lt;/Popover&gt;</span>"
  },
  "logo": {
    "id": "logo",
    "title": "Logo",
    "category": "Layout",
    "props": [
      {
        "name": "height",
        "required": false,
        "type": "number",
        "default": "26"
      },
      {
        "name": "color",
        "required": false,
        "type": "\"default\" | \"brand\" | \"white\"",
        "default": "\"default\""
      },
      {
        "name": "title",
        "required": false,
        "type": "string",
        "default": "\"Mycon\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Logo</span> <span class=\"attr\">height</span>={36} <span class=\"attr\">color</span>=<span class=\"str\">\"default\"</span> <span class=\"tag\">/&gt;</span>"
  },
  "tooltip": {
    "id": "tooltip",
    "title": "Tooltip",
    "category": "Layout",
    "props": [
      {
        "name": "title",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "children",
        "required": true,
        "type": "ReactElement",
        "default": "—"
      },
      {
        "name": "placement",
        "required": false,
        "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
        "default": "\"top\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Tooltip</span> <span class=\"attr\">title</span>=<span class=\"str\">\"Texto de apoio\"</span>&gt;\n  <span class=\"tag\">&lt;Button&gt;</span>Passe o mouse aqui<span class=\"tag\">&lt;/Button&gt;</span>\n<span class=\"tag\">&lt;/Tooltip&gt;</span>"
  },
  "breadcrumb": {
    "id": "breadcrumb",
    "title": "Breadcrumb",
    "category": "Layout",
    "props": [
      {
        "name": "items",
        "required": true,
        "type": "{ label: string; href?: string }[]",
        "default": "—"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Breadcrumb</span> <span class=\"attr\">items</span>={[{ <span class=\"attr\">label</span>: <span class=\"str\">\"Início\"</span>, <span class=\"attr\">href</span>: <span class=\"str\">\"/\"</span> }, { <span class=\"attr\">label</span>: <span class=\"str\">\"16058444\"</span> }]} <span class=\"tag\">/&gt;</span>"
  },
  "pagination": {
    "id": "pagination",
    "title": "Pagination",
    "category": "Layout",
    "props": [
      {
        "name": "page",
        "required": true,
        "type": "number",
        "default": "—"
      },
      {
        "name": "count",
        "required": true,
        "type": "number",
        "default": "—"
      },
      {
        "name": "onChange",
        "required": true,
        "type": "(page: number) => void",
        "default": "—"
      },
      {
        "name": "size",
        "required": false,
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Pagination</span> <span class=\"attr\">page</span>={page} <span class=\"attr\">count</span>={10} <span class=\"attr\">onChange</span>={setPage} <span class=\"tag\">/&gt;</span>"
  },
  "datatable": {
    "id": "datatable",
    "title": "DataTable",
    "category": "Dados",
    "props": [
      {
        "name": "columns",
        "required": true,
        "type": "DataTableColumn<T>[]",
        "default": "—"
      },
      {
        "name": "rows",
        "required": true,
        "type": "T[]",
        "default": "—"
      },
      {
        "name": "getRowId",
        "required": true,
        "type": "(row: T) => string | number",
        "default": "—"
      },
      {
        "name": "sortField / sortOrder",
        "required": false,
        "type": "string / \"asc\" | \"desc\"",
        "default": "undefined"
      },
      {
        "name": "onSortChange",
        "required": false,
        "type": "(field: string) => void",
        "default": "undefined"
      },
      {
        "name": "page / pageCount / onPageChange",
        "required": false,
        "type": "number / number / (page: number) => void",
        "default": "undefined"
      },
      {
        "name": "emptyMessage",
        "required": false,
        "type": "string",
        "default": "\"Nenhum registro encontrado.\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;DataTable</span>\n  <span class=\"attr\">columns</span>={[{ <span class=\"attr\">key</span>: <span class=\"str\">\"nome\"</span>, <span class=\"attr\">header</span>: <span class=\"str\">\"Nome\"</span>, <span class=\"attr\">sortable</span>: <span class=\"tag\">true</span> }]}\n  <span class=\"attr\">rows</span>={propostas}\n  <span class=\"attr\">getRowId</span>={(row) =&gt; row.id}\n  <span class=\"attr\">sortField</span>={sortField}\n  <span class=\"attr\">onSortChange</span>={setSortField}\n<span class=\"tag\">/&gt;</span>"
  },
  "avatar": {
    "id": "avatar",
    "title": "Avatar",
    "category": "Dados",
    "props": [
      {
        "name": "src",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "initials",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "size",
        "required": false,
        "type": "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"",
        "default": "\"md\""
      },
      {
        "name": "shape",
        "required": false,
        "type": "\"circle\" | \"square\" | \"rounded\"",
        "default": "\"circle\""
      },
      {
        "name": "alt",
        "required": false,
        "type": "string",
        "default": "undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Avatar</span> <span class=\"attr\">initials</span>=<span class=\"str\">\"LM\"</span> <span class=\"attr\">size</span>=<span class=\"str\">\"lg\"</span> <span class=\"tag\">/&gt;</span>"
  },
  "avatargroup": {
    "id": "avatargroup",
    "title": "AvatarGroup",
    "category": "Dados",
    "props": [
      {
        "name": "avatars",
        "required": true,
        "type": "{ src?: string; initials?: string; alt?: string }[]",
        "default": "—"
      },
      {
        "name": "max",
        "required": false,
        "type": "number",
        "default": "4"
      },
      {
        "name": "size",
        "required": false,
        "type": "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"",
        "default": "\"md\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;AvatarGroup</span> <span class=\"attr\">avatars</span>={[{ <span class=\"attr\">initials</span>: <span class=\"str\">\"LM\"</span> }, { <span class=\"attr\">initials</span>: <span class=\"str\">\"CS\"</span> }]} <span class=\"attr\">max</span>={3} <span class=\"tag\">/&gt;</span>"
  },
  "tag": {
    "id": "tag",
    "title": "Tag",
    "category": "Dados",
    "props": [
      {
        "name": "label",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "variant",
        "required": false,
        "type": "\"filled\" | \"outline\"",
        "default": "\"filled\""
      },
      {
        "name": "onRemove",
        "required": false,
        "type": "() => void",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Tag</span> <span class=\"attr\">label</span>=<span class=\"str\">\"Consórcio\"</span> <span class=\"attr\">onRemove</span>={remover} <span class=\"tag\">/&gt;</span>"
  },
  "input": {
    "id": "input",
    "title": "Input",
    "category": "Formulário",
    "props": [
      {
        "name": "mask",
        "required": false,
        "type": "\"currency\" | \"number\" | \"percent\" | \"cpf\" | \"cnpj\" | \"cpfCnpj\" | \"telefone\" | \"cep\" | \"cartaoCredito\" | \"data\" | \"hora\"",
        "default": "undefined"
      },
      {
        "name": "value",
        "required": false,
        "type": "number (mask numérico) | string (mask de documento) | TextFieldProps[\"value\"]",
        "default": "—"
      },
      {
        "name": "onChange",
        "required": false,
        "type": "(value: number) => void | (digits: string) => void | TextFieldProps[\"onChange\"]",
        "default": "—"
      },
      {
        "name": "decimalScale",
        "required": false,
        "type": "number",
        "default": "2 (currency/percent), 0 (number)"
      },
      {
        "name": "formatOnType",
        "required": false,
        "type": "boolean",
        "default": "true"
      },
      {
        "name": "locale",
        "required": false,
        "type": "string",
        "default": "\"pt-BR\""
      },
      {
        "name": "validation",
        "required": false,
        "type": "\"digitoVerificador\" (só mask=\"cpf\"|\"cnpj\")",
        "default": "undefined"
      },
      {
        "name": "type",
        "required": false,
        "type": "\"text\" | \"email\" | \"tel\" | \"url\" | \"number\" | \"password\"",
        "default": "\"text\""
      },
      {
        "name": "variant",
        "required": false,
        "type": "\"outlined\" | \"filled\" | \"underline\"",
        "default": "\"outlined\""
      },
      {
        "name": "width",
        "required": false,
        "type": "\"auto\" | \"full\"",
        "default": "\"full\""
      },
      {
        "name": "size",
        "required": false,
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\""
      },
      {
        "name": "success",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "loading",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "icon / iconPosition",
        "required": false,
        "type": "ReactNode / \"left\" | \"right\"",
        "default": "undefined / \"left\""
      },
      {
        "name": "clearable",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "readOnlyField",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "...rest",
        "required": false,
        "type": "MuiTextFieldProps (exceto value/onChange/variant/type/size)",
        "default": "—"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Input</span> <span class=\"attr\">label</span>=<span class=\"str\">\"CPF\"</span> <span class=\"attr\">value</span>={cpf} <span class=\"attr\">readOnlyField</span> <span class=\"tag\">/&gt;</span>\n\n<span class=\"cmt\">// com máscara numérica (substitui o antigo MaskedNumberField)</span>\n<span class=\"tag\">&lt;Input</span> <span class=\"attr\">label</span>=<span class=\"str\">\"Valor da parcela\"</span> <span class=\"attr\">mask</span>=<span class=\"str\">\"currency\"</span> <span class=\"attr\">value</span>={valor} <span class=\"attr\">onChange</span>={setValor} <span class=\"tag\">/&gt;</span>\n\n<span class=\"cmt\">// com máscara de documento e validação de dígito verificador</span>\n<span class=\"tag\">&lt;Input</span> <span class=\"attr\">label</span>=<span class=\"str\">\"CPF\"</span> <span class=\"attr\">mask</span>=<span class=\"str\">\"cpf\"</span> <span class=\"attr\">validation</span>=<span class=\"str\">\"digitoVerificador\"</span> <span class=\"attr\">value</span>={cpfDigits} <span class=\"attr\">onChange</span>={setCpfDigits} <span class=\"tag\">/&gt;</span>\n\n<span class=\"cmt\">// máscara de cartão de crédito</span>\n<span class=\"tag\">&lt;Input</span> <span class=\"attr\">label</span>=<span class=\"str\">\"Cartão de crédito\"</span> <span class=\"attr\">mask</span>=<span class=\"str\">\"cartaoCredito\"</span> <span class=\"attr\">value</span>={cartaoDigits} <span class=\"attr\">onChange</span>={setCartaoDigits} <span class=\"tag\">/&gt;</span>"
  },
  "textarea": {
    "id": "textarea",
    "title": "Textarea",
    "category": "Formulário",
    "props": [
      {
        "name": "variant",
        "required": false,
        "type": "\"outlined\" | \"filled\"",
        "default": "\"outlined\""
      },
      {
        "name": "resize",
        "required": false,
        "type": "\"none\" | \"vertical\" | \"horizontal\" | \"both\"",
        "default": "\"vertical\""
      },
      {
        "name": "autoGrow",
        "required": false,
        "type": "boolean",
        "default": "true"
      },
      {
        "name": "counter",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "width",
        "required": false,
        "type": "\"auto\" | \"full\"",
        "default": "\"full\""
      },
      {
        "name": "size",
        "required": false,
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\""
      },
      {
        "name": "success",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "readOnlyField",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "...rest",
        "required": false,
        "type": "MuiTextFieldProps (exceto variant/multiline/size; inclui minRows=3, maxRows, value)",
        "default": "—"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Textarea</span> <span class=\"attr\">label</span>=<span class=\"str\">\"Observações\"</span> <span class=\"attr\">value</span>={obs} <span class=\"attr\">onChange</span>={(e) =&gt; setObs(e.target.value)} <span class=\"attr\">counter</span> <span class=\"attr\">inputProps</span>={{ maxLength: 280 }} <span class=\"tag\">/&gt;</span>"
  },
  "select": {
    "id": "select",
    "title": "Select",
    "category": "Formulário",
    "props": [
      {
        "name": "options",
        "required": true,
        "type": "{ value: T; label: string }[]",
        "default": "—"
      },
      {
        "name": "value",
        "required": true,
        "type": "T | null",
        "default": "—"
      },
      {
        "name": "onChange",
        "required": true,
        "type": "(value: T | null) => void",
        "default": "—"
      },
      {
        "name": "label / placeholder",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "loading",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "disabled",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "clearable",
        "required": false,
        "type": "boolean",
        "default": "true"
      },
      {
        "name": "variant",
        "required": false,
        "type": "\"outlined\" | \"filled\" | \"underline\"",
        "default": "\"outlined\""
      },
      {
        "name": "size",
        "required": false,
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\""
      },
      {
        "name": "width",
        "required": false,
        "type": "\"auto\" | \"full\"",
        "default": "\"full\""
      },
      {
        "name": "error / helperText",
        "required": false,
        "type": "boolean / string",
        "default": "false / undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;Select</span>\n  <span class=\"attr\">label</span>=<span class=\"str\">\"Status\"</span>\n  <span class=\"attr\">options</span>={[{ <span class=\"attr\">value</span>: <span class=\"str\">\"ativo\"</span>, <span class=\"attr\">label</span>: <span class=\"str\">\"Ativo\"</span> }]}\n  <span class=\"attr\">value</span>={status}\n  <span class=\"attr\">onChange</span>={setStatus}\n<span class=\"tag\">/&gt;</span>"
  },
  "multiselect": {
    "id": "multiselect",
    "title": "MultiSelect",
    "category": "Formulário",
    "props": [
      {
        "name": "options",
        "required": true,
        "type": "{ value: T; label: string }[]",
        "default": "—"
      },
      {
        "name": "value",
        "required": true,
        "type": "T[]",
        "default": "—"
      },
      {
        "name": "onChange",
        "required": true,
        "type": "(value: T[]) => void",
        "default": "—"
      },
      {
        "name": "label / placeholder",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "selectAll",
        "required": false,
        "type": "boolean",
        "default": "true (ignorado se maxSelections definido)"
      },
      {
        "name": "display",
        "required": false,
        "type": "\"text\" | \"chips\" | \"count\"",
        "default": "\"text\""
      },
      {
        "name": "maxSelections",
        "required": false,
        "type": "number",
        "default": "undefined"
      },
      {
        "name": "variant",
        "required": false,
        "type": "\"outlined\" | \"filled\" | \"underline\"",
        "default": "\"outlined\""
      },
      {
        "name": "size",
        "required": false,
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\""
      },
      {
        "name": "loading",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "error / helperText",
        "required": false,
        "type": "boolean / string",
        "default": "false / undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;MultiSelect</span>\n  <span class=\"attr\">label</span>=<span class=\"str\">\"Unidade de Negócio\"</span>\n  <span class=\"attr\">options</span>={unidades}\n  <span class=\"attr\">value</span>={unidadesSelecionadas}\n  <span class=\"attr\">onChange</span>={setUnidadesSelecionadas}\n<span class=\"tag\">/&gt;</span>"
  },
  "autocomplete": {
    "id": "autocomplete",
    "title": "Autocomplete",
    "category": "Formulário",
    "props": [
      {
        "name": "label",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "options",
        "required": true,
        "type": "{ value: T; label: string }[]",
        "default": "—"
      },
      {
        "name": "value",
        "required": true,
        "type": "T | null",
        "default": "—"
      },
      {
        "name": "onChange",
        "required": true,
        "type": "(value: T | null) => void",
        "default": "—"
      },
      {
        "name": "placeholder",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "error",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "helperText",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "variant",
        "required": false,
        "type": "\"outlined\" | \"filled\" | \"underline\"",
        "default": "\"outlined\""
      },
      {
        "name": "size",
        "required": false,
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\""
      },
      {
        "name": "width",
        "required": false,
        "type": "\"auto\" | \"full\"",
        "default": "\"full\""
      },
      {
        "name": "clearable",
        "required": false,
        "type": "boolean",
        "default": "true"
      },
      {
        "name": "onSearch",
        "required": false,
        "type": "(query: string) => Promise<SelectOption<T>[]>",
        "default": "undefined"
      },
      {
        "name": "debounceMs",
        "required": false,
        "type": "number",
        "default": "300"
      },
      {
        "name": "allowCustomValue",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "noOptionsMessage",
        "required": false,
        "type": "string",
        "default": "\"Nenhuma opção encontrada\""
      }
    ],
    "codeHtml": "<span class=\"cmt\">// modo assíncrono: digitar dispara onSearch após o debounce</span>\n<span class=\"tag\">&lt;Autocomplete</span>\n  <span class=\"attr\">label</span>=<span class=\"str\">\"Cliente\"</span>\n  <span class=\"attr\">options</span>={[]}\n  <span class=\"attr\">value</span>={clienteId}\n  <span class=\"attr\">onChange</span>={setClienteId}\n  <span class=\"attr\">onSearch</span>={(query) =&gt; buscarClientes(query)}\n  <span class=\"attr\">debounceMs</span>={400}\n  <span class=\"attr\">noOptionsMessage</span>=<span class=\"str\">\"Nenhum cliente encontrado\"</span>\n<span class=\"tag\">/&gt;</span>"
  },
  "checkboxfield": {
    "id": "checkboxfield",
    "title": "CheckboxField",
    "category": "Formulário",
    "props": [
      {
        "name": "label",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "checked",
        "required": true,
        "type": "boolean",
        "default": "—"
      },
      {
        "name": "onChange",
        "required": true,
        "type": "(checked: boolean) => void",
        "default": "—"
      },
      {
        "name": "indeterminate",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "labelPosition",
        "required": false,
        "type": "\"start\" | \"end\"",
        "default": "\"end\""
      },
      {
        "name": "size",
        "required": false,
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\""
      },
      {
        "name": "error",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;CheckboxField</span> <span class=\"attr\">label</span>=<span class=\"str\">\"Aceito os termos\"</span> <span class=\"attr\">checked</span>={aceito} <span class=\"attr\">onChange</span>={setAceito} <span class=\"tag\">/&gt;</span>"
  },
  "radiogroupfield": {
    "id": "radiogroupfield",
    "title": "RadioGroupField",
    "category": "Formulário",
    "props": [
      {
        "name": "options",
        "required": true,
        "type": "{ value: T; label: string }[]",
        "default": "—"
      },
      {
        "name": "value",
        "required": true,
        "type": "T",
        "default": "—"
      },
      {
        "name": "onChange",
        "required": true,
        "type": "(value: T) => void",
        "default": "—"
      },
      {
        "name": "label",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "orientation",
        "required": false,
        "type": "\"horizontal\" | \"vertical\"",
        "default": "\"vertical\""
      },
      {
        "name": "labelPosition",
        "required": false,
        "type": "\"start\" | \"end\"",
        "default": "\"end\""
      },
      {
        "name": "disabled",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "error / helperText",
        "required": false,
        "type": "boolean / string",
        "default": "undefined"
      },
      {
        "name": "size",
        "required": false,
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;RadioGroupField</span>\n  <span class=\"attr\">label</span>=<span class=\"str\">\"Forma de pagamento\"</span>\n  <span class=\"attr\">options</span>={[{ <span class=\"attr\">value</span>: <span class=\"str\">\"boleto\"</span>, <span class=\"attr\">label</span>: <span class=\"str\">\"Boleto\"</span> }, { <span class=\"attr\">value</span>: <span class=\"str\">\"pix\"</span>, <span class=\"attr\">label</span>: <span class=\"str\">\"Pix\"</span> }]}\n  <span class=\"attr\">value</span>={forma}\n  <span class=\"attr\">onChange</span>={setForma}\n  <span class=\"attr\">orientation</span>=<span class=\"str\">\"horizontal\"</span>\n<span class=\"tag\">/&gt;</span>"
  },
  "switchfield": {
    "id": "switchfield",
    "title": "SwitchField",
    "category": "Formulário",
    "props": [
      {
        "name": "label",
        "required": true,
        "type": "string",
        "default": "—"
      },
      {
        "name": "checked",
        "required": true,
        "type": "boolean",
        "default": "—"
      },
      {
        "name": "onChange",
        "required": true,
        "type": "(checked: boolean) => void",
        "default": "—"
      },
      {
        "name": "disabled",
        "required": false,
        "type": "boolean",
        "default": "false"
      },
      {
        "name": "tone",
        "required": false,
        "type": "\"primary\" | \"success\" | \"error\"",
        "default": "\"primary\""
      },
      {
        "name": "loading",
        "required": false,
        "type": "boolean",
        "default": "undefined"
      },
      {
        "name": "labelPosition",
        "required": false,
        "type": "\"start\" | \"end\"",
        "default": "\"end\""
      },
      {
        "name": "size",
        "required": false,
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "\"md\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;SwitchField</span> <span class=\"attr\">label</span>=<span class=\"str\">\"Ativo\"</span> <span class=\"attr\">checked</span>={ativo} <span class=\"attr\">onChange</span>={setAtivo} <span class=\"tag\">/&gt;</span>"
  },
  "fileupload": {
    "id": "fileupload",
    "title": "FileUpload",
    "category": "Formulário",
    "props": [
      {
        "name": "onChange",
        "required": true,
        "type": "(file: File | null, previewUrl: string | null) => void",
        "default": "—"
      },
      {
        "name": "value",
        "required": false,
        "type": "string | null",
        "default": "undefined"
      },
      {
        "name": "label",
        "required": false,
        "type": "string",
        "default": "undefined"
      },
      {
        "name": "accept",
        "required": false,
        "type": "string",
        "default": "\"image/*\""
      },
      {
        "name": "error / helperText",
        "required": false,
        "type": "boolean / string",
        "default": "false / undefined"
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;FileUpload</span> <span class=\"attr\">label</span>=<span class=\"str\">\"Banner\"</span> <span class=\"attr\">value</span>={previewUrl} <span class=\"attr\">onChange</span>={(file, url) =&gt; setPreviewUrl(url)} <span class=\"tag\">/&gt;</span>"
  },
  "filterpanel": {
    "id": "filterpanel",
    "title": "FilterPanel",
    "category": "Formulário",
    "props": [
      {
        "name": "open",
        "required": true,
        "type": "boolean",
        "default": "—"
      },
      {
        "name": "onClose / onApply / onClear",
        "required": true,
        "type": "() => void",
        "default": "—"
      },
      {
        "name": "children",
        "required": true,
        "type": "ReactNode",
        "default": "—"
      },
      {
        "name": "title",
        "required": false,
        "type": "string",
        "default": "\"Filtros\""
      },
      {
        "name": "applyText / clearText",
        "required": false,
        "type": "string",
        "default": "\"Aplicar\" / \"Limpar\""
      }
    ],
    "codeHtml": "<span class=\"tag\">&lt;FilterPanel</span> <span class=\"attr\">open</span>={open} <span class=\"attr\">onClose</span>={close} <span class=\"attr\">onApply</span>={apply} <span class=\"attr\">onClear</span>={clear}&gt;\n  <span class=\"tag\">&lt;Select</span> <span class=\"attr\">label</span>=<span class=\"str\">\"Status\"</span> <span class=\"attr\">options</span>={options} <span class=\"attr\">value</span>={status} <span class=\"attr\">onChange</span>={setStatus} <span class=\"tag\">/&gt;</span>\n<span class=\"tag\">&lt;/FilterPanel&gt;</span>"
  }
};
