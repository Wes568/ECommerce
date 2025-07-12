import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { useProductUser } from "@/app/_contexts/product-user-context";
import { Loader2, Trash } from "lucide-react";
import React, { useState } from "react";
import { deleteProductRequest } from "@/app/_actions/product";

interface ProductDeleteProps {
  productId: string;
}

const ProductDelete = ({ productId }: ProductDeleteProps) => {
  const [loading, setLoading] = useState(false);
  const { removeProduct } = useProductUser();

  const handleDelete = async () => {
    setLoading(true);
    await deleteProductRequest(productId);
    removeProduct(productId);
    setLoading(true);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash size={16} className="text-primary cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja deletar este produto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente o seu
            produto e removerá seus dados dos nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            {loading ? (
              <Button className="text-white" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deletando
              </Button>
            ) : (
              <Button
                onClick={handleDelete}
                className="text-white"
                type="submit"
              >
                Confirmar
              </Button>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductDelete;
