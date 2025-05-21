import { useToast } from "@/components/ui/use-toast"

type UseToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  id?: string
}

// Suppression de la propriété 'id' dans l'objet toast pour résoudre l'erreur TS2353
const toast = ({ ...props }: UseToastProps) => {
  const { toasts, dismiss, addToast } = useToast()

  return toasts.find((toast) => (toast.id as any) === props.id)
    ? dismiss(props.id as string)
    : addToast(props)
}

export { toast }
