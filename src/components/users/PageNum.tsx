import { Dispatch, SetStateAction } from "react";

export default function PageNum({page, pageNow, setPageNum}: {page: number, pageNow: number, setPageNum: Dispatch<SetStateAction<number>>}) {
  return (
    <li className={"paginate_button page-item " + (page === pageNow &&'active')}>
      <button
        aria-controls="dataTable"
        data-dt-idx="1"
        tabIndex={0}
        className="page-link"
        onClick={() => setPageNum(page)}
      >
        {page}
      </button>
    </li>
  );
}
