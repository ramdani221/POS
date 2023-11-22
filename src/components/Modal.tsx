import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Modal({ setShow }: { setShow: any }) {
  return (
    <div
      className="modal fade show bg-black bg-opacity-50"
      id="logoutModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Ready to Leave?
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setShow(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            Select Logout to end your session.
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
