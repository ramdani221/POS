import Link from "next/link";

export default function AlertDropdown({dropped} : {dropped : any}) {
    return (
        <div className={"dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in " + (dropped && 'show')}
            aria-labelledby="alertsDropdown">
            <h6 className="dropdown-header">
                Alerts Center
            </h6>
            <Link className="dropdown-item d-flex align-items-center" href="#">
                <div className="mr-3">
                    <div className="icon-circle bg-primary">
                        <i className="fas fa-file-alt text-white"></i>
                    </div>
                </div>
                <div>
                    <div className="small text-gray-500">December 12, 2019</div>
                    <span className="font-weight-bold">A new monthly report is ready to download!</span>
                </div>
            </Link>
            <Link className="dropdown-item d-flex align-items-center" href="#">
                <div className="mr-3">
                    <div className="icon-circle bg-success">
                        <i className="fas fa-donate text-white"></i>
                    </div>
                </div>
                <div>
                    <div className="small text-gray-500">December 7, 2019</div>
                    $290.29 has been deposited into your account!
                </div>
            </Link>
            <Link className="dropdown-item d-flex align-items-center" href="#">
                <div className="mr-3">
                    <div className="icon-circle bg-warning">
                        <i className="fas fa-exclamation-triangle text-white"></i>
                    </div>
                </div>
                <div>
                    <div className="small text-gray-500">December 2, 2019</div>
                    Spending Alert: We&apos;ve noticed unusually high spending for your account.
                </div>
            </Link>
            <Link className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</Link>
        </div>
    )
}