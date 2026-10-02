import { useId, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "../Button/Button";
import { surfaceColors, semanticColors, brandColors } from "../../tokens/colors";
import { radius } from "../../tokens/radius";

export type FileUploadProps = {
  label?: string;
  /** URL de preview do arquivo já selecionado, se houver. */
  value?: string | null;
  onChange: (file: File | null, previewUrl: string | null) => void;
  accept?: string;
  error?: boolean;
  helperText?: string;
};

/**
 * Upload de arquivo com drag-and-drop, preview e ações de
 * substituir/remover. Unifica o `BannerUpload` (cupom-front) e o dropzone
 * inline de `UnidadesNegocioForm` (cadastro-front) — ver AUDITORIA.md §5.
 */
export function FileUpload({ label, value, onChange, accept = "image/*", error, helperText }: FileUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  /** Última URL de preview criada por este componente — revogada ao substituir/remover para não vazar memória. */
  const ownedPreviewUrl = useRef<string | null>(null);

  const handleFile = (file: File | null) => {
    if (ownedPreviewUrl.current) URL.revokeObjectURL(ownedPreviewUrl.current);
    ownedPreviewUrl.current = file ? URL.createObjectURL(file) : null;
    // Limpa o <input> para que escolher o mesmo arquivo de novo dispare `change`.
    if (inputRef.current) inputRef.current.value = "";
    onChange(file, ownedPreviewUrl.current);
  };

  return (
    <Box>
      {label && (
        <Typography color="text.secondary" sx={{ mb: "6px", fontSize: "0.78rem" }}>
          {label}
        </Typography>
      )}
      <Box
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files[0] ?? null);
        }}
        sx={{
          border: `1.5px dashed ${error ? semanticColors.error : isDragging ? brandColors.primary : surfaceColors.border}`,
          borderRadius: radius.md,
          p: 3,
          maxWidth: 280,
          textAlign: "center",
          backgroundColor: isDragging ? "action.hover" : "transparent",
        }}
      >
        {value ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <Box component="img" src={value} alt="Pré-visualização" sx={{ maxHeight: 80, maxWidth: "100%", borderRadius: radius.sm }} />
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
                Substituir
              </Button>
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => handleFile(null)}
                sx={{ border: `1px solid ${surfaceColors.border}`, py: "6px", px: "15px" }}
              >
                Remover
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <Typography color="text.secondary" sx={{ fontSize: "0.85rem" }}>
              Arraste um arquivo aqui ou
            </Typography>
            <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
              Selecionar arquivo
            </Button>
          </Box>
        )}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          hidden
          aria-label={label ?? "Arquivo"}
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
        />
      </Box>
      {helperText && (
        <Typography variant="caption" color={error ? "error" : "text.secondary"} sx={{ mt: "6px", display: "block", fontSize: "0.72rem" }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
