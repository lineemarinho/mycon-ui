import { useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import {
  Alert,
  Autocomplete,
  Avatar,
  AvatarGroup,
  Breadcrumb,
  Button,
  Card,
  CheckboxField,
  ConfirmDialog,
  DataTable,
  DetailsCard,
  Divider,
  Drawer,
  EmptyState,
  FileUpload,
  FilterPanel,
  IconActionButton,
  Input,
  KeyValueItem,
  ListItemCard,
  Logo,
  Modal,
  MultiSelect,
  Pagination,
  Popover,
  ProgressBar,
  RadioGroupField,
  ScrollArea,
  SectionCard,
  Select,
  Skeleton,
  Spinner,
  StatusBadge,
  SwitchField,
  Tabs,
  Tag,
  Textarea,
  Toast,
  Tooltip,
  semanticColors,
} from "mycon-ui";

/** Linha de exemplos com rótulo opcional à esquerda (`.preview-row` + `.swatch-label`). */
function Row({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="preview-row">
      {label && <span className="swatch-label">{label}</span>}
      {children}
    </div>
  );
}

/** Coluna com espaçamento fixo, para prévias empilhadas. */
function Stack({ gap = 10, children }: { gap?: number; children: ReactNode }) {
  return <Box sx={{ display: "flex", flexDirection: "column", gap: `${gap}px` }}>{children}</Box>;
}

const noop = () => {};

const statusOptions = [
  { value: "ativo", label: "Ativo" },
  { value: "pendente", label: "Pendente" },
  { value: "cancelado", label: "Cancelado" },
];
const businessUnits = [
  { value: 1, label: "1 - Mycon" },
  { value: 2, label: "2 - Incorporadora Bahiana Ltda" },
  { value: 3, label: "3 - Bevicred Informações Cadastrais" },
  { value: 4, label: "4 - Hitech Electric Ltda" },
  { value: 5, label: "5 - One Consórcio Ltda" },
];
const clients = [
  { value: "leo", label: "Leonardo Mendes" },
  { value: "ciclano", label: "Ciclano Souza" },
  { value: "beltrano", label: "Beltrano Lima" },
];
type TableRow = { id: number; nome: string; status: string; valor: string };
const tableRows: TableRow[] = [
  { id: 1, nome: "Fulano da Silva", status: "Ativo", valor: "R$ 1.240,00" },
  { id: 2, nome: "Ciclano Souza", status: "Pendente", valor: "R$ 890,00" },
  { id: 3, nome: "Beltrano Lima", status: "Cancelado", valor: "R$ 430,00" },
];
const uploadPreview =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80'%3E%3Crect width='120' height='80' fill='%23E4E7EC'/%3E%3C/svg%3E";

function ButtonDemo() {
  return (
    <>
      <Row label="variant">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </Row>
      <Row label="tone">
        <Button variant="secondary" tone="info">Info</Button>
        <Button variant="secondary" tone="success">Success</Button>
        <Button variant="secondary" tone="warning">Warning</Button>
        <Button variant="secondary" tone="error">Error</Button>
        <Button variant="link" tone="warning">Link + warning</Button>
      </Row>
      <Row label="size">
        <Button size="sm">Sm</Button>
        <Button>Md</Button>
        <Button size="lg">Lg</Button>
      </Row>
      <Row label="shape">
        <Button shape="square">Square</Button>
        <Button shape="rounded">Rounded</Button>
        <Button shape="pill">Pill</Button>
      </Row>
      <Row label="icon">
        <Button icon={<AddIcon />}>Adicionar</Button>
        <Button icon={<AddIcon />} iconOnly aria-label="Adicionar" />
      </Row>
      <Row label="state">
        <Button isLoading>Salvando</Button>
        <Button disabled>Disabled</Button>
      </Row>
    </>
  );
}

function IconActionButtonDemo() {
  return (
    <Row>
      <IconActionButton label="Editar" icon={<EditOutlinedIcon />} />
      <IconActionButton label="Mais ações" color="primary" icon={<AddIcon />} />
      <IconActionButton label="Excluir" icon={<DeleteOutlineIcon />} disabled />
    </Row>
  );
}

function StatusBadgeDemo() {
  return (
    <>
      <Row label="variant=dot">
        <StatusBadge status="success" label="Ativo" />
        <StatusBadge status="warning" label="Pendente" />
        <StatusBadge status="error" label="Cancelado" />
        <StatusBadge status="neutral" label="Neutro" />
        <StatusBadge status="info" label="Info" />
      </Row>
      <Row label="variant=tag">
        <StatusBadge variant="tag" status="success" label="Ativo" />
        <StatusBadge variant="tag" status="warning" label="Pendente" />
        <StatusBadge variant="tag" status="error" label="Cancelado" />
      </Row>
    </>
  );
}

function AlertDemo() {
  return (
    <Stack>
      <Alert variant="info" onClose={noop}>Informação disponível para consulta.</Alert>
      <Alert variant="success" onClose={noop}>Operação concluída com sucesso.</Alert>
      <Alert variant="warning" onClose={noop}>Verifique os dados antes de continuar.</Alert>
      <Alert variant="error" onClose={noop}>Não foi possível concluir a operação.</Alert>
    </Stack>
  );
}

function ToastDemo() {
  const [variant, setVariant] = useState<"info" | "success" | "error" | null>(null);
  return (
    <>
      <Row label="demo">
        <Button variant="outline" onClick={() => setVariant("info")}>Info</Button>
        <Button variant="outline" onClick={() => setVariant("success")}>Success</Button>
        <Button variant="outline" onClick={() => setVariant("error")}>Error</Button>
      </Row>
      <Toast
        open={variant !== null}
        onClose={() => setVariant(null)}
        variant={variant ?? "info"}
        message={
          variant === "success"
            ? "Proposta enviada com sucesso."
            : variant === "error"
              ? "Falha ao processar o pagamento."
              : "Alterações salvas."
        }
      />
    </>
  );
}

function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Row label="demo">
      <Button variant="outline" onClick={() => setOpen(true)} data-open="confirmdialog">
        Ver modal
      </Button>
      <ConfirmDialog
        open={open}
        title="Cancelar oferta"
        message="Essa ação não pode ser desfeita. Tem certeza que deseja cancelar a oferta de lance?"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </Row>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Row label="demo">
      <Button variant="outline" onClick={() => setOpen(true)} data-open="modal">
        Ver modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Editar contato"
        actions={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Salvar</Button>
          </>
        }
      >
        Conteúdo livre — formulários, textos ou qualquer outro componente pode ser passado como filho.
      </Modal>
    </Row>
  );
}

function ProgressBarDemo() {
  return (
    <Stack gap={14}>
      <Box sx={{ maxWidth: 260 }}><ProgressBar value={35} /></Box>
      <Box sx={{ maxWidth: 260 }}><ProgressBar value={70} color="success" /></Box>
      <Box sx={{ maxWidth: 260 }}><ProgressBar value={100} color="error" /></Box>
    </Stack>
  );
}

function SkeletonDemo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Skeleton variant="circular" width={48} height={48} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1, maxWidth: 260 }}>
        <Skeleton variant="rounded" width="70%" height={14} />
        <Skeleton variant="rounded" width="100%" height={14} />
      </Box>
    </Box>
  );
}

function SpinnerDemo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Box>
  );
}

function EmptyStateDemo() {
  return (
    <EmptyState
      icon={<InboxOutlinedIcon />}
      title="Nenhum registro encontrado"
      description="Ajuste os filtros ou cadastre um novo item para começar."
      action={<Button size="sm">Novo cadastro</Button>}
    />
  );
}

function CardDemo() {
  return (
    <Row>
      <Card variant="outlined">Outlined</Card>
      <Card variant="elevated">Elevated</Card>
      <Card variant="filled">Filled</Card>
    </Row>
  );
}

function ListItemCardDemo() {
  return (
    <ListItemCard
      status="warning"
      expandedContent={
        <Box sx={{ display: "flex", gap: 4 }}>
          <div>
            <Box component="strong" sx={{ color: "text.primary", fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem" }}>
              Pagamento
            </Box>
            <br />
            Pago: Não
            <br />
            Forma: Boleto
          </div>
          <div>
            <Box component="strong" sx={{ color: "text.primary", fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem" }}>
              Identificação
            </Box>
            <br />
            CPF: 440.603.778-05
            <br />
            E-mail: leonardo@email.com
          </div>
        </Box>
      }
      menuItems={[
        { label: "Imprimir boleto", onClick: noop },
        { label: "Reenviar cobrança", onClick: noop },
        { label: "Cancelar proposta", onClick: noop },
      ]}
    >
      <KeyValueItem title="Contrato" value="16058444" />
      <KeyValueItem title="Cliente" value="Leonardo Mendes" />
      <KeyValueItem title="Bem" value="Automotores" />
      <KeyValueItem title="Status" value={<span style={{ color: semanticColors.warning }}>Pagamento Pendente</span>} />
      <KeyValueItem title="Valor" value="R$ 70.000,00" />
    </ListItemCard>
  );
}

function SectionCardDemo() {
  return (
    <SectionCard title="Dados do cliente" subtitle="Informações de identificação" collapsible>
      Nome, CPF, e-mail e telefone de contato aparecem aqui dentro.
    </SectionCard>
  );
}

function DetailsCardDemo() {
  return (
    <DetailsCard
      rows={[
        { label: "Contrato", value: "00123.4" },
        { label: "Valor da parcela", value: "R$ 1.240,00" },
        { label: "Vencimento", value: "10/10/2026" },
      ]}
    />
  );
}

function DividerDemo() {
  return (
    <Stack gap={16}>
      <Divider />
      <Divider variant="dashed" />
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px", color: "text.secondary", fontSize: "0.85rem", height: 40 }}>
        Texto <Divider orientation="vertical" /> Valor
      </Box>
    </Stack>
  );
}

function ScrollAreaDemo() {
  return (
    <Box sx={{ border: "1px dashed", borderColor: "divider", borderRadius: "12px", px: "14px", py: "10px", bgcolor: "#fff" }}>
      {/* ScrollArea calcula a altura a partir da viewport: aqui, ~90px de área visível. */}
      <ScrollArea offsetHeight={window.innerHeight - 90}>
        <Box sx={{ "& p": { m: "0 0 8px", fontSize: "0.85rem", color: "text.secondary" } }}>
          {["Linha de conteúdo 1 — role para ver o overflow.", "Linha de conteúdo 2", "Linha de conteúdo 3", "Linha de conteúdo 4", "Linha de conteúdo 5", "Linha de conteúdo 6"].map((line) => (
            <p key={line}>{line}</p>
          ))}
        </Box>
      </ScrollArea>
    </Box>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Row label="demo">
      <Button variant="outline" onClick={() => setOpen(true)} data-open="drawer">
        Ver drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minHeight: "calc(100vh - 48px)" }}>
          <Box component="h3" sx={{ m: 0, fontSize: "1.05rem" }}>Detalhes</Box>
          <Box sx={{ flex: 1, fontSize: "0.88rem", color: "text.secondary" }}>
            Conteúdo livre — qualquer componente pode ser passado como filho do Drawer.
          </Box>
          <Button variant="outline" width="full" onClick={() => setOpen(false)}>Fechar</Button>
        </Box>
      </Drawer>
    </Row>
  );
}

function TabsDemo() {
  const [tab, setTab] = useState("resumo");
  return (
    <Tabs
      items={[
        { value: "resumo", label: "Resumo" },
        { value: "documentos", label: "Documentos" },
        { value: "historico", label: "Histórico" },
      ]}
      value={tab}
      onChange={setTab}
    />
  );
}

function PopoverDemo() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <Button variant="outline" onClick={(event) => setAnchor(event.currentTarget)} data-open="popover">
        Ver popover
      </Button>
      <Popover open={Boolean(anchor)} anchorEl={anchor} onClose={() => setAnchor(null)}>
        Conteúdo livre exibido próximo ao elemento âncora.
      </Popover>
    </>
  );
}

function LogoDemo() {
  return (
    <>
      <Row label="color">
        <Logo />
        <Logo color="brand" />
        <Box sx={{ bgcolor: "text.primary", px: "14px", py: "10px", borderRadius: "10px", display: "inline-flex" }}>
          <Logo color="white" />
        </Box>
      </Row>
      <Row label="height">
        <Logo height={20} />
        <Logo height={26} />
        <Logo height={36} />
      </Row>
    </>
  );
}

function TooltipDemo() {
  return (
    <Tooltip title="Texto de apoio">
      <span>
        <Button variant="tertiary" sx={{ border: "1px solid", borderColor: "divider" }}>
          Passe o mouse aqui
        </Button>
      </span>
    </Tooltip>
  );
}

function BreadcrumbDemo() {
  return <Breadcrumb items={[{ label: "Início", href: "#" }, { label: "Propostas", href: "#" }, { label: "16058444" }]} />;
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Pagination page={page} count={3} onChange={setPage} />
    </Box>
  );
}

function DataTableDemo() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  return (
    <DataTable<TableRow>
      columns={[
        { key: "nome", header: "Nome", sortable: true },
        { key: "status", header: "Status" },
        { key: "valor", header: "Valor" },
      ]}
      rows={tableRows}
      getRowId={(row) => row.id}
      sortField="nome"
      sortOrder={order}
      onSortChange={() => setOrder((current) => (current === "asc" ? "desc" : "asc"))}
      page={page}
      pageCount={3}
      onPageChange={setPage}
    />
  );
}

function AvatarDemo() {
  return (
    <>
      <Row label="size">
        <Avatar initials="LM" size="xs" />
        <Avatar initials="LM" size="sm" />
        <Avatar initials="LM" size="md" />
        <Avatar initials="LM" size="lg" />
        <Avatar initials="LM" size="xl" />
      </Row>
      <Row label="shape">
        <Avatar initials="LM" shape="circle" />
        <Avatar initials="LM" shape="rounded" />
        <Avatar initials="LM" shape="square" />
      </Row>
    </>
  );
}

function AvatarGroupDemo() {
  return (
    <AvatarGroup
      max={4}
      avatars={[{ initials: "LM" }, { initials: "CS" }, { initials: "BL" }, { initials: "AA" }, { initials: "BB" }, { initials: "CC" }]}
    />
  );
}

function TagDemo() {
  return (
    <Row>
      <Tag label="Consórcio" />
      <Tag label="Imóvel" variant="outline" />
      <Tag label="Desabilitada" disabled />
    </Row>
  );
}

function InputDemo() {
  const [currency, setCurrency] = useState(1240);
  const [cpf, setCpf] = useState("44060377805");
  const [card, setCard] = useState("4111222233334444");
  // Largura natural de um <input> no catálogo original.
  const field = { width: 180 };
  return (
    <>
      <Row>
        <Box sx={field}><Input label="Nome" placeholder="Digite o nome" /></Box>
        <Box sx={field}><Input label="E-mail" defaultValue="fulano@" error helperText="E-mail inválido" /></Box>
        <Box sx={field}><Input label="CPF" value="000.000.000-00" readOnlyField /></Box>
      </Row>
      <Row label="mask">
        <Box sx={field}><Input label="Valor da parcela" mask="currency" value={currency} onChange={setCurrency} /></Box>
        <Box sx={field}><Input label="CPF" mask="cpf" value={cpf} onChange={setCpf} /></Box>
        <Box sx={field}><Input label="Cartão de crédito" mask="cartaoCredito" value={card} onChange={setCard} /></Box>
      </Row>
      <Row label="success">
        <Box sx={field}><Input label="CPF" defaultValue="440.603.778-05" success helperText="Dígito verificador válido" /></Box>
        <span className="swatch-label" style={{ width: "auto" }}>size=lg</span>
        <Box sx={field}><Input label="Nome" placeholder="Digite o nome" size="lg" /></Box>
      </Row>
    </>
  );
}

function TextareaDemo() {
  const [text, setText] = useState("Cliente solicitou revisão do contrato antes da assinatura.");
  return (
    <>
      <Row>
        <Box sx={{ width: 192 }}>
          <Textarea
            label="Observações"
            placeholder="Digite uma observação"
            value={text}
            onChange={(event) => setText(event.target.value)}
            counter
            slotProps={{ htmlInput: { maxLength: 280 } }}
          />
        </Box>
      </Row>
      <Row label="size">
        <Box sx={{ width: 192 }}><Textarea label="size=md" defaultValue="Texto padrão" minRows={2} /></Box>
        <Box sx={{ width: 220 }}><Textarea label="size=lg" defaultValue="Texto maior" minRows={2} size="lg" /></Box>
        <Box sx={{ width: 192 }}><Textarea label="success" defaultValue="Validado com sucesso" minRows={2} success /></Box>
      </Row>
    </>
  );
}

function SelectDemo() {
  const [status, setStatus] = useState<string | null>("pendente");
  return (
    <>
      <Box sx={{ maxWidth: 260 }} data-field="select">
        <Select label="Status" options={statusOptions} value={status} onChange={setStatus} />
      </Box>
      <Row label="variant">
        <Box sx={{ width: 150 }}><Select options={statusOptions} value={null} onChange={noop} placeholder="Outlined" /></Box>
        <Box sx={{ width: 150 }}><Select options={statusOptions} value={null} onChange={noop} placeholder="Filled" variant="filled" /></Box>
        <Box sx={{ width: 150 }}><Select options={statusOptions} value={null} onChange={noop} placeholder="Underline" variant="underline" /></Box>
      </Row>
    </>
  );
}

function MultiSelectDemo() {
  const [selected, setSelected] = useState<number[]>([1, 2]);
  return (
    <>
      <Box sx={{ maxWidth: 320 }} data-field="multiselect">
        <MultiSelect label="Unidade de Negócio" options={businessUnits} value={selected} onChange={setSelected} />
      </Box>
      <Row label="variant">
        <Box sx={{ width: 150 }}><MultiSelect options={statusOptions} value={[]} onChange={noop} placeholder="Outlined" /></Box>
        <Box sx={{ width: 150 }}><MultiSelect options={statusOptions} value={[]} onChange={noop} placeholder="Filled" variant="filled" /></Box>
        <Box sx={{ width: 150 }}><MultiSelect options={statusOptions} value={[]} onChange={noop} placeholder="Underline" variant="underline" /></Box>
      </Row>
    </>
  );
}

function AutocompleteDemo() {
  const [client, setClient] = useState<string | null>("leo");
  const [asyncClient, setAsyncClient] = useState<string | null>(null);
  const [empty, setEmpty] = useState<string | null>(null);
  const search = (term: string) =>
    new Promise<typeof clients>((resolve) =>
      setTimeout(() => resolve(clients.filter((c) => c.label.toLowerCase().includes(term.toLowerCase()))), 600),
    );
  return (
    <>
      <Box sx={{ maxWidth: 260 }} data-field="autocomplete">
        <Autocomplete label="Cliente" options={clients} value={client} onChange={setClient} />
      </Box>
      <Row label="async">
        <Box sx={{ width: 220 }}>
          <Autocomplete label="Buscar cliente" options={[]} value={asyncClient} onChange={setAsyncClient} onSearch={search} />
        </Box>
      </Row>
      <Row label="noOptionsMessage">
        <Box sx={{ width: 260 }}>
          <Autocomplete options={[]} value={empty} onChange={setEmpty} placeholder="xyz" noOptionsMessage="Nenhuma opção encontrada" />
        </Box>
      </Row>
    </>
  );
}

function CheckboxFieldDemo() {
  const [terms, setTerms] = useState(true);
  const [notify, setNotify] = useState(false);
  return (
    <>
      <Row>
        <CheckboxField label="Aceito os termos" checked={terms} onChange={setTerms} />
        <CheckboxField label="Receber notificações" checked={notify} onChange={setNotify} />
        <CheckboxField label="Indisponível" checked={false} disabled onChange={noop} />
      </Row>
      <Row label="size">
        <CheckboxField label="Small" size="sm" checked onChange={noop} />
        <CheckboxField label="Medium" checked onChange={noop} />
        <CheckboxField label="Large" size="lg" checked onChange={noop} />
      </Row>
      <Row label="error">
        <CheckboxField label="Campo obrigatório" error checked onChange={noop} />
      </Row>
    </>
  );
}

function RadioGroupFieldDemo() {
  const [payment, setPayment] = useState("boleto");
  const [size, setSize] = useState("sm");
  return (
    <>
      <Row>
        <RadioGroupField
          label="Forma de pagamento"
          orientation="horizontal"
          options={[
            { value: "boleto", label: "Boleto" },
            { value: "pix", label: "Pix" },
            { value: "cartao", label: "Cartão" },
          ]}
          value={payment}
          onChange={setPayment}
        />
      </Row>
      <Row label="size">
        <RadioGroupField orientation="horizontal" options={[{ value: "sm", label: "Small" }]} size="sm" value={size} onChange={setSize} />
        <RadioGroupField orientation="horizontal" options={[{ value: "md", label: "Medium" }]} value={size} onChange={setSize} />
        <RadioGroupField orientation="horizontal" options={[{ value: "lg", label: "Large" }]} size="lg" value={size} onChange={setSize} />
      </Row>
    </>
  );
}

function SwitchFieldDemo() {
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(false);
  return (
    <>
      <Row>
        <SwitchField label="Ativo" checked={on} onChange={setOn} />
        <SwitchField label="Inativo" checked={off} onChange={setOff} />
      </Row>
      <Row label="size">
        <SwitchField label="Small" size="sm" checked onChange={noop} />
        <SwitchField label="Medium" checked onChange={noop} />
        <SwitchField label="Large" size="lg" checked onChange={noop} />
      </Row>
    </>
  );
}

function FileUploadDemo() {
  return (
    <Row>
      <Box sx={{ width: 280 }}><FileUpload onChange={noop} /></Box>
      <Box sx={{ width: 280 }}><FileUpload value={uploadPreview} onChange={noop} /></Box>
    </Row>
  );
}

function FilterPanelDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Row>
      <Button variant="outline" onClick={() => setOpen(true)} data-open="filterpanel">
        Ver filtros
      </Button>
      <FilterPanel open={open} onClose={() => setOpen(false)} onApply={() => setOpen(false)} onClear={noop}>
        <Input label="Status" defaultValue="Ativo" slotProps={{ htmlInput: { readOnly: true } }} />
        <Input label="Período" placeholder="Selecione o período" />
      </FilterPanel>
    </Row>
  );
}

/** Prévia de cada seção do catálogo, pelo id da seção. */
export const demos: Record<string, () => ReactNode> = {
  button: ButtonDemo,
  iconactionbutton: IconActionButtonDemo,
  statusbadge: StatusBadgeDemo,
  alert: AlertDemo,
  toast: ToastDemo,
  confirmdialog: ConfirmDialogDemo,
  modal: ModalDemo,
  progressbar: ProgressBarDemo,
  skeleton: SkeletonDemo,
  spinner: SpinnerDemo,
  emptystate: EmptyStateDemo,
  card: CardDemo,
  listitemcard: ListItemCardDemo,
  sectioncard: SectionCardDemo,
  detailscard: DetailsCardDemo,
  divider: DividerDemo,
  scrollarea: ScrollAreaDemo,
  drawer: DrawerDemo,
  tabs: TabsDemo,
  popover: PopoverDemo,
  logo: LogoDemo,
  tooltip: TooltipDemo,
  breadcrumb: BreadcrumbDemo,
  pagination: PaginationDemo,
  datatable: DataTableDemo,
  avatar: AvatarDemo,
  avatargroup: AvatarGroupDemo,
  tag: TagDemo,
  input: InputDemo,
  textarea: TextareaDemo,
  select: SelectDemo,
  multiselect: MultiSelectDemo,
  autocomplete: AutocompleteDemo,
  checkboxfield: CheckboxFieldDemo,
  radiogroupfield: RadioGroupFieldDemo,
  switchfield: SwitchFieldDemo,
  fileupload: FileUploadDemo,
  filterpanel: FilterPanelDemo,
};
