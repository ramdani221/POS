import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function TableData({
  user,
  setId,
  setShow
}: {
  user: UsersType;
  setId: Dispatch<SetStateAction<number>>;
  setShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <tr className="odd/even">
      <td className="sorting_1">{user?.id}</td>
      <td className="">{user?.email}</td>
      <td className="">{user?.name}</td>
      <td className="">{user?.role}</td>
      <td>
        <Link href={`/home/users/edit/${user?.id}`}
          className="btn btn-success btn-circle me-1">
          <i className="fas fa-info-circle"></i>
        </Link>
        <button
          className="btn btn-danger btn-circle"
          onClick={() => {
            setId(user?.id);
            setShow(true)
          }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
