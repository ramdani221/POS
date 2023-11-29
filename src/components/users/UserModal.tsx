
import { useDispatch, useSelector } from "@/lib/redux";
import { removeUser, usersPagination } from "@/lib/redux/users/userSlice";


export default function UserModal({ setShow, id, input }: { setShow: any, id: number, input: {keyword: string, limit: number, page: number, sort: string, sortBy: string}}) {
    const dispatch = useDispatch()
    const {pages} = useSelector(usersPagination)
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
              Deleted Confirmation
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
            Are you sure, you want delete it?
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
              onClick={() => setShow(false)}
            >
              No
            </button>
            <button className="btn btn-primary" onClick={() => {dispatch(removeUser(id, input, pages)); setShow(false)}}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
