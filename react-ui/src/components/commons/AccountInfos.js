import React from "react";

function AccountInfos({ account }) {
    return (
        <div className="row my-4">
            <div className="col col-md-6">
                <div className="card">
                    <div className="card-header">Mon compte</div>
                    <div className="card-body text-muted">
                        <h5 className="card-title">{account.firstname} {account.lastname}</h5>
                        <p className="card-text">
                            {account.email}
                            {account.phone ? account.phone : null}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfos
