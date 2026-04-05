/* eslint-disable @typescript-eslint/no-explicit-any */


import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "./ui/alert-dialog";

export default function ConfirmDeleteDialog({ button, isDeleting, handleDelete, item }: any) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {button}
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          Are you sure to Delete {item}?
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            {
              isDeleting ? (
                "Deleting..."
              ) : (
                "Delete"
              )
            }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
