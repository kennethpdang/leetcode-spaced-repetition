"use client";

import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  isBusy: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (props.isOpen && !dialog.open) {
      dialog.showModal();
    }
    if (!props.isOpen && dialog.open) {
      dialog.close();
    }
  }, [props.isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      onCancel={(event) => {
        event.preventDefault();
        props.onCancel();
      }}
    >
      <h2 className="dialog-title">{props.title}</h2>
      <p className="dialog-text">{props.message}</p>
      <div className="dialog-actions">
        <button type="button" className="button button-secondary" onClick={props.onCancel} disabled={props.isBusy}>
          Cancel
        </button>
        <button type="button" className="button button-primary" onClick={props.onConfirm} disabled={props.isBusy}>
          {props.isBusy ? "Saving…" : props.confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
