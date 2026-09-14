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

  const handleFile = (file: File | null) => {
    if (!file) {
      onChange(null, null);
      return;
    }
    onChange(file, URL.createObjectURL(file));
  };

  return (
    <Box>
      {label && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
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
          textAlign: "center",
          backgroundColor: isDragging ? "action.hover" : "transparent",
        }}
      >
        {value ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
            <Box component="img" src={value} alt="Pré-visualização" sx={{ maxHeight: 120, maxWidth: "100%", borderRadius: radius.sm }} />
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="tertiary" size="sm" onClick={() => inputRef.current?.click()}>
                Substituir
              </Button>
              <Button variant="tertiary" size="sm" onClick={() => handleFile(null)}>
                Remover
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Arraste um arquivo aqui ou
            </Typography>
            <Button variant="tertiary" size="sm" onClick={() => inputRef.current?.click()}>
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
        <Typography variant="caption" color={error ? "error" : "text.secondary"} sx={{ mt: 0.5, display: "block" }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
